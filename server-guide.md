# AI Research Assistant - Server & Backend Guide

Welcome to the **Backend API Reference & Architecture Guide**! This document provides a complete technical specification of the Fastify backend server, Drizzle ORM schemas, JWT authentication middleware, and all API endpoints (`/api/v1/*`).

---

## 🛠️ Tech Stack & Server Architecture

- **Framework**: Fastify 5.x (High performance, low overhead Node.js web framework)
- **Database & ORM**: PostgreSQL with Drizzle ORM & Drizzle Kit
- **Authentication**: JWT (`@fastify/jwt`) with Bearer token header verification
- **Password Security**: `bcrypt` (Salted hashing, 10 rounds)
- **Cross-Origin Handling**: `@fastify/cors` (Configured for frontend credentials)
- **Server Entry Point**: `backend/src/server.js` (Listening on port `6968`)
- **Route Prefix**: `/api/v1`

---

## 📋 API Directory & Endpoint Matrix

| Method | Endpoint | Protection | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/health` | Public | Server & Database health status check |
| `POST` | `/api/v1/auth/register` | Public | Register new user account |
| `POST` | `/api/v1/auth/login` | Public | Authenticate user & issue JWT token |
| `GET` | `/api/v1/auth/me` | Protected (JWT) | Fetch authenticated user profile |
| `POST` | `/api/v1/auth/logout` | Public/JWT | Invalidate active session & logout |
| `GET` | `/api/v1/documents` | Protected (JWT) | Fetch user's indexed document list |

---

## 🔒 Authentication API Endpoints Detail

### 1. Register New User
- **Endpoint**: `POST /api/v1/auth/register`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "email": "researcher@university.edu",
    "password": "securepassword123"
  }
  ```
- **Response Success (`201 Created`)**:
  ```json
  {
    "message": "User registered successfully",
    "data": {
      "user": {
        "id": "e3a8904e-2821-4f4a-[#uuid]",
        "email": "researcher@university.edu",
        "createdAt": "2026-08-11T19:40:00.000Z"
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
  ```
- **Error Responses**:
  - `400 Bad Request`: Validation failure (email format or password length < 6).
  - `409 Conflict`: `User with this email already exists`.

---

### 2. Login User
- **Endpoint**: `POST /api/v1/auth/login`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "email": "researcher@university.edu",
    "password": "securepassword123"
  }
  ```
- **Response Success (`200 OK`)**:
  ```json
  {
    "message": "Login successful",
    "data": {
      "user": {
        "id": "e3a8904e-2821-4f4a-[#uuid]",
        "email": "researcher@university.edu"
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
  ```
- **Error Response**:
  - `401 Unauthorized`: `Invalid email or password`.

---

### 3. Get Authenticated User Profile (`/me`)
- **Endpoint**: `GET /api/v1/auth/me`
- **Headers**:
  - `Authorization: Bearer <JWT_TOKEN>`
- **Response Success (`200 OK`)**:
  ```json
  {
    "data": {
      "userId": "e3a8904e-2821-4f4a-[#uuid]",
      "email": "researcher@university.edu"
    }
  }
  ```
- **Error Response**:
  - `401 Unauthorized`: `Invalid or expired authentication token`.

---

### 4. Logout User
- **Endpoint**: `POST /api/v1/auth/logout`
- **Headers**: `Authorization: Bearer <JWT_TOKEN>` (Optional)
- **Response Success (`200 OK`)**:
  ```json
  {
    "message": "Logged out successfully"
  }
  ```

---

## 📄 Document APIs (`/api/v1/documents`)

### Get Documents List
- **Endpoint**: `GET /api/v1/documents?page=1&limit=10`
- **Headers**: `Authorization: Bearer <JWT_TOKEN>`
- **Response Success (`200 OK`)**:
  ```json
  {
    "data": [],
    "meta": {
      "page": 1,
      "limit": 10
    }
  }
  ```

---

## 🗄️ Database Schema & Drizzle ORM

Located in `backend/src/db/schema/users.js`:

```javascript
import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});
```

---

## 🔐 Authentication Flow Architecture

```
[ Frontend Client ] 
       │
       ├── 1. POST /api/v1/auth/register  ──► [ Fastify Controller ] ──► Hash Password (bcrypt) ──► Insert DB
       ├── 2. POST /api/v1/auth/login     ──► [ Fastify Controller ] ──► Verify Hash ──► Issue JWT Token
       ├── 3. GET  /api/v1/auth/me        ──► [ auth.middleware ]   ──► Verify JWT Header ──► Return User Payload
       └── 4. POST /api/v1/auth/logout    ──► [ Client localStorage ] ──► Remove Token & User State
```
