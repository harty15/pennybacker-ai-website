import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { cn } from "@/lib/cn";
import { TAG_LABELS, type Brief } from "@/content/work";

export function WorkCard({ brief, featured = false }: { brief: Brief; featured?: boolean }) {
  return (
    <Link href={`/work/${brief.slug}`} className={cn("block h-full", featured && "md:col-span-2")}>
      <Card className="group flex h-full flex-col hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-xl hover:shadow-black/5">
        <div className="flex flex-wrap gap-2">
          {brief.tags.map((t) => (
            <Chip key={t} className="border-accent/30 bg-accent/[0.06] text-accent">
              {TAG_LABELS[t]}
            </Chip>
          ))}
        </div>
        <h3 className={cn("mt-5 text-h3", featured && "md:text-h2 md:leading-tight")}>{brief.title}</h3>
        <p className="mt-3 text-muted">{brief.highlights[0]}</p>
        <div className="mt-auto flex flex-wrap gap-x-10 gap-y-4 pt-7">
          {brief.metrics.slice(0, 2).map((m) => (
            <div key={m.label}>
              <span className="block font-display text-h3 font-semibold text-accent">{m.value}</span>
              <span className="text-small text-muted">{m.label}</span>
            </div>
          ))}
        </div>
        <span className="mt-6 inline-flex items-center gap-1.5 text-small font-medium text-accent transition-all group-hover:gap-3">
          Read brief →
        </span>
      </Card>
    </Link>
  );
}
