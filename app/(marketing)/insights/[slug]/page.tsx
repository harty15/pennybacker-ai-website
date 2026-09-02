import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Chip } from "@/components/ui/chip";
import { SectionHeader } from "@/components/ui/section-header";
import { CtaBanner } from "@/components/sections/cta-banner";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, ORG_ID, personSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { SITE_NAME, absoluteUrl } from "@/lib/site";
import { getAllPosts, getPost, postParams, authors, formatDate, tagLabel, PLACEHOLDER_SLUG } from "@/lib/posts";

export const dynamicParams = false;

export async function generateStaticParams() {
  return postParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Insights — first notes in review", robots: { index: false, follow: true } };
  const author = authors[post.author];
  return {
    ...pageMetadata({ title: post.title, description: post.description, path: `/insights/${slug}/` }),
    authors: [{ name: author.name, url: author.linkedin }],
    // Article-specific Open Graph fields. The segment's opengraph-image.tsx still supplies og:image.
    openGraph: {
      type: "article",
      siteName: SITE_NAME,
      locale: "en_US",
      url: `/insights/${slug}/`,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [author.name],
      tags: post.tags.map(tagLabel),
    },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post && slug === PLACEHOLDER_SLUG) return <ComingSoon />;
  if (!post) notFound();
  const author = authors[post.author];
  const { Content } = post;

  const related = (await getAllPosts())
    .filter((p) => p.slug !== post.slug && p.tags.some((t) => post.tags.includes(t)))
    .slice(0, 2);

  const article = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": absoluteUrl(`/insights/${slug}/#article`),
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: { "@id": personSchema(author)["@id"] },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: absoluteUrl(`/insights/${slug}/`),
    keywords: post.tags.map(tagLabel).join(", "),
    inLanguage: "en-US",
  };

  return (
    <>
      <JsonLd
        data={[
          article,
          breadcrumbSchema([
            { name: "Insights", path: "/insights/" },
            { name: post.title, path: `/insights/${slug}/` },
          ]),
        ]}
      />

      <article>
        <header className="relative z-10 border-b border-line pb-12 pt-28 md:pt-36">
          <Container className="max-w-3xl">
            <Link href="/insights/" className="text-small text-muted transition-colors hover:text-fg">
              ← All insights
            </Link>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              {post.tags.map((t) => (
                <Chip key={t} className="border-accent/30 bg-accent/[0.06] text-accent">
                  {tagLabel(t)}
                </Chip>
              ))}
              {post.draft ? <Chip>Draft — not yet published</Chip> : null}
            </div>
            <h1 className="mt-6 text-h1 leading-[1.05]">{post.title}</h1>
            <p className="mt-5 text-lead text-muted">{post.description}</p>
            <p className="mt-8 font-mono text-eyebrow uppercase tracking-[0.14em] text-muted">
              <a href={author.linkedin} className="text-fg underline decoration-line underline-offset-[3px] hover:text-accent" rel="noopener noreferrer" target="_blank">
                {author.name}
              </a>
              {" · "}
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              {post.updated ? <> · Updated {formatDate(post.updated)}</> : null}
              {" · "}
              {post.readingMinutes} min read
            </p>
          </Container>
        </header>

        <div className="relative z-10 py-16 md:py-20">
          <Container className="max-w-3xl">
            <div className="max-w-[68ch] text-[1.05rem]">
              <Content />
            </div>

            <aside className="mt-16 flex items-start gap-4 rounded-2xl border border-line bg-surface-2 p-6">
              <div className="grid size-12 shrink-0 place-items-center rounded-full bg-accent font-display text-small font-semibold text-accent-fg">
                {author.initials}
              </div>
              <div>
                <p className="font-medium text-fg">{author.name}</p>
                <p className="text-small text-muted">{author.role}, Pennybacker AI</p>
                <p className="mt-2 text-small text-muted">{author.bio}</p>
              </div>
            </aside>
          </Container>
        </div>
      </article>

      {related.length > 0 && (
        <section className="relative z-10 border-t border-line py-20 md:py-24">
          <Container>
            <SectionHeader eyebrow="Keep reading" heading="Related notes." />
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {related.map((r) => (
                <Link key={r.slug} href={`/insights/${r.slug}/`} className="group block rounded-2xl border border-line bg-surface p-6 transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg">
                  <p className="font-mono text-eyebrow uppercase tracking-[0.14em] text-muted">
                    {formatDate(r.date)} · {r.readingMinutes} min
                  </p>
                  <h3 className="mt-3 text-h3 leading-tight group-hover:text-accent">{r.title}</h3>
                  <p className="mt-2 text-small text-muted">{r.description}</p>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      <CtaBanner heading="Have a version of this problem?" body="Tell us what you're trying to build — or what keeps not getting built." />
    </>
  );
}

/** Rendered only while no post is published; the layout hides the Insights nav link in that state. */
function ComingSoon() {
  return (
    <section className="relative z-10 pb-24 pt-28 md:pt-36">
      <Container className="max-w-3xl">
        <Link href="/insights/" className="text-small text-muted transition-colors hover:text-fg">
          ← Insights
        </Link>
        <h1 className="mt-6 text-h1 leading-[1.05]">First notes are in review.</h1>
        <p className="mt-5 text-lead text-muted">
          Field notes on production AI for operators are on the way. Subscribe to the{" "}
          <a href="/feed.xml" className="text-accent underline underline-offset-[3px]">
            RSS feed
          </a>{" "}
          to get the first one.
        </p>
      </Container>
    </section>
  );
}
