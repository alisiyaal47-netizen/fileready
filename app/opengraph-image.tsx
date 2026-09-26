import { ImageResponse } from "next/og";

export const alt = "FileReady — Check Before You Upload";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#0F172A", color: "#F8FAFC", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 36, fontWeight: 800 }}><span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 52, height: 52, borderRadius: 14, background: "#2563EB", fontSize: 30 }}>F</span>FileReady</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}><div style={{ display: "flex", flexDirection: "column", fontSize: 76, fontWeight: 800, letterSpacing: -4, lineHeight: 1.05 }}><span>Check Before</span><span>You Upload.</span></div><div style={{ fontSize: 27, color: "#F8FAFC" }}>File size / Format / Dimensions / Compatibility</div></div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 23, color: "#F8FAFC" }}><span style={{ width: 11, height: 11, borderRadius: 20, background: "#16A34A" }} />Private. Instant. Browser-based.</div>
    </div>,
    size,
  );
}
