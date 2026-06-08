import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
import { methodSteps } from "@/content/method";

export function MethodSteps() {
  return (
    <section id="method" className="relative z-10 py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionHeader
            eyebrow="How we work"
            heading="Survey. Span. Sustain."
            body="One method carries every engagement — operational understanding first, production always. We named it after how bridges get built."
          />
        </Reveal>

        <div className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-3">
          {methodSteps.map((s, i) => (
            <Reveal key={s.index} delay={i * 0.08}>
              <div className="border-t border-line pt-6">
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-[2.75rem] font-semibold leading-none text-accent/25">
                    {s.index}
                  </span>
                  <div>
                    <p className="font-mono text-eyebrow uppercase tracking-[0.16em] text-muted">
                      {s.kicker}
                    </p>
                    <h3 className="mt-1 text-h3">{s.name}</h3>
                  </div>
                </div>
                <p className="mt-5 text-muted">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-14">
            <Link
              href="/method"
              className="inline-flex items-center gap-1.5 text-small font-medium text-accent transition-all hover:gap-3"
            >
              Explore the full method →
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
