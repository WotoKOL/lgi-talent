import { ImageResponse } from "next/og";
export const runtime = "nodejs";
export const alt = "LGI — Linking Brands. Empowering Creators.";
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
        <span style={{ fontSize: 58, fontWeight: 900, color: "#fff200" }}>
          ✳ LGI.
        </span>
        <span style={{ fontSize: 18, letterSpacing: 3 }}>
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
