import { cn } from "@/lib/cn";

export function Stat({
  value,
  label,
  className,
}: {
  value: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={cn("", className)}>
      <p className="font-display text-[clamp(2.25rem,5vw,3.25rem)] font-semibold leading-none text-accent">
        {value}
      </p>
      <p className="mt-3 text-small text-muted">{label}</p>
    </div>
  );
}

export function StatRow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-8 sm:grid-cols-3", className)}>{children}</div>
  );
}
