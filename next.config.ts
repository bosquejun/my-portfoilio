import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  // Compression
  compress: true,
  // Performance optimizations
  poweredByHeader: false,
  // React strict mode for better development experience
  reactStrictMode: true,
  // Experimental features for better performance
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "motion/react",
      "@radix-ui/react-select",
      "@radix-ui/react-dialog",
    ],
  },
};

export default nextConfig;
