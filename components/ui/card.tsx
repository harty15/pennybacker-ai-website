import { cn } from "@/lib/cn";

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-line bg-surface p-7 transition-all duration-200 ease-out-quart",
        className,
      )}
    >
      {children}
    </div>
  );
}
