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
Convert extracted document text into semantic chunks, generate 768-dimensional vector embeddings using Google Gemini API (`gemini-embedding-001`), store vectors in PostgreSQL (`document_chunks` table), and automatically generate executive document summaries using `gemini-3.6-flash`.

### Tasks
- [x] Enable vector customType schema in PostgreSQL / Drizzle (`document_chunks` table).
- [x] Implement text chunking algorithm (`chunker.js` with sliding window overlap).
- [x] Integrate `@google/genai` SDK for Gemini embeddings (`gemini-embedding-001`) and auto-summarization (`gemini-3.6-flash`).
- [x] Extend `DocumentService` to automatically chunk text, batch-generate embeddings, write to `document_chunks`, and populate `summary` in `documents` upon upload.
- [x] Update `test-api-guide.md` with Phase 4 response data structures.

---

## Phase 5 Heads-Up & Architecture Note (RAG & Chat Engine)

### What Comes Next in Phase 5:
1. **Vector Similarity Search**: We will write a Drizzle query using Cosine Similarity (`<->` / `<=>` distance) to retrieve the top 3-5 relevant chunks matching a user's question.
2. **Chat History Persistence**: Create `chat_sessions` and `chat_messages` tables to persist conversation history per document.
3. **Grounded Prompt Assembly**: Wrap retrieved chunks inside a strict System Prompt:
   > *"Answer the user's question using ONLY the provided document context below. If the answer is not present in the context, reply: 'The uploaded document does not contain enough information to answer this question.'"*
4. **Interactive Document Chat UI**: Build split-screen interactive Chat PDF interface in Next.js (`/documents/[id]`).


