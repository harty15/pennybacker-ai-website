import { Diagram, Node, Edge, Note } from "./primitives";

/** Fig. 1 — governance-first topology: one server per system, identity passed through, every call logged. */
export function McpTopology() {
  const id = "mcp1";
  const cols = [
    { x: 20, server: "ERP server", sys: "ERP / finance" },
    { x: 180, server: "Schedule server", sys: "Scheduling" },
    { x: 340, server: "Cost server", sys: "Cost platform" },
    { x: 500, server: "Doc control server", sys: "Document control" },
  ];
  const agentAnchors = [300, 360, 420, 480];
  return (
    <Diagram id={id} viewBox="0 0 760 450" label="An operator's identity flows through the agent to one MCP server per system of record; each server calls its own system as the user, every call passes through the audit log, reads go straight to the system, and the one write path goes through an approval gate first.">
      <Node x={20} y={40} w={150} h={58} title="Operator" sub="asks in plain English" />
      <Node x={250} y={40} w={260} h={58} title="Agent (MCP client)" sub="composes an answer across tools" />
      <Edge id={id} points={[[170, 69], [250, 69]]} label="user token" accent />
      {cols.map((c, i) => (
        <Edge key={c.server} id={id} points={[[agentAnchors[i], 98], [c.x + 70, 166]]} label={i === 2 ? "typed args" : undefined} labelAt={[455, 134]} />
      ))}
      {/* reads: server → (through the log) → system of record */}
      {[90, 250, 570].map((x) => (
        <Edge key={x} id={id} points={[[x, 222], [x, 370]]} label="read as user" accent labelAt={[x, 352]} />
      ))}
      <Edge id={id} points={[[358, 222], [358, 370]]} label="read" accent labelAt={[358, 356]} />
      {/* the one write: gated */}
      <Edge id={id} points={[[430, 222], [430, 300]]} dashed />
      <Edge id={id} points={[[430, 334], [430, 370]]} label="write" dashed labelAt={[455, 356]} />
      {/* audit layer, drawn over the lines so every call visibly passes through it */}
      <rect x={20} y={246} width={720} height={32} rx={8} className="fill-surface-2 stroke-muted" strokeWidth={1.2} strokeDasharray="5 4" />
      <text x={380} y={267} textAnchor="middle" className="fill-fg font-display text-[13px] font-semibold">
        Audit log · every call: who, which tool, arguments, result, latency, model
      </text>
      <Node x={380} y={300} w={100} h={34} title="Approval gate" dashed />
      {cols.map((c) => (
        <g key={c.sys}>
          <Node x={c.x} y={166} w={140} h={56} title={c.server} sub="typed tools, tight inputs" />
          <Node x={c.x} y={370} w={140} h={56} title={c.sys} sub="permission check here" />
        </g>
      ))}
    </Diagram>
  );
}

/** Fig. 2 — the life of one call, with the two places it can be refused. */
export function CallLifecycle() {
  const id = "mcp2";
  const steps = ["Question", "Pick tool", "Validate args", "Check identity", "Call system", "Log + cite"];
  return (
    <Diagram id={id} viewBox="0 0 760 230" label="One request moves through six steps: question, tool selection, argument validation, identity check in the system of record, the system call, then logging and citation; invalid arguments and missing permissions are refused before any system is touched.">
      {steps.map((s, i) => (
        <g key={s}>
          <Node x={20 + i * 122} y={60} w={110} h={54} title={s} accent={i === 5} />
          {i < steps.length - 1 ? <Edge id={id} points={[[130 + i * 122, 87], [142 + i * 122, 87]]} /> : null}
        </g>
      ))}
      <Edge id={id} points={[[319, 114], [319, 160]]} muted dashed />
      <Edge id={id} points={[[441, 114], [441, 160]]} muted dashed />
      <Node x={264} y={160} w={110} h={40} title="Refused" sub="schema mismatch" muted />
      <Node x={386} y={160} w={110} h={40} title="Refused" sub="not permitted" muted />
      <Note x={630} y={140} anchor="middle" lines={["Answer carries record IDs", "the operator can open"]} accent />
    </Diagram>
  );
}
