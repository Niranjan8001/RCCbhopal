import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  assetPrefix: "./",
  basePath: "",
  trailingSlash: true,
  turbopack: {
    root: __dirname,
  },
  // Explicitly inject env vars into the client bundle
  env: {
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    NEXT_PUBLIC_GOOGLE_PLACE_ID: process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID || '',
  },
};

export default nextConfig;