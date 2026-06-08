"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

const interests = [
  { id: "roadmap", label: "Roadmap", desc: "Assess & plan" },
  { id: "build", label: "Build", desc: "Production systems" },
  { id: "run", label: "Run", desc: "Managed ops" },
];

const fieldClass =
  "mt-1.5 w-full rounded-lg border border-line bg-bg px-4 py-2.5 text-fg placeholder:text-muted/70 focus-visible:border-accent";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [interest, setInterest] = useState("build");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if ((form.elements.namedItem("website") as HTMLInputElement)?.value) return; // honeypot
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("submitting");

    if (!ENDPOINT) {
      const body = `Name: ${data.name}\nEmail: ${data.email}\nCompany: ${data.company}\nInterest: ${interest}\n\n${data.message}`;
      window.location.href = `mailto:hello@[DOMAIN]?subject=${encodeURIComponent(
        `Intro call — ${interest}`,
      )}&body=${encodeURIComponent(body)}`;
      setStatus("success");
      return;
    }
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, interest }),
      });
      if (!res.ok) throw new Error("bad status");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-line bg-surface p-8">
        <h3 className="text-h3">Got it.</h3>
        <p className="mt-3 text-muted">
          Thanks — a real engineer will reply within a day. We read every message.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-line bg-surface p-6 md:p-8">
      <fieldset>
        <legend className="text-small font-medium text-fg">What are you interested in?</legend>
        <div role="radiogroup" className="mt-3 grid gap-2 sm:grid-cols-3">
          {interests.map((it) => (
            <label
              key={it.id}
              className={cn(
                "cursor-pointer rounded-xl border p-3 text-center transition-colors duration-200",
                interest === it.id ? "border-accent bg-accent/[0.06]" : "border-line hover:border-accent/40",
              )}
            >
              <input
                type="radio"
                name="interest"
                value={it.id}
                checked={interest === it.id}
                onChange={() => setInterest(it.id)}
                className="sr-only"
              />
              <span className="block text-small font-medium text-fg">{it.label}</span>
              <span className="block text-eyebrow text-muted">{it.desc}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block text-small text-muted">
          Name
          <input name="name" type="text" required autoComplete="name" className={fieldClass} />
        </label>
        <label className="block text-small text-muted">
          Email
          <input name="email" type="email" required autoComplete="email" className={fieldClass} />
        </label>
      </div>
      <label className="mt-4 block text-small text-muted">
        Company <span className="text-muted/60">(optional)</span>
        <input name="company" type="text" autoComplete="organization" className={fieldClass} />
      </label>
      <label className="mt-4 block text-small text-muted">
        Message
        <textarea
          name="message"
          required
          rows={5}
          placeholder="What are you trying to build — or what keeps not getting built?"
          className={cn(fieldClass, "resize-y")}
        />
      </label>

      {/* honeypot */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="sr-only" />

      {status === "error" && (
        <p className="mt-4 rounded-lg border border-accent/40 bg-accent/[0.06] px-4 py-3 text-small text-fg">
          Something went wrong. Email us directly at{" "}
          <a href="mailto:hello@[DOMAIN]" className="text-accent underline">
            hello@[DOMAIN]
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-accent px-6 py-3 text-small font-medium text-accent-fg transition-colors duration-200 hover:bg-accent-hover disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
