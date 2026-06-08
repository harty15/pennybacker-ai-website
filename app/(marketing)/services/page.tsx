import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FeatureCard } from "@/components/ui/feature-card";
import { Reveal } from "@/components/ui/reveal";
import { PageHero } from "@/components/ui/page-hero";
import { CtaBanner } from "@/components/sections/cta-banner";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Three services, one firm: Roadmap (AI assessment & planning), Build (production agentic systems), Run (managed AI operations).",
};

const buildMini = [
  { heading: "Custom agents & orchestration", body: "Single-task automations to multi-agent systems with guardrails and human checkpoints." },
  { heading: "MCP & systems integration", body: "Your ERP, scheduling, document, and finance platforms made conversational — governed and auditable." },
  { heading: "Document intelligence", body: "Classification, extraction, and Q&A over the document sets your operation actually runs on." },
  { heading: "Evaluation & reliability", body: "Eval harnesses, telemetry, and regression tests so the system stays trustworthy after launch." },
];

const roadmapCards = [
  { title: "Workflow survey", body: "Map how work flows through your people and systems.", anchor: "survey" },
  { title: "Systems & data audit", body: "What's connectable, what's clean, what's blocking.", anchor: "audit" },
  { title: "Opportunity scoring & ROI", body: "Ranked initiatives with honest value math.", anchor: "roi" },
  { title: "Pilot plan", body: "First build scoped, costed, and ready to start.", anchor: "pilot" },
];

const runCards = [
  { title: "Usage & cost telemetry", body: "Know what it costs and saves.", anchor: "telemetry" },
  { title: "Model & capability upgrades", body: "Never fall a model generation behind.", anchor: "upgrades" },
  { title: "Governance & access", body: "Control who can do what.", anchor: "governance" },
  { title: "New workflow development", body: "Compound the advantage.", anchor: "workflows" },
];

function AnchorCard({ href, title, body }: { href: string; title: string; body: string }) {
  return (
    <Link href={href} className="block h-full">
      <Card className="group h-full hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg">
        <h3 className="text-h3 leading-tight">{title}</h3>
        <p className="mt-2 text-small text-muted">{body}</p>
        <span className="mt-4 inline-block text-small text-accent transition-all group-hover:translate-x-1">→</span>
      </Card>
    </Link>
  );
}

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={
          <>
            Three services. One firm. <span className="text-accent">The full lifecycle.</span>
          </>
        }
        subhead="Start with a roadmap, a build, or ongoing operations — or run the full arc. The same senior engineers carry it end to end."
        primary={{ label: "Book an intro call", href: "/contact" }}
      />

      {/* Build flagship */}
      <section className="relative z-10 py-24 md:py-32">
        <Container>
          <Reveal>
            <Eyebrow>Build</Eyebrow>
            <h2 className="mt-3 max-w-2xl text-h2">Production agentic systems, shipped.</h2>
            <p className="mt-4 max-w-2xl text-lead text-muted">
              Our flagship. We design, build, and harden AI systems inside your real environment — then
              hand you working software, not a prototype.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {buildMini.map((c, i) => (
              <Reveal key={c.heading} delay={i * 0.06}>
                <FeatureCard heading={c.heading} body={c.body} />
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <div className="mt-8">
              <Button href="/services/build">Explore Build</Button>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Roadmap */}
      <section className="relative z-10 bg-surface-2 py-24 md:py-32">
        <Container>
          <Reveal>
            <Eyebrow>Roadmap</Eyebrow>
            <h2 className="mt-3 text-h2">Know what to build first.</h2>
            <p className="mt-4 max-w-2xl text-lead text-muted">
              An AI readiness survey for your operation — workflow mapping, a systems audit, scored
              opportunities, and a build-ready plan in two to six weeks.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {roadmapCards.map((c, i) => (
              <Reveal key={c.anchor} delay={i * 0.06}>
                <AnchorCard href={`/services/roadmap#${c.anchor}`} title={c.title} body={c.body} />
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <Link href="/services/roadmap" className="mt-8 inline-flex items-center gap-1.5 text-small font-medium text-accent transition-all hover:gap-3">
              Learn more →
            </Link>
          </Reveal>
        </Container>
      </section>

      {/* Run */}
      <section className="relative z-10 py-24 md:py-32">
        <Container>
          <Reveal>
            <Eyebrow>Run</Eyebrow>
            <h2 className="mt-3 text-h2">Keep it shipping.</h2>
            <p className="mt-4 max-w-2xl text-lead text-muted">
              Managed AI operations — telemetry, model upgrades, governance, and a steady stream of new
              workflows, so your systems get better instead of stale.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {runCards.map((c, i) => (
              <Reveal key={c.anchor} delay={i * 0.06}>
                <AnchorCard href={`/services/run#${c.anchor}`} title={c.title} body={c.body} />
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <Link href="/services/run" className="mt-8 inline-flex items-center gap-1.5 text-small font-medium text-accent transition-all hover:gap-3">
              Learn more →
            </Link>
          </Reveal>
        </Container>
      </section>

      {/* Method teaser */}
      <section className="relative z-10 border-t border-line py-20 md:py-24">
        <Container className="text-center">
          <Reveal>
            <Eyebrow className="justify-center">Method</Eyebrow>
            <h2 className="mt-3 text-h2">Survey. Span. Sustain.</h2>
            <p className="mx-auto mt-4 max-w-xl text-lead text-muted">
              One method carries all three services — operational understanding first, production always.
            </p>
            <Link href="/method" className="mt-6 inline-flex items-center gap-1.5 text-small font-medium text-accent transition-all hover:gap-3">
              Read the method →
            </Link>
          </Reveal>
        </Container>
      </section>

      <CtaBanner
        heading="Not sure which service fits?"
        body="That's what the intro call is for. Thirty minutes, no deck, straight answers."
      />
    </>
  );
}
