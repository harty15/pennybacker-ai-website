import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { MDXContent } from "mdx/types";
import { founders } from "@/content/founders";

/**
 * Insights posts live in content/posts/<slug>.mdx with YAML frontmatter
 * (compiled to `frontmatter` by remark-mdx-frontmatter). Everything here runs
 * at build time inside Server Components — never import from client code.
 */

export type AuthorKey = "ryan" | "max";

export type PostMeta = {
  title: string;
  description: string;
  /** ISO date (YYYY-MM-DD). Posts are sorted newest first. */
  date: string;
  /** ISO date; set when the post is materially revised. */
  updated?: string;
  author: AuthorKey;
  tags: string[];
  /** Editorial pillar from content/editorial/queue.yaml. */
  pillar?: string;
  /** Drafts render in `next dev` only; production builds skip them. */
  draft?: boolean;
};

export type Post = PostMeta & {
  slug: string;
  readingMinutes: number;
  Content: MDXContent;
};

const POSTS_DIR = join(process.cwd(), "content/posts");

/**
 * A static export cannot emit a dynamic route with zero params. Until the
 * first post is published, /insights/coming-soon/ stands in (noindex, not in
 * the sitemap or feed) and disappears on its own once a post goes live.
 */
export const PLACEHOLDER_SLUG = "coming-soon";

export async function postParams(): Promise<{ slug: string }[]> {
  const posts = await getAllPosts();
  return posts.length ? posts.map((p) => ({ slug: p.slug })) : [{ slug: PLACEHOLDER_SLUG }];
}

export const authors = {
  ryan: founders.find((f) => f.name.startsWith("Ryan"))!,
  max: founders.find((f) => f.name.startsWith("Max"))!,
} as const;

export const TAG_LABELS: Record<string, string> = {
  "ai-roadmap": "AI roadmaps",
  operators: "Operators",
  mcp: "MCP",
  agents: "Agents",
  governance: "Governance",
  "document-intelligence": "Document intelligence",
  "energy-industrial": "Energy & industrial",
  "project-controls": "Project controls",
  capital: "Capital",
  rag: "Retrieval",
  "firm-os": "Firm OS",
};

export function tagLabel(tag: string) {
  return TAG_LABELS[tag] ?? tag.replace(/-/g, " ");
}

function slugsOnDisk(): string[] {
  try {
    return readdirSync(POSTS_DIR)
      .filter((f) => f.endsWith(".mdx"))
      .map((f) => f.replace(/\.mdx$/, ""))
      .sort();
  } catch {
    return [];
  }
}

function readingMinutes(slug: string): number {
  const raw = readFileSync(join(POSTS_DIR, `${slug}.mdx`), "utf8")
    .replace(/^---[\s\S]*?---/, "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ");
  const words = raw.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export async function getPost(slug: string): Promise<Post | null> {
  if (!slugsOnDisk().includes(slug)) return null;
  const mod = await import(`@/content/posts/${slug}.mdx`);
  const meta = mod.frontmatter as PostMeta;
  return { ...meta, slug, readingMinutes: readingMinutes(slug), Content: mod.default };
}

// Drafts render in dev, and in any build run with INSIGHTS_INCLUDE_DRAFTS=1
// (the drafting routine uses that to prove a draft builds without publishing it).
const includeDrafts = process.env.NODE_ENV !== "production" || process.env.INSIGHTS_INCLUDE_DRAFTS === "1";

/** All publishable posts, newest first (drafts included outside production). */
export async function getAllPosts(): Promise<Post[]> {
  const posts = await Promise.all(slugsOnDisk().map(getPost));
  return posts
    .filter((p): p is Post => !!p && (includeDrafts || !p.draft))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
