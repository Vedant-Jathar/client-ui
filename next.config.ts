import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  },
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pizza-delivery-app-mern.s3.eu-north-1.amazonaws.com",
      }
    ]
  }
};

export default nextConfig;
