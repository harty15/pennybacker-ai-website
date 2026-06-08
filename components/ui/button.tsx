import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full text-small font-medium transition-[transform,background-color,border-color,gap] duration-200 ease-out-quart focus-visible:outline-2";

const variants: Record<Variant, string> = {
  primary: "bg-accent px-6 py-3 text-accent-fg hover:bg-accent-hover hover:-translate-y-0.5",
  secondary:
    "border border-line bg-transparent px-6 py-3 text-fg hover:border-accent hover:-translate-y-0.5",
  ghost: "text-accent hover:gap-3",
};

export function Button({
  href,
  variant = "primary",
  external,
  className,
  children,
}: {
  href: string;
  variant?: Variant;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const cls = cn(base, variants[variant], className);
  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
