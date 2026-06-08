import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { Chip } from "@/components/ui/chip";
import { Reveal } from "@/components/ui/reveal";
import { techStack } from "@/content/tech-stack";

export function TechStack() {
  return (
    <section className="relative z-10 bg-surface-2 py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionHeader
            eyebrow="Our stack"
            heading="The right tool, not a pet stack."
            body="Model-agnostic by design — we choose per problem and keep you portable."
          />
        </Reveal>
        <div className="mt-12 space-y-6">
          {techStack.map((g, i) => (
            <Reveal key={g.group} delay={i * 0.05}>
              <div className="grid gap-4 border-t border-line pt-6 md:grid-cols-[200px_1fr]">
                <p className="font-mono text-eyebrow uppercase tracking-[0.16em] text-muted">{g.group}</p>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((item) => (
                    <Chip key={item}>{item}</Chip>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
