import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
import { WorkCard } from "./work-card";
import { featuredWork } from "@/content/work";

export function ProofGrid() {
  return (
    <section className="relative z-10 py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionHeader
            eyebrow="What we build"
            heading="Production systems, not demos."
            body="The kinds of agentic systems we design and ship into real operations — anonymized where client confidentiality applies."
          />
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {featuredWork.map((brief, i) => (
            <Reveal key={brief.slug} delay={i * 0.07} className={i === 0 ? "md:col-span-2" : undefined}>
              <WorkCard brief={brief} featured={i === 0} />
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <div className="mt-10">
            <Link href="/work" className="inline-flex items-center gap-1.5 text-small font-medium text-accent transition-all hover:gap-3">
              See all capabilities →
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
