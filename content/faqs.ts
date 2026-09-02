// Service-page FAQs. Every answer restates a claim already made elsewhere on
// the site — no new commitments. Rendered by <Faq/> with FAQPage JSON-LD.

export type FaqItem = { q: string; a: string };

export const roadmapFaqs: FaqItem[] = [
  {
    q: "How long does an AI roadmap take?",
    a: "Two to six weeks, depending on the size of the operation. Weeks one to two are interviews and workflow mapping, weeks three to four are the systems and data assessment, and weeks five to six produce the ranked roadmap, ROI model, and pilot plan.",
  },
  {
    q: "What do we get at the end?",
    a: "A prioritized roadmap with honest ROI math, a data-readiness and integration assessment, an architecture sketch, and a scoped, costed pilot plan — written by the engineers who would build it.",
  },
  {
    q: "How is the roadmap priced?",
    a: "Fixed fee, scoped to the size of the operation and quoted on the intro call. If we go on to build the roadmap, a portion of the fee credits toward the build.",
  },
  {
    q: "Do we have to build with you afterward?",
    a: "No. The roadmap is yours and is written to be buildable by any competent team. Most clients keep the same engineers because nothing is lost in a handoff.",
  },
  {
    q: "Which industries do you work in?",
    a: "Energy and industrial operations, capital — investment teams and their operating companies — and technology companies adding AI capability to their products.",
  },
];

export const buildFaqs: FaqItem[] = [
  {
    q: "What kinds of AI systems do you build?",
    a: "Internal AI systems — document classification and extraction, conversational access to operational data over MCP, workflow automation agents, reporting copilots — product AI features such as RAG and conversational interfaces with guardrails, and the data and agent infrastructure underneath them.",
  },
  {
    q: "How long until something is in production?",
    a: "Weeks, not quarters. We ship working software early and harden it inside your real environment — your data, your permissions, your compliance constraints — instead of building a demo first.",
  },
  {
    q: "What is an MCP integration?",
    a: "Model Context Protocol servers give an AI system governed, auditable access to a platform such as an ERP, scheduling, cost, or document system, so operators can ask questions in plain English and get answers that respect existing permissions.",
  },
  {
    q: "How do engagements work?",
    a: "Two models: a scoped build with a fixed deliverable and a fixed quote, or an embedded-partner retainer for ongoing AI roadmap execution. Quotes are given on the intro call — there is no paid discovery phase.",
  },
  {
    q: "Which models and stack do you use?",
    a: "We are model-agnostic: Anthropic Claude, OpenAI, Gemini, Llama, and Mistral. We build on MCP, LangGraph, the Claude Agent SDK, and the Vercel AI SDK, with PostgreSQL, Snowflake, and vector stores, on AWS, Azure, or GCP as your environment requires.",
  },
  {
    q: "Who owns what you build?",
    a: "You do. Everything we build runs in your environment and stays with you.",
  },
];

export const runFaqs: FaqItem[] = [
  {
    q: "What does managed AI operations include?",
    a: "Usage and cost telemetry, model and capability upgrades as the landscape changes, governance and access control, evals that catch quality drift early, incident response, team training, and new workflows shipped every month.",
  },
  {
    q: "Can you operate AI systems you didn't build?",
    a: "Yes. If you have AI systems in production — ours or anyone's — we can operate them.",
  },
  {
    q: "How is Run priced?",
    a: "A monthly retainer sized to the number of systems and the cadence of new work, quoted on the intro call. Cancel anytime; you own everything we built.",
  },
  {
    q: "What do we receive each month?",
    a: "A monthly operations report, a cost dashboard, an upgrade log, a governance pack, and release notes for new workflows.",
  },
  {
    q: "Why not run it ourselves?",
    a: "You can, and we train your team as the system grows. Most operators choose Run because the model landscape turns over every few months, and standing up an AI operations function is slower and costlier than renting one.",
  },
];
