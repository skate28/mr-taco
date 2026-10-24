import { ImageResponse } from "next/og";

import { site } from "@/content";
import { visibleLocations } from "@/lib/trucks";

export const alt = site.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Text-only share card. No photos. */
export default function OpengraphImage() {
  const ink = site.palette?.ink ?? "#1a1410";
  const chili = site.palette?.brand ?? "#e23b2e";
  const yellow = site.palette?.mustard ?? "#ffc83d";
  const cream = site.palette?.cream ?? "#fff6e3";
  const lime = site.palette?.lime ?? "#8cc63f";
  const turquoise = site.palette?.accent ?? "#13b5b1";
  const places = visibleLocations(site.locations)
    .map((location) => location.name.trim())
    .filter(Boolean)
    .join("  ·  ");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: yellow,
          color: ink,
        }}
      >
        <div style={{ display: "flex", height: 28 }}>
          <div style={{ flex: 1, background: chili }} />
          <div style={{ flex: 1, background: yellow }} />
          <div style={{ flex: 1, background: turquoise }} />
          <div style={{ flex: 1, background: site.palette?.pink ?? "#ff4d8d" }} />
          <div style={{ flex: 1, background: lime }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", padding: "0 80px" }}>
          <div style={{ display: "flex", fontSize: 120, fontWeight: 900, lineHeight: 0.9, textTransform: "uppercase", color: chili }}>
            {site.name}
          </div>
          {site.tagline.trim() ? (
            <div style={{ display: "flex", marginTop: 24, fontSize: 40, fontWeight: 700 }}>{site.tagline}</div>
          ) : null}
          {places ? (
            <div
              style={{
                display: "flex",
                marginTop: 28,
                fontSize: 28,
                fontWeight: 800,
                background: cream,
                padding: "12px 22px",
                alignSelf: "flex-start",
                borderRadius: 999,
                border: `4px solid ${ink}`,
              }}
            >
              {places}
            </div>
          ) : null}
        </div>
        <div style={{ display: "flex", height: 28, background: chili }} />
      </div>
    ),
    size,
  );
}
