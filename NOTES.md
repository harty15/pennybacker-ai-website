# Pennybacker Applied AI — website

Designer-tier marketing site. **Next.js 16 (App Router) · React 19 · Tailwind v4 · TypeScript · Motion.**
Plan of record: `~/Documents/vaults/pennybacker/1-Projects/website-landing-page/nextjs-implementation-plan/`.

## Run

```bash
npm run dev      # http://localhost:3000
npm run build
```

## The thing to try first — Color Studio

Bottom-right of any page: a **Theme** pill. Open it to flip between the 5 palettes
(**Sunset Rust** default · Lake Austin · Limestone · Hill Country · Twilight Steel)
and **light/dark** — the whole site re-skins live. Bottom-left "⚙ Lab" (dev only)
lets you nudge individual color tokens and copy a ready CSS block.

## Where the dynamic color system lives

- `app/globals.css` — the token engine. `@theme inline` semantic tokens + one
  `[data-theme="…"]` light block and `[data-mode="dark"][data-theme="…"]` dark
  block per palette. **Add a palette here + in `lib/theme.ts` and it shows up in the Studio.**
- `lib/theme.ts` — palette registry (ids, labels, notes, swatches).
- `app/providers.tsx` — next-themes (palette axis). `components/layout/mode-script.tsx` — light/dark axis.
- `components/layout/theme-studio.tsx` — the switcher (ships). `components/dev/theme-lab.tsx` — token tuner (dev).

**Rule:** components use semantic utilities only — `bg-bg`, `text-fg`, `text-accent`,
`border-line`, `bg-surface`… never a hex, never a palette name. That's why re-skinning is free.

## Structure

```
app/                root layout + (marketing) route group + home + 404
components/ui/       primitives (Button, Card, Badge, SectionHeader, Reveal, TrussField…)
components/sections/ page bands (Hero, CredibilityStrip, ServicesGrid, FailCards, MethodSteps, CtaBanner)
components/layout/   Brandmark, Nav, Footer, ThemeStudio, ModeScript
content/             typed copy data (services, fail-modes, method)
lib/                 cn, theme
```

## Placeholders (intentional — leave until real assets land)

- **Logo/emblem:** `components/layout/brandmark.tsx` has a stand-in arch glyph — swap for the real Pennybacker mark (SVG in `/public`).
- **Employer logos:** `components/sections/credibility-strip.tsx` uses text wordmarks (`Fermi America`, `Pennybacker Capital`, `[Max's employer]`).
- **`[DOMAIN]`** in the footer; `[VERIFY]` metrics; founder bios — see the plan's open-items list.

## Built so far

Foundation + theming engine + Color Studio + UI primitives + nav/footer + full **home page** + on-brand 404.
Remaining pages (method, services, work, about, contact, legal) are fully specced in the plan — same component system, thin compositions.
