import { cn } from "@/lib/cn";

/** Mono, all-caps, accent kicker. The positive letter-spacing is a premium tell. */
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("font-mono text-eyebrow uppercase tracking-[0.2em] text-accent", className)}>
      {children}
    </p>
  );
}
