import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/mvp-website",
  assetPrefix: "/mvp-website/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
