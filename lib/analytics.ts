type EventProps = Record<string, string | number | boolean>;

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: EventProps; callback?: () => void }) => void;
  }
}

/**
 * Fire a Plausible custom event (no-op when analytics is off or not loaded).
 * Create a matching goal in the Plausible dashboard for it to show up.
 */
export function track(event: string, props?: EventProps) {
  if (typeof window === "undefined" || typeof window.plausible !== "function") return;
  window.plausible(event, props ? { props } : undefined);
}
