import { Container } from "./container";
import { Eyebrow } from "./eyebrow";
import { Button } from "./button";
import { Reveal } from "./reveal";
import { TrussField } from "./truss-field";

type Cta = { label: string; href: string; external?: boolean };

/** Reusable inner-page hero. Title accepts JSX so pages can accent a word. */
export function PageHero({
  eyebrow,
  title,
  lead,
  subhead,
  primary,
  secondary,
  truss = true,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  subhead?: React.ReactNode;
  primary?: Cta;
  secondary?: Cta;
  truss?: boolean;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      {truss && (
        <TrussField className="absolute inset-x-0 bottom-0 h-[55%] w-full opacity-50 [mask-image:linear-gradient(to_top,black,transparent)]" />
      )}
      <Container className="relative z-10 pb-16 pt-28 md:pb-24 md:pt-36">
        <div className="max-w-3xl">
          {eyebrow && (
            <Reveal>
              <Eyebrow>{eyebrow}</Eyebrow>
            </Reveal>
          )}
          <Reveal delay={0.05}>
            <h1 className="mt-4 text-h1 font-semibold leading-[1.02] tracking-[-0.02em]">{title}</h1>
          </Reveal>
          {lead && (
            <Reveal delay={0.1}>
              <p className="mt-5 text-lead font-medium text-fg">{lead}</p>
            </Reveal>
          )}
          {subhead && (
            <Reveal delay={0.14}>
              <p className="mt-4 max-w-2xl text-lead text-muted">{subhead}</p>
            </Reveal>
          )}
          {(primary || secondary) && (
            <Reveal delay={0.2}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                {primary && (
                  <Button href={primary.href} external={primary.external}>
                    {primary.label}
                  </Button>
                )}
                {secondary && (
                  <Button href={secondary.href} external={secondary.external} variant="ghost">
                    {secondary.label}
                  </Button>
                )}
              </div>
            </Reveal>
          )}
        </div>
      </Container>
    </section>
  );
}
