import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { services } from "@/content/services";

export function ServicesGrid() {
  return (
    <section id="services" className="relative z-10 py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionHeader
            eyebrow="Three ways to engage"
            heading="Roadmap. Build. Run."
            body="Each service covers one stage of the AI lifecycle. Start anywhere; combine all three — the same senior engineers carry it end to end."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.07}>
              <Link href={s.href} className="block h-full">
                <Card className="group h-full hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-xl hover:shadow-black/5">
                  <Badge>{s.tagline}</Badge>
                  <h3 className="mt-5 text-h3">{s.title}</h3>
                  <p className="mt-3 text-muted">{s.body}</p>
                  <ul className="mt-5 space-y-2">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-small text-fg/80">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-small font-medium text-accent transition-all group-hover:gap-3">
                    Learn more →
                  </span>
                </Card>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
