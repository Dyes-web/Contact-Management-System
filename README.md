# Cordia - Contact Management System

A full-stack CRUD application using Next.js (pages router), Tailwind CSS, Node.js API routes, and MySQL.

## Features
- CRUD: Create, Read, Update, Delete contacts
- MySQL integration via mysql2 with connection pooling
- Clean responsive UI with Tailwind (table, form, stats, search)
- Modular components and organized folder structure
- Ready for classroom presentation with seed data and demo user

## Tech Stack
- Next.js 14 (pages/)
- Tailwind CSS 3
- Node.js API Routes
- MySQL (mysql2/promise)

## Getting Started

### Prerequisites
- Node.js 18+
- MySQL Server running locally or accessible remotely

### 1) Install dependencies
```
npm install
```

### 2) Configure environment
Create `.env.local` in the project root:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=cordia_contacts
```

### 3) Setup database
- Option A (auto):
```
node setup.js
```
This executes `setup.sql` to create the database and contacts table and inserts sample records.

- Option B (manual): run `setup.sql` in your MySQL client.

### 4) Run the app
```
npm run dev
```
Open http://localhost:3000

## API Endpoints
- GET    /api/contacts            → list contacts
- POST   /api/contacts            → create contact {name, email, phone}
- GET    /api/contacts/:id        → single contact
- PUT    /api/contacts/:id        → update contact {name, email, phone}
- DELETE /api/contacts/:id        → delete contact

Notes:
- Duplicate emails return 400 with message 'Email already exists'.

## Project Structure
- components/ContactForm.js
- components/Layout.js
- lib/db.js (MySQL pool + query helper)
- pages/api/contacts/index.js, [id].js
- pages/_app.js (imports Tailwind CSS)
- pages/index.js (UI for CRUD)
- styles/globals.css (custom animations)

## Presentation Tips
- Walk through CRUD demo: create → appears in table; edit → updates row; delete → row removed.
- Explain DB flow: UI → fetch → API → MySQL query → response.
- Show setup.sql and .env.local.
- Discuss validation (Zod + react-hook-form) and duplicate email handling.

## License
For educational use.
