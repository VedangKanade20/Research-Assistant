# AI Research Assistant SaaS

An enterprise-grade, full-stack **AI Research Assistant** application that enables users to upload PDF/TXT research documents, generate instant executive AI summaries using **Google Gemini 3.6 Flash**, store semantic vector embeddings in **PostgreSQL** (`pgvector`), and engage in interactive, hallucination-free grounded document Q&A.

---

## 🌟 Key Features

- **Full-Stack Authentication**: JWT Bearer Token authentication with salted `bcrypt` password hashing and persistent Next.js session management.
- **Multi-Format Document Ingestion**: Supports PDF (`pdf-parse` v1 & v2 detection) and TXT parsing with raw text extraction.
- **Gemini 3.6 Auto-Summarization**: Automatically generates concise 3–4 sentence executive summaries upon document upload.
- **Semantic Vector Storage**: Text chunking algorithm (~500 tokens with sliding window overlap) and 768-dimensional vector embeddings using `gemini-embedding-001`.
- **Grounded RAG Engine**: Retrieval-Augmented Generation using PostgreSQL Cosine Distance similarity search (`<=>`) and strict anti-hallucination prompt guardrails.
- **Split-Screen Interactive Chat PDF**: Next.js 14 dashboard UI displaying document details, extracted text, and live AI chat room.
- **Token Tracking & Analytics**: Tracks cumulative LLM token usage and storage metrics using single-query SQL aggregations (`COUNT`, `SUM`, `COALESCE`).

---

## 🏗️ Architecture & Data Flow

```
[ Next.js 14 App Router UI ] ───(HTTP REST API)───► [ Fastify Node.js Backend Server ]
             │                                                  │
             ├─────────────── Vector & Text Storage ────────────┤
             ▼                                                  ▼
   [ PostgreSQL Database ] ◄──── (Drizzle ORM) ──── [ Google Gemini 3.6 API ]
    (document_chunks table)                          (gemini-3.6-flash & gemini-embedding-001)
```

---

## 🛠️ Technology Stack

### Backend

- **Runtime**: Node.js v24+
- **Framework**: Fastify (`@fastify/cors`, `@fastify/jwt`, `@fastify/multipart`)
- **Database**: PostgreSQL 16
- **ORM**: Drizzle ORM & Drizzle Kit
- **AI SDK**: `@google/genai` (Google Gemini 3.6 Flash & `gemini-embedding-001`)

### Frontend

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS & Lucide Icons
- **State & Auth**: React Context API (`AuthContext.js`)

---

## 🚀 Quickstart & Setup Guide

### 1. Prerequisites

- Node.js v18+ installed
- PostgreSQL database running locally or remotely (e.g. `localhost:5432`)
- Google Gemini API Key

### 2. Environment Variables

Create a `.env` file in `/backend`:

```env
PORT=6968
DATABASE_URL=postgres://postgres:postgres@localhost:5432/research_assistant
JWT_SECRET=your_super_secret_jwt_key_here
GEMINI_API_KEY=your_google_gemini_api_key_here
```

Create a `.env.local` file in `/frontend`:

```env
NEXT_PUBLIC_API_URL=http://localhost:6968
```

### 3. Installation & Running Locally

#### Backend Setup:

```bash
cd backend
npm install
npm run db:push
npm run dev
```

Backend will run at: `http://localhost:6968`

#### Frontend Setup:

```bash
cd frontend
npm install
npm run dev
```

Frontend will run at: `http://localhost:3000`

---

## 📖 Complete Documentation Links

- **[Frontend Architecture Guide](file:///d:/Everything/ZZZ-TASKS/resarch-assistant/frontend_guide.md)**: Next.js layout, components, context, and page routes.
- **[Backend Architecture Guide](file:///d:/Everything/ZZZ-TASKS/resarch-assistant/backend_guide.md)**: Fastify server, PostgreSQL schemas, Gemini integration, RAG pipeline, and API endpoints.
- **[API Reference Guide](file:///d:/Everything/ZZZ-TASKS/resarch-assistant/test-api-guide.md)**: Detailed API endpoints with request bodies.
