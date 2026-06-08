import { Chip } from "@/components/ui/chip";
import { Reveal } from "@/components/ui/reveal";

export function TimelineSteps({
  steps,
}: {
  steps: readonly { index: string; week: string; name: string; anchor: string; body: string; chips: readonly string[] }[];
}) {
  return (
    <div className="space-y-6">
      {steps.map((s, i) => (
        <Reveal key={s.index} delay={i * 0.06}>
          <div id={s.anchor} className="grid scroll-mt-24 gap-6 rounded-2xl border border-line bg-surface p-7 md:grid-cols-[220px_1fr] md:p-9">
            <div>
              <span className="font-display text-[2.5rem] font-semibold leading-none text-accent/25">{s.index}</span>
              <p className="mt-3 font-mono text-eyebrow uppercase tracking-[0.16em] text-muted">{s.week}</p>
              <p className="mt-1 font-display text-h3">{s.name}</p>
            </div>
            <div>
              <p className="text-muted">{s.body}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {s.chips.map((c) => (
                  <Chip key={c}>{c}</Chip>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
