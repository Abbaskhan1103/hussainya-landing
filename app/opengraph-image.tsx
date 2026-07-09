import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { DEFAULT_TITLE } from "@/lib/seo";

export const alt = DEFAULT_TITLE;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const GOLD = "#c9a84c";

export default async function OpengraphImage() {
  const [lora500, lora600] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/lora-latin-500.ttf")),
    readFile(join(process.cwd(), "assets/fonts/lora-latin-600.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#070d1f",
          fontFamily: "Lora",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 28,
            left: 28,
            right: 28,
            bottom: 28,
            border: "1px solid rgba(201, 168, 76, 0.35)",
          }}
        />
        <svg width="110" height="110" viewBox="0 0 32 32" fill="none">
          <path
            d="M16 1.5l4.243 10.257L31 16l-10.757 4.243L16 30.5l-4.243-10.257L1 16l10.757-4.243L16 1.5z"
            stroke={GOLD}
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M5 5l8.485 8.485M27 5l-8.485 8.485M27 27l-8.485-8.485M5 27l8.485-8.485"
            stroke={GOLD}
            strokeWidth="0.75"
            opacity="0.7"
          />
          <circle cx="16" cy="16" r="2.5" stroke={GOLD} strokeWidth="0.75" fill="none" />
        </svg>
        <div
          style={{
            marginTop: 36,
            fontSize: 96,
            fontWeight: 600,
            color: "#edf0f7",
            letterSpacing: "-0.02em",
          }}
        >
          Hussainya
        </div>
        <div style={{ marginTop: 20, fontSize: 34, fontWeight: 500, color: GOLD }}>
          A digital home for the Ahl al-Bayt community
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 64,
            fontSize: 22,
            fontWeight: 500,
            color: "#8a9ab8",
            letterSpacing: "0.3em",
          }}
        >
          HUSSAINYA.COM
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Lora", data: lora500, weight: 500 },
        { name: "Lora", data: lora600, weight: 600 },
      ],
    },
  );
}
