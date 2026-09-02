import type { NextConfig } from "next";

// The site is served from the root of its own domain via Cloudflare Workers.
// basePath/assetPrefix were only needed for the GitHub Pages project-site
// preview, where everything lived under /mvp-website.
const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
