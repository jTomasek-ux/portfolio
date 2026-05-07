import type { Metadata } from "next";
import { Unbounded, Space_Grotesk, Syne } from "next/font/google";
import "./globals.css";

const unbounded = Unbounded({
  weight: ["700", "900"],
  subsets: ["latin"],
  variable: "--font-unbounded",
  display: "swap",
});

const syne = Syne({
  weight: "800",
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jtomasek — Web Developer",
  description:
    "Portfolio of Jan Tomasek, a web developer based in Czech Republic building pixel-perfect digital experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${unbounded.variable} ${syne.variable} ${spaceGrotesk.variable}`}
    >
      {/* Global noise overlay — sits above everything, non-interactive */}
      <body>
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            pointerEvents: "none",
            opacity: 0.05,
          }}
          aria-hidden="true"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
          >
            <filter id="global-noise">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.65"
                numOctaves="3"
                stitchTiles="stitch"
              />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#global-noise)" />
          </svg>
        </div>
        {children}
      </body>
    </html>
  );
}
