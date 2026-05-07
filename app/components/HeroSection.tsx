"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import nounArrow from "../../images/noun-arrow-3255106.png";

interface HeroSectionProps {
  isDark: boolean;
}

/* ─── Shared easing curve ─────────────────────────────────── */
const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

function ScrollArrowIcon({ className }: { className?: string }) {
  return (
    <Image
      src={nounArrow}
      alt=""
      width={nounArrow.width}
      height={nounArrow.height}
      className={`h-[26px] w-auto shrink-0 object-contain ${className ?? ""}`}
      aria-hidden
    />
  );
}

export default function HeroSection({ isDark }: HeroSectionProps) {
  /* Semantic color aliases that flip on theme change */
  const bg     = isDark ? "#0E0D0C" : "#F0F0EB";
  const cream  = isDark ? "#ECECE7" : "#0E0D0C";
  const muted = isDark ? "#93938F" : "#6B6B67";
  /* Spec oklch(0.205) on light; light neutral on dark for contrast */
  const scrollFootColor = isDark ? "oklch(0.78 0 0)" : "oklch(0.205 0 0)";

  return (
    <section
      className="relative h-dvh overflow-hidden"
      style={{ background: bg, transition: "background 0.5s ease" }}
    >
      {/* ── Decorative right-edge hairline ── */}
      <div
        className="pointer-events-none absolute right-0 top-[18%] bottom-[18%] w-px"
        style={{
          background: `linear-gradient(to bottom, transparent, ${muted}20, transparent)`,
        }}
      />

      {/* ── Main content ── */}
      <div className="relative z-10 flex h-full min-w-0 flex-col px-8 md:px-12 pt-28 pb-10">
        {/* flex-1 + justify-end: pin block to lower half; margin changes are not eaten by a growing spacer */}
        <div className="flex min-h-0 flex-1 flex-col justify-end">
        {/* Role label + megatype — ½" between label and headline */}
        <div
          className="flex min-w-0 w-full max-w-full flex-col gap-[0.5in]"
          style={{ containerType: "inline-size" }}
        >
          <motion.p
            className="uppercase"
            style={{
              fontFamily:
                '"Saans", "saans Fallback", var(--font-space-grotesk), sans-serif',
              fontStyle: "normal",
              fontWeight: 600,
              fontSize: "17px",
              lineHeight: "26px",
              color: isDark ? "oklch(0.708 0 0)" : "oklch(0.205 0 0)",
              transition: "color 0.5s ease",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
          >
            Design Engineer
          </motion.p>

          {/* ── Megatype — Syne 800 (design spec) ── */}
        {/*
          Each line is wrapped in overflow-hidden so the span can slide
          up from y:108% creating the editorial "text reveal" effect.
          Desktop: 173px / 152px line-height, rgb(237,237,232); scales down on narrow viewports.
        */}
        <h1
          aria-label="Jan Tomasek"
          className="w-full min-w-0 max-w-full select-none -translate-y-[0.5in]"
          style={{
            fontFamily: "var(--font-syne), sans-serif",
            fontStyle: "normal",
            fontWeight: 800,
            /* Longest line “Tomasek” — keep a small right-side safety margin */
            fontSize: "min(173px, calc(100cqi / 5.18))",
            lineHeight: "min(152px, calc(100cqi / 5.18 * 0.8786))",
            letterSpacing: "normal",
            color: isDark ? "rgb(237, 237, 232)" : cream,
            transition: "color 0.5s ease",
          }}
        >
          {/* Line 1 — "Jan" */}
          <div className="max-w-full overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: "108%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.1, delay: 0.28, ease }}
            >
              Jan
            </motion.span>
          </div>

          {/* Line 2 — "Tomasek" */}
          <div className="max-w-full overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: "108%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.1, delay: 0.44, ease }}
            >
              Tomasek
            </motion.span>
          </div>
        </h1>
        </div>

        {/* ── Bottom scroll hints ── */}
        <motion.div
          className="font-hero-scroll mt-4 flex w-full min-w-0 flex-wrap items-center justify-between gap-x-6 gap-y-3 md:mt-5"
          style={{
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: "17px",
            lineHeight: "26px",
            color: scrollFootColor,
            transition: "color 0.5s ease",
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease }}
        >
          <div className="flex min-w-0 shrink-0 items-center gap-2.5">
            <ScrollArrowIcon className="shrink-0" />
            <span className="whitespace-nowrap">Scroll for</span>
          </div>
          <div className="flex min-w-0 shrink-0 items-center gap-2.5">
            <span className="whitespace-nowrap">cool sh*t</span>
            <ScrollArrowIcon className="shrink-0" />
          </div>
        </motion.div>
        </div>
      </div>
    </section>
  );
}
