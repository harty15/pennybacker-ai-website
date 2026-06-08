"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { PALETTES, type Mode } from "@/lib/theme";
import { cn } from "@/lib/cn";

/**
 * Color Studio — the live palette + light/dark switcher.
 * Palette axis runs through next-themes (data-theme); mode axis writes
 * data-mode directly. Flip either and the whole site re-skins instantly.
 */
export function ThemeStudio() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<Mode>("light");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Client-mount gate: next-themes' `theme` and our data-mode attribute are
    // only known after hydration, so we flip mounted on and read the live mode here.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const m = (document.documentElement.getAttribute("data-mode") as Mode) || "light";
    setMode(m);
  }, []);

  function applyMode(next: Mode) {
    document.documentElement.setAttribute("data-mode", next);
    try {
      localStorage.setItem("pb-mode", next);
    } catch {}
    setMode(next);
  }

  const active = PALETTES.find((p) => p.id === theme) ?? PALETTES[0];

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 print:hidden">
      {open && (
        <div className="w-[19rem] rounded-2xl border border-line bg-surface/95 p-4 shadow-2xl shadow-black/10 backdrop-blur-md">
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="font-display text-small font-semibold text-fg">Color Studio</h2>
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">
              iterate live
            </span>
          </div>

          {/* palette swatches */}
          <div role="radiogroup" aria-label="Color palette" className="flex items-center justify-between gap-1.5">
            {PALETTES.map((p) => {
              const isActive = mounted && theme === p.id;
              return (
                <button
                  key={p.id}
                  role="radio"
                  aria-checked={isActive}
                  aria-label={p.label}
                  title={p.label}
                  onClick={() => setTheme(p.id)}
                  data-theme={p.id}
                  data-mode={mounted ? mode : undefined}
                  className={cn(
                    "size-10 rounded-full border border-line bg-accent transition-transform duration-200 ease-out-quart hover:scale-110",
                    isActive && "ring-2 ring-accent ring-offset-2 ring-offset-surface",
                  )}
                />
              );
            })}
          </div>

          {/* active palette label + note */}
          <div className="mt-3 min-h-[3.25rem]">
            <p className="font-display text-small font-semibold text-fg">{active.label}</p>
            <p className="mt-0.5 text-[0.8rem] leading-snug text-muted">{active.note}</p>
          </div>

          {/* light / dark segmented toggle */}
          <div className="mt-3 grid grid-cols-2 gap-1 rounded-full border border-line p-1">
            {(["light", "dark"] as const).map((m) => (
              <button
                key={m}
                onClick={() => applyMode(m)}
                aria-pressed={mounted && mode === m}
                className={cn(
                  "rounded-full px-3 py-1.5 text-small font-medium capitalize transition-colors duration-200",
                  mounted && mode === m ? "bg-accent text-accent-fg" : "text-muted hover:text-fg",
                )}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label="Open Color Studio"
        className="flex items-center gap-2 rounded-full border border-line bg-surface/95 py-2 pl-2 pr-4 shadow-xl shadow-black/10 backdrop-blur-md transition-transform duration-200 ease-out-quart hover:-translate-y-0.5"
      >
        <span className="size-7 rounded-full bg-accent" aria-hidden />
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-fg">
          {open ? "Close" : "Theme"}
        </span>
      </button>
    </div>
  );
}
