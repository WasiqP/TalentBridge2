import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 88px",
          background:
            "linear-gradient(135deg, #08080c 0%, #14141c 60%, #1a1320 100%)",
          color: "#fafaf7",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 24,
            letterSpacing: -0.5,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "linear-gradient(135deg, #c1f968, #5eead4, #8b5cf6)",
            }}
          />
          <span style={{ fontWeight: 600 }}>{siteConfig.name}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 92,
              fontWeight: 500,
              lineHeight: 1,
              letterSpacing: -2,
              maxWidth: 900,
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            <span>Hire 10x faster. With ten times</span>
            <span
              style={{
                fontStyle: "italic",
                background:
                  "linear-gradient(120deg, #c1f968, #5eead4, #8b5cf6)",
                backgroundClip: "text",
                color: "transparent",
                marginLeft: 16,
              }}
            >
              the signal.
            </span>
          </div>
          <div style={{ fontSize: 26, color: "rgba(250,250,247,0.7)", maxWidth: 800 }}>
            The AI copilot for recruiters. Sourcing, screening, and outreach — on
            autopilot.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 20,
            color: "rgba(250,250,247,0.5)",
          }}
        >
          <span>talentbridge.ai</span>
          <span>SOC 2 Type II · GDPR · CCPA</span>
        </div>
      </div>
    ),
    size,
  );
}
