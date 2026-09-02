import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Hand-drawn inline SVG figures for Insights posts. Everything is a native
 * shape; colors come from the palette tokens (stroke-line, fill-surface,
 * fill-fg, accent) so each figure re-skins with the theme and reads in dark
 * mode. Accent is reserved for the one element a figure is about.
 */

export function Diagram({
  id,
  viewBox,
  label,
  minWidth = 560,
  children,
}: {
  id: string;
  viewBox: string;
  label: string;
  minWidth?: number;
  children: ReactNode;
}) {
  return (
    <svg viewBox={viewBox} role="img" aria-label={label} className="h-auto w-full text-fg" style={{ minWidth }} fill="none">
      <defs>
        <marker id={`${id}-arrow`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill="currentColor" />
        </marker>
        <marker id={`${id}-arrow-accent`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" className="fill-accent" />
        </marker>
        <marker id={`${id}-arrow-muted`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" className="fill-muted" />
        </marker>
      </defs>
      {children}
    </svg>
  );
}

export function Node({
  x,
  y,
  w,
  h,
  title,
  sub,
  accent = false,
  dashed = false,
  muted = false,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  sub?: string;
  accent?: boolean;
  dashed?: boolean;
  muted?: boolean;
}) {
  const cx = x + w / 2;
  const cy = y + h / 2;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={9}
        className={cn(accent ? "fill-accent/[0.07] stroke-accent" : "fill-surface stroke-line", muted && "fill-surface-2")}
        strokeWidth={accent ? 1.6 : 1.2}
        strokeDasharray={dashed ? "5 4" : undefined}
      />
      <text
        x={cx}
        y={sub ? cy - 3 : cy + 5}
        textAnchor="middle"
        className={cn("font-display text-[14px] font-semibold", muted ? "fill-muted" : "fill-fg")}
      >
        {title}
      </text>
      {sub ? (
        <text x={cx} y={cy + 15} textAnchor="middle" className="fill-muted text-[11.5px]">
          {sub}
        </text>
      ) : null}
    </g>
  );
}

/** Straight or polyline edge with an arrowhead and an optional label with a halo. */
export function Edge({
  id,
  points,
  label,
  labelAt,
  dashed = false,
  accent = false,
  muted = false,
  start = false,
}: {
  id: string;
  points: [number, number][];
  label?: string;
  labelAt?: [number, number];
  dashed?: boolean;
  accent?: boolean;
  muted?: boolean;
  /** Arrowhead at the start as well (bidirectional). */
  start?: boolean;
}) {
  const d = points.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]} ${p[1]}`).join(" ");
  const marker = accent ? `url(#${id}-arrow-accent)` : muted ? `url(#${id}-arrow-muted)` : `url(#${id}-arrow)`;
  const [lx, ly] = labelAt ?? mid(points);
  return (
    <g>
      <path
        d={d}
        className={accent ? "stroke-accent" : muted ? "stroke-muted" : "stroke-current"}
        strokeWidth={accent ? 1.6 : 1.2}
        strokeDasharray={dashed ? "5 4" : undefined}
        markerEnd={marker}
        markerStart={start ? marker : undefined}
      />
      {label ? (
        <text
          x={lx}
          y={ly}
          textAnchor="middle"
          className={cn("stroke-surface font-mono text-[10.5px] uppercase tracking-[0.06em] [paint-order:stroke]", accent ? "fill-accent" : "fill-muted")}
          strokeWidth={5}
          strokeLinejoin="round"
        >
          {label}
        </text>
      ) : null}
    </g>
  );
}

function mid(points: [number, number][]): [number, number] {
  const a = points[Math.floor((points.length - 1) / 2)];
  const b = points[Math.ceil((points.length - 1) / 2)];
  return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2 - 6];
}

/** Section label inside a figure (row or column heading). */
export function Heading({ x, y, children, accent = false }: { x: number; y: number; children: string; accent?: boolean }) {
  return (
    <text x={x} y={y} className={cn("font-mono text-[11px] uppercase tracking-[0.14em]", accent ? "fill-accent" : "fill-muted")}>
      {children}
    </text>
  );
}

/** Small explanatory note in the drawing (one short line per element). */
export function Note({ x, y, lines, anchor = "start", accent = false }: { x: number; y: number; lines: string[]; anchor?: "start" | "middle" | "end"; accent?: boolean }) {
  return (
    <text x={x} y={y} textAnchor={anchor} className={cn("text-[11.5px]", accent ? "fill-accent" : "fill-muted")}>
      {lines.map((l, i) => (
        <tspan key={l} x={x} dy={i === 0 ? 0 : 14}>
          {l}
        </tspan>
      ))}
    </text>
  );
}

/** Thin separator rule. */
export function Rule({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} className="stroke-line" strokeWidth={1} strokeDasharray="2 4" />;
}
