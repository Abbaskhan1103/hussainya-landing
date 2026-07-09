"use server";

import { headers } from "next/headers";

export type WaitlistState = {
  status: "idle" | "success" | "error";
  message?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// In-process rate limiter. The landing runs as a single pm2 process, so a
// Map is sufficient; no shared store needed (and none should be added).
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const attempts = new Map<string, { count: number; resetAt: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  if (attempts.size > 5_000) {
    for (const [key, entry] of attempts) {
      if (entry.resetAt <= now) attempts.delete(key);
    }
  }
  const entry = attempts.get(ip);
  if (!entry || entry.resetAt <= now) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

export async function joinWaitlist(
  _prev: WaitlistState,
  formData: FormData,
): Promise<WaitlistState> {
  // Honeypot: hidden field real users never see. Pretend success so bots
  // don't learn they were filtered.
  if (formData.get("website")) return { status: "success" };

  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  if (email.length < 5 || email.length > 254 || !EMAIL_RE.test(email)) {
    return {
      status: "error",
      message: "That doesn’t look like an email address. Mind checking it?",
    };
  }

  const requestHeaders = await headers();
  const ip = (requestHeaders.get("x-forwarded-for") ?? "unknown")
    .split(",")[0]
    .trim();
  if (rateLimited(ip)) {
    return {
      status: "error",
      message: "Too many attempts from this connection. Please try again in an hour.",
    };
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("waitlist: SUPABASE_URL / SUPABASE_ANON_KEY not configured");
    return {
      status: "error",
      message: "Something went wrong on our side. Please try again later.",
    };
  }

  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/waitlist`, {
      method: "POST",
      headers: {
        apikey: supabaseAnonKey,
        authorization: `Bearer ${supabaseAnonKey}`,
        "content-type": "application/json",
        prefer: "return=minimal",
      },
      body: JSON.stringify({ email, source: "landing" }),
    });

    // 409 = unique violation: already on the list. Same message either way,
    // so the form can't be used to probe who has signed up.
    if (res.ok || res.status === 409) return { status: "success" };

    console.error("waitlist: insert failed", res.status, await res.text().catch(() => ""));
  } catch (err) {
    console.error("waitlist: insert threw", err);
  }

  return {
    status: "error",
    message: "Something went wrong on our side. Please try again later.",
  };
}
