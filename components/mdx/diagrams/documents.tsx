import { Diagram, Node, Edge, Heading, Note } from "./primitives";

/** Fig. 1 — the classification pipeline with confidence routing and write-back to the register. */
export function ClassificationPipeline() {
  const id = "doc1";
  const steps = ["Ingest", "Parse", "Classify", "Validate"];
  return (
    <Diagram id={id} viewBox="0 0 760 380" label="Documents are ingested, parsed with layout awareness, classified by a model into a constrained metadata record, validated against dictionaries and patterns, then routed by confidence: high-confidence records go to the register as AI-proposed, the rest go to a review queue where document control approves them; both paths write back to the register, which also feeds the dictionaries used for validation.">
      {steps.map((s, i) => (
        <g key={s}>
          <Node x={20 + i * 132} y={60} w={116} h={54} title={s} sub={["connectors", "OCR + title block", "constrained output", "rules + dictionaries"][i]} />
          <Edge id={id} points={[[136 + i * 132, 87], [152 + i * 132, 87]]} />
        </g>
      ))}
      <Node x={548} y={60} w={192} h={54} title="Route by confidence" sub="threshold + rule failures" accent />
      <Edge id={id} points={[[600, 114], [600, 186]]} label="high, no failures" accent labelAt={[600, 148]} />
      <Edge id={id} points={[[700, 114], [700, 186]]} label="low or any failure" labelAt={[700, 176]} />
      <Node x={470} y={186} w={180} h={52} title="AI-proposed" sub="batch view for document control" accent />
      <Node x={660} y={186} w={80} h={52} title="Review" sub="with evidence" />
      <Edge id={id} points={[[700, 238], [700, 300]]} label="approved" />
      <Edge id={id} points={[[560, 238], [560, 300]]} label="written" accent />
      <rect x={20} y={300} width={720} height={54} rx={9} className="fill-surface-2 stroke-line" strokeWidth={1.2} />
      <text x={380} y={322} textAnchor="middle" className="fill-fg font-display text-[14px] font-semibold">Document register</text>
      <text x={380} y={340} textAnchor="middle" className="fill-muted text-[11.5px]">system of record; the AI is the recorded author of a proposal, the reviewer is the approver</text>
      <Edge id={id} points={[[440, 300], [440, 114]]} label="dictionaries, tag register, current revisions" dashed muted labelAt={[300, 210]} />
      <Heading x={20} y={30}>Pipeline</Heading>
      <Note x={20} y={150} lines={["Reviewing a proposal with the evidence beside it", "takes seconds. Classifying from scratch takes minutes.", "That ratio is the business case."]} />
    </Diagram>
  );
}

