# Rag.md

# Retrieval-Augmented Generation (RAG)

## Goal

Ensure that answers are based on the uploaded document rather than generic LLM knowledge.

---

## RAG Pipeline

Upload Document
↓
Extract Text
↓
Chunk Document
↓
Generate Embeddings
↓
Store in pgvector
↓
User Question
↓
Embed Query
↓
Vector Similarity Search
↓
Retrieve Top Chunks
↓
Build Prompt
↓
Gemini Generates Grounded Answer

---

## Chunking Strategy

Split the document into semantic chunks of approximately 500-1000 tokens.

Each chunk stores:

- chunk_index
- content
- embedding vector

---

## Embeddings

For every chunk:

embedding = Gemini.embed(chunk)

Store the vector in PostgreSQL using pgvector.

---

## Retrieval

For a user question:

1. Generate query embedding
2. Run vector similarity search
3. Retrieve top 3-5 relevant chunks
4. Use only those chunks as context

Example SQL concept:

ORDER BY embedding <-> query_embedding
LIMIT 5

---

## Prompt Assembly

System Prompt:

You are an AI research assistant.
Answer only using the provided document context.
If the answer is not present, clearly say that the document does not contain enough information.

Context: <retrieved chunks>

Question: <user question>

---

## Advantages

- Reduces hallucinations
- Improves factual accuracy
- Lowers token cost
- Scales to large documents
- Produces explainable answers

---

## Interview Talking Points

- Why chunking?
- Why embeddings?
- Why vector search?
- Why pgvector instead of a separate vector database?
- How RAG improves accuracy compared to sending the entire document to the LLM.
