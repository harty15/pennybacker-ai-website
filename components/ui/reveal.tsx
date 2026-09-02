"use client";

import type { CSSProperties } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { cn } from "@/lib/cn";

const variants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

/**
 * Scroll-reveal leaf. Wrap individual bits — never a whole section — so the
 * parent stays a Server Component. Respects prefers-reduced-motion.
 *
 * `eager` is for first-viewport content (heroes): it renders a plain div and
 * runs the same entrance in CSS from first paint, so the HTML never ships the
 * text at opacity 0 waiting for hydration + an IntersectionObserver. That is
 * what keeps Largest Contentful Paint on the H1 instead of on the JS bundle.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  eager = false,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  eager?: boolean;
}) {
  const reduce = useReducedMotion();

  if (eager) {
    return (
      <div className={cn("reveal-eager", className)} style={{ "--reveal-delay": `${delay}s` } as CSSProperties}>
        {children}
      </div>
    );
  }

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
