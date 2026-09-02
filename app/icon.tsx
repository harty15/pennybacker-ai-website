import { ImageResponse } from "next/og";
import { Bridge } from "@/lib/og";

// Static export: generate at build time.
export const dynamic = "force-static";

// 32px PNG favicon for browsers that ignore icon.svg (Safari, some search result UIs).
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#b5482b",
          borderRadius: 7,
        }}
      >
        <Bridge width={26} color="#ffffff" />
      </div>
    ),
    size,
  );
}
