import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Chip } from "@/components/ui/chip";
import { Reveal } from "@/components/ui/reveal";
import { CtaBanner } from "@/components/sections/cta-banner";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/schema";
import { getAllPosts, authors, formatDate, tagLabel } from "@/lib/posts";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Insights: Field Notes on Production AI for Operators",
    description:
      "Practitioner notes from Pennybacker AI on document intelligence, MCP in the enterprise, project controls automation, and AI roadmaps that survive contact with real operations.",
    path: "/insights/",
  }),
  alternates: {
    canonical: "/insights/",
    types: { "application/rss+xml": "/feed.xml" },
  },
};

export default async function InsightsIndex() {
  const posts = await getAllPosts();

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Insights", path: "/insights/" }])} />
      <PageHero
        eyebrow="Insights"
        title={
          <>
            Field notes from <span className="text-accent">inside the operation.</span>
          </>
        }
        subhead="What we learn building and running AI systems for operators — document intelligence, MCP integrations, project controls, and the roadmaps that actually get built. Written by the engineers doing the work."
      />

      <section className="relative z-10 py-20 md:py-28">
        <Container>
          {posts.length === 0 ? (
            <p className="max-w-xl text-lead text-muted">
              First notes are in review. Subscribe to the{" "}
              <a href="/feed.xml" className="text-accent underline underline-offset-[3px]">
                RSS feed
              </a>{" "}
              or check back shortly.
            </p>
          ) : (
            <ol className="divide-y divide-line border-y border-line">
              {posts.map((post, i) => {
                const author = authors[post.author];
                return (
                  <li key={post.slug}>
                    <Reveal delay={Math.min(i, 4) * 0.05}>
                      <article className="grid gap-4 py-10 md:grid-cols-[10rem_1fr] md:gap-10">
                        <div className="font-mono text-eyebrow uppercase tracking-[0.14em] text-muted">
                          <time dateTime={post.date}>{formatDate(post.date)}</time>
                          <span className="mt-1 block">{post.readingMinutes} min read</span>
                          {post.draft ? <span className="mt-1 block text-accent">Draft</span> : null}
                        </div>
                        <div>
                          <div className="flex flex-wrap gap-2">
                            {post.tags.map((t) => (
                              <Chip key={t}>{tagLabel(t)}</Chip>
                            ))}
                          </div>
                          <h2 className="mt-4 text-h2 leading-[1.12]">
                            <Link href={`/insights/${post.slug}/`} className="transition-colors hover:text-accent">
                              {post.title}
                            </Link>
                          </h2>
                          <p className="mt-3 max-w-2xl text-lead text-muted">{post.description}</p>
                          <p className="mt-4 text-small text-muted">
                            {author.name} · {author.role}
                          </p>
                        </div>
                      </article>
                    </Reveal>
                  </li>
                );
              })}
            </ol>
          )}
        </Container>
      </section>

      <CtaBanner
        heading="Reading about it is the slow way."
        body="Bring the workflow that should already be automated. Thirty minutes with an engineer who has shipped it before."
      />
    </>
  );
}
