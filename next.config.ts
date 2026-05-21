import type { NextConfig } from "next";

const APP_BASE = "https://app.hussainya.com";

const nextConfig: NextConfig = {
  // Browser-fallback redirects: when the native apps' deep-link interception
  // does not fire (no app installed, OS verification not yet done, link
  // pasted into a desktop browser), forward the user to the equivalent path
  // on the web app instead of 404-ing on the marketing landing.
  //
  // URL fragments (e.g. `#access_token=...` from Supabase OAuth) are
  // preserved by the browser across redirects, so the auth handoff still
  // works.
  async redirects() {
    return [
      { source: "/auth/callback", destination: `${APP_BASE}/auth/callback`, permanent: false },
      { source: "/centers/:id*", destination: `${APP_BASE}/centers/:id*`, permanent: false },
      { source: "/programs/:id*", destination: `${APP_BASE}/programs/:id*`, permanent: false },
      { source: "/events/:id/invite/:token", destination: `${APP_BASE}/events/:id/invite/:token`, permanent: false },
      { source: "/tasbih", destination: `${APP_BASE}/ibadah/tasbih`, permanent: false },
      { source: "/qadha", destination: `${APP_BASE}/ibadah/qadha`, permanent: false },
      { source: "/khums", destination: `${APP_BASE}/ibadah/khums`, permanent: false },
      { source: "/qibla", destination: `${APP_BASE}/home/qibla`, permanent: false },
      { source: "/calendar", destination: `${APP_BASE}/home/calendar`, permanent: false },
    ];
  },
};

export default nextConfig;
