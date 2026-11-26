import type { Metadata, Viewport } from "next";
import { Amiri, Lora, Nunito } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { APP_STORE_ID } from "@/lib/links";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  INDEXABLE,
  OPEN_GRAPH_BASE,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";
import { SITE_GRAPH, jsonLd } from "@/lib/structured-data";

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

// Arabic month names and numerals on the home page's year ring.
const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
});

// Ownership tokens from Google Search Console and Bing Webmaster Tools. Each
// is optional: the tag is only written once its variable is set.
const googleVerification = process.env.GOOGLE_SITE_VERIFICATION;
const bingVerification = process.env.BING_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s · ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  publisher: SITE_NAME,
  // iPhone Safari offers the App Store listing in a banner at the top of the page.
  itunes: { appId: APP_STORE_ID },
  ...((googleVerification || bingVerification) && {
    verification: {
      ...(googleVerification && { google: googleVerification }),
      ...(bingVerification && { other: { "msvalidate.01": bingVerification } }),
    },
  }),
  openGraph: {
    ...OPEN_GRAPH_BASE,
    url: "/",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  twitter: { card: "summary_large_image" },
  // Same switch as app/robots.ts: a hidden build also carries noindex on every page.
  robots: INDEXABLE
    ? { index: true, follow: true, googleBot: { "max-snippet": -1, "max-image-preview": "large" } }
    : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#070D1F",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${lora.variable} ${nunito.variable} ${amiri.variable}`}
    >
      <body className="min-h-svh flex flex-col antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(SITE_GRAPH) }}
        />
        <ThemeProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
