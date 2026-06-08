import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { Chip } from "@/components/ui/chip";
import { Reveal } from "@/components/ui/reveal";
import { PageHero } from "@/components/ui/page-hero";
import { OperatingLoop } from "@/components/sections/operating-loop";
import { CrossSell } from "@/components/sections/cross-sell";
import { CtaBanner } from "@/components/sections/cta-banner";
import { run } from "@/content/service-pages";

export const metadata: Metadata = {
  title: "Run",
  description:
    "Managed AI operations: usage and cost telemetry, model upgrades, governance, and a steady stream of new workflows — your AI systems, operated.",
};

export default function RunPage() {
  return (
    <>
      <PageHero
        eyebrow={run.eyebrow}
        title={run.title}
        lead={run.lead}
        subhead={run.subhead}
        primary={{ label: "Book an intro call", href: "/contact" }}
      />

      <section className="relative z-10 py-24 md:py-32">
        <Container>
          <Reveal>
            <h2 className="max-w-2xl text-h2">What owning AI systems actually involves.</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-8 flex flex-wrap gap-2">
              {run.challenges.map((c) => (
                <Chip key={c}>{c}</Chip>
              ))}
            </div>
            <p className="mt-7 max-w-2xl text-lead text-muted">
              Each of these is a job. Together they&apos;re a function most teams don&apos;t have — and standing one
              up is slow, expensive, and a distraction from the work AI was supposed to help with.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="relative z-10 bg-surface-2 py-24 md:py-32">
        <Container>
          <Reveal>
            <SectionHeader eyebrow="With Run" heading="All of it is handled." />
          </Reveal>
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {run.benefits.map((b, i) => (
              <Reveal key={b} delay={i * 0.05}>
                <div className="flex items-start gap-3 rounded-xl border border-line bg-surface px-5 py-4">
                  <svg viewBox="0 0 24 24" className="mt-0.5 size-5 shrink-0 text-accent" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span className="text-fg/85">{b}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <p className="mt-9 font-display text-h3 text-accent">{run.benefitPunchline}</p>
          </Reveal>
        </Container>
      </section>

      <section className="relative z-10 py-24 md:py-32">
        <Container>
          <Reveal>
            <SectionHeader eyebrow="How it works" heading="The operating loop." />
          </Reveal>
          <div className="mt-12">
            <OperatingLoop steps={run.operatingLoop} deliverables={run.deliverables} />
          </div>
        </Container>
      </section>

      <section className="relative z-10 border-t border-line py-20 md:py-24">
        <Container>
          <Reveal>
            <div className="max-w-2xl rounded-2xl border border-line bg-surface p-8">
              <h3 className="text-h3">{run.pricing.heading}</h3>
              <p className="mt-3 text-muted">{run.pricing.body}</p>
            </div>
          </Reveal>
        </Container>
      </section>

      <CrossSell current="run" />
      <CtaBanner heading={run.cta.heading} body={run.cta.body} />
    </>
  );
}
