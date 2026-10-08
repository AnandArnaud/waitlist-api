# waitlist-api

A minimal Express + TypeScript waitlist service — people join a product waitlist and confirm their spot, all in memory.

**Stack:** Express 4 + TypeScript (Node)

It is intentionally small. The user-action handlers log to the console.

## Key user actions

**User Joined Waitlist** — `POST /waitlist` · **Waitlist Confirmed** — `POST /waitlist/:id/confirm`

## Running it

```bash
npm install
npm run dev   # http://localhost:3000
```
