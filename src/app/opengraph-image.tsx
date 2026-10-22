import { ImageResponse } from "next/og";
import { site } from "@/lib/site";
export const runtime = "nodejs";
export const alt = "Linking Global Influencer — Linking Brands. Empowering Creators.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OG() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#10110f",
        color: "#f6f5ef",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "65px 70px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <span style={{ fontSize: 50, fontWeight: 900, color: "#fff200" }}>
            ✳ {site.shortName}.
          </span>
          <span style={{ fontSize: 26, fontWeight: 700 }}>{site.fullName}</span>
        </div>
        <span style={{ fontSize: 14, letterSpacing: 2, maxWidth: 260, textAlign: "right" }}>
          LOS ANGELES ROOTS. GLOBAL REACH.
        </span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 85,
          fontWeight: 900,
          lineHeight: 1.03,
          letterSpacing: -4,
        }}
      >
        <span>LINKING BRANDS.</span>
        <span style={{ color: "#fff200" }}>EMPOWERING</span>
        <span style={{ color: "#ffcc4b" }}>CREATORS.</span>
      </div>
      <span style={{ fontSize: 19 }}>
        GLOBAL INFLUENCER MARKETING & CREATOR MANAGEMENT
      </span>
    </div>,
    size,
  );
}
