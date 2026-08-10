# Auth Module

## Responsibility
Handle user authentication and authorization for the SaaS-style AI Research Assistant.

## Features
- User registration
- User login
- JWT access token issuance
- Password hashing with bcrypt
- Protected route middleware
- User ownership validation for documents and chats

## Authentication Flow
Register -> Login -> JWT issued -> Protected dashboard

## Endpoints
- POST /auth/register
- POST /auth/login
- GET /auth/me

## Security Notes
- Store hashed passwords only
- Keep JWT secret in environment variables
- Validate JWT on every protected API
- Ensure users can only access their own documents

## Database
Table: users
- id (UUID)
- email
- password_hash
- created_at

## Interview Talking Points
- Why JWT?
- Why bcrypt?
- How authorization differs from authentication
- Why every AI endpoint should be protected
