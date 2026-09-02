import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, CONTACT_EMAIL } from "@/lib/site";
import { work } from "@/content/work";
import { getAllPosts } from "@/lib/posts";

// /llms.txt — a plain-text map of the site for AI crawlers and assistants
// (https://llmstxt.org). Emitted at build time; keep it in sync with the sitemap.
export const dynamic = "force-static";

export async function GET() {
  const posts = await getAllPosts();
  const url = (path: string) => `${SITE_URL}${path}`;
  const lines = [
    `# ${SITE_NAME}`,
    "",
    `> ${SITE_DESCRIPTION}`,
    "",
    "Pennybacker AI (Harty Consulting LLC) is a founder-led applied-AI consultancy in Austin, Texas. It works with operators in energy and industrial operations, capital (investment teams and their operating companies), and technology companies. The firm is named for the Pennybacker Bridge: it exists to span the gap between an AI plan and a working system.",
    "",
    "## Services",
    "",
    `- [Services overview](${url("/services/")}): Roadmap, Build, and Run — one senior team across the full AI lifecycle.`,
    `- [Roadmap](${url("/services/roadmap/")}): AI readiness assessment for an operation — workflow mapping, systems and data audit, scored opportunities with ROI math, and a build-ready pilot plan in two to six weeks. Fixed fee.`,
    `- [Build](${url("/services/build/")}): Production agentic systems — custom agents, MCP servers over enterprise systems, document classification and RAG, evaluation harnesses and observability. Scoped build or embedded partner.`,
    `- [Run](${url("/services/run/")}): Managed AI operations — usage and cost telemetry, model and capability upgrades, governance and access control, new workflows monthly. Monthly retainer.`,
    "",
    "## Method",
    "",
    `- [Survey, Span, Sustain](${url("/method/")}): Operational understanding first, production always, continuous improvement after launch. The engineers who map the work write the code.`,
    "",
    "## Case studies",
    "",
    ...work.map((w) => `- [${w.title}](${url(`/work/${w.slug}/`)}): ${w.highlights[0]}. ${w.client}.`),
    "",
    ...(posts.length
      ? [
          "## Insights (practitioner notes)",
          "",
          ...posts.map((p) => `- [${p.title}](${url(`/insights/${p.slug}/`)}): ${p.description}`),
          "",
        ]
      : []),
    "## Company",
    "",
    `- [About](${url("/about/")}): Founders Ryan Harty (Founder & Principal Engineer) and Max Holter (Lead Data Engineer).`,
    `- [Contact](${url("/contact/")}): Book a 30-minute intro call or email ${CONTACT_EMAIL}.`,
    "",
    "## Optional",
    "",
    `- [Privacy](${url("/privacy/")})`,
    `- [Terms](${url("/terms/")})`,
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
