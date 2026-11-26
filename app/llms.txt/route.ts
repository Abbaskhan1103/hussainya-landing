import { FAQS } from "@/lib/faq";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/links";
import { DEFAULT_DESCRIPTION, SITE_URL } from "@/lib/seo";

// /llms.txt: the site in plain Markdown for assistants and answer engines,
// following the llmstxt.org layout (title, summary, then linked sections).
// Built from the same FAQ the /faq page shows, so the two cannot disagree.
export const dynamic = "force-static";

const body = `# Hussainya

> ${DEFAULT_DESCRIPTION}

Hussainya is a mobile app, not a website you use in a browser. This site describes it and links to the App Store and Google Play. The name comes from "hussainiya", the hall where Shia Muslims gather for majalis.

## Get the app

- [Hussainya on the App Store](${APP_STORE_URL}): iPhone, iOS 17.2 or later, free
- [Hussainya on Google Play](${PLAY_STORE_URL}): Android, free

## Pages

- [Home](${SITE_URL}): what Hussainya is, shown on a ring of the Hijri year
- [Features](${SITE_URL}/features): centres, programs, the Hijri calendar, prayer times and the ibadah tools
- [Questions](${SITE_URL}/faq): direct answers about cost, coverage, prayer times and privacy
- [About](${SITE_URL}/about): why the app exists
- [Who we are](${SITE_URL}/who-we-are): the team and its principles
- [Contact](${SITE_URL}/contact): support@hussainya.com, including requests to list a centre
- [Privacy](${SITE_URL}/privacy) and [Terms](${SITE_URL}/terms)

## Questions and answers

${FAQS.map((faq) => `### ${faq.question}\n\n${faq.answer}`).join("\n\n")}
`;

export function GET() {
  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
