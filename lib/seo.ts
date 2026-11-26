import type { Metadata } from "next";

export const SITE_URL = "https://hussainya.com";
export const SITE_NAME = "Hussainya";
// The title and description are what a search result shows, so they say what
// the app is in the words people search with, and lead with the name.
export const DEFAULT_TITLE = "Hussainya: Shia prayer times, Islamic centres and majlis programs";
export const DEFAULT_DESCRIPTION =
  "A free app for Shia Muslims in Australia: prayer times, the Hijri calendar, Islamic centres near you, majlis programs, qibla, tasbih and khums. On iPhone and Android.";

// Search engines may index the site unless ALLOW_INDEXING=false is set at
// build time, which is for a staging copy that must stay out of results. The
// default used to be the other way round, and the live site sat hidden behind
// "Disallow: /" and a noindex tag long after launch because nobody set the
// variable. robots.ts and the robots meta tag in layout.tsx both read this.
export const INDEXABLE = process.env.ALLOW_INDEXING !== "false";

// The images entry points at the generated app/opengraph-image.tsx route.
// It must live here, not only in the file convention: page-level openGraph
// objects replace the layout's wholesale, which would drop the root
// segment's file-based image on every subpage.
export const OPEN_GRAPH_BASE = {
  siteName: SITE_NAME,
  type: "website" as const,
  locale: "en_AU",
  images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: DEFAULT_TITLE }],
};

// Per-page metadata: canonical and og:url share the same path so crawlers
// and link scrapers agree on the page's one true URL. Metadata objects merge
// shallowly across segments, so openGraph must restate the shared base here
// rather than rely on the layout's copy.
export function pageMetadata({
  title,
  description,
  path,
}: {
  title?: string;
  description?: string;
  path: string;
}): Metadata {
  return {
    ...(title !== undefined && { title }),
    ...(description !== undefined && { description }),
    alternates: { canonical: path },
    openGraph: {
      ...OPEN_GRAPH_BASE,
      url: path,
      title: title === undefined ? DEFAULT_TITLE : `${title} · ${SITE_NAME}`,
      description: description ?? DEFAULT_DESCRIPTION,
    },
  };
}
