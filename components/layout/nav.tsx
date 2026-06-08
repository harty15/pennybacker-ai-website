"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Brandmark } from "./brandmark";
import { cn } from "@/lib/cn";

type SubItem = { href: string; label: string; desc: string };
type NavItem = { href: string; label: string; menu?: SubItem[] };

const SERVICES: SubItem[] = [
  { href: "/services/roadmap", label: "Roadmap", desc: "Know what to build first" },
  { href: "/services/build", label: "Build", desc: "Production agentic systems" },
  { href: "/services/run", label: "Run", desc: "We operate what we build" },
];

const NAV: NavItem[] = [
  { href: "/method", label: "Method" },
  { href: "/services", label: "Services", menu: SERVICES },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

/** Animated accent underline — persists when active, slides in on hover. */
function Underline({ active }: { active: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "absolute -bottom-1.5 left-0 h-px w-full origin-left bg-accent transition-transform duration-200 ease-out-quart",
        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
      )}
    />
  );
}

function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={cn("group relative text-small transition-colors", active ? "text-fg" : "text-muted hover:text-fg")}
    >
      {label}
      <Underline active={active} />
    </Link>
  );
}

/** Services item: links to /services, reveals the sub-pages on hover/focus. */
function ServicesMenu({ active }: { active: boolean }) {
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = () => {
    if (timer.current) clearTimeout(timer.current);
    setOpen(true);
  };
  const hide = () => {
    timer.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div
      className="relative"
      onMouseEnter={show}
      onMouseLeave={hide}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") setOpen(false);
      }}
    >
      <Link
        href="/services"
        aria-haspopup="true"
        aria-expanded={open}
        onFocus={show}
        className={cn(
          "group relative inline-flex items-center gap-1 text-small transition-colors",
          active || open ? "text-fg" : "text-muted hover:text-fg",
        )}
      >
        Services
        <svg
          viewBox="0 0 24 24"
          className={cn("size-3.5 transition-transform duration-200", open && "rotate-180")}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
        <Underline active={active} />
      </Link>

      <div
        className={cn(
          "absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 pt-3 transition-[opacity,transform] duration-150 ease-out-quart",
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0",
        )}
      >
        <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-xl shadow-black/10">
          <div className="p-1.5">
            {SERVICES.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                onClick={() => setOpen(false)}
                className="group/item block rounded-xl px-3 py-2.5 transition-colors hover:bg-surface-2"
              >
                <span className="flex items-center justify-between">
                  <span className="text-small font-medium text-fg">{s.label}</span>
                  <span className="text-accent opacity-0 transition-all duration-200 group-hover/item:translate-x-0.5 group-hover/item:opacity-100">
                    →
                  </span>
                </span>
                <span className="mt-0.5 block text-eyebrow text-muted">{s.desc}</span>
              </Link>
            ))}
          </div>
          <Link
            href="/services"
            onClick={() => setOpen(false)}
            className="block border-t border-line px-4 py-2.5 font-mono text-eyebrow uppercase tracking-[0.16em] text-muted transition-colors hover:text-accent"
          >
            All services →
          </Link>
        </div>
      </div>
    </div>
  );
}

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // While the mobile menu is open: close on Escape and lock body scroll.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close the mobile menu whenever the route changes (covers the CTA button and back/forward nav).
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 transition-colors duration-300",
          scrolled || open ? "border-b border-line bg-bg/80 backdrop-blur-md" : "border-b border-transparent",
        )}
      >
        <Container className="relative flex h-16 items-center justify-between">
          <Brandmark />

          <nav className="hidden items-center gap-8 md:flex">
            {NAV.map((l) =>
              l.menu ? (
                <ServicesMenu key={l.href} active={isActive(pathname, l.href)} />
              ) : (
                <NavLink key={l.href} href={l.href} label={l.label} active={isActive(pathname, l.href)} />
              ),
            )}
          </nav>

          <div className="hidden md:block">
            <Button href="/contact">Book an intro call</Button>
          </div>

          <button
            className="grid size-10 place-items-center rounded-md border border-line text-fg md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.5">
              {open ? <path d="M5 5l14 14M19 5L5 19" /> : <path d="M3 7h18M3 12h18M3 17h18" />}
            </svg>
          </button>
        </Container>
      </header>

      {/* Mobile menu — rendered outside the backdrop-blurred header so the
          fixed scrim resolves against the viewport, not the header box. */}
      {open && (
        <div className="md:hidden">
          {/* tap-to-close scrim over the whole viewport */}
          <div
            onClick={() => setOpen(false)}
            aria-hidden
            className="fixed inset-0 z-30 bg-fg/30 backdrop-blur-sm"
          />
          {/* floating panel pinned just below the bar */}
          <div className="fixed inset-x-0 top-16 z-40 max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-line bg-bg shadow-xl shadow-black/10">
            <Container className="flex flex-col gap-1 py-4">
              {NAV.map((l) => (
                <div key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-2 py-3 text-fg hover:bg-surface-2"
                  >
                    {l.label}
                  </Link>
                  {l.menu && (
                    <div className="mb-1 ml-3 flex flex-col gap-0.5 border-l border-line pl-3">
                      {l.menu.map((s) => (
                        <Link
                          key={s.href}
                          href={s.href}
                          onClick={() => setOpen(false)}
                          className="block rounded-lg px-2 py-2 text-small text-muted hover:bg-surface-2 hover:text-fg"
                        >
                          {s.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Button href="/contact" className="mt-2 w-full">
                Book an intro call
              </Button>
            </Container>
          </div>
        </div>
      )}
    </>
  );
}
