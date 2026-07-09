import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// Pre-launch, the whole site stays out of search engines. To go public, set
// ALLOW_INDEXING=true in .env.local on the droplet and redeploy; the robots
// meta tag in app/layout.tsx keys off the same switch.
export default function robots(): MetadataRoute.Robots {
  if (process.env.ALLOW_INDEXING !== "true") {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
