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
- [x] Create `textExtractor.js` utility for PDF and TXT streams.
- [x] Add `uploadDocumentHandler`, `getDocumentHandler`, and `deleteDocumentHandler` in `document.controller.js`.
- [x] Update `document.routes.js` with `POST /upload`, `GET /:id`, `DELETE /:id`.
- [x] Create Next.js Dashboard page (`app/dashboard/page.js`).
- [x] Build Drag & Drop Uploader component (`DocumentUpload.js`).
- [x] Build Document List Grid & Delete Modal components.

---

## Phase 4: Vector Storage, Chunking & Gemini Ingestion

### Goal
Convert extracted document text into semantic chunks, generate 768-dimensional vector embeddings using Google Gemini API (`text-embedding-004`), store vectors in PostgreSQL using `pgvector`, and automatically generate executive document summaries using Gemini 1.5 Flash.

### Tasks
- [ ] Enable `pgvector` extension in PostgreSQL and Drizzle schema (`document_chunks` table).
- [ ] Implement text chunking algorithm (~500–1000 tokens with 100-token sliding window overlap).
- [ ] Integrate `@google/genai` SDK for Gemini embeddings (`text-embedding-004`) and auto-summarization (`gemini-1.5-flash`).
- [ ] Extend `DocumentService` to automatically chunk text, batch-generate embeddings, write to `document_chunks`, and populate `summary` in `documents` upon upload.
- [ ] Update `test-api-guide.md` with Phase 4 response data structures.

