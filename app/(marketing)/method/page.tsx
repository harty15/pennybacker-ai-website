import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { PageHero } from "@/components/ui/page-hero";
import { FailCards } from "@/components/sections/fail-cards";
import { MethodPhases } from "@/components/sections/method-phases";
import { TechStack } from "@/components/sections/tech-stack";
import { CtaBanner } from "@/components/sections/cta-banner";

export const metadata: Metadata = {
  title: "Method",
  description:
    "Survey, Span, Sustain — our method takes AI from operational understanding to production systems to continuous improvement. One firm, the full lifecycle.",
};

const outcomes = [
  { value: "2–6 Weeks", label: "Survey to roadmap." },
  { value: "Zero Handoffs", label: "Strategy is the build spec." },
  { value: "100% Production", label: "No shelfware." },
];

export default function MethodPage() {
  return (
    <>
      <PageHero
        eyebrow="Our method"
        title={
          <>
            From roadmap to running system — <span className="text-accent">without the handoff.</span>
          </>
        }
        subhead="One firm from first interview to production deployment to continuous improvement. Built for operators who want AI shipping, not stalled in a slide deck."
        primary={{ label: "Book an intro call", href: "/contact" }}
        secondary={{ label: "See our services", href: "/services" }}
      />

      <FailCards eyebrow="The challenge" heading="Why AI initiatives stall." showBridge={false} />

      {/* Answer band — inverted statement */}
      <section className="relative z-10 py-12 md:py-16">
        <Container>
          <div className="rounded-3xl bg-fg px-8 py-16 md:px-16 md:py-20">
            <Reveal>
              <Eyebrow>Our answer</Eyebrow>
              <h2 className="mt-3 max-w-3xl text-h2 text-bg">The people who map the work write the code.</h2>
              <p className="mt-5 max-w-2xl text-lead text-bg/70">
                No handoff between a strategy team and a delivery team. The engineer who sits with your
                operators in week one is the engineer who ships the system — context flows straight into
                production.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <MethodPhases />
      <TechStack />

      {/* Outcomes */}
      <section className="relative z-10 py-24 md:py-32">
        <Container>
          <Reveal>
            <SectionHeader eyebrow="What you walk away with" heading="Outcomes, not artifacts." />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {outcomes.map((o, i) => (
              <Reveal key={o.value} delay={i * 0.07}>
                <div className="rounded-2xl border border-line bg-surface p-8">
                  <p className="font-display text-[clamp(1.75rem,3vw,2.25rem)] font-semibold leading-tight text-accent">
                    {o.value}
                  </p>
                  <p className="mt-3 text-muted">{o.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaBanner heading="Ready to get something into production?" />
    </>
  );
}
