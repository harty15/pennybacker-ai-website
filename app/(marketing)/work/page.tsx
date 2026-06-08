import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { PageHero } from "@/components/ui/page-hero";
import { WorkExplorer } from "@/components/sections/work-explorer";
import { CtaBanner } from "@/components/sections/cta-banner";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Production AI systems we've shipped — document intelligence, enterprise MCP integrations, agentic workflow automation, and the systems that run our own firm.",
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Work"
        title={
          <>
            What we build, <span className="text-accent">in production.</span>
          </>
        }
        subhead="A tour of the agentic systems we design, ship, and operate — anonymized where client confidentiality applies."
      />

      <section className="relative z-10 py-20 md:py-28">
        <Container>
          <WorkExplorer />
        </Container>
      </section>

      <section className="relative z-10 border-t border-line py-20 md:py-24">
        <Container className="text-center">
          <Reveal>
            <h2 className="text-h2">More running than listed.</h2>
            <p className="mx-auto mt-4 max-w-xl text-lead text-muted">
              Some of our best work can&apos;t be public. Ask us about it.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Button href="/contact">Book an intro call</Button>
              <Button href="/services" variant="secondary">
                Explore services
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <CtaBanner heading="Want results like these?" />
    </>
  );
}
