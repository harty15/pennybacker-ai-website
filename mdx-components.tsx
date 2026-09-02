import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import type { ComponentProps } from "react";

/**
 * Global MDX element styling for Insights posts — the site's tokens, no
 * typography plugin. Anchors use next/link for internal paths.
 */
function A({ href = "", children, ...rest }: ComponentProps<"a">) {
  const internal = href.startsWith("/");
  const cls = "text-accent underline decoration-accent/40 underline-offset-[3px] transition-colors hover:decoration-accent";
  if (internal) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={cls} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  );
}

const components: MDXComponents = {
  h2: (p) => <h2 className="mt-14 text-h2 leading-[1.12] text-fg [&+p]:mt-4" {...p} />,
  h3: (p) => <h3 className="mt-10 text-h3 leading-tight text-fg" {...p} />,
  h4: (p) => <h4 className="mt-8 font-display text-lead font-semibold text-fg" {...p} />,
  p: (p) => <p className="mt-5 leading-[1.7] text-fg/85" {...p} />,
  a: A,
  strong: (p) => <strong className="font-semibold text-fg" {...p} />,
  ul: (p) => <ul className="mt-5 list-disc space-y-2 pl-6 leading-[1.7] text-fg/85 marker:text-accent" {...p} />,
  ol: (p) => <ol className="mt-5 list-decimal space-y-2 pl-6 leading-[1.7] text-fg/85 marker:font-mono marker:text-muted" {...p} />,
  li: (p) => <li className="pl-1" {...p} />,
  blockquote: (p) => (
    <blockquote className="mt-6 border-l-2 border-accent pl-5 text-lead text-muted [&_p]:mt-0" {...p} />
  ),
  hr: () => <hr className="my-12 border-line" />,
  pre: (p) => (
    <pre
      className="mt-6 overflow-x-auto rounded-xl border border-line bg-surface-2 p-4 font-mono text-small leading-relaxed text-fg [&_code]:bg-transparent [&_code]:p-0"
      {...p}
    />
  ),
  code: (p) => <code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[0.9em] text-fg" {...p} />,
  table: (p) => (
    <div className="mt-6 overflow-x-auto rounded-xl border border-line">
      <table className="w-full border-collapse text-small" {...p} />
    </div>
  ),
  thead: (p) => <thead className="bg-surface-2 text-left font-mono text-eyebrow uppercase tracking-[0.12em] text-muted" {...p} />,
  th: (p) => <th className="border-b border-line px-4 py-3 font-medium" {...p} />,
  td: (p) => <td className="border-b border-line px-4 py-3 align-top text-fg/85 last:border-b-0" {...p} />,
  // Plain <img>: the site is a static export with unoptimized images, and post
  // images are rare. Authors must give every image alt text (empty string if decorative).
  // eslint-disable-next-line @next/next/no-img-element
  img: ({ alt = "", ...p }) => <img className="mt-6 rounded-xl border border-line" loading="lazy" alt={alt} {...p} />,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
