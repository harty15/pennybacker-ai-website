import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { failModes } from "@/content/fail-modes";

export function FailCards({
  eyebrow = "The problem",
  heading = "Most AI initiatives die in the gap.",
  showBridge = true,
}: {
  eyebrow?: string;
  heading?: string;
  showBridge?: boolean;
}) {
  return (
    <section className="relative z-10 bg-surface-2 py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionHeader eyebrow={eyebrow} heading={heading} />
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {failModes.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.07}>
              <Card className="h-full bg-surface">
                <span className="font-mono text-small text-accent">
                  0{i + 1}
                  <span className="ml-2 inline-block h-px w-8 translate-y-[-3px] bg-accent align-middle" />
                </span>
                <h3 className="mt-4 text-h3 leading-tight">{f.title}</h3>
                <p className="mt-3 text-muted">{f.body}</p>
              </Card>
            </Reveal>
          ))}
        </div>

        {showBridge && (
          <Reveal delay={0.1}>
            <div className="mx-auto mt-14 max-w-3xl border-l-2 border-accent pl-6">
              <p className="text-lead text-fg">
                We named the firm after a bridge for a reason. The gap between AI strategy and working
                software is where initiatives die — <span className="text-accent">we exist to span it.</span>
              </p>
            </div>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
