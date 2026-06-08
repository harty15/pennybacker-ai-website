import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { founders } from "@/content/founders";

export function Founders() {
  return (
    <section className="relative z-10 py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionHeader eyebrow="Founders" heading="The team." />
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {founders.map((f, i) => (
            <Reveal key={f.name} delay={i * 0.08}>
              <Card className="flex h-full gap-5">
                {/* ⚠️ HEADSHOT PLACEHOLDER — swap initials box for a duotone photo */}
                <div className="grid size-20 shrink-0 place-items-center rounded-xl border border-line bg-surface-2 font-display text-h3 font-semibold text-accent">
                  {f.initials}
                </div>
                <div>
                  <h3 className="text-h3">{f.name}</h3>
                  <p className="text-small text-muted">{f.role}</p>
                  <p className="mt-3 text-muted">{f.bio}</p>
                  {f.linkedin.startsWith("[") ? (
                    <span className="mt-4 inline-block text-small text-muted">LinkedIn — link needed</span>
                  ) : (
                    <a href={f.linkedin} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-small text-accent hover:opacity-80">
                      LinkedIn →
                    </a>
                  )}
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <p className="mt-10 max-w-2xl text-muted">
            Plus the agents we&apos;ve built — our delivery pipeline is itself an agentic system. See{" "}
            <Link href="/work/firm-os" className="text-accent hover:opacity-80">
              Firm OS
            </Link>
            .
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
