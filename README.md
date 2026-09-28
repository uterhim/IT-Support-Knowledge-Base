# IT Support Knowledge Base

A searchable, taggable knowledge base for IT support articles — troubleshooting guides, how-tos, and onboarding checklists that a support team builds up and refers back to over time.

**Stack:** React (Vite) · Node.js / Express · PostgreSQL (full-text search)

## Features

- Browse articles by category, with per-category article counts
- Full-text search across article title and content (PostgreSQL `tsvector`)
- Tagging, with tags shown on each article card
- Markdown-formatted article content, rendered in the browser
- View counts per article, to see which content actually gets used
- Simple "New Article" flow for publishing directly from the UI

## Screenshots

_Add screenshots after running locally — the category sidebar + article list, and a single article view, are the two most useful to include._

## Project structure

```
it-support-knowledge-base/
├── backend/
│   ├── src/
│   │   ├── routes/articles.js   CRUD + search + category endpoints
│   │   ├── db.js
│   │   └── server.js
│   ├── schema.sql                includes a GIN full-text-search index
│   └── seed.sql                  6 realistic sample articles
└── frontend/
    └── src/
        ├── pages/         ArticleBrowser, ArticleView, NewArticle
        ├── components/    Navbar
        └── api.js
```

## Getting started

### 1. Database

```bash
createdb kb_db
psql kb_db -f backend/schema.sql
psql kb_db -f backend/seed.sql   # optional sample articles
```

### 2. Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev     # http://localhost:4200
```

### 3. Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev     # http://localhost:5173
```

## API overview

| Method | Endpoint                  | Description                              |
|--------|----------------------------|-------------------------------------------|
| GET    | `/api/articles`            | List articles (`category`, `tag`, `search` query params) |
| GET    | `/api/articles/categories` | Category list with article counts        |
| GET    | `/api/articles/:id`        | Get one article (increments view count)  |
| POST   | `/api/articles`            | Create an article                        |
| PATCH  | `/api/articles/:id`        | Update an article                        |
| DELETE | `/api/articles/:id`        | Delete an article                        |

## Why this project

A knowledge base is only useful if people actually find the article that answers their question — so the two things this project focuses on are real full-text search (not just a category filter) and tagging, both backed by proper PostgreSQL indexes rather than client-side filtering of a small in-memory list.

## License

MIT
