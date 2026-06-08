/** Decorative "schedule" vignette used in method phases. */
export function WeekChips({ chips }: { chips: readonly string[] }) {
  return (
    <div className="rounded-2xl border border-line bg-surface-2 p-8">
      <div className="space-y-4">
        {chips.map((c, i) => (
          <div key={c} className="flex items-center gap-4">
            <span className="font-mono text-small text-accent">{String(i + 1).padStart(2, "0")}</span>
            <span className="h-px flex-1 bg-line" />
            <span className="text-small text-fg/80">{c}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
