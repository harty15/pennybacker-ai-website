import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * Brandmark — the Pennybacker bridge emblem + wordmark.
 * The emblem is inline SVG drawn with `currentColor`, so it recolors with the
 * active palette (the parent sets `text-accent`). Geometry from the brand mark.
 */
export function Brandmark({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="Pennybacker AI — home"
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      <svg
        viewBox="-30 -120 600 260"
        className="h-7 w-auto shrink-0 text-accent transition-colors"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        {/* twin arch + splayed approach legs */}
        <path d="M0 120 L120 -40 Q260 -180 400 -40 L520 120" strokeWidth="18" />
        <path d="M40 120 L150 -10 Q260 -120 370 -10 L480 120" strokeWidth="18" />
        {/* deck */}
        <line x1="-20" y1="40" x2="540" y2="40" strokeWidth="16" />
        {/* hangers */}
        <line x1="120" y1="-20" x2="120" y2="40" strokeWidth="8" />
        <line x1="190" y1="-60" x2="190" y2="40" strokeWidth="8" />
        <line x1="260" y1="-80" x2="260" y2="40" strokeWidth="8" />
        <line x1="330" y1="-60" x2="330" y2="40" strokeWidth="8" />
        <line x1="400" y1="-20" x2="400" y2="40" strokeWidth="8" />
      </svg>
      <span className="font-display text-[1.05rem] font-semibold leading-none tracking-tight text-fg">
        Pennybacker{!compact && <span className="font-normal text-muted">&nbsp;AI</span>}
      </span>
    </Link>
  );
}
