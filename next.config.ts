import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: {
    // Hydration must not wait for React debug data over the development socket.
    reactDebugChannel: false,
  },
  images: {
    // Serve source files without recompressing, resizing, or changing formats.
    unoptimized: true,
  },
};

export default nextConfig;
