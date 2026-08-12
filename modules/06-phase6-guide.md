# Phase 6 Guide: Metrics, Token Tracking & System Analytics

Welcome to **Phase 6**! Every production SaaS product needs a high-visibility dashboard showing users how much storage they are using, how many AI tokens they have consumed, and how active their research workspace is.

This guide explains **how SQL aggregations work, how token tracking operates, and how to display system analytics in Next.js**.

---

## 📊 1. Core Analytics Concepts

### Concept A: Token Usage & Cost Management

When calling Large Language Models (LLMs) like Gemini, billing and rate-limiting are based on **Tokens** (1 token ≈ 4 characters of English text).

In Phase 5, whenever Gemini generated an answer, it returned `usageMetadata.totalTokenCount`. In Phase 6:

- We sum all `tokens_used` across a user's chat messages (`SELECT SUM(tokens_used)...`).
- This gives the user clear visibility into their AI resource consumption.

---

### Concept B: Single-Query SQL Database Aggregations

Instead of fetching all documents and counting them in JavaScript (which crashes memory when scaling), we let PostgreSQL calculate statistics directly using SQL aggregate functions:

```sql
SELECT
  COUNT(d.id) AS total_documents,
  COALESCE(SUM(d.original_size), 0) AS total_bytes,
  (SELECT COUNT(*) FROM chat_messages m JOIN chat_sessions s ON m.session_id = s.id WHERE s.user_id = $1 AND m.role = 'user') AS total_questions,
  (SELECT COALESCE(SUM(tokens_used), 0) FROM chat_messages m JOIN chat_sessions s ON m.session_id = s.id WHERE s.user_id = $1) AS total_tokens
FROM documents d
WHERE d.user_id = $1;
```

---

### Concept C: UI Pagination & Real-Time Filtering

When a user uploads 100 documents, rendering all 100 in the DOM slows down the browser.

- **Pagination**: Slice data into pages (e.g. `LIMIT 10 OFFSET 0` for Page 1, `LIMIT 10 OFFSET 10` for Page 2).
- **Client-Side Filtering**: Real-time searching by title or filename in Next.js.

---

## 🛠️ 2. Architectural Blueprint for Phase 6

```
[ Next.js Dashboard Page (app/dashboard/page.js) ]
                        │
                        ▼
   [ GET /api/v1/dashboard/metrics (Bearer Auth) ]
                        │
                        ▼
[ Metrics Service ➔ Document & Chat Repositories ]
                        │
                        ▼
[ SQL COUNT(), SUM() Aggregations in PostgreSQL ]
                        │
                        ▼
[ Live Dashboard Metrics Cards: Total Docs | Storage Used | Questions | Tokens ]
```

---

## 🎯 3. Interview Talking Points for Phase 6

If an interviewer asks: _"How did you implement multi-tenant analytics and token tracking?"_

**Say this:**

> _"We built an efficient analytics aggregation endpoint in Fastify. Rather than loading large datasets into application memory, we execute single-query SQL aggregations (`COUNT`, `SUM`, `COALESCE`) in PostgreSQL scoped to the authenticated user ID. We track cumulative Gemini token usage per session and expose live metrics—such as total storage bytes, document counts, questions asked, and AI token totals—on a real-time Next.js SaaS dashboard."_
