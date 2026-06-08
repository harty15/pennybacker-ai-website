"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { Chip } from "@/components/ui/chip";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { audiences } from "@/content/audiences";

export function WhoWeServe() {
  const [active, setActive] = useState<string>(audiences[0].id);
  const a = audiences.find((x) => x.id === active) ?? audiences[0];

  return (
    <section className="relative z-10 py-24 md:py-32">
      <Container>
        <SectionHeader
          eyebrow="Who we serve"
          heading="Built for operators with real stakes."
          body="Deep familiarity with the worlds where AI pays off fastest — and where demos aren't good enough."
        />

        <div role="tablist" aria-label="Who we serve" className="mt-10 flex flex-wrap gap-2">
          {audiences.map((x) => (
            <button
              key={x.id}
              role="tab"
              aria-selected={active === x.id}
              onClick={() => setActive(x.id)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-small transition-colors duration-200",
                active === x.id
                  ? "border-accent bg-accent/[0.06] text-accent"
                  : "border-line text-muted hover:text-fg",
              )}
            >
              <span className="font-mono text-eyebrow">{x.index}</span>
              {x.tab}
            </button>
          ))}
        </div>

        <div key={a.id} className="mt-8 rounded-2xl border border-line bg-surface p-8 md:p-10">
          <h3 className="text-h2 leading-tight">{a.title}</h3>
          <p className="mt-4 max-w-2xl text-lead text-muted">{a.body}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {a.tags.map((t) => (
              <Chip key={t}>{t}</Chip>
            ))}
          </div>
          <div className="mt-8">
            <Button href="/contact" variant="secondary">
              Talk to us about {a.tab} →
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
