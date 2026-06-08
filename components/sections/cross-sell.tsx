import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Eyebrow } from "@/components/ui/eyebrow";
import { services } from "@/content/services";

export function CrossSell({ current }: { current: "roadmap" | "build" | "run" }) {
  const others = services.filter((s) => s.id !== current);
  return (
    <section className="relative z-10 border-t border-line py-20 md:py-24">
      <Container>
        <Eyebrow>One firm, the full lifecycle</Eyebrow>
        <h2 className="mt-3 text-h2">Keep going.</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {others.map((s) => (
            <Link key={s.id} href={s.href} className="block">
              <Card className="group hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg">
                <h3 className="text-h3">{s.title}</h3>
                <p className="mt-3 text-muted">{s.body}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-small font-medium text-accent transition-all group-hover:gap-3">
                  Explore {s.title} →
                </span>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
