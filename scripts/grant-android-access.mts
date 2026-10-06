// Grants Play closed-test access to everyone waiting on the Android waitlist.
//
//   1. Lists pending signups and prints them for pasting into Play Console.
//   2. Once you confirm they're added there, emails each one the access email
//      and stamps access_granted_at, so re-running never emails anyone twice.
//
// Needs SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL), SUPABASE_SERVICE_ROLE_KEY
// and RESEND_API_KEY in the environment. Usage:
//   npx tsx scripts/grant-android-access.mts

import { createInterface } from "node:readline/promises";
import { androidAccessGranted } from "../lib/emails";
import { sendEmail } from "../lib/send-email";

const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!supabaseUrl || !serviceKey || !process.env.RESEND_API_KEY) {
  console.error("Set SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY and RESEND_API_KEY first.");
  process.exit(1);
}

const db = (path: string, init: RequestInit = {}) =>
  fetch(`${supabaseUrl}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: serviceKey,
      authorization: `Bearer ${serviceKey}`,
      "content-type": "application/json",
      ...init.headers,
    },
  });

const res = await db(
  "waitlist?select=email,created_at&source=eq.android_testing&access_granted_at=is.null&order=created_at.asc",
);
if (!res.ok) {
  console.error("Couldn't read the waitlist:", res.status, await res.text());
  process.exit(1);
}
const pending = (await res.json()) as { email: string; created_at: string }[];

if (pending.length === 0) {
  console.log("Nobody is waiting. Nothing to do.");
  process.exit(0);
}

console.log(`\n${pending.length} waiting for access:\n`);
for (const p of pending) console.log(`  ${p.email}  (signed up ${p.created_at.slice(0, 10)})`);
console.log(
  "\nIn Play Console, open Closed testing > alpha > Testers > the 'Testers' email list,",
  "\npaste these into 'Add email addresses', and save:\n",
);
console.log(pending.map((p) => p.email).join(", "));

const rl = createInterface({ input: process.stdin, output: process.stdout });
const answer = await rl.question("\nType 'sent' once they're saved in Play Console (anything else cancels): ");
rl.close();
if (answer.trim().toLowerCase() !== "sent") {
  console.log("Cancelled. Nobody was emailed or marked.");
  process.exit(0);
}

const email = androidAccessGranted();
let granted = 0;
for (const { email: to } of pending) {
  if (!(await sendEmail(to, email))) {
    console.error(`  ✗ ${to}: email failed, left as pending`);
    continue;
  }
  const mark = await db(`waitlist?email=eq.${encodeURIComponent(to)}`, {
    method: "PATCH",
    headers: { prefer: "return=minimal" },
    body: JSON.stringify({ access_granted_at: new Date().toISOString() }),
  });
  if (!mark.ok) {
    // Emailed but not marked: re-running would email them again.
    console.error(`  ! ${to}: emailed, but marking failed (${mark.status}). Mark by hand.`);
    continue;
  }
  granted += 1;
  console.log(`  ✓ ${to}`);
}
console.log(`\nDone: ${granted} of ${pending.length} granted and emailed.`);
