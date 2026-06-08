import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Chip } from "@/components/ui/chip";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
import { WorkCard } from "@/components/sections/work-card";
import { CtaBanner } from "@/components/sections/cta-banner";
import { work, TAG_LABELS } from "@/content/work";

export function generateStaticParams() {
  return work.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const brief = work.find((w) => w.slug === slug);
  if (!brief) return { title: "Work" };
  return { title: brief.title, description: brief.highlights[0] };
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((it) => (
        <li key={it} className="flex items-start gap-2.5 text-fg/85">
          <svg viewBox="0 0 24 24" className="mt-1 size-4 shrink-0 text-accent" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M20 6 9 17l-5-5" />
          </svg>
          {it}
        </li>
      ))}
    </ul>
  );
}

export default async function WorkDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const brief = work.find((w) => w.slug === slug);
  if (!brief) notFound();

  const related = work
    .filter((w) => w.slug !== brief.slug && w.tags.some((t) => brief.tags.includes(t)))
    .slice(0, 2);

  return (
    <>
      <section className="relative z-10 border-b border-line pb-12 pt-28 md:pt-36">
        <Container>
          <Link href="/work" className="text-small text-muted transition-colors hover:text-fg">
            ← All work
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            {brief.tags.map((t) => (
              <Chip key={t} className="border-accent/30 bg-accent/[0.06] text-accent">
                {TAG_LABELS[t]}
              </Chip>
            ))}
            <Chip>{brief.client}</Chip>
          </div>
          <h1 className="mt-6 max-w-3xl text-h1 leading-[1.05]">{brief.title}</h1>
          <div className="mt-8 max-w-2xl">
            <CheckList items={brief.highlights} />
          </div>
        </Container>
      </section>

      {/* Metrics band */}
      <section className="relative z-10 bg-fg py-14">
        <Container>
          <div className="grid gap-8 sm:grid-cols-3">
            {brief.metrics.map((m) => (
              <div key={m.label}>
                <p className="font-display text-[clamp(2rem,4vw,2.75rem)] font-semibold leading-none text-accent">
                  {m.value}
                </p>
                <p className="mt-3 text-small text-bg/70">{m.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Body */}
      <section className="relative z-10 py-20 md:py-28">
        <Container>
          <div className="max-w-3xl space-y-12">
            <div>
              <h2 className="text-h3 text-accent">The situation</h2>
              <p className="mt-3 text-lead text-muted">{brief.situation}</p>
            </div>
            <div>
              <h2 className="text-h3 text-accent">What we built</h2>
              <p className="mt-3 text-lead text-muted">{brief.build}</p>
              <p className="mt-6 font-mono text-eyebrow uppercase tracking-[0.16em] text-muted">Key capabilities</p>
              <div className="mt-4">
                <CheckList items={[...brief.capabilities]} />
              </div>
            </div>
            <div>
              <h2 className="text-h3 text-accent">Results</h2>
              <div className="mt-4">
                <CheckList items={[...brief.results]} />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Challenge / Solution */}
      <section className="relative z-10 bg-surface-2 py-20 md:py-24">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2">
            <Card>
              <h3 className="font-mono text-eyebrow uppercase tracking-[0.16em] text-muted">Challenge</h3>
              <div className="mt-4">
                <CheckList items={[...brief.challenge]} />
              </div>
            </Card>
            <Card>
              <h3 className="font-mono text-eyebrow uppercase tracking-[0.16em] text-muted">Solution</h3>
              <div className="mt-4">
                <CheckList items={[...brief.solution]} />
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="relative z-10 py-20 md:py-24">
          <Container>
            <Reveal>
              <SectionHeader eyebrow="More work" heading="Related briefs." />
            </Reveal>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {related.map((r) => (
                <WorkCard key={r.slug} brief={r} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <CtaBanner heading="Have a similar problem?" />
    </>
  );
}
