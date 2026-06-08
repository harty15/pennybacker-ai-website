import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { work } from "@/content/work";

// Emit a static sitemap.xml at build time (required for output: "export").
export const dynamic = "force-static";

const routes = [
  "",
  "/method",
  "/services",
  "/services/roadmap",
  "/services/build",
  "/services/run",
  "/work",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = routes.map((r) => ({
    url: `${SITE_URL}${r}`,
    changeFrequency: "monthly" as const,
    priority: r === "" ? 1 : 0.7,
  }));
  const workRoutes = work.map((w) => ({
    url: `${SITE_URL}/work/${w.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  return [...staticRoutes, ...workRoutes];
}
