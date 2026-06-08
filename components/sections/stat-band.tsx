import { Container } from "@/components/ui/container";
import { Stat, StatRow } from "@/components/ui/stat";
import { Reveal } from "@/components/ui/reveal";
import { firmStats } from "@/content/stats";

export function StatBand() {
  return (
    <section className="relative z-10 border-y border-line bg-surface-2 py-20 md:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <Reveal>
            <div>
              <h2 className="text-h2 leading-tight">We&apos;re an applied-AI firm that ships.</h2>
              <p className="mt-4 text-lead text-muted">
                If you want AI that works inside your real systems — not a deck about it — we&apos;re the team
                that builds it.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <StatRow>
              {firmStats.map((s) => (
                <Stat key={s.label} value={s.value} label={s.label} />
              ))}
            </StatRow>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
