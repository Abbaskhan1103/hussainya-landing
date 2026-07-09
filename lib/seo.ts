import type { Metadata } from "next";

export const SITE_URL = "https://hussainya.com";
export const SITE_NAME = "Hussainya";
export const DEFAULT_TITLE = "Hussainya, a digital home for the Ahl al-Bayt community";
export const DEFAULT_DESCRIPTION =
  "Centres, programs, prayer times, qibla, and the daily rhythm of ibadah. Gathered with intention for the Shia community.";

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
