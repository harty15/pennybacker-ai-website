import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { FeatureCard } from "@/components/ui/feature-card";
import { Reveal } from "@/components/ui/reveal";
import { PageHero } from "@/components/ui/page-hero";
import { EngagementModels } from "@/components/sections/engagement-models";
import { LabeledCards } from "@/components/sections/labeled-cards";
import { WorkCard } from "@/components/sections/work-card";
import { CrossSell } from "@/components/sections/cross-sell";
import { CtaBanner } from "@/components/sections/cta-banner";
import { build } from "@/content/service-pages";
import { work } from "@/content/work";

export const metadata: Metadata = {
  title: "Build",
  description:
    "Production agentic systems: custom agents, MCP integrations, document intelligence, and data pipelines — designed and hardened inside the systems you already run.",
};

const buildWork = work.filter((w) => w.services.includes("build")).slice(0, 3);

export default function BuildPage() {
  return (
    <>
      <PageHero
        eyebrow={build.eyebrow}
        title={build.title}
        lead={build.lead}
        subhead={build.subhead}
        primary={{ label: "Book an intro call", href: "/contact" }}
      />

      <section className="relative z-10 py-24 md:py-32">
        <Container>
          <Reveal>
            <SectionHeader eyebrow="What we build" heading="From document piles to working agents." />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {build.features.map((f, i) => (
              <Reveal key={f.heading} delay={i * 0.07}>
                <FeatureCard heading={f.heading} body={f.body} bullets={f.bullets} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative z-10 bg-surface-2 py-24 md:py-32">
        <Container>
          <Reveal>
            <SectionHeader eyebrow="Engagement models" heading="Two ways to work with us." />
          </Reveal>
          <div className="mt-12">
            <EngagementModels models={build.engagementModels} note={build.engagementNote} />
          </div>
        </Container>
      </section>

      <section className="relative z-10 py-24 md:py-32">
        <Container>
          <Reveal>
            <SectionHeader eyebrow="How we're different" heading="Why our builds make it to production." />
          </Reveal>
          <div className="mt-12">
            <LabeledCards items={build.differentiators} numbered />
          </div>
        </Container>
      </section>

      <section className="relative z-10 bg-surface-2 py-24 md:py-32">
        <Container>
          <Reveal>
            <SectionHeader eyebrow="Proof" heading="Shipped and running." />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {buildWork.map((b, i) => (
              <Reveal key={b.slug} delay={i * 0.07}>
                <WorkCard brief={b} />
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-2xl text-small text-muted">{build.statLeadIn}</p>
            <Link href="/work" className="mt-3 inline-flex items-center gap-1.5 text-small font-medium text-accent transition-all hover:gap-3">
              See all work →
            </Link>
          </Reveal>
        </Container>
      </section>

      <CrossSell current="build" />
      <CtaBanner heading={build.cta.heading} body={build.cta.body} />
    </>
  );
}
