# Documents Module

## Responsibility
Manage document uploads, metadata storage, and text extraction.

## Supported Formats
- PDF
- TXT

## Upload Flow
Upload PDF/TXT -> Store file metadata -> Extract text -> Pass content to AI module

## Responsibilities
- Multipart upload handling
- File validation
- Metadata storage
- Text extraction from PDFs
- Document ownership checks

## Endpoints
- POST /documents/upload
- GET /documents
- GET /documents/:id
- DELETE /documents/:id

## Database
Table: documents
- id (UUID)
- user_id (UUID FK)
- filename
- original_size
- summary
- created_at

## Output
Returns document metadata and AI-generated summary after processing.

## Interview Talking Points
- Why separate metadata from embeddings
- Handling large PDFs
- Why upload triggers a processing pipeline
