import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";
import { methodSteps } from "@/content/method";
import { WeekChips } from "./week-chips";
import { AgentRoster } from "./agent-roster";

export function MethodPhases() {
  return (
    <section className="relative z-10 py-24 md:py-32">
      <Container className="space-y-20 md:space-y-28">
        {methodSteps.map((s, i) => {
          const reversed = i % 2 === 1;
          return (
            <Reveal key={s.index}>
              <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <div className={cn(reversed && "lg:order-2")}>
                  <div className="flex items-baseline gap-4">
                    <span className="font-display text-[2.75rem] font-semibold leading-none text-accent/25">
                      {s.index}
                    </span>
                    <div>
                      <p className="font-mono text-eyebrow uppercase tracking-[0.16em] text-muted">{s.kicker}</p>
                      <h2 className="mt-1 text-h2">{s.name}</h2>
                    </div>
                  </div>
                  <p className="mt-5 text-lead text-muted">{s.body}</p>
                  <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-small text-fg/80">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={s.serviceHref}
                    className="mt-7 inline-flex items-center gap-1.5 text-small font-medium text-accent transition-all hover:gap-3"
                  >
                    {s.serviceLabel}
                  </Link>
                </div>
                <div className={cn(reversed && "lg:order-1")}>
                  {s.vignette.type === "agents" ? (
                    <AgentRoster />
                  ) : (
                    <WeekChips chips={s.vignette.chips ?? []} />
                  )}
                </div>
              </div>
            </Reveal>
          );
        })}
      </Container>
    </section>
  );
}