/** Fig. 2 — anatomy of a drawing title block: where each metadata field is read from. */
export function TitleBlockAnatomy() {
  const id = "doc2";
  return (
    <Diagram id={id} viewBox="0 0 760 420" label="A stylized engineering drawing sheet: equipment tags in the drawing area, a revision cloud, and a title block whose cells hold the document number, revision, status, discipline and area; callouts show which field each metadata value is read from and what it is validated against.">
      {/* sheet */}
      <rect x={280} y={20} width={460} height={290} rx={4} className="fill-surface stroke-line" strokeWidth={1.4} />
      <rect x={288} y={28} width={444} height={274} className="stroke-line" strokeWidth={0.8} />
      {/* faint P&ID line-work */}
      <g className="stroke-line" strokeWidth={1.2}>
        <path d="M300 90 H470 V150 H560" />
        <path d="M300 150 H400 V210 H520" />
        <circle cx={470} cy={90} r={13} />
        <circle cx={400} cy={150} r={13} />
        <rect x={560} y={130} width={42} height={40} rx={3} />
        <path d="M520 210 H600 V180" />
      </g>
      <text x={470} y={94} textAnchor="middle" className="fill-fg font-mono text-[9px]">P-3101A</text>
      <text x={400} y={154} textAnchor="middle" className="fill-fg font-mono text-[9px]">P-3101B</text>
      <text x={581} y={125} textAnchor="middle" className="fill-fg font-mono text-[9px]">E-3205</text>
      {/* revision cloud */}
      <path d="M600 60 q8 -10 16 0 q8 -10 16 0 q8 -10 16 0 q10 8 0 16 q10 8 0 16 q-8 10 -16 0 q-8 10 -16 0 q-8 10 -16 0 q-10 -8 0 -16 q-10 -8 0 -16 z" className="stroke-accent" strokeWidth={1.2} />
      <text x={624} y={86} textAnchor="middle" className="fill-accent font-mono text-[9px]">C</text>
      {/* title block */}
      <g className="stroke-line" strokeWidth={1}>
        <rect x={430} y={228} width={302} height={74} className="fill-surface-2" />
        <line x1={430} y1={252} x2={732} y2={252} />
        <line x1={430} y1={277} x2={732} y2={277} />
        <line x1={560} y1={228} x2={560} y2={302} />
        <line x1={646} y1={252} x2={646} y2={302} />
      </g>
      <g className="fill-muted font-mono text-[8px] uppercase">
        <text x={436} y={238}>Project / area</text>
        <text x={566} y={238}>Discipline</text>
        <text x={436} y={263}>Document no.</text>
        <text x={566} y={263}>Rev</text>
        <text x={652} y={263}>Status</text>
        <text x={436} y={288}>Title</text>
        <text x={566} y={288}>Sheet</text>
        <text x={652} y={288}>Date</text>
      </g>
      <g className="fill-fg font-mono text-[10px]">
        <text x={436} y={248}>Area 3 cooling water</text>
        <text x={566} y={248}>Process</text>
        <text x={436} y={273}>3010-PID-0042</text>
        <text x={566} y={273}>C</text>
        <text x={652} y={273}>IFC</text>
        <text x={436} y={298}>Cooling water P&amp;ID</text>
        <text x={566} y={298}>1 of 1</text>
        <text x={652} y={298}>2026-08-14</text>
      </g>
      {/* callouts: drawing-area fields from the left, title-block fields from below */}
      <Heading x={20} y={30}>Read from</Heading>
      <Edge id={id} points={[[262, 60], [598, 76]]} accent />
      <Note x={20} y={58} lines={["Revision cloud: what changed", "belongs in the change summary"]} />
      <Edge id={id} points={[[262, 116], [448, 98]]} accent />
      <Note x={20} y={114} lines={["Equipment tags in the drawing text,", "each checked against the tag register"]} />
      <Note x={20} y={196} lines={["Every value has a source of truth", "that is not the model: a pattern,", "a dictionary, or the register."]} accent />
      <Edge id={id} points={[[540, 332], [540, 278]]} accent />
      <Note x={530} y={346} anchor="end" lines={["Document number, validated", "against the numbering pattern"]} />
      <Edge id={id} points={[[622, 362], [622, 278]]} accent />
      <Note x={622} y={376} anchor="middle" lines={["Revision, compared with the", "register's current value"]} />
      <Edge id={id} points={[[726, 392], [726, 278]]} accent />
      <Note x={732} y={406} anchor="end" lines={["Status stamp, from the dictionary (IFR, IFC, as-built)"]} />
    </Diagram>
  );
}

/** Fig. 3 — a revision chain and a cited answer that knows which revision is current. */
export function RevisionChain() {
  const id = "doc3";
  return (
    <Diagram id={id} viewBox="0 0 760 200" label="Three revisions of one document linked by supersedes relationships; revisions A and B are flagged superseded, C is current, and a question about what changed is answered from the C-to-B diff with a citation to the document number, revision and sheet.">
      <Node x={20} y={50} w={130} h={56} title="Rev A" sub="superseded · IFR" muted />
      <Node x={210} y={50} w={130} h={56} title="Rev B" sub="superseded · IFR" muted />
      <Node x={400} y={50} w={130} h={56} title="Rev C" sub="current · IFC" accent />
      <Edge id={id} points={[[150, 78], [210, 78]]} label="superseded by" labelAt={[180, 124]} />
      <Edge id={id} points={[[340, 78], [400, 78]]} label="superseded by" labelAt={[370, 124]} />
      <Node x={580} y={30} w={160} h={44} title="What changed in C?" />
      <Edge id={id} points={[[580, 52], [530, 68]]} muted />
      <Node x={580} y={110} w={160} h={64} title="Cited answer" sub="diff of C against B" accent />
      <Edge id={id} points={[[465, 106], [465, 150], [580, 150]]} label="3010-PID-0042 rev C, sheet 1" accent labelAt={[470, 172]} />
      <Note x={20} y={146} lines={["A superseded revision is never quoted without saying so:", "“this is revision B; revision C was issued for", "construction on 2026-08-14.”"]} />
    </Diagram>
  );
}
