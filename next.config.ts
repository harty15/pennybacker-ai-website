import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Fully static site (S3 + CloudFront): emit a self-contained `out/` bundle.
  output: "export",
  // Each route → a folder with index.html (clean S3 keys + CloudFront routing).
  trailingSlash: true,
  // No server, so the default next/image optimizer can't run. We use inline SVG
  // only today, but this keeps export safe if a raster image is added later.
  images: { unoptimized: true },
};

// Insights posts are MDX files in content/posts/, imported by app/(marketing)/insights.
// Plugins are named as strings so they work under Turbopack (see the Next MDX guide).
const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-frontmatter", "remark-mdx-frontmatter", "remark-gfm"],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
