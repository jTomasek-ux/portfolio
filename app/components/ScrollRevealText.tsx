"use client";

import { useRef } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import GlitchText, { type GlitchTextHandle } from "./GlitchText";

interface ScrollRevealTextProps {
  text: string;
  baseColor: string;
  bgColor: string;
  className?: string;
}

/*
 * Scroll-driven word-by-word character scramble reveal.
 *
 * Layout:
 *   A h-[200vh] container holds a sticky h-screen panel.
 *   Each word has two layers:
 *     1. Ghost span  — always in the DOM (preserves word width), starts dim.
 *     2. GlitchText  — absolutely on top, starts opacity:0.
 *   As scrollYProgress passes each word's trigger point the GlitchText
 *   overlay fades in, scrambles, and resolves; the ghost fades out.
 *   All DOM mutations are direct (no React setState → zero re-renders
 *   during animation).
 */
export default function ScrollRevealText({
  text,
  baseColor,
  bgColor,
  className,
}: ScrollRevealTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const words        = text.trim().split(/\s+/);
  const n            = words.length;

  const glitchRefs  = useRef<(GlitchTextHandle | null)[]>([]);
  const overlayRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const ghostRefs   = useRef<(HTMLSpanElement | null)[]>([]);
  const triggered   = useRef<boolean[]>(new Array(n).fill(false));

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    for (let i = 0; i < n; i++) {
      /* Spread trigger points evenly across 0 → 0.85 of scroll range */
      const threshold = (i / n) * 0.85;

      if (progress >= threshold && !triggered.current[i]) {
        triggered.current[i] = true;

        /* Reveal glitch layer */
        const overlay = overlayRefs.current[i];
        if (overlay) overlay.style.opacity = "1";

        /* Dim out ghost */
        const ghost = ghostRefs.current[i];
        if (ghost) {
          ghost.style.opacity = "0";
          ghost.style.transition = "opacity 0.4s ease";
        }

        /* Fire character scramble */
        glitchRefs.current[i]?.start();
      }
    }
  });

  return (
    <div ref={containerRef} className={`h-[200vh] ${className ?? ""}`}>
      <div
        className="sticky top-0 flex h-screen items-center"
        style={{ background: bgColor }}
      >
        <p
          className="font-ui select-text w-full"
          style={{
            fontWeight: 600,
            fontSize: "clamp(1.5rem, 3vw, 40px)",
            lineHeight: 1.1,
            textAlign: "justify",
            hyphens: "auto",
            color: baseColor,
          }}
        >
          {words.map((word, i) => (
            <span
              key={i}
              className="relative inline-block"
              style={{ marginRight: "0.28em" }}
            >
              {/* Ghost — occupies layout space, fades out after reveal */}
              <span
                ref={(el) => { ghostRefs.current[i] = el; }}
                aria-hidden="true"
                style={{ opacity: 0.15, color: baseColor }}
              >
                {word}
              </span>

              {/* GlitchText overlay — absolutely positioned, starts hidden */}
              <span
                ref={(el) => { overlayRefs.current[i] = el; }}
                className="absolute inset-0 whitespace-nowrap"
                style={{ opacity: 0 }}
              >
                <GlitchText
                  ref={(el) => { glitchRefs.current[i] = el; }}
                  text={word}
                  baseColor={baseColor}
                />
              </span>
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
