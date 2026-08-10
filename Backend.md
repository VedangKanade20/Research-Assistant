# Backend.md

# Backend Architecture

## Stack

- Node.js
- Fastify
- Drizzle ORM
- PostgreSQL
- pgvector
- Gemini API
- JWT Authentication

---

## Folder Structure

backend/
src/
app.ts
server.ts

```
config/
  env.ts
  db.ts
  gemini.ts

routes/
  auth.routes.ts
  document.routes.ts
  ai.routes.ts
  analytics.routes.ts

controllers/
services/
  auth.service.ts
  document.service.ts
  ai.service.ts
  rag.service.ts
  analytics.service.ts

repositories/
  user.repository.ts
  document.repository.ts
  chunk.repository.ts

middleware/
  auth.ts
  upload.ts

utils/
  jwt.ts
  hash.ts
  pdf.ts
  chunk.ts

db/
  schema/
  migrations/
```

---

## API Design

### Authentication

POST /auth/register
POST /auth/login
GET /auth/me

### Documents

POST /documents/upload
GET /documents
GET /documents/:id
DELETE /documents/:id

### AI

POST /documents/:id/summarize
POST /documents/:id/ask

### Analytics

GET /dashboard/metrics

---

## Database Design

### users

- id (UUID)
- email
- password_hash
- created_at

### documents

- id (UUID)
- user_id
- filename
- original_size
- summary
- created_at

### document_chunks

- id (UUID)
- document_id
- content
- embedding (pgvector)
- chunk_index

### chats

- id
- document_id
- user_question
- ai_answer
- created_at

### ai_requests

- id
- user_id
- document_id
- request_type
- prompt_tokens
- response_tokens
- created_at

---

## Backend Flow

Upload request
→ Verify JWT
→ Store metadata
→ Extract text
→ Generate summary
→ Chunk text
→ Generate embeddings
→ Store vectors
→ Return summary

Question request
→ Verify ownership
→ Embed query
→ Vector search
→ Build prompt
→ Gemini answer
→ Store chat
→ Update metrics
→ Return response

This separation keeps routes thin, services focused on business logic, and repositories responsible for database operations.
