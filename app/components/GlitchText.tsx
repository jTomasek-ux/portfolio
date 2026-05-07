"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";

/* ─── Scramble config ─────────────────────────────────────── */
const GLITCH_CHARS = "!<>-_\\/[]{}=+*^?#@%0123456789ABCDEFabcdef";
const VIVID_COLORS = [
  "#FF2D55", // red
  "#0A84FF", // blue
  "#30D158", // green
  "#FFD60A", // yellow
  "#BF5AF2", // purple
  "#FF9F0A", // orange
];
const DURATION = 700; // ms for all chars to resolve

/* ─── Types ───────────────────────────────────────────────── */
export interface GlitchTextHandle {
  start: () => void;
  stop: () => void;
}

interface GlitchTextProps {
  text: string;
  baseColor: string;
  className?: string;
  style?: React.CSSProperties;
}

/* ─── Component ───────────────────────────────────────────── */
/*
 * Each character is rendered as an individual <span> whose textContent
 * and color are mutated directly via refs — no React setState, zero
 * re-renders during the animation.
 *
 * start() — begins the scramble; characters resolve left→right over DURATION ms.
 * stop()  — immediately snaps all chars back to their original values.
 *
 * The parent h1 calls these via ref without managing any state itself.
 */
const GlitchText = forwardRef<GlitchTextHandle, GlitchTextProps>(
  ({ text, baseColor, className, style }, ref) => {
    const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const rafRef   = useRef<number>(0);

    /* Cancel animation on unmount */
    useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

    /* Expose start / stop to parent */
    useImperativeHandle(
      ref,
      () => ({
        start() {
          cancelAnimationFrame(rafRef.current);
          const chars     = text.split("");
          const startTime = performance.now();

          const tick = (now: number) => {
            const progress = Math.min((now - startTime) / DURATION, 1);

            charRefs.current.forEach((el, i) => {
              if (!el || chars[i] === " ") return;
              const resolved = progress >= 1 || progress > i / chars.length + 0.3;
              if (resolved) {
                el.textContent = chars[i];
                el.style.color = baseColor;
              } else {
                el.textContent =
                  GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
                el.style.color =
                  VIVID_COLORS[Math.floor(Math.random() * VIVID_COLORS.length)];
              }
            });

            if (progress < 1) rafRef.current = requestAnimationFrame(tick);
          };

          rafRef.current = requestAnimationFrame(tick);
        },

        stop() {
          cancelAnimationFrame(rafRef.current);
          const chars = text.split("");
          charRefs.current.forEach((el, i) => {
            if (!el) return;
            el.textContent = chars[i];
            el.style.color = baseColor;
          });
        },
      }),
      [text, baseColor],
    );

    return (
      /*
       * aria-hidden: the parent h1 already carries aria-label="Jan Tomasek"
       * so screen readers never encounter the scrambled characters.
       */
      <span className={className} style={style} aria-hidden="true">
        {text.split("").map((char, i) => (
          <span
            key={i}
            ref={(el) => { charRefs.current[i] = el; }}
            style={{ color: baseColor }}
          >
            {char}
          </span>
        ))}
      </span>
    );
  },
);

GlitchText.displayName = "GlitchText";
export default GlitchText;
