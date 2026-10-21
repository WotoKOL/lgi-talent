import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    // Serve source files without recompressing, resizing, or changing formats.
    unoptimized: true,
  },
};

export default nextConfig;
