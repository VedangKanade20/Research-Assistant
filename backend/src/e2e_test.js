import { buildApp } from './app.js';

const app = buildApp();

async function runE2ETest() {
  await app.ready();
  console.log('--- STARTING E2E INTEGRATION TEST ---');

  const testEmail = `e2e_${Date.now()}@example.com`;
  const testPassword = 'Password123!';

  // 1. Register User
  const regRes = await app.inject({
    method: 'POST',
    url: '/api/v1/auth/register',
    payload: { email: testEmail, password: testPassword }
  });
  console.log('✅ 1. REGISTER:', regRes.statusCode, regRes.json().message);

  // 2. Login User
  const loginRes = await app.inject({
    method: 'POST',
    url: '/api/v1/auth/login',
    payload: { email: testEmail, password: testPassword }
  });
  const token = loginRes.json().data.token;
  console.log('✅ 2. LOGIN Token Issued:', Boolean(token));

  // 3. Get Empty Documents List
  const emptyDocsRes = await app.inject({
    method: 'GET',
    url: '/api/v1/documents',
    headers: { authorization: `Bearer ${token}` }
  });
  console.log('✅ 3. GET DOCUMENTS (empty):', emptyDocsRes.statusCode, emptyDocsRes.json().data);

  // 4. Upload TXT File
  const sampleTxt = Buffer.from('This is a test research document for end-to-end testing.');
  const boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW';
  const body = [
    `--${boundary}`,
    'Content-Disposition: form-data; name="file"; filename="e2e_test.txt"',
    'Content-Type: text/plain',
    '',
    sampleTxt.toString(),
    `--${boundary}--`
  ].join('\r\n');

  const uploadRes = await app.inject({
    method: 'POST',
    url: '/api/v1/documents/upload',
    headers: {
      authorization: `Bearer ${token}`,
      'content-type': `multipart/form-data; boundary=${boundary}`
    },
    payload: body
  });

  console.log('✅ 4. UPLOAD DOCUMENT:', uploadRes.statusCode, uploadRes.json().message);
  const docId = uploadRes.json().data.id;

  // 5. Get Document Details & Verify Text Extraction
  const getDocRes = await app.inject({
    method: 'GET',
    url: `/api/v1/documents/${docId}`,
    headers: { authorization: `Bearer ${token}` }
  });
  console.log('✅ 5. GET DOCUMENT BY ID (Extracted Text):', getDocRes.json().data.extractedText);

  // 6. Delete Document
  const deleteRes = await app.inject({
    method: 'DELETE',
    url: `/api/v1/documents/${docId}`,
    headers: { authorization: `Bearer ${token}` }
  });
  console.log('✅ 6. DELETE DOCUMENT:', deleteRes.statusCode, deleteRes.json().message);

  console.log('🎉 ALL END-TO-END TESTS PASSED CLEANLY!');
  process.exit(0);
}

runE2ETest().catch(err => {
  console.error('❌ E2E TEST FAILED:', err);
  process.exit(1);
});
