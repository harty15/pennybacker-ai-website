"use client";

import { ThemeProvider } from "next-themes";
import { PALETTE_IDS, DEFAULT_PALETTE } from "@/lib/theme";

/**
 * next-themes drives the PALETTE axis on <html data-theme="…">.
 * It injects a blocking inline script to set the attribute before first paint,
 * which is what prevents the flash-of-wrong-theme. The light/dark axis is a
 * separate `data-mode` attribute handled by ModeScript + ModeToggle.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="data-theme"
      themes={PALETTE_IDS}
      defaultTheme={DEFAULT_PALETTE}
      enableSystem={false}
      disableTransitionOnChange
      storageKey="pb-palette"
    >
      {children}
    </ThemeProvider>
  );
}
