// A tiny in-memory waitlist. No database — entries live in process memory and reset on restart.

export interface WaitlistEntry {
  id: string;
  email: string;
  referral?: string;
  status: "pending" | "confirmed";
  position: number;
  joinedAt: string;
}

const entries = new Map<string, WaitlistEntry>();
let seq = 0;

export function nextId(): string {
  seq += 1;
  return `wl_${1000 + seq}`;
}

export function count(): number {
  return entries.size;
}

export function byEmail(email: string): WaitlistEntry | undefined {
  return [...entries.values()].find((e) => e.email.toLowerCase() === email.toLowerCase());
}

export function save(entry: WaitlistEntry): void {
  entries.set(entry.id, entry);
}

export function get(id: string): WaitlistEntry | undefined {
  return entries.get(id);
}

export function all(): WaitlistEntry[] {
  return [...entries.values()].sort((a, b) => a.position - b.position);
}
