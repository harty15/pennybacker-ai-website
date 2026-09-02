import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { faqSchema } from "@/lib/schema";
import type { FaqItem } from "@/content/faqs";

/**
 * Service-page FAQ. Native <details> so every answer is in the HTML for
 * crawlers and works without JS; FAQPage JSON-LD mirrors the same items.
 */
export function Faq({ items, heading = "Questions operators ask." }: { items: FaqItem[]; heading?: string }) {
  return (
    <section className="relative z-10 border-t border-line py-24 md:py-32">
      <JsonLd data={faqSchema(items)} />
      <Container>
        <Reveal>
          <SectionHeader eyebrow="FAQ" heading={heading} />
        </Reveal>
        <div className="mt-10 max-w-3xl divide-y divide-line border-y border-line">
          {items.map((it) => (
            <details key={it.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-h3 leading-tight text-fg [&::-webkit-details-marker]:hidden">
                <span>{it.q}</span>
                <span
                  aria-hidden
                  className="mt-1 shrink-0 font-mono text-small text-accent transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-2xl text-muted">{it.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
