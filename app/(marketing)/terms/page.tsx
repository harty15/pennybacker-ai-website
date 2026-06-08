import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of use for the Pennybacker AI website.",
};

export default function TermsPage() {
  return (
    <article className="relative z-10 pb-24 pt-28 md:pt-36">
      <Container className="max-w-3xl">
        <Eyebrow>Legal</Eyebrow>
        <h1 className="mt-4 text-h1">Terms of Use</h1>
        <p className="mt-3 text-small text-muted">Last updated: June 2026 · [LEGAL-REVIEW — not legal advice as drafted]</p>

        <div className="mt-10 space-y-8 text-muted">
          <p>
            This website is operated by Harty Consulting LLC, d/b/a Pennybacker AI. By using it, you
            agree to these terms.
          </p>
          <div>
            <h2 className="text-h3 text-fg">No warranties</h2>
            <p className="mt-3">
              The site and its content are provided &ldquo;as is,&rdquo; for general information. Nothing here
              is a binding offer, a guarantee of results, or professional advice for your specific situation.
            </p>
          </div>
          <div>
            <h2 className="text-h3 text-fg">Intellectual property</h2>
            <p className="mt-3">
              All content, design, and code on this site are owned by Harty Consulting LLC unless otherwise
              noted. Don&rsquo;t reproduce it without permission.
            </p>
          </div>
          <div>
            <h2 className="text-h3 text-fg">Governing law</h2>
            <p className="mt-3">
              These terms are governed by the laws of the State of Texas.
            </p>
          </div>
          <div>
            <h2 className="text-h3 text-fg">Contact</h2>
            <p className="mt-3">
              Questions? <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent">{CONTACT_EMAIL}</a>.
            </p>
          </div>
        </div>
      </Container>
    </article>
  );
}
