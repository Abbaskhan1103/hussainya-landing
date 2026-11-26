// schema.org data for search engines and answer engines. Each object states a
// fact that is also visible on the page it is attached to.

import type { Faq } from "@/lib/faq";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/links";
import { DEFAULT_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/seo";

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const APP_ID = `${SITE_URL}/#app`;

/** Site-wide: who publishes the site, the site itself, and the app it is about. */
export const SITE_GRAPH = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/android-chrome-512x512.png`,
      },
      email: "support@hussainya.com",
      sameAs: [APP_STORE_URL, PLAY_STORE_URL],
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      name: SITE_NAME,
      alternateName: "Hussainya app",
      url: SITE_URL,
      description: DEFAULT_DESCRIPTION,
      inLanguage: "en-AU",
      publisher: { "@id": ORGANIZATION_ID },
    },
    {
      "@type": "MobileApplication",
      "@id": APP_ID,
      name: SITE_NAME,
      alternateName: "Hussainya: Shia Programs",
      description: DEFAULT_DESCRIPTION,
      url: SITE_URL,
      image: `${SITE_URL}/android-chrome-512x512.png`,
      applicationCategory: "LifestyleApplication",
      operatingSystem: "iOS 17.2 or later, Android",
      inLanguage: "en",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "AUD" },
      installUrl: [APP_STORE_URL, PLAY_STORE_URL],
      audience: { "@type": "Audience", audienceType: "Shia Muslims in Australia" },
      featureList: [
        "Prayer times calculated on your phone, with five calculation methods",
        "Hijri calendar with shahadat, wiladat and Eid dates",
        "Directory of hussainiyas and Islamic centres across Australia",
        "Programs, majalis and YouTube live streams from your centres",
        "Qibla compass",
        "Tasbih counter, including Tasbeeh al-Zahra",
        "Qadha prayer tracker",
        "Khums calculator",
        "Home screen widgets",
      ],
      publisher: { "@id": ORGANIZATION_ID },
    },
  ],
};

export function faqGraph(faqs: readonly Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/faq#faq`,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": APP_ID },
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

/** Home > page, for any page one level down. */
export function breadcrumbGraph(name: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: SITE_NAME, item: SITE_URL },
      { "@type": "ListItem", position: 2, name, item: `${SITE_URL}${path}` },
    ],
  };
}

/** Serialised for a script tag. "<" is escaped so no answer can close the tag. */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
