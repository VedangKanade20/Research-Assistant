# Phase 4 Guide: Vector Storage, Chunking & Gemini AI Ingestion

Welcome to **Phase 4**! If you are new to AI development, building a **RAG system** (Retrieval-Augmented Generation) can feel like magic. 

This guide explains **every single concept from scratch**—what embeddings are, why we chunk text, how vectors work in databases, and how our code ties it all together into a production-grade pipeline.

---

## 🧠 1. The Core AI Concepts (Beginner to Pro)

### Concept A: What is an Embedding?
Computers do not understand the meaning of human words like "apple", "king", or "research". They only understand numbers.

An **Embedding** is a way of converting a piece of text into a long list of numbers (called a **Vector**) that captures its **semantic meaning**.

* **Example**: 
  * "The dog chased the cat" ➔ `[0.12, -0.45, 0.89, ... 768 numbers]`
  * "A hound ran after the feline" ➔ `[0.13, -0.44, 0.88, ... 768 numbers]`
  * "Stock market prices rose today" ➔ `[-0.91, 0.32, -0.11, ... 768 numbers]`

Notice how the first two sentences use completely different words, but their vector numbers are almost identical because **their meaning is the same**.

---

### Concept B: Why do we Chunk Text?
Large Language Models (like Gemini or ChatGPT) have limits:
1. **Memory & Cost**: Passing an entire 100-page book in every query is extremely expensive and slow.
2. **Precision**: If a user asks "What was the revenue in Q3?", sending 50 pages of irrelevant text confuses the AI.

**Chunking** breaks a long document into small, manageable pieces (~500 words each). 
* **Sliding Window Overlap**: When we break text into chunks, we overlap the ends by ~100 characters so sentences split across boundaries don't lose context.

```
Document Text: [====================================================]
Chunk 1:       [============]
Chunk 2:                [============]  <-- Notice Overlap!
Chunk 3:                         [============]
```

---

### Concept C: What is `pgvector`?
Normally, SQL databases search text using exact keywords (e.g. `WHERE title LIKE '%cat%'`). But keywords fail if the user searches for "feline".

`pgvector` is a PostgreSQL extension that lets us store vector arrays (768 floating-point numbers) directly in PostgreSQL tables and perform **Math-based Similarity Searches** (Cosine Similarity).

---

## 🛠️ 2. How Our Code Works (File-by-File Breakdown)

Here is how data flows through our Phase 4 architecture:

```
Upload Document 
      │
      ▼
1. Extract Raw Text (textExtractor.js)
      │
      ├────────────────────────┐
      ▼                        ▼
2. Gemini 3.6 Summary    3. Split Text into Chunks (chunker.js)
  (gemini.service.js)          │
                               ▼
                         4. Generate Embeddings (gemini-embedding-001)
                               │
                               ▼
                         5. Store in PostgreSQL (document_chunks table)
```

---

### File 1: `src/utils/chunker.js` (The Text Splitter)
This utility takes a giant raw string and slices it into smaller chunks with a 300-character overlap, making sure it breaks at natural sentence ends (`.` or `\n`).

```javascript
import { chunkText } from './utils/chunker.js';

const chunks = chunkText("Long document text...", 2000, 300);
// Returns: [{ chunkIndex: 0, content: "..." }, { chunkIndex: 1, content: "..." }]
```

---

### File 2: `src/services/gemini.service.js` (The AI Brain)
Uses Google's `@google/genai` SDK to execute two main jobs:

1. **Auto-Summarization**: Uses `gemini-3.6-flash` to write a 3-4 sentence executive summary of the uploaded document.
2. **Vector Generation**: Uses `gemini-embedding-001` with `outputDimensionality: 768` to convert each text chunk into a 768-number array.

```javascript
const gemini = new GeminiService();

// Job 1: Summary
const summary = await gemini.generateSummary(extractedText);

// Job 2: Vectors
const vectors = await gemini.generateEmbeddings(["Chunk 1 text...", "Chunk 2 text..."]);
```

---

### File 3: `src/db/schema/documentChunks.js` (Database Table)
Defines the `document_chunks` table using Drizzle ORM:

```javascript
export const documentChunks = pgTable('document_chunks', {
  id: uuid('id').defaultRandom().primaryKey(),
  documentId: uuid('document_id').references(() => documents.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
  chunkIndex: integer('chunk_index').notNull(),
  content: text('content').notNull(),
  embedding: vector768('embedding'), // Custom 768-dim float array
  createdAt: timestamp('created_at').defaultNow().notNull()
});
```

---

### File 4: `src/services/document.service.js` (The Pipeline Orchestrator)
Combines all steps together when a user uploads a document:

```javascript
// 1. Extract text from PDF/TXT
const text = await extractTextFromBuffer(fileBuffer, mimeType);

// 2. Generate summary with Gemini 3.6
const summary = await geminiService.generateSummary(text);

// 3. Save main Document record
const doc = await documentRepository.create({ filename, summary, ... });

// 4. Chunk text & generate vectors
const chunks = chunkText(text);
const embeddings = await geminiService.generateEmbeddings(chunks.map(c => c.content));

// 5. Bulk insert chunks into Postgres
await chunkRepository.insertBatch(chunks.map((c, i) => ({
  documentId: doc.id,
  userId,
  chunkIndex: c.chunkIndex,
  content: c.content,
  embedding: embeddings[i]
})));
```

---

## 🎯 3. Interview Talking Points for Phase 4

If an interviewer asks: *"How did you handle document ingestion and AI embeddings?"*

**Say this:**
> *"We built an automated ingestion pipeline. Upon upload, we extract raw text from PDF or TXT files, generate a concise summary using `gemini-3.6-flash`, and run a sliding-window text chunker to split content into ~500-token blocks with overlap. We then generate 768-dimensional vector embeddings using `gemini-embedding-001` and persist them directly in PostgreSQL using `pgvector`. This avoids the cost and sync complexity of managing an external vector database while ensuring full ACID transactional consistency."*

---

## 🚀 What This Enables for Phase 5 (RAG Engine)
Now that every chunk of your document is stored as a vector in PostgreSQL, **Phase 5** will be super easy! 

When a user asks a question like *"What is the main conclusion of section 2?"*:
1. We convert the user's question into a 768-dim vector.
2. Run a 1-line SQL similarity query in Postgres to get the top 3 closest chunks.
3. Pass those 3 chunks to Gemini 3.6 to generate a grounded, hallucination-free answer!
