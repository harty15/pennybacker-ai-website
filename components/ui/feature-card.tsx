import { Card } from "./card";
import { Chip } from "./chip";

export function FeatureCard({
  heading,
  body,
  bullets,
  chips,
}: {
  heading: string;
  body: string;
  bullets?: readonly string[];
  chips?: readonly string[];
}) {
  return (
    <Card className="h-full">
      <h3 className="text-h3">{heading}</h3>
      <p className="mt-3 text-muted">{body}</p>
      {bullets && (
        <ul className="mt-5 space-y-2">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-2.5 text-small text-fg/80">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
              {b}
            </li>
          ))}
        </ul>
      )}
      {chips && (
        <div className="mt-5 flex flex-wrap gap-2">
          {chips.map((c) => (
            <Chip key={c}>{c}</Chip>
          ))}
        </div>
      )}
    </Card>
  );
}
