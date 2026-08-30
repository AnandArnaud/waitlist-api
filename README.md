# waitlist-api

A minimal Express + TypeScript waitlist service — people join a product waitlist and confirm their spot, all in memory.

**Stack:** Express 4 + TypeScript (Node)

It is realistic but intentionally small, and ships with **no product analytics, experimentation, or session-replay wired in** — the user-action handlers just log to the console today.

## User actions worth tracking

**User Joined Waitlist** — `POST /waitlist` · **Waitlist Confirmed** — `POST /waitlist/:id/confirm`

## Running it

```bash
npm install
npm run dev   # http://localhost:3000
```
