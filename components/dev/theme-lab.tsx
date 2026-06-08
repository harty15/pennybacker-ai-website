"use client";

import { useEffect, useState } from "react";
import { SEMANTIC_TOKENS } from "@/lib/theme";

/**
 * Theme Lab (dev only) — live-tweak any semantic token and copy the resulting
 * CSS block back into globals.css. Inline styles on <html> win over the
 * stylesheet, so edits are instant and per-token. Never ships to production.
 */
export function ThemeLab() {
  if (process.env.NODE_ENV === "production") return null;
  return <ThemeLabInner />;
}

function ThemeLabInner() {
  const [open, setOpen] = useState(false);
  const [vals, setVals] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!open) return;
    const cs = getComputedStyle(document.documentElement);
    const seed: Record<string, string> = {};
    for (const k of SEMANTIC_TOKENS) seed[k] = cs.getPropertyValue(`--${k}`).trim();
    // Seeds editor state from the live computed token values when the lab opens.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVals(seed);
  }, [open]);

  function update(name: string, value: string) {
    document.documentElement.style.setProperty(`--${name}`, value);
    setVals((v) => ({ ...v, [name]: value }));
  }

  function copyCss() {
    const body = SEMANTIC_TOKENS.map((k) => `  --${k}: ${vals[k]};`).join("\n");
    navigator.clipboard?.writeText(`[data-theme="custom"] {\n${body}\n}`);
  }

  function reset() {
    for (const k of SEMANTIC_TOKENS) document.documentElement.style.removeProperty(`--${k}`);
    setOpen(false);
  }

  return (
    <div className="fixed bottom-5 left-5 z-50 print:hidden">
      {open ? (
        <aside className="w-72 rounded-2xl border border-line bg-surface/95 p-4 shadow-2xl shadow-black/10 backdrop-blur-md">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-fg">Theme Lab · dev</h2>
            <button onClick={() => setOpen(false)} className="text-small text-muted hover:text-fg">✕</button>
          </div>
          <div className="max-h-[50vh] space-y-1.5 overflow-y-auto pr-1">
            {SEMANTIC_TOKENS.map((k) => (
              <label key={k} className="flex items-center justify-between gap-2 text-[0.7rem] text-muted">
                <span className="font-mono">--{k}</span>
                <span className="flex items-center gap-1.5">
                  <input
                    type="color"
                    value={/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(vals[k] ?? "") ? vals[k] : "#000000"}
                    onChange={(e) => update(k, e.target.value)}
                    className="size-5 cursor-pointer rounded border border-line bg-transparent"
                  />
                  <input
                    type="text"
                    value={vals[k] ?? ""}
                    onChange={(e) => update(k, e.target.value)}
                    className="w-24 rounded border border-line bg-bg px-1.5 py-0.5 font-mono text-[0.65rem] text-fg"
                  />
                </span>
              </label>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-1.5">
            <button onClick={copyCss} className="rounded-lg bg-accent px-2 py-1.5 text-[0.7rem] font-medium text-accent-fg">
              Copy CSS
            </button>
            <button onClick={reset} className="rounded-lg border border-line px-2 py-1.5 text-[0.7rem] text-muted hover:text-fg">
              Reset
            </button>
          </div>
        </aside>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="rounded-full border border-line bg-surface/95 px-3 py-2 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted shadow-lg backdrop-blur-md hover:text-fg"
        >
          ⚙ Lab
        </button>
      )}
    </div>
  );
}
