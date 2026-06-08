import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";

/** Generic 2- or 3-up card grid for problem/differentiator rows. */
export function LabeledCards({
  items,
  numbered = false,
  columns = 3,
}: {
  items: readonly { title: string; body: string }[];
  numbered?: boolean;
  columns?: 2 | 3;
}) {
  return (
    <div className={cn("grid gap-6", columns === 3 ? "md:grid-cols-3" : "sm:grid-cols-2")}>
      {items.map((it, i) => (
        <Reveal key={it.title} delay={i * 0.07}>
          <Card className="h-full">
            {numbered && (
              <span className="font-mono text-small text-accent">
                0{i + 1}
                <span className="ml-2 inline-block h-px w-8 -translate-y-[3px] bg-accent align-middle" />
              </span>
            )}
            <h3 className={cn("text-h3 leading-tight", numbered && "mt-4")}>{it.title}</h3>
            <p className="mt-3 text-muted">{it.body}</p>
          </Card>
        </Reveal>
      ))}
    </div>
  );
}
