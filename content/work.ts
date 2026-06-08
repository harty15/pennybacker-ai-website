export type WorkTag = "energy" | "capital" | "technology" | "internal";

export const TAG_LABELS: Record<WorkTag, string> = {
  energy: "Energy & Industrial",
  capital: "Capital",
  technology: "Technology",
  internal: "Internal systems",
};

export type Brief = {
  slug: string;
  title: string;
  client: string;
  tags: WorkTag[];
  services: ("roadmap" | "build" | "run")[];
  featured: boolean;
  metrics: { value: string; label: string }[];
  highlights: string[];
  situation: string;
  build: string;
  capabilities: string[];
  results: string[];
  challenge: string[];
  solution: string[];
};

// All briefs are [VERIFY] until Fermi confidentiality is cleared — capability/architecture level only.
export const work: Brief[] = [
  {
    slug: "document-intelligence-at-scale",
    title: "Putting 5,000+ engineering documents under AI classification",
    client: "Industrial megaproject (anonymized)",
    tags: ["energy"],
    services: ["build"],
    featured: true,
    metrics: [
      { value: "5,000+", label: "documents classified" },
      { value: "Cited", label: "plain-English answers" },
      { value: "24/7", label: "automated reporting" },
    ],
    highlights: [
      "AI classification across the full engineering document register",
      "Plain-English Q&A over equipment, revisions, and specs",
      "Status reporting that used to be manual, now automated",
    ],
    situation:
      "An active construction megaproject generates thousands of engineering documents — drawings, specs, transmittals, vendor data — across multiple systems. Finding the right revision, or answering “what changed,” meant manual search and days of analyst time.",
    build:
      "We built an AI classification and retrieval layer over the full document register: every document tagged with equipment, system, discipline, and revision metadata, then made queryable in plain English with governed, cited answers.",
    capabilities: [
      "Document classification & metadata extraction at scale",
      "Revision tracking and change detection",
      "Plain-English Q&A with citations",
      "Automated status reporting",
    ],
    results: [
      "Answers in minutes that previously took days of analyst search",
      "Consistent metadata across a previously inconsistent register",
      "Reporting that runs itself",
    ],
    challenge: ["Thousands of docs, inconsistent registers", "Critical revision data buried in PDFs", "Manual reporting eating analyst time"],
    solution: ["AI classification over the full register", "Cited, governed Q&A in plain English", "Automated reporting pipeline"],
  },
  {
    slug: "conversational-enterprise-data",
    title: "Making 15+ enterprise systems conversational",
    client: "Industrial megaproject (anonymized)",
    tags: ["energy"],
    services: ["build"],
    featured: false,
    metrics: [
      { value: "15+", label: "enterprise systems integrated" },
      { value: "7+", label: "production MCP servers" },
    ],
    highlights: [
      "MCP servers over ERP, scheduling, and cost platforms",
      "Operators query in plain English; answers stay governed",
      "One conversational layer across many systems",
    ],
    situation:
      "Operational data lived in a dozen-plus enterprise platforms — ERP, scheduling, cost management, document control. A cross-system answer meant logging into several tools and reconciling by hand.",
    build:
      "We stood up MCP servers connecting LLMs to each platform with scoped, auditable access, so operators ask questions in plain English and get governed answers that respect existing permissions.",
    capabilities: [
      "MCP servers over ERP, scheduling, cost, and document systems",
      "Permission- and audit-aware access",
      "Cross-system question answering",
      "Plain-English interface for non-technical operators",
    ],
    results: [
      "Cross-system answers without logging into five tools",
      "Access governed by existing permissions",
      "A reusable integration pattern across the platform estate",
    ],
    challenge: ["Data siloed across 15+ platforms", "Cross-system questions took manual reconciliation", "Strict access and audit requirements"],
    solution: ["MCP servers per system, governed access", "One conversational layer across all of them", "Auditable, permission-aware answers"],
  },
  {
    slug: "agentic-cost-forecasting",
    title: "Automating cash-flow validation across a project portfolio",
    client: "Industrial megaproject (anonymized)",
    tags: ["energy"],
    services: ["build", "run"],
    featured: false,
    metrics: [
      { value: "Multi-agent", label: "validation pipelines" },
      { value: "Portfolio", label: "-wide coverage" },
    ],
    highlights: [
      "Multi-agent validation of baselines, actuals, and forecasts",
      "Cross-checks across cost and schedule sources",
      "A multi-day manual cycle compressed to minutes",
    ],
    situation:
      "Cash-flow forecasting across a portfolio meant reconciling baselines, actuals, and forecasts across multiple systems — a slow, error-prone, multi-day manual cycle.",
    build:
      "We built multi-agent pipelines that validate baseline allocation, reconcile actuals against AP data, and check forecast reasonableness across the portfolio, flagging exceptions for human review.",
    capabilities: [
      "Baseline allocation validation",
      "Actuals reconciliation across systems",
      "Forecast reasonableness checks",
      "Exception flagging for human review",
    ],
    results: ["A multi-day cycle compressed to minutes", "Consistent checks across the whole portfolio", "Humans review exceptions, not everything"],
    challenge: ["Manual reconciliation across systems", "Multi-day, error-prone cycle", "Portfolio scale"],
    solution: ["Multi-agent validation pipelines", "Automated cross-checks", "Human-in-the-loop on exceptions"],
  },
  {
    slug: "litigation-document-intelligence",
    title: "RAG over 11,500 pages of litigation exhibits",
    client: "Family office (anonymized)",
    tags: ["capital"],
    services: ["build"],
    featured: false,
    metrics: [
      { value: "745", label: "exhibits indexed" },
      { value: "11,500+", label: "pages searchable" },
      { value: "Cited", label: "answers, every time" },
    ],
    highlights: [
      "Semantic search + metadata filters across the exhibit corpus",
      "Cited-answer Q&A grounded in source documents",
      "Timeline and cross-reference tooling",
    ],
    situation:
      "A litigation matter involved hundreds of exhibits totaling over 11,500 pages. Finding the relevant document, or building a timeline, meant manual review at a scale that doesn't fit a deadline.",
    build:
      "We built a retrieval system combining semantic vector search with metadata filters over the full exhibit corpus, plus cited-answer Q&A that always grounds responses in source pages.",
    capabilities: [
      "Semantic + metadata search across 745 exhibits",
      "Cited Q&A grounded in source documents",
      "Timeline and cross-reference tooling",
      "Party-aware document classification",
    ],
    results: ["Relevant exhibits surfaced in seconds", "Every answer traceable to a source page", "Review at deadline speed"],
    challenge: ["11,500+ pages, hundreds of exhibits", "Manual review doesn't scale to deadlines", "Answers must be source-grounded"],
    solution: ["Hybrid semantic + metadata retrieval", "Cited Q&A over the corpus", "Timeline + cross-reference tools"],
  },
  {
    slug: "vendor-reporting-automation",
    title: "One-command vendor financial tear sheets",
    client: "Industrial megaproject (anonymized)",
    tags: ["energy"],
    services: ["build", "run"],
    featured: false,
    metrics: [
      { value: "Daily", label: "automated data pipeline" },
      { value: "One command", label: "to a full report" },
    ],
    highlights: [
      "Combines AP, PO, and forecast data into vendor tear sheets",
      "Daily automated refresh",
      "Report prep that used to be manual, now on demand",
    ],
    situation:
      "Vendor reporting pulled from AP, purchase-order, and forecast systems and was assembled by hand — slow, and stale by the time it was done.",
    build:
      "We built a pipeline that refreshes vendor data daily and a generator that assembles formatted tear sheets and AP/PO reports on a single command.",
    capabilities: [
      "Daily automated data pipeline",
      "AP + PO + forecast consolidation",
      "Formatted report generation on demand",
      "Dispute and payment-history tracking",
    ],
    results: ["Reports on demand instead of days of prep", "Always working from fresh data", "A repeatable pattern for new report types"],
    challenge: ["Data across AP, PO, and forecast systems", "Manual assembly, stale by completion", "Repeated every reporting cycle"],
    solution: ["Daily automated pipeline", "One-command report generation", "Reusable across report types"],
  },
  {
    slug: "firm-os",
    title: "Our own firm runs on the systems we sell",
    client: "Internal — Pennybacker AI",
    tags: ["internal"],
    services: ["build", "run"],
    featured: false,
    metrics: [
      { value: "Agentic", label: "knowledge base & ops" },
      { value: "This site", label: "built agentically" },
    ],
    highlights: [
      "An agentic knowledge base runs firm operations",
      "Proposal and research pipelines are themselves AI systems",
      "This website was designed and built with agents",
    ],
    situation:
      "A two-person firm can't afford operational drag. So we run the firm the way we tell clients to run theirs — on agents.",
    build:
      "Our internal stack is itself an agentic system: a knowledge base that answers questions across our work, pipelines that draft proposals and research, and a build process (including this site) driven by agents under human review.",
    capabilities: [
      "Agentic knowledge base over firm context",
      "Proposal & research drafting pipelines",
      "Agent-driven engineering workflow",
      "Human-in-the-loop governance throughout",
    ],
    results: ["Two people operating like a much larger team", "The methods we sell, proven on ourselves", "Compounding leverage as we add workflows"],
    challenge: ["Two-person firm, no room for ops drag", "We want to prove our own methods", "Leverage has to compound"],
    solution: ["Run firm ops on agents", "Proposal / research / build pipelines", "Govern with humans in the loop"],
  },
];

export const featuredWork = work.filter((w) => w.featured).concat(work.filter((w) => !w.featured)).slice(0, 3);
