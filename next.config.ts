import type { NextConfig } from "next";

// =====================================================================
// HARTWELL & CO. — Front-end Only Configuration (Plan B)
// =====================================================================
//
// This site is a PURE FRONT-END — no database, no backend services,
// no environment variables required. All state (cart, wishlist, orders,
// auth session) lives in the browser via localStorage.
//
// The build produces static HTML for every page (`○ Static`). The only
// dynamic endpoint is `/api/health`, which returns a simple static JSON
// response for uptime monitors — no database, no external services.
//
// 🚀 Deployment (pick one):
//
//   Option A — Vercel / Netlify (zero config, one click)
//     npm install
//     npm run build
//     → deploy to Vercel/Netlify, no env vars needed
//
//   Option B — Pure static export to any host (GitHub Pages, S3, etc.)
//     1. Uncomment `output: "export"` below
//     2. Delete src/app/api/health/route.ts
//     3. `npm run build` → uploads the `out/` folder anywhere
//
// =====================================================================

const nextConfig: NextConfig = {
  // 🔥 Uncomment for pure static export to any host:
  // output: "export",

  trailingSlash: false,
  poweredByHeader: false,

  images: {
    // External image sources used across the site (Pexels stock photos)
    remotePatterns: [
      { protocol: "https", hostname: "images.pexels.com" },
    ],
    // Safe to keep enabled even in server mode — our <img> tags don't rely
    // on next/image optimisation.
    unoptimized: true,
  },
};

export default nextConfig;
