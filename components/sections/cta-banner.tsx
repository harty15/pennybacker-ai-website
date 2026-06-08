import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { TrussField } from "@/components/ui/truss-field";

/** Inverted CTA band. Reused at the foot of most pages with per-page copy. */
export function CtaBanner({
  heading,
  body,
}: {
  heading: string;
  body?: string;
}) {
  return (
    <section className="relative z-10 py-12 md:py-16">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-fg px-8 py-16 text-center md:px-16 md:py-24">
          <TrussField className="absolute inset-x-0 bottom-0 h-[70%] w-full opacity-[0.12] [mask-image:radial-gradient(ellipse_at_bottom,black,transparent_75%)]" />
          <div className="relative z-10">
            <Reveal>
              <h2 className="mx-auto max-w-2xl text-h2 text-bg">{heading}</h2>
            </Reveal>
            {body ? (
              <Reveal delay={0.06}>
                <p className="mx-auto mt-5 max-w-xl text-bg/70">{body}</p>
              </Reveal>
            ) : null}
            <Reveal delay={0.12}>
              <div className="mt-9 flex items-center justify-center">
                <Button href="/contact">Book an intro call</Button>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
