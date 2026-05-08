import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

const INTER_700 = () =>
  fetch(
    "https://cdn.jsdelivr.net/npm/@fontsource/inter@5.0.16/files/inter-latin-700-normal.woff",
  ).then((res) => res.arrayBuffer());

const INTER_900 = () =>
  fetch(
    "https://cdn.jsdelivr.net/npm/@fontsource/inter@5.0.16/files/inter-latin-900-normal.woff",
  ).then((res) => res.arrayBuffer());

export default async function Icon() {
  let fonts:
    | {
        name: "Inter";
        data: ArrayBuffer;
        style: "normal";
        weight: 700 | 900;
      }[]
    | undefined;

  try {
    const [data700, data900] = await Promise.all([INTER_700(), INTER_900()]);
    fonts = [
      { name: "Inter", data: data700, style: "normal", weight: 700 as const },
      { name: "Inter", data: data900, style: "normal", weight: 900 as const },
    ];
  } catch {
    fonts = undefined;
  }

  const font = fonts?.length ? "Inter" : "system-ui";

  return new ImageResponse(
    (
      <div
        style={{
          background: "#EAD8C9",
          color: "#1B1B1B",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 6,
        }}
      >
        <span
          style={{
            fontFamily: font,
            fontWeight: 700,
            fontSize: 11,
            lineHeight: 1,
          }}
        >
          
        </span>
        {/* T: heaviest weight + slight upsize + scale + micro-stroke for tiny 32×32 legibility */}
        <span
          style={{
            fontFamily: font,
            fontWeight: 700,
            fontSize: 24,
            lineHeight: 1,
            marginLeft: -0.5,
            letterSpacing: "-0.05em",
            transform: "scaleX(1.12)",
            textShadow:
              "0.4px 0 0 #1B1B1B, -0.4px 0 0 #1B1B1B, 0 0.35px 0 #1B1B1B, 0 -0.35px 0 #1B1B1B",
          }}
        >
          T
        </span>
      </div>
    ),
    {
      ...size,
      ...(fonts ? { fonts } : {}),
    },
  );
}
