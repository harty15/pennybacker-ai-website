import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";

const expect = [
  "A real engineer on the call — the one who'd do the work",
  "An honest read on whether AI fits your problem",
  "If it fits: a scoped next step with a fixed quote",
];

export function ContactInfo() {
  const calendly = process.env.NEXT_PUBLIC_CALENDLY_URL;

  return (
    <div>
      <Eyebrow>Contact</Eyebrow>
      <h1 className="mt-4 text-h1 leading-[1.05]">Tell us what should already be automated.</h1>
      <p className="mt-5 text-lead text-muted">
        Thirty minutes, no deck, straight answers — useful even if we never work together.
      </p>

      {calendly && (
        <div className="mt-8">
          <p className="font-mono text-eyebrow uppercase tracking-[0.16em] text-muted">Fastest</p>
          <div className="mt-2">
            <Button href={calendly} external>
              Pick a time →
            </Button>
          </div>
        </div>
      )}

      <div className="mt-8">
        <p className="font-mono text-eyebrow uppercase tracking-[0.16em] text-muted">Email</p>
        <a href="mailto:hello@[DOMAIN]" className="mt-2 inline-block text-lead text-accent hover:opacity-80">
          hello@[DOMAIN]
        </a>
      </div>

      <ul className="mt-8 space-y-2.5">
        {expect.map((e) => (
          <li key={e} className="flex items-start gap-2.5 text-muted">
            <svg viewBox="0 0 24 24" className="mt-1 size-4 shrink-0 text-accent" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M20 6 9 17l-5-5" />
            </svg>
            {e}
          </li>
        ))}
      </ul>
    </div>
  );
}
