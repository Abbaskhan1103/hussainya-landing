const SITE_URL = "https://hussainya.com";

export type Email = { subject: string; html: string; text: string };

// Mirrors the Supabase auth email templates so every Hussainya email looks the same.
function layout(opts: {
  preheader: string;
  heading: string;
  paragraphs: string[];
  button?: { href: string; label: string };
}): string {
  const paragraphs = opts.paragraphs
    .map(
      (p) =>
        `<p style="font-size:15px;line-height:1.6;color:#8A9AB8;margin:0 0 16px 0;">${p}</p>`,
    )
    .join("\n            ");

  const button = opts.button
    ? `<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:8px auto 24px auto;">
              <tr>
                <td align="center" bgcolor="#C9A84C" style="border-radius:10px;">
                  <a href="${opts.button.href}" style="display:inline-block;padding:14px 32px;font-size:15px;font-weight:700;color:#070D1F;text-decoration:none;border-radius:10px;letter-spacing:0.3px;">${opts.button.label}</a>
                </td>
              </tr>
            </table>`
    : "";

  return `<!-- preheader -->
<div style="display:none;max-height:0;overflow:hidden;font-size:1px;line-height:1px;color:#0D1530;opacity:0;">
  ${opts.preheader}
</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#070D1F;padding:32px 16px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <tr>
    <td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background-color:#0D1530;border:1px solid #1E2D52;border-radius:16px;overflow:hidden;">

        <!-- header -->
        <tr>
          <td style="padding:32px 32px 24px 32px;text-align:center;border-bottom:1px solid #1E2D52;">
            <div style="font-family:Georgia,'Times New Roman',serif;font-size:22px;font-weight:600;color:#EDF0F7;letter-spacing:0.5px;">Hussainya</div>
            <div style="font-size:11px;font-weight:600;color:#C9A84C;text-transform:uppercase;letter-spacing:2px;margin-top:4px;">Australia Shia Islamic Hub</div>
          </td>
        </tr>

        <!-- body -->
        <tr>
          <td style="padding:32px;">
            <h1 style="font-family:Georgia,'Times New Roman',serif;font-size:24px;font-weight:600;color:#EDF0F7;margin:0 0 16px 0;">${opts.heading}</h1>
            <p style="font-size:15px;line-height:1.6;color:#EDF0F7;margin:0 0 12px 0;">As-salamu alaykum,</p>
            ${paragraphs}
            ${button}
            <p style="font-size:13px;line-height:1.6;color:#8A9AB8;margin:0;border-top:1px solid #1E2D52;padding-top:20px;">
              You&apos;re getting this because this address was entered at hussainya.com. If that wasn&apos;t you, you can safely ignore this email. Questions? Just reply.
            </p>
          </td>
        </tr>

        <!-- footer -->
        <tr>
          <td style="padding:20px 32px;background-color:#070D1F;text-align:center;">
            <p style="font-size:11px;color:#8A9AB8;margin:0;letter-spacing:0.3px;">
              Hussainya · Connecting Australia&apos;s Shia Muslim community<br/>
              <a href="${SITE_URL}/privacy" style="color:#8A9AB8;text-decoration:underline;">Privacy</a>
              &nbsp;·&nbsp;
              <a href="${SITE_URL}/terms" style="color:#8A9AB8;text-decoration:underline;">Terms</a>
            </p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>`;
}

const FOOTER_TEXT = `You're getting this because this address was entered at hussainya.com. If that wasn't you, you can safely ignore this email. Questions? Just reply.

Hussainya · ${SITE_URL}
Privacy: ${SITE_URL}/privacy · Terms: ${SITE_URL}/terms`;

export function androidWaitlistConfirmation(): Email {
  return {
    subject: "You're on the Hussainya Android waitlist",
    html: layout({
      preheader: "You've been added to the Android waitlist. You'll get access shortly.",
      heading: "You&apos;re on the Android waitlist",
      paragraphs: [
        "Thanks for signing up. You&apos;ve been added to the Hussainya Android waitlist, and you&apos;ll get access to the app shortly.",
        "We&apos;ll email you again as soon as your access is ready, with everything you need to install Hussainya on your Android phone.",
      ],
    }),
    text: `As-salamu alaykum,

Thanks for signing up. You've been added to the Hussainya Android waitlist, and you'll get access to the app shortly.

We'll email you again as soon as your access is ready, with everything you need to install Hussainya on your Android phone.

${FOOTER_TEXT}`,
  };
}

// Closed-testing opt-in page for the `alpha` track.
const ANDROID_ACCESS_URL = "https://play.google.com/apps/testing/com.hussainya.app";

export function androidAccessGranted(): Email {
  return {
    subject: "Your Hussainya Android access is ready",
    html: layout({
      preheader: "You now have access to Hussainya on Android. Here's how to install it.",
      heading: "Your access is ready",
      paragraphs: [
        "Good news: you now have access to Hussainya on Android.",
        "On your Android phone, tap the button below, then tap <strong style=\"color:#EDF0F7;\">Become a tester</strong> and install Hussainya from Play Store. Make sure Play Store is signed in with the address this email was sent to.",
      ],
      button: { href: ANDROID_ACCESS_URL, label: "Get Hussainya on Google Play" },
    }),
    text: `As-salamu alaykum,

Good news: you now have access to Hussainya on Android.

On your Android phone, open this link, tap "Become a tester" and install Hussainya from Play Store:
${ANDROID_ACCESS_URL}

Make sure Play Store is signed in with the address this email was sent to.

${FOOTER_TEXT}`,
  };
}
