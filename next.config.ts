import type { NextConfig } from "next";

const APP_BASE = "https://app.hussainya.com";

const nextConfig: NextConfig = {
  // The consumer web app was retired (Hussainya is app-first). The old
  // browser-fallback redirects that forwarded /centers, /programs, /ibadah/*
  // etc. to app.hussainya.com are gone with it — those pages no longer exist.
  // What remains is host canonicalization and the OAuth callback handoff to
  // the backend (app.hussainya.com keeps /auth/callback). URL fragments (e.g.
  // `#access_token=...` from Supabase OAuth) are preserved across the redirect.
  async redirects() {
    return [
      // Canonical host: nginx proxies www and the apex to the same app with
      // the Host header intact, so the 301 to the apex happens here.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.hussainya.com" }],
        destination: "https://hussainya.com/:path*",
        permanent: true,
      },
      { source: "/auth/callback", destination: `${APP_BASE}/auth/callback`, permanent: false },
    ];
  },
  async headers() {
    return [
      {
        // Apple's spec: no .json extension, but served as application/json.
        source: "/.well-known/apple-app-site-association",
        headers: [{ key: "Content-Type", value: "application/json" }],
      },
    ];
  },
};

export default nextConfig;
