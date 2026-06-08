/** Canonical site origin. Override per-environment with NEXT_PUBLIC_SITE_URL. */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.pennybacker-ai.com";

export const SITE_NAME = "Pennybacker AI";

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
