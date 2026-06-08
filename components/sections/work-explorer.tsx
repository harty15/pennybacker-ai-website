"use client";

import { useState } from "react";
import { WorkCard } from "./work-card";
import { cn } from "@/lib/cn";
import { work, type WorkTag } from "@/content/work";

const TABS: { id: "all" | WorkTag; label: string }[] = [
  { id: "all", label: "All" },
  { id: "energy", label: "Energy & Industrial" },
  { id: "capital", label: "Capital" },
  { id: "technology", label: "Technology" },
  { id: "internal", label: "Internal systems" },
];

export function WorkExplorer() {
  const [tag, setTag] = useState<"all" | WorkTag>("all");
  const items = tag === "all" ? work : work.filter((w) => w.tags.includes(tag));

  return (
    <>
      <div role="tablist" aria-label="Filter work" className="flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tag === t.id}
            onClick={() => setTag(t.id)}
            className={cn(
              "rounded-full border px-4 py-2 text-small transition-colors duration-200",
              tag === t.id ? "border-accent bg-accent/[0.06] text-accent" : "border-line text-muted hover:text-fg",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      {items.length === 0 ? (
        <p className="mt-12 text-muted">No briefs in this category yet — but plenty running. Ask us on a call.</p>
      ) : (
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {items.map((b, i) => (
            <WorkCard key={b.slug} brief={b} featured={tag === "all" && i === 0} />
          ))}
        </div>
      )}
    </>
  );
}
