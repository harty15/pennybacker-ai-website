import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Figure — one drawing, one claim. The caption states what the picture shows;
 * the number is real (figures are referenced in order in the prose).
 * Wide drawings keep a minimum width and scroll inside the figure on phones
 * instead of shrinking their labels below legibility.
 */
export function Figure({ n, caption, children, className }: { n: number; caption: string; children: ReactNode; className?: string }) {
  return (
    <figure className={cn("my-10", className)}>
      <div className="overflow-x-auto rounded-2xl border border-line bg-surface p-4 md:p-6">{children}</div>
      <figcaption className="mt-3 text-small text-muted">
        <span className="mr-2 font-mono text-eyebrow uppercase tracking-[0.14em] text-accent">Fig. {n}</span>
        {caption}
      </figcaption>
    </figure>
  );
}

/** Scannable summary near the top of a post. */
export function KeyTakeaways({ items, title = "In short" }: { items: string[]; title?: string }) {
  return (
    <aside className="my-8 rounded-2xl border border-line bg-surface-2 p-6">
      <p className="font-mono text-eyebrow uppercase tracking-[0.16em] text-muted">{title}</p>
      <ul className="mt-3 space-y-2 text-fg/85">
        {items.map((it) => (
          <li key={it} className="flex gap-3">
            <span aria-hidden className="mt-[0.7em] h-px w-4 shrink-0 bg-accent" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

/** Inline emphasis block for a rule or a warning inside the prose. */
export function Callout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <aside className="my-8 border-l-2 border-accent pl-5">
      <p className="font-display text-lead font-semibold text-fg">{title}</p>
      <div className="mt-1 text-fg/85 [&>p]:mt-2">{children}</div>
    </aside>
  );
}
