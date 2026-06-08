/**
 * Palette registry — the single source of truth for the dynamic color system.
 * Each id maps 1:1 to a `[data-theme="…"]` block in app/globals.css.
 * Add a palette here + a CSS block there and it appears in the switcher automatically.
 */

export type Mode = "light" | "dark";

export type Palette = {
  id: string;
  label: string;
  note: string;
  /** representative accent (light mode) — used for the switcher swatch fallback */
  swatch: string;
};

export const PALETTES = [
  {
    id: "sunset",
    label: "Sunset Rust",
    note: "The cor-ten arch catching the last warm light. Earthy, confident, premium-industrial.",
    swatch: "#b5482b",
  },
  {
    id: "lake",
    label: "Lake Austin",
    note: "Limestone-fed blue-green water against weathering steel. Clean, engineered, trustworthy.",
    swatch: "#1e6e72",
  },
  {
    id: "limestone",
    label: "Limestone",
    note: "The warm Hill Country bluff. Near-neutral, maximum restraint, accent only where earned.",
    swatch: "#a8512f",
  },
  {
    id: "hill",
    label: "Hill Country",
    note: "Sage and olive over warm sand. Organic, calm, distinctly non-tech.",
    swatch: "#5c6b3c",
  },
  {
    id: "twilight",
    label: "Twilight Steel",
    note: "Near-monochrome blue-grey with one cool accent. The most engineered, most enterprise.",
    swatch: "#3d5a73",
  },
] as const satisfies readonly Palette[];

export type PaletteId = (typeof PALETTES)[number]["id"];

export const PALETTE_IDS = PALETTES.map((p) => p.id) as PaletteId[];

export const DEFAULT_PALETTE: PaletteId =
  (process.env.NEXT_PUBLIC_DEFAULT_PALETTE as PaletteId) ?? "sunset";

/** Semantic tokens a designer can live-edit in the Theme Lab. */
export const SEMANTIC_TOKENS = [
  "bg",
  "surface",
  "surface-2",
  "fg",
  "muted",
  "line",
  "accent",
  "accent-hover",
  "accent-fg",
  "secondary",
  "success",
] as const;
