/** Canonical site origin (no trailing slash). Override per-environment with NEXT_PUBLIC_SITE_URL. */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.pennybacker-ai.com";

export const SITE_NAME = "Pennybacker AI";
export const LEGAL_NAME = "Harty Consulting LLC";
export const SITE_TAGLINE = "Applied AI consulting for operators";

/** Site-wide description (root metadata, Organization schema, llms.txt). */
export const SITE_DESCRIPTION =
  "Pennybacker AI is a founder-led applied-AI firm in Austin, Texas. We build production AI systems for operators in energy, industry, and finance — AI roadmaps, custom agents, MCP integrations, and document intelligence, shipped and operated.";

/**
 * Date the site-wide copy last changed (ISO). Used as <lastmod> for static
 * routes in the sitemap — bump it when page copy changes, not on every deploy.
 */
export const CONTENT_UPDATED = "2026-09-02";

/**
 * Public inbound address shown across the site (mailto links, footer, JSON-LD).
 * Single source of truth — set it here only. Recommended: a role alias
 * (hello@) that forwards to a real mailbox, so the personal address stays
 * off scrapers and the inbox can be shared/rotated without code changes.
 */
export const CONTACT_EMAIL = "hello@pennybacker-ai.com";

/**
 * Web3Forms access key for the contact form (https://web3forms.com).
 * The key is public by design: it only permits delivery to the address it's
 * registered to, so it's safe to ship in client code — no CI secret or
 * workflow change needed (unlike a build-time NEXT_PUBLIC_* var, which static
 * export freezes at build time). Get one in ~1 min at https://web3forms.com:
 * enter the destination email (e.g. hello@pennybacker-ai.com), no signup.
 * While this is empty, the form gracefully falls back to a mailto: link.
 */
export const WEB3FORMS_ACCESS_KEY = "fe2c0118-fcb8-4e9d-8edb-bc78cff4610c";

/**
 * Plausible Analytics site domain (https://plausible.io). Cookieless and
 * PII-free, which is what the privacy policy promises. The script only loads
 * in production builds; set to "" to disable. Goals to create in the
 * Plausible dashboard: "Book intro call" (tagged CTA clicks) and
 * "Contact form submitted" (custom event fired on successful send).
 */
// Must match the site name exactly as entered in the Plausible dashboard
// (Ryan registered the apex, not www; Plausible attributes by this string).
export const PLAUSIBLE_DOMAIN = "pennybacker-ai.com";

/**
 * IndexNow key (https://www.indexnow.org). The deploy workflow submits every
 * sitemap URL to api.indexnow.org after each deploy so Bing, Yandex, Naver and
 * Seznam re-crawl changed pages within minutes. The matching key file lives at
 * public/8c19963b2e498f7fb325e56f477f4333.txt — keep the two in sync.
 */
export const INDEXNOW_KEY = "8c19963b2e498f7fb325e56f477f4333";

/** Absolute URL for a site path (path should start with "/"). */
export function absoluteUrl(path = "/"): string {
  return new URL(path, `${SITE_URL}/`).toString();
}
