// Per-service page content. Rendered by app/(marketing)/services/{roadmap,build,run}/page.tsx.
// [VERIFY] markers note claims pending Ryan's confidentiality/accuracy sign-off.

export const roadmap = {
  eyebrow: "Roadmap",
  title: "Know what to build before you build it.",
  lead: "A plan with ROI math. Not a deck with vibes.",
  subhead:
    "Whether you're drowning in vendor noise, staring at a stalled pilot, or getting board pressure to “do AI” — we map your operation, score the opportunities, and hand you a build-ready plan in two to six weeks.",
  problems: [
    { title: "Strategy without execution", body: "Consultants hand you a roadmap and leave. The people who wrote it never have to ship it." },
    { title: "Generic AI checklists", body: "Off-the-shelf “readiness” frameworks that don't know your systems, your data, or your constraints." },
    { title: "Analysis past its shelf life", body: "Six-month strategy engagements that are obsolete before the build even starts." },
  ],
  differentiators: [
    { title: "We build what we recommend", body: "The roadmap is written by the engineers who'd ship it — grounded in what's actually buildable." },
    { title: "Operators surveying operators", body: "We run AI inside a real, regulated operation every day, so we ask the questions that matter on the floor." },
    { title: "Weeks, not quarters", body: "Two to six weeks to a build-ready plan — scoped to your operation, not stretched to fill a retainer." },
  ],
  timeline: [
    { index: "01", week: "Weeks 1–2", name: "Listen", anchor: "survey", body: "We sit with the people doing the work and map how it actually flows.", chips: ["Workflow map", "Stakeholder map", "Systems inventory"] },
    { index: "02", week: "Weeks 3–4", name: "Assess", anchor: "audit", body: "Data and systems, honestly graded for what's connectable and what's blocking.", chips: ["Data readiness report", "Integration assessment", "Risk & compliance notes"] },
    { index: "03", week: "Weeks 5–6", name: "Decide", anchor: "roi", body: "Ranked opportunities, honest math, and the first build scoped.", chips: ["Prioritized roadmap", "ROI model", "Architecture sketch", "Pilot plan"] },
  ],
  pricing: {
    heading: "What it costs",
    body: "Fixed-fee, scoped to operation size — quoted on the intro call. [CONFIRM-PRICING]. If we later build the roadmap, a portion of the fee credits toward the build.",
  },
  closingStat: "The team writing your roadmap is the team that ships it.",
  cta: { heading: "Get a plan you can actually build." },
} as const;

export const build = {
  eyebrow: "Build",
  title: "Senior engineers who ship agentic systems.",
  lead: "Production in weeks. Not promises in quarters.",
  subhead:
    "Scoped build or ongoing engineering partner — we design, build, and harden AI systems inside your real environment: your data, your permissions, your compliance constraints. Working software early, production-grade always.",
  features: [
    { heading: "Internal AI systems", body: "Tools that change how your team works.", bullets: ["Document classification & extraction at scale", "Conversational access to operational data (MCP)", "Workflow automation agents", "Reporting & analysis copilots"] },
    { heading: "Product AI features", body: "Agentic capability inside your software.", bullets: ["RAG & retrieval systems", "Conversational interfaces", "Generative features with guardrails", "Usage-based cost architecture"] },
    { heading: "Data & agent infrastructure", body: "The plumbing that makes it dependable.", bullets: ["Pipelines & ingestion (documents, ERP, field data)", "MCP servers over enterprise systems", "Evaluation harnesses & regression suites", "Observability, logging, and audit trails"] },
  ],
  engagementModels: [
    { title: "Scoped Build", type: "Fixed deliverable", bestFor: ["A specific system or feature", "Document intelligence & automation builds", "A first AI project with contained risk"] },
    { title: "Embedded Partner", type: "Ongoing retainer", bestFor: ["Sustained AI roadmap execution", "Product teams adding AI capability", "Operators compounding workflow automation"] },
  ],
  engagementNote: "Fixed quotes on the intro call — no discovery-phase toll booth.",
  differentiators: [
    { title: "AI-native", body: "We build with agents, not just for them — our own delivery pipeline is an agentic system." },
    { title: "Engineers multiplied by agents", body: "Small senior teams that move like big ones, because agents do the repetitive work." },
    { title: "Operating context built in", body: "Every line of code carries the operational context from the survey — we design for your real environment." },
  ],
  statLeadIn: "The engineers on your build have shipped systems over 5,000+ documents and 15+ enterprise systems.",
  cta: { heading: "Let's build the thing.", body: "Bring the workflow that's eating your team. We'll tell you in 30 minutes whether it's automatable — and what it would take." },
} as const;

export const run = {
  eyebrow: "Run",
  title: "AI, operated for you.",
  lead: "Shipped today. Better next quarter.",
  subhead:
    "The model landscape turns over every few months. We keep your systems current, your costs visible, and your team shipping new workflows — without you standing up an AI ops function.",
  challenges: ["Cost & token telemetry", "Model deprecations & upgrades", "Permissioning & governance", "Quality drift & evals", "New-capability adoption", "Team training", "Incident response"],
  benefits: ["Usage and cost, always visible", "Models upgraded as capabilities improve", "Governance and access controlled", "Evals that catch quality drift early", "New capabilities adopted as they ship", "Your team trained as the system grows"],
  benefitPunchline: "All of the upside. None of the ops burden.",
  operatingLoop: [
    { index: "01", name: "Watch", anchor: "telemetry", body: "Usage, cost, and quality telemetry across every system we operate." },
    { index: "02", name: "Tune", anchor: "upgrades", body: "Model and capability upgrades, governance, and access — kept current." },
    { index: "03", name: "Extend", anchor: "workflows", body: "New workflows shipped every month as your team finds new ground." },
  ],
  deliverables: ["Monthly operations report", "Cost dashboard", "Upgrade log", "Governance pack", "Workflow release notes"],
  pricing: {
    heading: "How it's priced",
    body: "Monthly retainer, sized to system count and cadence — quoted on the intro call. [CONFIRM-PRICING]. Cancel anytime; you own everything we built.",
  },
  cta: { heading: "Keep your AI getting better.", body: "If you have systems in production — ours or anyone's — we can operate them." },
} as const;
