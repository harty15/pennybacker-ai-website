import { ImageResponse } from "next/og";
import { OgFrame, OG_SIZE, ogFontOptions } from "@/lib/og";

// Static export: generate at build time.
export const dynamic = "force-static";

// Site-wide share image, generated at build time (static export).
export const alt = "Pennybacker AI — AI that makes it to production. Applied AI consulting for operators, Austin, Texas.";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <OgFrame kicker="Applied AI · Austin, Texas" title="AI that makes it to production." footer="Roadmap · Build · Run" />,
    { ...size, fonts: await ogFontOptions() },
  );
}
