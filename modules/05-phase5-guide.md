# Phase 5 Guide: RAG Engine & Interactive Document Chat

Welcome to **Phase 5**! This is the most exciting phase of our product. We are turning our stored document vectors into an interactive, intelligent **Chat with your PDF** engine.

If you are new to RAG (Retrieval-Augmented Generation), this guide will teach you **everything from first principles**.

---

## 💡 1. What is RAG and Why Do We Need It?

### The Big Problem with Standard AI Models
If you ask a standard AI model (like ChatGPT or Gemini): *"What is the refund policy in my company's custom agreement?"*, the AI will either:
1. **Make up an answer (Hallucination)** because it has never seen your private file.
2. **Give a generic answer** based on public internet data.

### The RAG Solution (Retrieval + Augmentation + Generation)
Instead of asking the AI directly, RAG follows a 3-step pipeline:

```
[ User Question: "What is the refund policy?" ]
                      │
                      ▼
 1. RETRIEVE: Convert question to Vector ➔ Query Postgres pgvector 
              for Top 3 most relevant document chunks.
                      │
                      ▼
 2. AUGMENT: Wrap retrieved chunks inside a strict System Prompt:
             "Use ONLY these 3 chunks to answer the user's question. 
             If not found, reply: 'Information not present in document.'"
                      │
                      ▼
 3. GENERATE: Pass augmented prompt to Gemini 3.6 ➔ Returns exact answer!
```

---

## 📐 2. Key Concepts in Phase 5

### Concept A: Vector Similarity Search (Cosine Distance)
In Phase 4, we stored chunks as 768-dimensional float arrays (`vector(768)`).

When a user asks a question:
1. We pass the question to `gemini-embedding-001` to get a **Query Vector** (e.g. `[0.05, -0.12, ... 768 floats]`).
2. In PostgreSQL, we execute a Cosine Distance calculation:
   ```sql
   SELECT content FROM document_chunks
   WHERE document_id = 'my-doc-id'
   ORDER BY embedding <=> query_vector
   LIMIT 3;
   ```
   The `<=>` operator measures the angle between vectors. The 3 smallest angles are the 3 chunks most semantically relevant to the question!

---

### Concept B: Grounded System Prompt Guardrails
To stop the AI from guessing, we construct a prompt with strict instructions:

```text
System Prompt:
You are an AI research assistant. Answer the user's question strictly using ONLY the provided document context below.
If the answer cannot be found in the context, respond: "I could not find information about that in the uploaded document."

Context Snippets:
[Chunk 1 text...]
[Chunk 2 text...]

User Question:
<user_prompt>
```

---

### Concept C: Chat History Persistence & Token Usage Tracking
To make the chat feel like ChatGPT, we save every turn in PostgreSQL:
* `chat_sessions`: Maps a chat workspace to a specific `document_id` and `user_id`.
* `chat_messages`: Stores individual messages (`role`: 'user' | 'assistant', `content`, `tokens_used`).

---

## 🛠️ 3. How Our Phase 5 Files Will Work

```
backend/
src/
├── db/schema/
│   ├── chatSessions.js   <-- Stores chat metadata & document linkage
│   └── chatMessages.js   <-- Stores Q&A message history & token counts
├── repositories/
│   └── chat.repository.js <-- Database queries for sessions & messages
├── services/
│   ├── rag.service.js    <-- Similarity search & RAG prompt assembly
│   └── gemini.service.js <-- Gemini 3.6 grounded answer generation
└── controllers/
    └── rag.controller.js  <-- POST /documents/:id/chat endpoint

frontend/
app/
└── (dashboard)/documents/[id]/
    └── page.js           <-- Split-screen Document Viewer + Chat Interface
```

---

## 🎯 4. Interview Talking Points for Phase 5

If an interviewer asks: *"How did you implement your RAG pipeline to prevent hallucinations?"*

**Say this:**
> *"We implemented a grounded RAG architecture using PostgreSQL `pgvector` and Google Gemini 3.6. When a user queries a document, we convert their prompt into a 768-dimensional vector using `gemini-embedding-001`, run a Cosine Distance query (`<=>`) to retrieve the top 3 semantic chunks, and wrap those chunks into a bounded system prompt. We instruct the LLM to strictly decline answering if the retrieved context lacks sufficient evidence. Finally, we persist token usage and message history per session in PostgreSQL for auditability."*
