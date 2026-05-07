"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import GlitchText, { type GlitchTextHandle } from "./GlitchText";
import F1Car from "./f1Car";

/* Arrow icon is now served from public/images/ as a static asset */
const ARROW_URL = "/images/noun-arrow-3255106.png";

interface HeroSectionProps {
  isDark: boolean;
  f1LightsOut?: boolean;
}

/* ─── Shared easing curve ─────────────────────────────────── */
const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

function ScrollArrowIcon({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`inline-block shrink-0 bg-current transition-colors duration-300 ease-out ${className ?? ""}`}
      style={{
        height: 26,
        width: 26,
        WebkitMaskImage: `url(${ARROW_URL})`,
        maskImage: `url(${ARROW_URL})`,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}

export default function HeroSection({ isDark, f1LightsOut = false }: HeroSectionProps) {
  const glitchJan     = useRef<GlitchTextHandle>(null);
  const glitchTomasek = useRef<GlitchTextHandle>(null);

  const handleNameEnter = () => {
    glitchJan.current?.start();
    glitchTomasek.current?.start();
  };
  const handleNameLeave = () => {
    glitchJan.current?.stop();
    glitchTomasek.current?.stop();
  };

  /* Semantic color aliases that flip on theme change */
  const bg    = isDark ? "#171717" : "#ebd8c9";
  const cream = isDark ? "#ebd8c9" : "#171717";
  const muted = isDark ? "#93938F" : "#6B6B67";
  const scrollFootColor = isDark ? "oklch(0.78 0 0)" : "oklch(0.205 0 0)";
  const nameColor       = isDark ? "#ebd8c9" : cream;

  return (
    <section
      className="relative h-dvh overflow-x-visible overflow-y-hidden"
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
        <div className="flex min-h-0 flex-1 flex-col justify-end">

          {/* Role label + megatype */}
          <div
            className="flex min-w-0 w-full max-w-full flex-col gap-[0.5in]"
            style={{ containerType: "inline-size" }}
          >
            <F1Car raceAway={f1LightsOut} />
            <motion.p
              className="uppercase"
              style={{
                fontFamily: '"Saans", "saans Fallback", var(--font-space-grotesk), sans-serif',
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

            {/*
              Each line is wrapped in overflow-hidden so the span slides up
              from y:108% on page load (editorial text-reveal effect).
              Hovering the h1 fires start()/stop() on both GlitchText refs —
              zero React re-renders during the scramble animation.
            */}
            <h1
              aria-label="Jan Tomasek"
              className="w-full min-w-0 max-w-full select-none -translate-y-[0.5in] cursor-default"
              style={{
                fontFamily: "var(--font-syne), sans-serif",
                fontStyle: "normal",
                fontWeight: 800,
                fontSize: "min(173px, calc(100cqi / 5.18))",
                lineHeight: "min(152px, calc(100cqi / 5.18 * 0.8786))",
                letterSpacing: "normal",
                color: nameColor,
                transition: "color 0.5s ease",
              }}
              onMouseEnter={handleNameEnter}
              onMouseLeave={handleNameLeave}
            >
              {/* Line 1 */}
              <div className="max-w-full overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: "108%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1.1, delay: 0.28, ease }}
                >
                  <GlitchText ref={glitchJan} text="Jan" baseColor={nameColor} />
                </motion.span>
              </div>

              {/* Line 2 */}
              <div className="max-w-full overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: "108%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1.1, delay: 0.44, ease }}
                >
                  <GlitchText ref={glitchTomasek} text="Tomasek" baseColor={nameColor} />
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
              <span className="whitespace-nowrap">Scroll to</span>
            </div>
            <div className="flex min-w-0 shrink-0 items-center gap-2.5">
              <span className="whitespace-nowrap">learn more</span>
              <ScrollArrowIcon className="shrink-0" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
