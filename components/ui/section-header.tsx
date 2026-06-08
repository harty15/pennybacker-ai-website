import { cn } from "@/lib/cn";
import { Eyebrow } from "./eyebrow";

export function SectionHeader({
  eyebrow,
  heading,
  body,
  align = "left",
  className,
}: {
  eyebrow?: string;
  heading: React.ReactNode;
  body?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? <Eyebrow className="mb-3">{eyebrow}</Eyebrow> : null}
      <h2 className="text-h2 leading-[1.1]">{heading}</h2>
      {body ? <p className="mt-4 text-lead text-muted">{body}</p> : null}
    </div>
  );
}
