# VukaStream — SA Liberation Struggle Archive Platform

**Tagline:** “Freedom Was Not Free — telling the story of the South African liberation struggle”  
**Publisher:** SA Liberation Struggle Stories

A production-ready starter full-stack streaming platform with Netflix-style browsing, timeline discovery, ratio-safe media rendering, admin CMS, and PWA install support.

## Features delivered

- Mobile-first streaming UX: hero, featured rows, browse rows, gallery, search, timeline.  
- Supports video + image content.  
- Strict aspect-ratio support for `1:1`, `3:4`, `2:3`, `9:16` with stable card containers and `object-fit: contain`.  
- Admin CMS with secure login and create/list management endpoints (draft/publish capable data model).  
- Historical timeline seeded with source links for editor verification.  
- Starter taxonomy includes 30+ categories (events, people, places, parties).  
- API + in-memory datastore + audit trail collection.  
- PWA manifest + service worker for installable mobile-like usage.

## Stack

- Frontend: React + Vite + TypeScript
- Backend: Node.js HTTP API (`server/index.mjs`)
- Tests: Node assertions (`tests/core-flows.test.mjs`)

## Run locally

```bash
npm install
cp .env.example .env
npm run server
npm run dev
```

- Frontend: http://localhost:3000
- API: http://localhost:8787/api

## Build production frontend

```bash
npm run build
```

## Deploy (Netlify context)

For Netlify static frontend + separate API deployment:
1. Deploy frontend build output (`dist`) to Netlify.
2. Set `VITE_API_URL` to your deployed API endpoint.
3. Deploy the Node API from `server/index.mjs` to a Node host or as serverless functions.

## Tests

```bash
npm test
```

Checks include ratio support and search/filter behavior.

## Seed data

- `server/data/seed.mjs` contains:
  - Initial media items (videos + images)
  - Timeline events with source URLs
  - Starter category taxonomy (30+)

