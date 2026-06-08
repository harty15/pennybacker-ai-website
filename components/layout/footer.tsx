import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Brandmark } from "./brandmark";
import { CONTACT_EMAIL } from "@/lib/site";

const COLUMNS = [
  {
    title: "Services",
    links: [
      { href: "/services/roadmap", label: "Roadmap" },
      { href: "/services/build", label: "Build" },
      { href: "/services/run", label: "Run" },
    ],
  },
  {
    title: "Firm",
    links: [
      { href: "/method", label: "Method" },
      { href: "/work", label: "Work" },
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-line bg-surface-2">
      <Container className="py-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <Brandmark />
            <p className="mt-4 text-small text-muted">
              Applied-AI firm in Austin, Texas. We build production AI systems for operators —
              from first roadmap to deployed software your team actually uses.
            </p>
            <div className="mt-6">
              <Button href="/contact">Book an intro call</Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="font-mono text-eyebrow uppercase tracking-[0.16em] text-muted">
                  {col.title}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-small text-fg/80 transition-colors hover:text-accent">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-line pt-6 text-small text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {/* year set at build */}2026 Harty Consulting LLC, d/b/a Pennybacker AI.</p>
          <p>
            {CONTACT_EMAIL.split("@")[0]}@<span className="text-fg/70">{CONTACT_EMAIL.split("@")[1]}</span> · Austin, Texas
          </p>
        </div>
      </Container>
    </footer>
  );
}
