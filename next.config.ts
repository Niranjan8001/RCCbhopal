import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "",
  trailingSlash: true,
  turbopack: {
    root: __dirname,
  },
  images: {
    // AVIF first, WebP for browsers without it. Roughly 20% smaller than WebP
    // alone, at the cost of a slower first encode per variant.
    formats: ["image/avif", "image/webp"],
    // The default is 4 hours, which is what Lighthouse reports as an
    // inefficient cache lifetime. 30 days instead of a year because there is
    // no way to invalidate this cache: replacing an image in public/ keeps
    // serving the old one until the TTL expires or its src changes.
    minimumCacheTTL: 2592000,
  },
  async headers() {
    return [
      {
        // Upstream sources for the optimiser, and anything still requested
        // directly. public/ is otherwise served must-revalidate.
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=2592000" },
        ],
      },
    ];
  },
  // Explicitly inject env vars into the client bundle
  env: {
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    NEXT_PUBLIC_GOOGLE_PLACE_ID: process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID || '',
  },
};

export default nextConfig;
