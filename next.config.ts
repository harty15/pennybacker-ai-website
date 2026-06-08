import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site (S3 + CloudFront): emit a self-contained `out/` bundle.
  output: "export",
  // Each route → a folder with index.html (clean S3 keys + CloudFront routing).
  trailingSlash: true,
  // No server, so the default next/image optimizer can't run. We use inline SVG
  // only today, but this keeps export safe if a raster image is added later.
  images: { unoptimized: true },
};

export default nextConfig;
