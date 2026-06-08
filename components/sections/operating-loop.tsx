import { Chip } from "@/components/ui/chip";
import { Reveal } from "@/components/ui/reveal";

export function OperatingLoop({
  steps,
  deliverables,
}: {
  steps: readonly { index: string; name: string; anchor: string; body: string }[];
  deliverables: readonly string[];
}) {
  return (
    <div>
      <div className="grid gap-6 md:grid-cols-3">
        {steps.map((s, i) => (
          <Reveal key={s.index} delay={i * 0.07}>
            <div id={s.anchor} className="h-full scroll-mt-24 rounded-2xl border border-line bg-surface p-7">
              <span className="font-display text-[2.5rem] font-semibold leading-none text-accent/25">{s.index}</span>
              <h3 className="mt-3 text-h3">{s.name}</h3>
              <p className="mt-3 text-muted">{s.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.1}>
        <div className="mt-8 rounded-2xl border border-line bg-surface-2 p-7">
          <p className="font-mono text-eyebrow uppercase tracking-[0.16em] text-muted">What you get</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {deliverables.map((d) => (
              <Chip key={d}>{d}</Chip>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
