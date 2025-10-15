import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com", // occasionally used in examples
      },
    ],
    unoptimized: true,
  },
  output: "export",
  basePath: process.env.NODE_ENV === "production" ? "/IA02" : undefined,
  trailingSlash: true,
};

export default nextConfig;
