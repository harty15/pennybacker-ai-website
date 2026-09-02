import { Diagram, Node, Edge, Heading, Note, Rule } from "./primitives";

/** Fig. 1 — the handoff model versus one team: the document hop is the difference. */
export function HandoffVsOneTeam() {
  const id = "gap1";
  return (
    <Diagram id={id} viewBox="0 0 760 340" label="Two models compared: in the handoff model a strategy team writes a roadmap document that a separate build team reads, and the operational detail that never made it into the document falls into the gap; in the one-team model the engineers who surveyed the operation build the system and carry the context themselves.">
      <Heading x={20} y={26}>The handoff model</Heading>
      <Node x={20} y={44} w={180} h={62} title="Strategy team" sub="interviews, benchmarks" />
      <Node x={290} y={44} w={180} h={62} title="Roadmap document" sub="what fit on the slides" dashed />
      <Node x={560} y={44} w={180} h={62} title="Build team" sub="starts from the document" />
      <Edge id={id} points={[[200, 75], [290, 75]]} label="writes" />
      <Edge id={id} points={[[470, 75], [560, 75]]} label="hands off" />
      <Edge id={id} points={[[380, 106], [380, 150]]} muted />
      <Note x={380} y={168} anchor="middle" lines={["Never in the document: the exceptions, field-level data quality,", "the baseline, the permission model, who owns it in month four"]} />
      <Rule x1={20} y1={205} x2={740} y2={205} />

      <Heading x={20} y={236} accent>One team</Heading>
      <Node x={20} y={254} w={290} h={62} title="Engineers who did the survey" sub="sat with the operators, now write the code" accent />
      <Node x={560} y={254} w={180} h={62} title="Working system" sub="in the real environment" accent />
      <Edge id={id} points={[[310, 285], [560, 285]]} label="carries the context in people" accent labelAt={[435, 277]} />
      <Node x={355} y={300} w={160} h={34} title="Roadmap (short)" muted />
    </Diagram>
  );
}

/** Fig. 2 — a demo versus a production-shaped pilot: same box, different wiring. */
export function DemoVsPilot() {
  const id = "gap2";
  return (
    <Diagram id={id} viewBox="0 0 760 320" label="Side by side: a demo fed by sample data under a service account, versus a pilot that acts under the operator's own identity, reads and writes the real system of record, is graded by an evaluation set, and logs every call.">
      <Heading x={20} y={26}>The demo</Heading>
      <Node x={20} y={120} w={130} h={56} title="Sample data" sub="200 clean documents" />
      <Node x={210} y={120} w={130} h={56} title="Demo" sub="impresses a room" />
      <Node x={20} y={214} w={130} h={56} title="Service account" sub="reads everything" />
      <Edge id={id} points={[[150, 148], [210, 148]]} label="loads" />
      <Edge id={id} points={[[150, 242], [180, 242], [180, 176], [210, 176]]} label="one credential" labelAt={[178, 212]} />
      <Note x={20} y={300} lines={["Nothing here exists in production."]} />

      <line x1={385} y1={20} x2={385} y2={300} className="stroke-line" strokeWidth={1} />

      <Heading x={410} y={26} accent>Production-shaped pilot</Heading>
      <Node x={410} y={120} w={130} h={56} title="Operator" sub="their own identity" />
      <Node x={590} y={120} w={150} h={56} title="Pilot" sub="ugly, real, running" accent />
      <Node x={590} y={214} w={150} h={56} title="System of record" sub="permissions enforced here" />
      <Node x={410} y={214} w={130} h={56} title="Eval set" sub="questions operators asked" />
      <Node x={410} y={44} w={130} h={44} title="Audit log" />
      <Edge id={id} points={[[540, 148], [590, 148]]} label="user token" accent />
      <Edge id={id} points={[[665, 176], [665, 214]]} label="reads, writes" start labelAt={[626, 199]} />
      <Edge id={id} points={[[540, 242], [565, 242], [565, 176]]} label="graded on change" labelAt={[475, 205]} />
      <Edge id={id} points={[[590, 130], [540, 66]]} label="every call" dashed muted labelAt={[555, 100]} />
      <Note x={410} y={300} lines={["Smaller than the demo. Already a system."]} accent />
    </Diagram>
  );
}
