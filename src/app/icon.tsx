import { ImageResponse } from "next/og";

import { site } from "@/content";

export const size = { width: 192, height: 192 };
export const contentType = "image/png";

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
}

/** Round sticker with the name's initials. No raster logo. */
export default function Icon() {
  const chili = site.palette?.brand ?? "#e23b2e";
  const yellow = site.palette?.mustard ?? "#ffc83d";
  const cream = site.palette?.cream ?? "#fff6e3";
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: chili,
          color: cream,
          border: `14px solid ${yellow}`,
          borderRadius: 96,
          fontSize: 78,
          fontWeight: 800,
          letterSpacing: -2,
        }}
      >
        {initials(site.name)}
      </div>
    ),
    size,
  );
}
