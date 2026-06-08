import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
import { PageHero } from "@/components/ui/page-hero";
import { LabeledCards } from "@/components/sections/labeled-cards";
import { Founders } from "@/components/sections/founders";
import { CtaBanner } from "@/components/sections/cta-banner";
import { values } from "@/content/founders";

export const metadata: Metadata = {
  title: "About",
  description:
    "Founder-led applied-AI firm in Austin, Texas. Engineers who build production AI inside real operations — and ship it for yours.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Pennybacker"
        title={
          <>
            Engineers who ship. <span className="text-accent">Operators who get it.</span>
          </>
        }
        lead="Pennybacker AI is a founder-led firm in Austin, Texas. We build production AI systems for operators in energy, industry, and finance — and we run our own firm on the same systems we sell."
        subhead="The firm exists to close a gap we kept seeing: strategy firms that can't build, and builders who've never run an operation. We're named for the Pennybacker Bridge — because the distance between an AI plan and a working system is where most initiatives die, and spanning it is the whole job."
        primary={{ label: "Book an intro call", href: "/contact" }}
      />

      <section className="relative z-10 py-24 md:py-32">
        <Container>
          <Reveal>
            <SectionHeader eyebrow="How we work" heading="Four commitments." />
          </Reveal>
          <div className="mt-12">
            <LabeledCards items={values} numbered columns={2} />
          </div>
        </Container>
      </section>

      <Founders />
      <CtaBanner heading="Let's build something durable." />
    </>
  );
}
