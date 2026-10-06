"use server";

import { headers } from "next/headers";
import { addAndroidTester } from "@/lib/play-testers";
import { androidWaitlistConfirmation } from "@/lib/emails";
import { sendEmail } from "@/lib/send-email";

export type WaitlistState = {
  status: "idle" | "success" | "error";
  message?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_SOURCES = new Set(["landing", "android_testing"]);

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

  const requestedSource = String(formData.get("source") ?? "landing");
  const source = ALLOWED_SOURCES.has(requestedSource) ? requestedSource : "landing";

  if (rateLimited(await clientIp())) {
    return {
      status: "error",
      message: "Too many attempts from this connection. Please try again in an hour.",
    };
  }

  const saved = await saveToWaitlist(email, source);
  if (source !== "android_testing") {
    return saved === "failed" ? SERVER_ERROR : { status: "success" };
  }

  // Group membership is what grants Play access, so add to the group even
  // when the email is already on the list under another source.
  const added = await addAndroidTester(email);
  if (!added && saved === "failed") return SERVER_ERROR;

  // Only brand-new rows get the confirmation, so each address is emailed at
  // most once and the form can't be used to spam someone.
  if (saved === "created") await sendEmail(email, androidWaitlistConfirmation());

  return {
    status: "success",
    message:
      "You’re on the Android waitlist. We’ll email you as soon as your access is ready, inshaAllah.",
  };
}

const SERVER_ERROR: WaitlistState = {
  status: "error",
  message: "Something went wrong on our side. Please try again later.",
};

async function saveToWaitlist(
  email: string,
  source: string,
): Promise<"created" | "exists" | "failed"> {
  const status = await supabaseInsert("waitlist", { email, source }, [409]);
  if (status === 0) return "failed";
  // 409 = unique violation: already on the list. Shown to the visitor as
  // success so the form can't be used to probe who has signed up.
  return status === 409 ? "exists" : "created";
}

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
};

// Contact messages go into the app's feedback queue (anon insert is allowed by
// RLS); website ones are tagged metadata.source = "website_contact".
export async function sendContactMessage(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  if (formData.get("website")) return { status: "success" };

  const name = String(formData.get("name") ?? "").trim().slice(0, 120);
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const message = String(formData.get("message") ?? "").trim();

  if (email.length > 254 || !EMAIL_RE.test(email)) {
    return { status: "error", message: "Add an email address we can reply to." };
  }
  if (message.length < 3) {
    return { status: "error", message: "Write a message before sending." };
  }
  if (message.length > 2000) {
    return { status: "error", message: "Keep your message under 2,000 characters." };
  }
  if (rateLimited(`contact:${await clientIp()}`)) {
    return {
      status: "error",
      message: "Too many messages from this connection. Please try again in an hour.",
    };
  }

  const status = await supabaseInsert("feedback", {
    category: "other",
    message,
    metadata: { source: "website_contact", name, email },
  });
  return status === 0 ? SERVER_ERROR : { status: "success" };
}

async function clientIp(): Promise<string> {
  const requestHeaders = await headers();
  return (requestHeaders.get("x-forwarded-for") ?? "unknown").split(",")[0].trim();
}

// Returns the HTTP status of a successful (or explicitly allowed) insert, or 0.
async function supabaseInsert(
  table: string,
  row: Record<string, unknown>,
  okStatuses: number[] = [],
): Promise<number> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error(`${table}: SUPABASE_URL / SUPABASE_ANON_KEY not configured`);
    return 0;
  }

  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/${table}`, {
      method: "POST",
      headers: {
        apikey: supabaseAnonKey,
        authorization: `Bearer ${supabaseAnonKey}`,
        "content-type": "application/json",
        prefer: "return=minimal",
      },
      body: JSON.stringify(row),
    });
    if (res.ok || okStatuses.includes(res.status)) return res.status;

    console.error(`${table}: insert failed`, res.status, await res.text().catch(() => ""));
  } catch (err) {
    console.error(`${table}: insert threw`, err);
  }
  return 0;
}
