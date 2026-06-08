import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";

export function EngagementModels({
  models,
  note,
}: {
  models: readonly { title: string; type: string; bestFor: readonly string[] }[];
  note?: string;
}) {
  return (
    <div>
      <div className="grid gap-6 sm:grid-cols-2">
        {models.map((m, i) => (
          <Reveal key={m.title} delay={i * 0.07}>
            <Card className="h-full">
              <p className="font-mono text-eyebrow uppercase tracking-[0.16em] text-accent">{m.type}</p>
              <h3 className="mt-2 text-h3">{m.title}</h3>
              <p className="mt-5 text-small text-muted">Best for</p>
              <ul className="mt-2 space-y-2">
                {m.bestFor.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-small text-fg/80">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                    {b}
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        ))}
      </div>
      {note && <p className="mt-6 text-small text-muted">{note}</p>}
    </div>
  );
}
