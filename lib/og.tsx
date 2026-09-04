import { readFile } from "node:fs/promises";
import { join } from "node:path";

/** Shared pieces for build-time Open Graph images (next/og → Satori). */

export const OG_SIZE = { width: 1200, height: 630 };

// Sunset Rust palette (light). Satori can't read CSS variables, so the brand
// colors are pinned here; keep in sync with app/globals.css.
const C = { bg: "#fbf8f4", fg: "#1f1a17", muted: "#6b5f57", accent: "#b5482b", line: "#e8e0d6" };

let fonts: Promise<{ display: Buffer; body: Buffer }> | undefined;

/** Vendored static fonts (Satori needs TTF/OTF/WOFF, not the woff2 next/font ships). */
export function loadOgFonts() {
  fonts ??= Promise.all([
    readFile(join(process.cwd(), "assets/fonts/SpaceGrotesk-SemiBold.woff")),
    readFile(join(process.cwd(), "assets/fonts/Inter-Regular.woff")),
  ]).then(([display, body]) => ({ display, body }));
  return fonts;
}

export async function ogFontOptions() {
  const f = await loadOgFonts();
  return [
    { name: "Space Grotesk", data: f.display, weight: 600 as const, style: "normal" as const },
    { name: "Inter", data: f.body, weight: 400 as const, style: "normal" as const },
  ];
}

/** The bridge emblem from components/layout/brandmark.tsx, sized for the card. */
export function Bridge({ width = 96, color = C.accent }: { width?: number; color?: string }) {
  return (
    <svg
      width={width}
      height={Math.round(width * (260 / 600))}
      viewBox="-30 -120 600 260"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M0 120 L120 -40 Q260 -180 400 -40 L520 120" strokeWidth="18" />
      <path d="M40 120 L150 -10 Q260 -120 370 -10 L480 120" strokeWidth="18" />
      <line x1="-20" y1="40" x2="540" y2="40" strokeWidth="16" />
      <line x1="120" y1="-20" x2="120" y2="40" strokeWidth="8" />
      <line x1="190" y1="-60" x2="190" y2="40" strokeWidth="8" />
      <line x1="260" y1="-80" x2="260" y2="40" strokeWidth="8" />
      <line x1="330" y1="-60" x2="330" y2="40" strokeWidth="8" />
      <line x1="400" y1="-20" x2="400" y2="40" strokeWidth="8" />
    </svg>
  );
}

/** A post's hero as a data URI for the share-image composite, or undefined when there is none. */
export async function heroDataUri(slug: string): Promise<string | undefined> {
  try {
    const buf = await readFile(join(process.cwd(), "public/insights", slug, "hero.jpg"));
    return `data:image/jpeg;base64,${buf.toString("base64")}`;
  } catch {
    return undefined;
  }
}

/** 1200×630 brand card: emblem + wordmark, kicker, big title, footer line; optional hero art on the right. */
export function OgFrame({ title, kicker, footer, art }: { title: string; kicker?: string; footer?: string; art?: string }) {
  const long = title.length > 56;
  if (art) {
    return (
      <div style={{ width: "100%", height: "100%", display: "flex", background: C.bg, color: C.fg, fontFamily: "Inter" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 640, padding: "52px 44px 44px 56px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <Bridge width={76} />
            <div style={{ display: "flex", fontFamily: "Space Grotesk", fontSize: 28, letterSpacing: -0.5 }}>
              <span>Pennybacker</span>
              <span style={{ color: C.muted, marginLeft: 8 }}>AI</span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ display: "flex", width: 96, height: 6, background: C.accent }} />
            {kicker ? (
              <div style={{ display: "flex", fontSize: 18, letterSpacing: 3, textTransform: "uppercase", color: C.muted }}>{kicker}</div>
            ) : null}
            <div style={{ display: "flex", fontFamily: "Space Grotesk", fontSize: title.length > 70 ? 38 : 46, lineHeight: 1.08, letterSpacing: -1 }}>
              {title}
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 18, color: C.muted }}>{footer ?? "pennybacker-ai.com"}</div>
        </div>
        <div style={{ display: "flex", width: 560, height: 630, overflow: "hidden" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={art} width={560} height={630} style={{ objectFit: "cover", width: 560, height: 630 }} alt="" />
        </div>
      </div>
    );
  }
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "56px 64px",
        background: C.bg,
        color: C.fg,
        fontFamily: "Inter",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <Bridge width={92} />
        <div style={{ display: "flex", fontFamily: "Space Grotesk", fontSize: 34, letterSpacing: -0.5 }}>
          <span>Pennybacker</span>
          <span style={{ color: C.muted, marginLeft: 10 }}>AI</span>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 1040 }}>
        <div style={{ display: "flex", width: 112, height: 6, background: C.accent }} />
        {kicker ? (
          <div style={{ display: "flex", fontSize: 22, letterSpacing: 4, textTransform: "uppercase", color: C.muted }}>
            {kicker}
          </div>
        ) : null}
        <div
          style={{
            display: "flex",
            fontFamily: "Space Grotesk",
            fontSize: long ? 54 : 68,
            lineHeight: 1.06,
            letterSpacing: -1.5,
          }}
        >
          {title}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: `2px solid ${C.line}`,
          paddingTop: 22,
          fontSize: 22,
          color: C.muted,
        }}
      >
        <span>{footer ?? "Applied AI · Austin, Texas"}</span>
        <span>pennybacker-ai.com</span>
      </div>
    </div>
  );
}
