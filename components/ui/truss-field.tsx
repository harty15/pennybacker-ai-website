"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

/**
 * Generative through-arch / truss line-work — the brand's imagery system.
 * Pure vector, drawn in code, strokes bound to the live palette via CSS vars,
 * so a palette swap recolors the artwork too. No stock photography anywhere.
 */

const APEX_X = 600;
const APEX_Y = 92;
const SPRING_X = 170;
const SPRING_Y = 348;
const DECK_Y = 348;
const K = (SPRING_Y - APEX_Y) / (SPRING_X - APEX_X) ** 2;

const archY = (x: number) => APEX_Y + K * (x - APEX_X) ** 2;

const HANGERS = Array.from({ length: 11 }, (_, i) => 240 + i * 72).filter(
  (x) => archY(x) < DECK_Y - 6,
);

export function TrussField({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const archPath = `M ${SPRING_X} ${SPRING_Y} Q ${APEX_X} ${2 * APEX_Y - SPRING_Y} ${2 * APEX_X - SPRING_X} ${SPRING_Y}`;
  const draw = reduce ? undefined : { pathLength: [0, 1], opacity: [0, 1] };

  return (
    <svg
      className={cn("pointer-events-none select-none", className)}
      viewBox="0 0 1200 420"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* deck */}
      <motion.line
        x1={110} y1={DECK_Y} x2={1090} y2={DECK_Y}
        stroke="var(--color-line)" strokeWidth={1.5}
        initial={reduce ? false : { pathLength: 0, opacity: 0 }}
        animate={draw}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      />
      {/* piers */}
      {[SPRING_X, 2 * APEX_X - SPRING_X].map((x) => (
        <line key={x} x1={x} y1={DECK_Y} x2={x} y2={392} stroke="var(--color-line)" strokeWidth={1.5} />
      ))}
      {/* arch */}
      <motion.path
        d={archPath}
        stroke="var(--color-accent)" strokeWidth={2} strokeLinecap="round"
        initial={reduce ? false : { pathLength: 0, opacity: 0 }}
        animate={draw}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
      />
      {/* hangers + lattice nodes */}
      {HANGERS.map((x, i) => {
        const y = archY(x);
        return (
          <g key={x}>
            <motion.line
              x1={x} y1={y} x2={x} y2={DECK_Y}
              stroke="var(--color-line)" strokeWidth={1}
              initial={reduce ? false : { pathLength: 0, opacity: 0 }}
              animate={draw}
              transition={{ duration: 0.7, delay: reduce ? 0 : 0.5 + i * 0.06, ease: "easeOut" }}
            />
            <motion.circle
              cx={x} cy={y} r={2.5}
              fill="var(--color-accent)"
              initial={reduce ? false : { scale: 0, opacity: 0 }}
              animate={reduce ? undefined : { scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: reduce ? 0 : 0.6 + i * 0.06 }}
            />
          </g>
        );
      })}
      {/* diagonal deck lattice */}
      {Array.from({ length: 12 }, (_, i) => 180 + i * 70).map((x, i) => (
        <line
          key={`d-${x}`}
          x1={x} y1={DECK_Y} x2={x + 70} y2={DECK_Y + (i % 2 === 0 ? 26 : -0)}
          stroke="var(--color-line)" strokeWidth={0.75} opacity={0.6}
        />
      ))}
    </svg>
  );
}
