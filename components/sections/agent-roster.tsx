const roster = [
  { name: "Ryan Harty", role: "Principal engineer", status: "active" },
  { name: "Max [MAX-LASTNAME]", role: "[MAX-TITLE]", status: "active" },
  { name: "Build Agent", role: "Codegen & integration", status: "running" },
  { name: "Eval Agent", role: "Tests & regression", status: "running" },
];

/** Vignette: the human + agent delivery team. Status dots pulse. */
export function AgentRoster() {
  return (
    <div className="space-y-3 rounded-2xl border border-line bg-surface-2 p-6">
      {roster.map((r) => (
        <div key={r.name} className="flex items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3">
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
            <span className="relative inline-flex size-2.5 rounded-full bg-success" />
          </span>
          <div className="flex-1">
            <p className="text-small font-medium text-fg">{r.name}</p>
            <p className="text-eyebrow text-muted">{r.role}</p>
          </div>
          <span className="font-mono text-eyebrow uppercase tracking-[0.14em] text-success">{r.status}</span>
        </div>
      ))}
    </div>
  );
}
