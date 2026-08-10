# RAG Module

## Responsibility
Retrieve relevant document context before asking the LLM.

## Why RAG?
Answers should be grounded in uploaded documents rather than generic model knowledge.

## Pipeline
Extract text -> Chunk document -> Generate embeddings -> Store vectors -> Retrieve relevant chunks -> Build prompt -> Generate answer

## Chunking
Split documents into manageable semantic sections.

## Embeddings
Store embeddings in PostgreSQL using pgvector.

## Retrieval Flow
User asks question -> Embed query -> Vector similarity search -> Retrieve top chunks -> Send context to Gemini

## Database
Table: document_chunks
- id (UUID)
- document_id (UUID FK)
- content
- embedding (pgvector)
- chunk_index

## Prompt Construction
The prompt contains:
- user question
- retrieved chunks
- instruction to answer only from provided context

## Interview Talking Points
- Why chunking
- Why embeddings
- Why vector search
- How RAG reduces hallucinations
