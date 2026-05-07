"use client";

import { motion } from "framer-motion";

interface HeroSectionProps {
  isDark: boolean;
}

/* ─── Shared easing curve ─────────────────────────────────── */
const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

export default function HeroSection({ isDark }: HeroSectionProps) {
  /* Semantic color aliases that flip on theme change */
  const bg     = isDark ? "#0E0D0C" : "#F0F0EB";
  const cream  = isDark ? "#ECECE7" : "#0E0D0C";
  const muted  = isDark ? "#93938F" : "#6B6B67";

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
            className="font-ui text-[10px] md:text-[11px] tracking-[0.38em] uppercase"
            style={{ color: muted, transition: "color 0.5s ease" }}
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

        {/* ── Bio ── */}
        <motion.p
          className="font-ui mt-4 md:mt-5 w-full max-w-[21.35rem] sm:max-w-sm md:max-w-md text-[15px] font-light leading-[25px]"
          style={{ color: muted, transition: "color 0.5s ease" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease }}
        >
          Prague raised, Czech Republic based. Building pixel-perfect digital
          experiences through React, Next.js, and thoughtful frontend
          engineering.
        </motion.p>
        </div>
      </div>

      {/* ── Scroll indicator — far right, vertical ── */}
      <div className="pointer-events-none absolute right-8 md:right-10 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-3">
        <motion.div
          className="w-px origin-top"
          style={{ height: 52, background: `linear-gradient(to bottom, transparent, ${muted}35)` }}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: 1.5, ease }}
        />
        <motion.span
          className="font-ui text-[9px] tracking-[0.48em] uppercase"
          style={{
            color: `${muted}80`,
            writingMode: "vertical-rl",
            textOrientation: "mixed",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.7, ease: "easeOut" }}
        >
          Scroll
        </motion.span>
        <motion.div
          className="w-px origin-bottom"
          style={{ height: 28, background: `linear-gradient(to top, transparent, ${muted}35)` }}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: 1.5, ease }}
        />
      </div>
    </section>
  );
}
