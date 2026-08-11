This is the order I’d follow for Backend

Authentication

Document ingestion (upload + text extraction)

After upload
Gemini summarization

After summaries
Chunking + embeddings

After embeddings
pgvector + similarity search

After vector search
RAG question answering

Analytics / dashboard metrics

---

## Phase 3: Document Ingestion Pipeline (Backend & Frontend)

### Goal was to build file upload handling, raw text extraction (PDF & TXT), document metadata persistence in PostgreSQL, and full frontend document management UI.

### Tasks

- [x] Install `@fastify/multipart` & `pdf-parse` in backend.
- [x] Extend Drizzle schema for `documents` table (`fileType`, `extractedText`).
- [ ] Create `textExtractor.js` utility for PDF and TXT streams.
- [ ] Add `uploadDocumentHandler`, `getDocumentHandler`, and `deleteDocumentHandler` in `document.controller.js`.
- [ ] Update `document.routes.js` with `POST /upload`, `GET /:id`, `DELETE /:id`.
- [ ] Create Next.js Dashboard page (`app/dashboard/page.js`).
- [ ] Build Drag & Drop Uploader component (`DocumentUpload.js`).
- [ ] Build Document List Grid & Delete Modal components.
