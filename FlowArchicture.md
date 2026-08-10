# FlowArchitecture.md

# AI Research Assistant - Flow & Architecture

## Product Vision

A SaaS-style AI Research Assistant where each user has a private workspace.

Users can upload PDF or TXT documents, receive an AI-generated summary, and ask follow-up questions. Answers are grounded in the uploaded document using Retrieval-Augmented Generation (RAG).

Think of it as a lightweight combination of Notion AI and ChatPDF.

---

## High-Level Architecture

Next.js (Frontend)
|
v
Fastify API (Backend)
|
+----------------------+
| |
v v
PostgreSQL + pgvector Gemini API
| (summary, embeddings, Q&A)
|
v
Document & Chat Storage

---

## Core User Flow

### Authentication

Register → Login → JWT Issued → Protected Dashboard

### Document Upload Pipeline

Upload PDF/TXT
↓
Store file metadata
↓
Extract text
↓
Generate AI summary
↓
Split into chunks
↓
Generate embeddings
↓
Store vectors in pgvector
↓
Return document page

The important architectural idea is that upload triggers a processing pipeline, not just file storage.

### Question Answering Pipeline

User asks question
↓
Embed query
↓
Vector similarity search
↓
Retrieve relevant chunks
↓
Build prompt with retrieved context
↓
Gemini generates grounded answer
↓
Store chat history
↓
Return answer

---

## Core Modules

| Module    | Responsibility                              |
| --------- | ------------------------------------------- |
| Auth      | Users, JWT, password hashing                |
| Documents | Upload, metadata, text extraction           |
| AI        | Summaries, embeddings, Gemini calls         |
| RAG       | Chunking, vector search, prompt assembly    |
| Analytics | Token usage, AI requests, dashboard metrics |

---

## Request Lifecycle Example

User uploads `research.pdf`

1. Frontend sends multipart request
2. Fastify verifies JWT
3. Metadata stored in PostgreSQL
4. PDF text extracted
5. Gemini generates summary
6. Text split into chunks
7. Embeddings generated
8. Vectors stored in pgvector
9. Summary returned to frontend

This architecture keeps AI processing centralized in the backend, allows provider abstraction, and makes RAG implementation clean from day one.
