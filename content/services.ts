export const services = [
  {
    id: "roadmap",
    href: "/services/roadmap",
    tagline: "AI readiness, scored",
    title: "Roadmap",
    body: "We sit with the people doing the work, map the workflows worth automating, and hand you a prioritized plan with honest ROI math.",
    bullets: ["Workflow & systems mapping", "Opportunity scoring", "Roadmap with ROI model"],
  },
  {
    id: "build",
    href: "/services/build",
    tagline: "Production systems",
    title: "Build",
    body: "Document intelligence, conversational access to your data, workflow automation — integrated with the systems you already run.",
    bullets: ["Custom agents & pipelines", "MCP integrations", "Production hardening"],
  },
  {
    id: "run",
    href: "/services/run",
    tagline: "Operated, not abandoned",
    title: "Run",
    body: "AI isn't a one-time install. We monitor cost and usage, upgrade models, and add workflows as your team finds new ground.",
    bullets: ["Monitoring & cost control", "Model & capability upgrades", "Continuous new workflows"],
  },
] as const;
