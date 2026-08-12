# API Testing Guide & Schema Reference

Base URL: `http://localhost:6968/api/v1`

This document details all implemented backend APIs, exact request bodies/headers, URL parameters, where to locate `req.body` in the codebase, and Postman/curl copy-paste examples.

---

## 🔍 Where to Find `req.body` & Input Definitions in Codebase

In this project (Controller-Service-Repository architecture):

1. **JSON Validation Schemas**: 
   - Found in `backend/src/routes/v1/*.routes.js`
   - Example: Fastify validates `request.body` against JSON schema before reaching the controller.
2. **Controller Request Handler**: 
   - Found in `backend/src/controllers/*.controller.js`
   - Access `request.body` directly in handlers (e.g., `const { email, password } = request.body;`).
3. **Multipart File Stream Body**:
   - For file uploads, access `const data = await request.file();` in `document.controller.js` to extract file buffer and metadata.

---

## 1. Authentication Endpoints

### 1.1 Register User
* **Method**: `POST`
* **URL**: `http://localhost:6968/api/v1/auth/register`
* **Headers**: `Content-Type: application/json`
* **Request Body (`req.body`)**:
```json
{
  "email": "user@example.com",
  "password": "Password123!"
}
```
* **Response (201 Created)**:
```json
{
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "uuid-v4-string",
      "email": "user@example.com",
      "createdAt": "2026-08-12T12:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsIn..."
  }
}
```

---

### 1.2 Login User
* **Method**: `POST`
* **URL**: `http://localhost:6968/api/v1/auth/login`
* **Headers**: `Content-Type: application/json`
* **Request Body (`req.body`)**:
```json
{
  "email": "user@example.com",
  "password": "Password123!"
}
```
* **Response (200 OK)**:
```json
{
  "message": "Login successful",
  "data": {
    "user": {
      "id": "uuid-v4-string",
      "email": "user@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsIn..."
  }
}
```

---

### 1.3 Get Current User Profile
* **Method**: `GET`
* **URL**: `http://localhost:6968/api/v1/auth/me`
* **Headers**: `Authorization: Bearer <YOUR_JWT_TOKEN>`
* **Request Body**: *None*
* **Response (200 OK)**:
```json
{
  "data": {
    "userId": "uuid-v4-string",
    "email": "user@example.com"
  }
}
```

---

## 2. Document Ingestion Endpoints

### 2.1 Upload & Parse Research Document
* **Method**: `POST`
* **URL**: `http://localhost:6968/api/v1/documents/upload`
* **Headers**: 
  - `Authorization: Bearer <YOUR_JWT_TOKEN>`
  - `Content-Type: multipart/form-data`
* **Request Body (`multipart/form-data`)**:
  - Key: `file`
  - Type: File (`.pdf` or `.txt`)
  - Max Size: `10MB`
* **Code Location**: Processed in `backend/src/controllers/document.controller.js` via `const data = await request.file();`
* **Response (201 Created)**:
```json
{
  "message": "Document uploaded and processed successfully",
  "data": {
    "id": "c138f6a9-858a-40a1-a4fb-203df6bf2074",
    "userId": "uuid-v4-string",
    "filename": "research_paper.pdf",
    "fileType": "pdf",
    "originalSize": 115200,
    "extractedText": "Abstract: In this paper we explore deep learning architectures...",
    "summary": "This document explores advanced deep learning architectures for natural language processing. It highlights optimization techniques and context window scaling.",
    "createdAt": "2026-08-12T12:00:00.000Z"
  }
}
```

---

### 2.2 List User Documents
* **Method**: `GET`
* **URL**: `http://localhost:6968/api/v1/documents`
* **Headers**: `Authorization: Bearer <YOUR_JWT_TOKEN>`
* **Request Body**: *None*
* **Response (200 OK)**:
```json
{
  "data": [
    {
      "id": "c138f6a9-858a-40a1-a4fb-203df6bf2074",
      "filename": "research_paper.pdf",
      "fileType": "pdf",
      "originalSize": 115200,
      "summary": null,
      "createdAt": "2026-08-12T12:00:00.000Z"
    }
  ]
}
```

---

### 2.3 Get Document By ID
* **Method**: `GET`
* **URL**: `http://localhost:6968/api/v1/documents/:id`
* **URL Params**: `:id` = Document UUID
* **Headers**: `Authorization: Bearer <YOUR_JWT_TOKEN>`
* **Request Body**: *None*
* **Response (200 OK)**: Returns full document record including `extractedText`.

---

### 2.4 Delete Document By ID
* **Method**: `DELETE`
* **URL**: `http://localhost:6968/api/v1/documents/:id`
* **URL Params**: `:id` = Document UUID
* **Headers**: `Authorization: Bearer <YOUR_JWT_TOKEN>`
* **Request Body**: *None*
* **Response (200 OK)**:
```json
{
  "message": "Document deleted successfully"
}
```

---

## 3. Grounded RAG Chat Endpoints

### 3.1 Send Question to Document (RAG Q&A)
* **Method**: `POST`
* **URL**: `http://localhost:6968/api/v1/documents/:id/chat`
* **URL Params**: `:id` = Document UUID
* **Headers**: 
  - `Authorization: Bearer <YOUR_JWT_TOKEN>`
  - `Content-Type: application/json`
* **Request Body (`req.body`)**:
```json
{
  "question": "What is the maximum file upload size allowed by the system?"
}
```
* **Response (200 OK)**:
```json
{
  "message": "Answer generated successfully",
  "data": {
    "sessionId": "b419fa82-1234-4000-8000-123456789abc",
    "message": {
      "id": "m9876543-1234-4000-8000-987654321xyz",
      "sessionId": "b419fa82-1234-4000-8000-123456789abc",
      "role": "assistant",
      "content": "Based on the provided document, the maximum file upload limit is 10MB per stream.",
      "tokensUsed": 245,
      "createdAt": "2026-08-12T12:00:00.000Z"
    },
    "sources": [
      {
        "chunkIndex": 0,
        "content": "The backend server runs on Fastify Node.js configured with a maximum file upload limit of 10MB per stream."
      }
    ]
  }
}
```

---

### 3.2 Get Document Chat History
* **Method**: `GET`
* **URL**: `http://localhost:6968/api/v1/documents/:id/chat-history`
* **URL Params**: `:id` = Document UUID
* **Headers**: `Authorization: Bearer <YOUR_JWT_TOKEN>`
* **Request Body**: *None*
* **Response (200 OK)**: Returns session metadata and chronological array of messages.

---

## 4. System Health Check

### 3.1 Health Check
* **Method**: `GET`
* **URL**: `http://localhost:6968/api/v1/health`
* **Headers**: *None*
* **Request Body**: *None*
* **Response (200 OK)**:
```json
{
  "status": "ok",
  "timestamp": "2026-08-12T12:00:00.000Z",
  "uptime": 124.5
}
```
