import type { Email } from "./emails";

// Replies land in support@, which Cloudflare forwards to the team inbox.
const FROM = "Hussainya <support@hussainya.com>";

export async function sendEmail(to: string, email: Email): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("email: RESEND_API_KEY not configured");
    return false;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { authorization: `Bearer ${apiKey}`, "content-type": "application/json" },
      body: JSON.stringify({
        from: FROM,
        to: [to],
        subject: email.subject,
        html: email.html,
        text: email.text,
      }),
    });
    if (res.ok) return true;
    console.error("email: send failed", res.status, await res.text().catch(() => ""));
  } catch (err) {
    console.error("email: send threw", err);
  }
  return false;
}
