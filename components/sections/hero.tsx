import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { TrussField } from "@/components/ui/truss-field";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <TrussField className="absolute inset-x-0 bottom-0 h-[58%] w-full opacity-70 [mask-image:linear-gradient(to_top,black_30%,transparent)]" />

      <Container className="relative z-10 flex min-h-[88vh] flex-col justify-center py-28">
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow>Applied AI · Austin, Texas</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-5 text-display font-semibold leading-[0.98] tracking-[-0.03em]">
              AI that makes it to <span className="text-accent">production</span>.
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-xl text-lead text-muted">
              Pennybacker AI builds agentic systems for operators in energy, industry, and
              finance — from first roadmap to deployed, working software your team actually uses.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button href="/contact">Book an intro call</Button>
              <Button href="/method" variant="ghost">
                See the method →
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.24}>
            <p className="mt-12 font-mono text-eyebrow uppercase tracking-[0.18em] text-muted">
              Founder-led · Senior engineers only · Model-agnostic
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
