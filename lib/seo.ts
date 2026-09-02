import type { Metadata } from "next";

type PageMeta = {
  /** Page title; the root layout appends " — Pennybacker AI". */
  title?: string;
  /** Use instead of `title` to opt out of the template (home page). */
  absoluteTitle?: string;
  description: string;
  /** Route path, e.g. "/services/build/". Becomes the canonical + og:url. */
  path: string;
};

/**
 * Per-page metadata with an explicit canonical URL. The site is served at
 * both the apex and www and with/without trailing slash (CloudFront redirects
 * the variants), so every page declares the one canonical form: www +
 * trailing slash, resolved against metadataBase in the root layout.
 * Open Graph is deliberately NOT set here: a page-level `openGraph` object
 * replaces the root layout's wholesale (no deep merge), which would drop the
 * site-wide `app/opengraph-image.tsx`. Leaving it out inherits type/siteName/
 * locale and the image from the layout, while og:title / og:description fall
 * back to the page's title and description. Segments with their own
 * opengraph-image file (work briefs) override the image automatically.
 */
export function pageMetadata({ title, absoluteTitle, description, path }: PageMeta): Metadata {
  const canonical = path.endsWith("/") ? path : `${path}/`;
  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    alternates: { canonical },
  };
}

/** Trim prose to a meta-description length on a word boundary. */
export function excerpt(text: string, max = 155): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[\s,;:—–-]+$/, "")}…`;
}
