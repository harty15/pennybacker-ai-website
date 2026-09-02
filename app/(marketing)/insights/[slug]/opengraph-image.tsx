import { ImageResponse } from "next/og";
import { OgFrame, OG_SIZE, ogFontOptions } from "@/lib/og";
import { getPost, postParams, authors, formatDate, tagLabel } from "@/lib/posts";

// Static export: one PNG per post at build time.
export const dynamic = "force-static";

export const alt = "Pennybacker AI insight";
export const size = OG_SIZE;
export const contentType = "image/png";

export async function generateStaticParams() {
  return postParams();
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  const kicker = post ? `Insights · ${tagLabel(post.tags[0])}` : "Insights";
  const footer = post ? `${authors[post.author].name} · ${formatDate(post.date)}` : "Pennybacker AI";
  return new ImageResponse(
    <OgFrame kicker={kicker} title={post?.title ?? "Field notes on production AI"} footer={footer} />,
    { ...size, fonts: await ogFontOptions() },
  );
}
