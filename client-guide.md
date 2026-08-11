# AI Research Assistant - Client Guide (Learn & Build)

Welcome to the **Learn as we Build (L&B)** guide! This document explains every single detail of the Next.js frontend architecture, folder structures, component design choices, and styling decisions so you gain full clarity on how modern Next.js applications are constructed.

---

## 📚 Table of Contents

1. [Next.js & JavaScript Fundamentals](#1-nextjs--javascript-fundamentals)
2. [Folder & Project Structure](#2-folder--project-structure)
3. [Routing Concepts in App Router](#3-routing-concepts-in-app-router)
4. [Design System & Dark Theme](#4-design-system--dark-theme)
5. [Page-by-Page Architectural Breakdown](#5-page-by-page-architectural-breakdown)

---

## 1. Next.js & JavaScript Fundamentals

### What is Next.js App Router?
Next.js is a React framework that simplifies building web applications. Starting with Next.js 13+, the **App Router** is the standard way to build applications.

Key features of App Router:
- **File-based Routing**: Folders inside the `app/` directory define routes. For instance, `app/dashboard/page.js` corresponds to the `/dashboard` URL.
- **Server & Client Components**:
  - By default, all components inside the `app/` folder are **React Server Components (RSC)**. They render on the server, resulting in fast load times and smaller JavaScript bundle sizes sent to the browser.
  - When we need interactivity (like form inputs, button clicks, state like `useState`), we add `"use client"` at the top of the component file.
- **Strictly JavaScript (`.js` / `.jsx`)**: We write standard React code using `.js` and `.jsx` extensions without TypeScript annotations, making it light and direct to read.

---

## 2. Folder & Project Structure

Here is how our `frontend/` workspace is organized:

```
frontend/
├── app/
│   ├── (auth)/             # Auth route group (shares authentication layout)
│   │   ├── login/
│   │   │   └── page.js     # /login page UI
│   │   └── register/
│   │       └── page.js     # /register page UI
│   ├── (dashboard)/        # Dashboard route group (shares Sidebar & Header)
│   │   ├── layout.js       # Main Dashboard shell (Sidebar + Header + main view)
│   │   ├── dashboard/
│   │   │   └── page.js     # /dashboard Overview metrics page UI
│   │   ├── documents/
│   │   │   ├── page.js     # /documents list & upload UI
│   │   │   └── [id]/
│   │   │       └── page.js # /documents/[id] document summary & chat UI
│   │   └── settings/
│   │       └── page.js     # /settings user profile page UI
│   ├── globals.css         # Global Tailwind styles & dark mode color variables
│   ├── layout.js           # Root layout wrapper (Fonts, Theme Provider)
│   └── page.js             # Root landing redirect page UI
├── components/             # Reusable UI components
│   ├── ui/                 # Atomic UI primitives (Button, Card, Input, Badge, Table)
│   ├── dashboard/          # Metrics Cards, Activity List
│   ├── documents/          # Document Table, Upload Dropzone
│   ├── chat/               # Chat Message list, Prompt Input bar, Citation Sidebar
│   └── navigation/         # Sidebar, Header Nav
└── public/                 # Static assets (images, icons, favicons)
```

---

## 3. Routing Concepts in App Router

### Special File Names in Next.js
Inside any directory under `app/`:
1. **`page.js`**: Makes a folder publicly accessible as a URL route.
2. **`layout.js`**: UI that is shared between multiple pages. Keeps state and avoids re-rendering on page changes (e.g., Sidebar and Header).
3. **Route Groups `(folderName)`**: A directory enclosed in parentheses like `(auth)` or `(dashboard)` is used solely for organization and sharing layouts **without** affecting the URL path.
   - Example: `app/(auth)/login/page.js` produces URL `/login` (not `/auth/login`).
4. **Dynamic Routes `[id]`**: Folders wrapped in square brackets define dynamic parameters.
   - Example: `app/(dashboard)/documents/[id]/page.js` matches `/documents/1`, `/documents/abc`, etc.

---

## 4. Design System & Dark Theme

Our design matches a sleek **Minimal SaaS interface** inspired by modern AI apps like Notion AI & ChatPDF.

### Color Palette (Tailwind Slate / Zinc):
- **Background**: Deep Slate (`#0f172a` / `bg-slate-950`)
- **Card Surfaces**: Neutral dark Slate (`bg-slate-900/80` with border `border-slate-800`)
- **Primary Accent**: Indigo / Electric Blue (`bg-indigo-600 hover:bg-indigo-500` / `text-indigo-400`)
- **Success Badge**: Emerald (`text-emerald-400 bg-emerald-950/40`)
- **Error / Danger**: Red (`text-red-400 bg-red-950/40`)

---

## 5. Page-by-Page Architectural Breakdown

### Page 1: Auth Layout (`/login` & `/register`)
- Clean split card layout with branded logo, subtitle, input fields, primary submit button, and secondary link to toggle between Login and Register.

### Page 2: Dashboard (`/dashboard`)
- **Metrics Grid**: 6 visual cards showing core SaaS metrics:
  1. Total Documents
  2. AI Requests
  3. Tokens Used
  4. Questions Asked
  5. Summaries Generated
  6. Average Response Time
- **Recent Activity Stream**: List showing recent AI research tasks and status.

### Page 3: Documents List & Upload (`/documents`)
- **Header**: Document management toolbar with search bar, filter tabs, and "Upload New Document" button.
- **Document Grid / Table**: Clean table showing File Name, Size, Upload Date, Status (Processed/Processing), and Action buttons.
- **Pagination UI**: Prev / Next page control bar (`GET /documents?page=1&limit=10`).
- **Drag-and-Drop Dropzone**: Visual file drop container UI.

### Page 4: Document Detail & AI Chat Workspace (`/documents/[id]`)
- **3-Pane Split Workspace**:
  - *Left Pane*: Document Summary card & PDF reader metadata view.
  - *Center Pane*: Interactive AI Chat window with prompt bar, message bubbles, and system responses.
  - *Right Pane*: Source Context References (chunks, page numbers, similarity scores).

### Page 5: Settings (`/settings`)
- Profile edit card, API key/Token configuration preview card, and subscription/usage usage tier status.

---
*Stay tuned as we construct each component and page step-by-step!*
