import type { MetadataRoute } from "next";
import { SITE_URL, CONTENT_UPDATED } from "@/lib/site";
import { work } from "@/content/work";
import { getAllPosts } from "@/lib/posts";

// Emit a static sitemap.xml at build time (required for output: "export").
export const dynamic = "force-static";

type Freq = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

// Paths use the canonical trailing-slash form (matches internal links and the
// canonical tags; CloudFront 301s the other variants).
const staticRoutes: { path: string; priority: number; changeFrequency: Freq }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/services/", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services/roadmap/", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services/build/", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services/run/", priority: 0.9, changeFrequency: "monthly" },
  { path: "/method/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/work/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/about/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact/", priority: 0.7, changeFrequency: "yearly" },
  { path: "/privacy/", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms/", priority: 0.2, changeFrequency: "yearly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date(CONTENT_UPDATED);
  const posts = await getAllPosts();
  const pages = staticRoutes.map((r) => ({ url: `${SITE_URL}${r.path}`, lastModified, ...r }));
  const briefs = work.map((w) => ({
    url: `${SITE_URL}/work/${w.slug}/`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  const insights = posts.length
    ? [
        {
          url: `${SITE_URL}/insights/`,
          lastModified: new Date(posts[0].updated ?? posts[0].date),
          changeFrequency: "weekly" as const,
          priority: 0.8,
        },
        ...posts.map((p) => ({
          url: `${SITE_URL}/insights/${p.slug}/`,
          lastModified: new Date(p.updated ?? p.date),
          changeFrequency: "monthly" as const,
          priority: 0.7,
        })),
      ]
    : [];
  return [...pages, ...insights, ...briefs].map(({ url, lastModified, changeFrequency, priority }) => ({
    url,
    lastModified,
    changeFrequency,
    priority,
  }));
}
