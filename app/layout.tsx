import type { Metadata } from "next";
import { Inter, Unbounded, Syne } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import SmoothScroll from "./components/SmoothScroll";
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

const inter = Inter({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-inter",
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
      className={`${unbounded.variable} ${syne.variable} ${inter.variable}`}
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
        <SmoothScroll>{children}</SmoothScroll>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
