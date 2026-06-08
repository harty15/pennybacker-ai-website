import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacy policy for Pennybacker AI.",
};

export default function PrivacyPage() {
  return (
    <article className="relative z-10 pb-24 pt-28 md:pt-36">
      <Container className="max-w-3xl">
        <Eyebrow>Legal</Eyebrow>
        <h1 className="mt-4 text-h1">Privacy Policy</h1>
        <p className="mt-3 text-small text-muted">Last updated: June 2026 · [LEGAL-REVIEW — not legal advice as drafted]</p>

        <div className="mt-10 space-y-8 text-muted">
          <p>
            Harty Consulting LLC, d/b/a Pennybacker AI (&ldquo;we,&rdquo; &ldquo;us&rdquo;) respects
            your privacy. This policy explains what we collect when you use this site and how we handle it.
          </p>
          <div>
            <h2 className="text-h3 text-fg">What we collect</h2>
            <p className="mt-3">
              If you submit our contact form, we collect the information you provide — name, email, company,
              and your message. We use a privacy-respecting analytics tool that does not use cookies and does
              not collect personally identifiable information.
            </p>
          </div>
          <div>
            <h2 className="text-h3 text-fg">How we use it</h2>
            <p className="mt-3">
              We use form submissions solely to respond to your inquiry and, if we work together, to deliver
              services. We do not sell your data. We do not send marketing email you didn&rsquo;t ask for.
            </p>
          </div>
          <div>
            <h2 className="text-h3 text-fg">Sharing</h2>
            <p className="mt-3">
              Form data is handled by our form provider and email systems. Analytics are aggregate and
              anonymous. We share data only as needed to operate the site or as required by law.
            </p>
          </div>
          <div>
            <h2 className="text-h3 text-fg">Your choices</h2>
            <p className="mt-3">
              Email us at <a href="mailto:hello@[DOMAIN]" className="text-accent">hello@[DOMAIN]</a> to ask
              what we hold or to request deletion.
            </p>
          </div>
        </div>
      </Container>
    </article>
  );
}
