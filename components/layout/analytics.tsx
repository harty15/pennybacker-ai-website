import { PLAUSIBLE_DOMAIN } from "@/lib/site";

/**
 * Plausible Analytics — cookieless, no personal data, no consent banner needed
 * (this is the "privacy-respecting analytics tool" the privacy policy describes).
 * The tagged-events extension turns any element with a
 * `plausible-event-name=…` class into a goal; outbound-links tracks external
 * clicks. Loads only in production builds so dev traffic never counts.
 * If the Plausible dashboard hands you a different snippet, swap it here.
 */
export function Analytics() {
  if (!PLAUSIBLE_DOMAIN || process.env.NODE_ENV !== "production") return null;
  return (
    <>
      <script
        defer
        data-domain={PLAUSIBLE_DOMAIN}
        src="https://plausible.io/js/script.tagged-events.outbound-links.js"
      />
      <script
        dangerouslySetInnerHTML={{
          __html:
            "window.plausible=window.plausible||function(){(window.plausible.q=window.plausible.q||[]).push(arguments)}",
        }}
      />
    </>
  );
}
