import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const dynamic = "force-static";

export const alt =
  "Motion Vitality Pilates — Pilates & GYROTONIC® studio in Markham";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logoData = await readFile(
    join(
      process.cwd(),
      "public/assets/brand/mvp-primary-lockup-white.png",
    ),
    "base64",
  );
  const logoSrc = `data:image/png;base64,${logoData}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "stretch",
          justifyContent: "center",
          background: "linear-gradient(135deg, #315344 0%, #15241f 100%)",
          color: "#ffffff",
          fontFamily: "serif",
          padding: "72px 84px",
        }}
      >
        <div
          style={{
            width: "43%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingRight: 64,
            borderRight: "1px solid rgba(255,255,255,0.25)",
          }}
        >
          {/* ImageResponse renders native image elements rather than next/image. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoSrc}
            alt="Motion Vitality Pilates"
            width={410}
            height={186}
            style={{ objectFit: "contain" }}
          />
        </div>
        <div
          style={{
            width: "57%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft: 64,
          }}
        >
          <div
            style={{
              fontSize: 20,
              fontFamily: "sans-serif",
              textTransform: "uppercase",
              letterSpacing: 5,
              color: "#abd0bb",
            }}
          >
            Markham · Ontario
          </div>
          <div
            style={{
              marginTop: 22,
              fontSize: 52,
              lineHeight: 1.04,
              letterSpacing: -1,
            }}
          >
            Strong mind starts with a fit body
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 23,
              fontFamily: "sans-serif",
              color: "rgba(255,255,255,0.76)",
            }}
          >
            Polestar-certified Pilates &amp; GYROTONIC® studio
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
