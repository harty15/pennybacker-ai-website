import { founders } from "@/content/founders";
import { SITE_URL, SITE_NAME, LEGAL_NAME, CONTACT_EMAIL, SITE_DESCRIPTION, absoluteUrl } from "./site";

/** Stable @id anchors so every page's JSON-LD points at the same entities. */
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export function personSchema(f: (typeof founders)[number]) {
  return {
    "@type": "Person",
    "@id": `${SITE_URL}/about/#${slugify(f.name)}`,
    name: f.name,
    jobTitle: f.role,
    description: f.bio,
    url: absoluteUrl("/about/"),
    sameAs: [f.linkedin],
    worksFor: { "@id": ORG_ID },
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": ORG_ID,
    name: SITE_NAME,
    legalName: LEGAL_NAME,
    alternateName: [LEGAL_NAME, "Pennybacker Applied AI"],
    url: absoluteUrl("/"),
    logo: absoluteUrl("/apple-icon"),
    image: absoluteUrl("/opengraph-image"),
    description: SITE_DESCRIPTION,
    email: CONTACT_EMAIL,
    address: { "@type": "PostalAddress", addressLocality: "Austin", addressRegion: "TX", addressCountry: "US" },
    areaServed: "US",
    founder: founders.map((f) => ({ "@id": personSchema(f)["@id"] })),
    member: founders.map(personSchema),
    knowsAbout: [
      "Applied AI",
      "Agentic systems",
      "Model Context Protocol (MCP)",
      "Document intelligence",
      "Retrieval-augmented generation",
      "AI readiness assessment",
      "Project controls automation",
      "Managed AI operations",
    ],
    contactPoint: { "@type": "ContactPoint", contactType: "sales", email: CONTACT_EMAIL, availableLanguage: "en" },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: absoluteUrl("/"),
    name: SITE_NAME,
    inLanguage: "en-US",
    publisher: { "@id": ORG_ID },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}

export function serviceSchema({ name, description, path }: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    serviceType: name,
    description,
    url: absoluteUrl(path),
    provider: { "@id": ORG_ID },
    areaServed: "US",
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}
