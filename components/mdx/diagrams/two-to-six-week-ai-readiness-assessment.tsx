import { Diagram, Node, Edge, Heading, Note, Rule } from "./primitives";

/** A bordered lane cell holding a short stacked list. */
function Cell({ x, y, w, h, lines, accent = false }: { x: number; y: number; w: number; h: number; lines: string[]; accent?: boolean }) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={9}
        className={accent ? "fill-accent/[0.07] stroke-accent" : "fill-surface stroke-line"}
        strokeWidth={accent ? 1.6 : 1.2}
      />
      <Note x={x + 16} y={y + 24} lines={lines} accent={accent} />
    </g>
  );
}

/** Fig. 1 — six weeks in three phases: each phase's output is the next phase's input, and the last one is buildable. */
export function SixWeekPhases() {
  const id = "ready1";
  const cols = [156, 432, 708];
  const w = 196;
  return (
    <Diagram
      id={id}
      viewBox="0 0 920 430"
      minWidth={860}
      label="Three phases across six weeks. Listen, weeks one and two: operators and supervisors, reading shadow spreadsheets, exception queues and the document register, producing a workflow map, a stakeholder map, a systems inventory and a candidate list with exceptions named. Assess, weeks three and four: system owners and IT, reading sampled real records, permission reports and traced write paths, producing a data readiness report, an integration assessment, risk notes and a measured baseline. Decide, weeks five and six: the sponsor and finance, reading volume and cost data, integration effort and exception rates, producing a prioritized roadmap, an ROI model, an architecture sketch and a costed pilot plan. The candidate list is what the second phase reads, the readiness report is what the third phase reads, and the third phase's output is what a build starts from."
    >
      <Heading x={cols[0]} y={26}>Listen · weeks 1–2</Heading>
      <Heading x={cols[1]} y={26}>Assess · weeks 3–4</Heading>
      <Heading x={cols[2]} y={26} accent>Decide · weeks 5–6</Heading>

      {/* Row A — who we talk to */}
      <Heading x={20} y={76}>Who we talk to</Heading>
      <Node x={cols[0]} y={44} w={w} h={56} title="Operators, supervisors" sub="the people doing the work" />
      <Node x={cols[1]} y={44} w={w} h={56} title="System owners, IT" sub="who owns each field" />
      <Node x={cols[2]} y={44} w={w} h={56} title="Sponsor, finance" sub="who funds it, who owns it" />

      {/* Row B — what we read */}
      <Heading x={20} y={160}>What we read</Heading>
      <Cell x={cols[0]} y={118} w={w} h={76} lines={["Shadow spreadsheets", "Exception queues", "The document register"]} />
      <Cell x={cols[1]} y={118} w={w} h={76} lines={["Sampled real records", "Permission reports", "Traced write paths"]} />
      <Cell x={cols[2]} y={118} w={w} h={76} lines={["Volume and cost data", "Integration effort", "Exception rates"]} />

      {/* Row C — what comes out */}
      <Heading x={20} y={254}>What comes out</Heading>
      <Cell x={cols[0]} y={212} w={w} h={90} lines={["Workflow map", "Stakeholder map", "Systems inventory", "Candidates + exceptions"]} />
      <Cell x={cols[1]} y={212} w={w} h={90} lines={["Data readiness report", "Integration assessment", "Risk and compliance notes", "Measured baseline"]} />
      <Cell x={cols[2]} y={212} w={w} h={90} lines={["Prioritized roadmap", "ROI model with baseline", "Architecture sketch", "Costed pilot plan"]} accent />

      {/* The chain: each phase's output is the next phase's input */}
      <Edge id={id} points={[[352, 257], [392, 257], [392, 156], [432, 156]]} label="candidate list" labelAt={[392, 205]} />
      <Edge id={id} points={[[628, 257], [668, 257], [668, 156], [708, 156]]} label="readiness report" labelAt={[668, 205]} />

      <Edge id={id} points={[[806, 302], [806, 352]]} label="buildable" accent labelAt={[806, 332]} />
      <Node x={cols[2]} y={352} w={w} h={58} title="Build starts" sub="production-shaped pilot" accent />

      <Note
        x={20}
        y={366}
        lines={["Six weeks at full estate size, in three phases whose outputs chain.", "Nothing here is a maturity score; every cell is a document an", "engineer can open on Monday."]}
      />
    </Diagram>
  );
}

/** Fig. 2 — the claimed system of record versus the write path as traced. */
export function ClaimedVsTracedWritePath() {
  const id = "ready2";
  return (
    <Diagram
      id={id}
      viewBox="0 0 940 400"
      minWidth={860}
      label="The same workflow drawn twice. As the systems inventory describes it: the operator enters the work into the ERP, the system of record, in one hop. As traced in week three: the operator keys it into a local spreadsheet, which is emailed monthly to a coordinator's inbox and retyped into the ERP at close, with a dashed branch to a reporting deck nobody reconciles. An automation would have to write at the retype step, and the approval for the month exists only inside the email thread."
    >
      <Heading x={20} y={26}>As the systems inventory describes it</Heading>
      <Node x={20} y={44} w={124} h={56} title="Operator" sub="does the work" />
      <Node x={776} y={44} w={124} h={56} title="ERP" sub="system of record" />
      <Edge id={id} points={[[144, 72], [776, 72]]} label="enters it here" labelAt={[460, 64]} />
      <Note x={20} y={128} lines={["One hop, one system. This is the lane an assessment designs for when it stops at the inventory."]} />

      <Rule x1={20} y1={158} x2={920} y2={158} />

      <Heading x={20} y={190} accent>As traced in week 3</Heading>
      <Node x={20} y={212} w={124} h={60} title="Operator" sub="same person" accent />
      <Node x={272} y={212} w={124} h={60} title="Spreadsheet" sub="local, on a laptop" accent />
      <Node x={524} y={212} w={124} h={60} title="Coordinator" sub="inbox is the queue" accent />
      <Node x={776} y={212} w={124} h={60} title="ERP" sub="system of record" />
      <Edge id={id} points={[[144, 242], [272, 242]]} label="keys it in" accent />
      <Edge id={id} points={[[396, 242], [524, 242]]} label="emailed monthly" accent />
      <Edge id={id} points={[[648, 242], [776, 242]]} label="retyped at close" accent />

      <Edge id={id} points={[[334, 272], [334, 318]]} label="pasted quarterly" dashed muted labelAt={[334, 300]} />
      <Node x={252} y={318} w={164} h={46} title="Reporting deck" sub="nobody reconciles it" dashed muted />

      <Edge id={id} points={[[460, 306], [460, 250]]} dashed muted />
      <Note x={440} y={320} lines={["The approval for the month", "exists only in this thread."]} accent />

      <Edge id={id} points={[[712, 306], [712, 250]]} dashed muted />
      <Note x={920} y={320} anchor="end" lines={["An automation has to write here.", "There is no API for a retype."]} accent />
    </Diagram>
  );
}
