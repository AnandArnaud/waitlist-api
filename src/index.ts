import express, { type Request, type Response } from "express";
import { type WaitlistEntry, nextId, count, byEmail, save, get, all } from "./store";

const app = express();
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true, waiting: count() });
});

// Someone joins the product waitlist.
//
// This is the service's key business event: a new lead just signed up. Right now the handler only
// logs it to the console.
app.post("/waitlist", (req: Request, res: Response) => {
  const email = typeof req.body?.email === "string" ? req.body.email.trim() : "";
  if (!email || !email.includes("@")) {
    return res.status(400).json({ error: "a valid email is required" });
  }
  const existing = byEmail(email);
  if (existing) {
    return res.status(200).json({ entry: existing, alreadyJoined: true });
  }

  const entry: WaitlistEntry = {
    id: nextId(),
    email,
    referral: typeof req.body?.referral === "string" ? req.body.referral : undefined,
    status: "pending",
    position: count() + 1,
    joinedAt: new Date().toISOString(),
  };
  save(entry);

  // The handler logs the action.
  console.log(`[waitlist] User Joined Waitlist id=${entry.id} email=${email} position=${entry.position}`);

  res.status(201).json({ entry });
});

// The person confirms their spot (e.g. clicks the email link).
app.post("/waitlist/:id/confirm", (req: Request, res: Response) => {
  const entry = get(req.params.id);
  if (!entry) {
    return res.status(404).json({ error: "waitlist entry not found" });
  }
  entry.status = "confirmed";
  save(entry);

  // The handler logs the action.
  console.log(`[waitlist] Waitlist Confirmed id=${entry.id} email=${entry.email}`);

  res.json({ entry });
});

app.get("/waitlist/:id", (req: Request, res: Response) => {
  const entry = get(req.params.id);
  if (!entry) return res.status(404).json({ error: "waitlist entry not found" });
  res.json({ entry });
});

app.get("/waitlist", (_req: Request, res: Response) => {
  res.json({ total: count(), entries: all() });
});

const port = Number(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`waitlist-api listening on http://localhost:${port}`);
});
