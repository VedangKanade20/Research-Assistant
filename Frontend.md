# Frontend.md

# Frontend Architecture

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- TanStack Query
- React Hook Form
- Axios

---

## Theme

Minimal SaaS interface.

Colors:

- Background: Slate / Zinc dark
- Cards: Neutral surfaces
- Accent: Indigo / Blue
- Success: Emerald
- Error: Red

The UI should feel similar to Notion AI, ChatPDF, or modern developer dashboards.

---

## Folder Structure

frontend/
app/
(auth)/
login/
register/

```
dashboard/
documents/
documents/[id]/
settings/
```

components/
ui/
dashboard/
documents/
chat/

lib/
hooks/
services/
providers/
types/

---

## Pages

### Login

User authentication

### Register

Account creation

### Dashboard

Overview metrics and recent activity

### Documents

List of uploaded documents

### Upload Document

Drag-and-drop upload interface

### Document Detail

- Document summary
- Chat interface
- Source context references

### Settings

Profile and account management

---

## Dashboard Metrics

Display as cards:

- Total Documents
- AI Requests
- Tokens Used
- Questions Asked
- Summaries Generated
- Average Response Time

---

## Pagination vs Infinite Scroll

Use **pagination**.

Reason:

- Easier backend implementation
- Better interview discussion
- Predictable API queries
- Lower memory usage

Example:

GET /documents?page=1&limit=10

---

## User Flow

Login
→ Dashboard
→ Upload document
→ View generated summary
→ Ask questions
→ Review previous chats
→ Upload additional documents

The frontend remains presentation-focused while all AI and RAG logic stays in the backend.
