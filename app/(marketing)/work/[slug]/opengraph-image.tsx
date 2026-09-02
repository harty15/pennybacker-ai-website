import { ImageResponse } from "next/og";
import { OgFrame, OG_SIZE, ogFontOptions } from "@/lib/og";
import { work, TAG_LABELS } from "@/content/work";

// Static export: generate at build time.
export const dynamic = "force-static";

// Per-brief share image (one PNG per slug at build time).
export const alt = "Pennybacker AI case study";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return work.map((w) => ({ slug: w.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const brief = work.find((w) => w.slug === slug);
  const kicker = brief ? `Case study · ${TAG_LABELS[brief.tags[0]]}` : "Case study";
  return new ImageResponse(
    <OgFrame kicker={kicker} title={brief?.title ?? "Production AI, shipped."} footer={brief?.client ?? "Pennybacker AI"} />,
    { ...size, fonts: await ogFontOptions() },
  );
}
