# AI Module

## Responsibility
Handle all interactions with the Gemini API.

## Responsibilities
- Generate document summaries
- Generate embeddings
- Generate grounded answers
- Track token usage

## AI Provider
Gemini API

## Summary Generation
Input: extracted document text
Output: concise summary stored with the document

## Embedding Generation
Input: document chunks and user questions
Output: vector embeddings used by the RAG module

## Grounded Answer Generation
Input:
- user question
- retrieved document chunks

Output:
- answer based only on uploaded document context

## Endpoints
Internal service module consumed by:
- document processing
- RAG question answering

## Metrics
Track:
- prompt tokens
- response tokens
- request count

## Interview Talking Points
- Why backend owns AI calls
- Token cost optimization
- Switching providers without changing the frontend
