import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
import { PageHero } from "@/components/ui/page-hero";
import { LabeledCards } from "@/components/sections/labeled-cards";
import { TimelineSteps } from "@/components/sections/timeline-steps";
import { CrossSell } from "@/components/sections/cross-sell";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Faq } from "@/components/sections/faq";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { roadmapFaqs } from "@/content/faqs";
import { roadmap } from "@/content/service-pages";

export const metadata: Metadata = pageMetadata({
  title: "AI Readiness Assessment & Roadmap for Operators",
  description:
    "An AI readiness assessment for your operation: workflow mapping, systems and data audit, scored opportunities with ROI math, and a build-ready pilot plan in two to six weeks.",
  path: "/services/roadmap/",
});

export default function RoadmapPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Services", path: "/services/" },
            { name: "Roadmap", path: "/services/roadmap/" },
          ]),
          serviceSchema({ name: "Roadmap — AI readiness assessment and plan", description: roadmap.subhead, path: "/services/roadmap/" }),
        ]}
      />
      <PageHero
        eyebrow={roadmap.eyebrow}
        title={roadmap.title}
        lead={roadmap.lead}
        subhead={roadmap.subhead}
        primary={{ label: "Book an intro call", href: "/contact" }}
      />

      <section className="relative z-10 py-24 md:py-32">
        <Container>
          <Reveal>
            <SectionHeader eyebrow="Why AI plans fail" heading="The usual ways a plan dies." />
          </Reveal>
          <div className="mt-12">
            <LabeledCards items={roadmap.problems} />
          </div>
        </Container>
      </section>

      <section className="relative z-10 bg-surface-2 py-24 md:py-32">
        <Container>
          <Reveal>
            <SectionHeader eyebrow="How we're different" heading="A plan you can actually build." />
          </Reveal>
          <div className="mt-12">
            <LabeledCards items={roadmap.differentiators} numbered />
          </div>
        </Container>
      </section>

      <section className="relative z-10 py-24 md:py-32">
        <Container>
          <Reveal>
            <SectionHeader eyebrow="The engagement" heading="Two to six weeks to a build-ready plan." />
          </Reveal>
          <div className="mt-12">
            <TimelineSteps steps={roadmap.timeline} />
          </div>
        </Container>
      </section>

      <section className="relative z-10 border-t border-line py-20 md:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <div className="rounded-2xl border border-line bg-surface p-8">
                <h3 className="text-h3">{roadmap.pricing.heading}</h3>
                <p className="mt-3 text-muted">{roadmap.pricing.body}</p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="text-h3 font-display leading-snug text-fg">{roadmap.closingStat}</p>
            </Reveal>
          </div>
        </Container>
      </section>

      <Faq items={roadmapFaqs} />
      <CrossSell current="roadmap" />
      <CtaBanner heading={roadmap.cta.heading} />
    </>
  );
}
