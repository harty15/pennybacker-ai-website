import { ImageResponse } from "next/og";
import { Bridge } from "@/lib/og";

// Static export: generate at build time.
export const dynamic = "force-static";

// 180px home-screen icon; also referenced as the Organization logo in JSON-LD.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
        }}
      >
        <Bridge width={132} color="#ffffff" />
      </div>
    ),
    size,
  );
}
