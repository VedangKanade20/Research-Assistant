# Backend Architecture & Implementation Guide

This guide documents the backend architecture, Fastify server setup, PostgreSQL database schemas, Drizzle ORM configuration, Google Gemini 3.6 API integration, and complete REST API endpoints of the **AI Research Assistant** application.

---

## 🏛️ 1. Server Setup & Technology Stack

* **Runtime**: Node.js v24+
* **Server Framework**: Fastify
* **Plugins**: `@fastify/cors`, `@fastify/jwt`, `@fastify/multipart` (10MB payload limit)
* **Database**: PostgreSQL 16
* **ORM**: Drizzle ORM & Drizzle Kit
* **AI SDK**: `@google/genai` (Google Gemini 3.6 Flash & `gemini-embedding-001`)

---

## 📁 2. File & Directory Structure

```
backend/
├── src/
│   ├── config/
│   │   └── env.js               <-- Centralized environment variable validation
│   ├── db/
│   │   ├── schema/
│   │   │   ├── users.js          <-- Users table schema
│   │   │   ├── documents.js      <-- Documents table schema (raw text & summaries)
│   │   │   ├── documentChunks.js <-- Vector chunks table schema (JSONB/768-dim floats)
│   │   │   ├── chatSessions.js   <-- Chat session metadata schema
│   │   │   └── chatMessages.js   <-- Chat Q&A message history & token counts
│   │   └── index.js              <-- PostgreSQL pool & Drizzle ORM instance
│   ├── repositories/
│   │   ├── user.repository.js     <-- User database queries
│   │   ├── document.repository.js <-- Document CRUD database queries
│   │   ├── chunk.repository.js    <-- Vector chunk batch insertion queries
│   │   ├── chat.repository.js     <-- Chat history & Cosine Similarity vector queries
│   │   └── metrics.repository.js  <-- Single-query SQL metric aggregations
│   ├── services/
│   │   ├── auth.service.js     <-- Password hashing & JWT token generation
│   │   ├── document.service.js <-- Text extraction, chunking & vector orchestration
│   │   ├── gemini.service.js   <-- Gemini 3.6 Flash summarization & embeddings
│   │   ├── rag.service.js      <-- Vector search & grounded Q&A orchestration
│   │   └── metrics.service.js  <-- Dashboard metrics calculations
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── document.controller.js
│   │   ├── rag.controller.js
│   │   └── metrics.controller.js
│   ├── routes/
│   │   └── v1/
│   │       ├── auth.routes.js
│   │       ├── document.routes.js
│   │       ├── rag.routes.js
│   │       ├── metrics.routes.js
│   │       └── index.js          <-- Fastify v1 route registration
│   ├── utils/
│   │   ├── textExtractor.js      <-- PDF (`pdf-parse` v1/v2) & TXT parser
│   │   ├── chunker.js            <-- Sliding-window text chunker (~500 tokens)
│   │   └── errors.js             <-- Centralized custom error classes
│   └── app.js                    <-- Fastify application factory
└── server.js                     <-- HTTP Server Entrypoint
```

---

## 🗄️ 3. PostgreSQL Database Schemas (Drizzle ORM)

### A. `users` Table
* `id`: UUID (Primary Key)
* `email`: Text (Unique, Indexed)
* `passwordHash`: Text (Bcrypt Hash)
* `createdAt`: Timestamp

### B. `documents` Table
* `id`: UUID (Primary Key)
* `userId`: UUID (FK to `users.id`, CASCADE delete)
* `filename`: Text
* `fileType`: Text ('pdf' | 'txt')
* `originalSize`: Integer (Bytes)
* `extractedText`: Text (Raw Parsed String)
* `summary`: Text (Gemini 3.6 Executive Summary)
* `createdAt`: Timestamp

### C. `document_chunks` Table
* `id`: UUID (Primary Key)
* `documentId`: UUID (FK to `documents.id`, CASCADE delete)
* `userId`: UUID (FK to `users.id`, CASCADE delete)
* `chunkIndex`: Integer
* `content`: Text (~2000 chars text chunk)
* `embedding`: JSONB (768-dimensional float array)
* `createdAt`: Timestamp

### D. `chat_sessions` & `chat_messages` Tables
* `chat_sessions`: `id`, `documentId`, `userId`, `title`, `createdAt`
* `chat_messages`: `id`, `sessionId`, `role` ('user'|'assistant'), `content`, `tokensUsed`, `createdAt`

---

## 🤖 4. Google Gemini API Integration (`gemini.service.js`)

Uses the official `@google/genai` SDK:

1. **Executive Auto-Summarization**:
   Uses `gemini-3.6-flash` to construct a concise 3-4 sentence summary of raw document text up to 8,000 characters.
2. **Vector Embedding Generation**:
   Uses `gemini-embedding-001` with `outputDimensionality: 768` to produce 768-element floating-point vector representations for every document chunk and query prompt.
3. **Grounded RAG Answer Generation**:
   Passes retrieved Cosine Similarity chunks into a system prompt using `gemini-3.6-flash`. Instructs the model to answer strictly using provided snippets or decline if context is missing.

---

## 📡 5. Complete REST API Reference

### Auth Endpoints
* `POST /api/v1/auth/register`: Register user account.
* `POST /api/v1/auth/login`: Authenticate and issue 7-day JWT Bearer token.
* `GET /api/v1/auth/me`: Get authenticated user profile.

### Document Ingestion Endpoints
* `POST /api/v1/documents/upload`: Upload PDF or TXT file (multipart/form-data, 10MB limit). Triggers text extraction, chunking, 768-dim embeddings, and Gemini 3.6 auto-summarization.
* `GET /api/v1/documents`: List user research documents.
* `GET /api/v1/documents/:id`: Get document text & summary details by UUID.
* `DELETE /api/v1/documents/:id`: Delete document and cascade delete vector chunks & chat sessions.

### RAG Chat Endpoints
* `POST /api/v1/documents/:id/chat`: Submit question about document. Generates query vector, retrieves top 3 Cosine Similarity chunks, generates grounded Gemini answer, and saves turn to history.
* `GET /api/v1/documents/:id/chat-history`: Retrieve past chat session messages.

### Metrics Endpoint
* `GET /api/v1/dashboard/metrics`: Single-query SQL aggregations returning user document count, storage footprint, question counts, and AI token consumption totals.
