import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"] },
  // Inline the (small) stylesheet into the HTML so it does not block first paint.
  experimental: { inlineCss: true },
};

export default nextConfig;
