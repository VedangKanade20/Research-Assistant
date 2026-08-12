import { buildApp } from './app.js';
import { db } from './db/index.js';
import { documentChunks } from './db/schema/documentChunks.js';
import { eq } from 'drizzle-orm';

const app = buildApp();

async function verifyPhase4Only() {
  await app.ready();
  console.log('====================================================');
  console.log('🔬 PHASE 4 EXCLUSIVE PIPELINE VERIFICATION SUITE');
  console.log('====================================================');

  const testEmail = `phase4_verifier_${Date.now()}@example.com`;
  const testPassword = 'Password123!';

  // Step 1: Register User
  const regRes = await app.inject({
    method: 'POST',
    url: '/api/v1/auth/register',
    payload: { email: testEmail, password: testPassword }
  });
  const token = regRes.json().data.token;
  const userId = regRes.json().data.user.id;
  console.log('✅ STEP 1: Authenticated User Created (ID:', userId + ')');

  // Step 2: Prepare Multi-Paragraph Test Research Text
  const sampleDocText = `
Artificial Intelligence and Vector Database Systems: A Technical Analysis.

Section 1: Introduction to Semantic Representation
Modern Natural Language Processing relies on dense high-dimensional vector representations. By transforming unstructured text into floating-point vectors, software systems can perform mathematical similarity comparisons such as Cosine Distance and Euclidean L2 distance.

Section 2: High Performance Vector Search with PostgreSQL and pgvector
PostgreSQL with the pgvector extension allows unified relational and vector queries. Rather than deploying an external vector database, pgvector enables ACID-compliant transactions, simplified backup strategies, and low latency vector distance comparisons directly within SQL queries.

Section 3: Grounded Retrieval-Augmented Generation Architecture
Retrieval-Augmented Generation (RAG) mitigates LLM hallucinations by retrieving relevant knowledge chunks prior to prompt assembly. The retrieved context constrains the language model generation process strictly to verified domain facts.
  `.trim();

  // Step 3: Document Upload & Phase 4 Trigger
  const boundary = '----WebKitFormBoundaryPhase4Test';
  const body = [
    `--${boundary}`,
    'Content-Disposition: form-data; name="file"; filename="phase4_verification_doc.txt"',
    'Content-Type: text/plain',
    '',
    sampleDocText,
    `--${boundary}--`
  ].join('\r\n');

  console.log('⏳ STEP 2: Executing Document Upload & Phase 4 Ingestion Pipeline...');
  const uploadRes = await app.inject({
    method: 'POST',
    url: '/api/v1/documents/upload',
    headers: {
      authorization: `Bearer ${token}`,
      'content-type': `multipart/form-data; boundary=${boundary}`
    },
    payload: body
  });

  if (uploadRes.statusCode !== 201) {
    console.error('❌ Upload Failed:', uploadRes.json());
    process.exit(1);
  }

  const doc = uploadRes.json().data;
  console.log('✅ STEP 3: Document Upload & Raw Text Parsing Successful (Doc ID:', doc.id + ')');

  // Step 4: Verify Gemini 3.6 Auto-Summarization
  console.log('🔍 STEP 4: Verifying Gemini 3.6 Summary Generation...');
  if (!doc.summary || doc.summary.includes('failed') || doc.summary.includes('pending')) {
    console.error('❌ Summary Generation Verification Failed:', doc.summary);
    process.exit(1);
  }
  console.log('   -> Gemini 3.6 Summary Output:', `"${doc.summary}"`);

  // Step 5: Verify Storage in document_chunks (pgvector)
  console.log('🔍 STEP 5: Verifying Chunk Creation & Vector Embedding Storage in PostgreSQL...');
  const chunksInDb = await db
    .select()
    .from(documentChunks)
    .where(eq(documentChunks.documentId, doc.id));

  if (!chunksInDb || chunksInDb.length === 0) {
    console.error('❌ Chunks DB Verification Failed: No chunks found in document_chunks table');
    process.exit(1);
  }

  console.log(`   -> Created Chunks Count: ${chunksInDb.length}`);
  const firstChunk = chunksInDb[0];
  console.log(`   -> Chunk 0 Preview: "${firstChunk.content.slice(0, 60)}..."`);
  
  if (!firstChunk.embedding || !Array.isArray(firstChunk.embedding) || firstChunk.embedding.length !== 768) {
    console.error(`❌ Vector Embedding Verification Failed: Expected 768 dimensions, got ${firstChunk.embedding?.length}`);
    process.exit(1);
  }
  console.log(`   -> Vector Embedding Verified: ${firstChunk.embedding.length} float dimensions stored cleanly!`);

  // Step 6: Retrieval Verification
  console.log('🔍 STEP 6: Document & Metadata Retrieval Verification...');
  const getRes = await app.inject({
    method: 'GET',
    url: `/api/v1/documents/${doc.id}`,
    headers: { authorization: `Bearer ${token}` }
  });
  if (getRes.statusCode !== 200 || !getRes.json().data.extractedText) {
    console.error('❌ Retrieval Failed:', getRes.json());
    process.exit(1);
  }
  console.log('✅ STEP 6: Document Retrieval Verified!');

  // Step 7: Delete Document & Verify Cascade Cleanup
  console.log('🧹 STEP 7: Testing Document Deletion & Cascade Vector Cleanup...');
  const delRes = await app.inject({
    method: 'DELETE',
    url: `/api/v1/documents/${doc.id}`,
    headers: { authorization: `Bearer ${token}` }
  });
  if (delRes.statusCode !== 200) {
    console.error('❌ Delete Failed:', delRes.json());
    process.exit(1);
  }

  const remainingChunks = await db
    .select()
    .from(documentChunks)
    .where(eq(documentChunks.documentId, doc.id));

  if (remainingChunks.length !== 0) {
    console.error('❌ Cascade Delete Cleanup Failed: Orphaned vector chunks remain in DB');
    process.exit(1);
  }
  console.log('✅ STEP 7: Cascade Delete Cleanup Verified! All document vector chunks wiped from DB.');

  console.log('====================================================');
  console.log('🎉 PHASE 4 PIPELINE VERIFICATION PASSED 100% PERFECTLY!');
  console.log('====================================================');
  process.exit(0);
}

verifyPhase4Only().catch(err => {
  console.error('❌ FATAL ERROR IN PHASE 4 VERIFICATION:', err);
  process.exit(1);
});
