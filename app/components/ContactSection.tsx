"use client";

import { useCallback } from "react";
import type { CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { getRootLenis } from "../lib/lenisRoot";

const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const BG = "#F1E4DA";
const TEXT = "#171717";
const MUTED = "rgba(23, 23, 23, 0.55)";

/** Email: default black; hover muted — underline lives on `.slide-line` so it scrolls with SyneSlidingDuplicate */
const emailColorStates =
  "text-[#171717] no-underline transition-[color] duration-200 hover:text-[rgba(23,23,23,0.55)] hover:[&_.slide-line]:decoration-[rgba(23,23,23,0.35)]";

const EMAIL = "tomasekjan08@email.cz";
const MAILTO = `mailto:${EMAIL}`;

/** Syne + clamp size — shared by “So let’s talk” and the mail link */
const SO_LETS_TALK_FONT: CSSProperties = {
  fontFamily: "var(--font-syne), sans-serif",
  fontWeight: 800,
  fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
  lineHeight: 1.15,
  letterSpacing: "-0.02em",
};

/** Add public profile URLs when ready; omitted links are not shown. */
const GITHUB_URL: string | null = null;
const LINKEDIN_URL: string | null = null;

/** Subtle finish-line checkered strip (F1 tie-in) */
function F1FinishStrip() {
  return (
    <div
      className="h-2.5 w-full shrink-0 border-b border-black/6"
      style={{
        backgroundImage: `repeating-conic-gradient(
          from 45deg,
          rgba(23, 23, 23, 0.14) 0% 25%,
          transparent 0% 50%
        )`,
        backgroundSize: "10px 10px",
      }}
      aria-hidden
    />
  );
}

/** Slide-up duplicate label (same idea as Header “Get in touch”) */
function FooterSlidingLines({ label }: { label: string }) {
  return (
    <span className="block h-5 overflow-hidden">
      <span className="flex flex-col transition-transform duration-300 ease-out motion-reduce:transition-none group-hover:-translate-y-5 motion-reduce:group-hover:translate-y-0">
        <span className="block h-5 shrink-0 leading-5 whitespace-nowrap">{label}</span>
        <span className="block h-5 shrink-0 leading-5 whitespace-nowrap" aria-hidden>
          {label}
        </span>
      </span>
    </span>
  );
}

/** Same slide pattern for Syne / SO_LETS_TALK_FONT — underline on each line so it moves with text */
function SyneSlidingDuplicate({ text }: { text: string }) {
  const slot = "h-[calc(1.15em+4px)]";
  const lineClass = `slide-line flex ${slot} shrink-0 items-center whitespace-nowrap underline decoration-black/35 underline-offset-[6px] transition-[text-decoration-color] duration-200`;

  return (
    <span className={`block ${slot} overflow-hidden`}>
      <span className="flex flex-col transition-transform duration-300 ease-out motion-reduce:transition-none group-hover:translate-y-[calc(-1.15em-4px)] motion-reduce:group-hover:translate-y-0">
        <span className={lineClass}>{text}</span>
        <span className={lineClass} aria-hidden>
          {text}
        </span>
      </span>
    </span>
  );
}

export default function ContactSection() {
  const reduceMotion = useReducedMotion();

  const links: { label: string; href: string; external?: boolean }[] = [
    ...(GITHUB_URL
      ? [{ label: "GitHub", href: GITHUB_URL, external: true as const }]
      : []),
    ...(LINKEDIN_URL
      ? [{ label: "LinkedIn", href: LINKEDIN_URL, external: true as const }]
      : []),
  ];

  const scrollToTop = useCallback(() => {
    const lenis = getRootLenis();
    if (reduceMotion) {
      lenis?.scrollTo(0, { immediate: true });
      if (!lenis) window.scrollTo(0, 0);
      return;
    }
    if (lenis) {
      lenis.scrollTo(0, {
        duration: 1.35,
        easing: (t) => 1 - (1 - t) ** 3,
      });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [reduceMotion]);

  const year = new Date().getFullYear();

  const linkItemTransition = (i: number) =>
    reduceMotion
      ? { duration: 0 }
      : { duration: 0.55, delay: 0.12 + i * 0.06, ease };

  return (
    <footer
      id="contact"
      aria-label="Contact and site information"
      style={{ background: BG, color: TEXT }}
    >
      <F1FinishStrip />

      <div className="relative overflow-hidden">
        {/* Oversized watermark — low contrast; contained + centered on mobile */}
        <p
          className="pointer-events-none absolute m-0 select-none whitespace-nowrap text-[clamp(1.75rem,10vw,3rem)] max-md:left-1/2 max-md:right-auto max-md:bottom-3 max-md:-translate-x-1/2 max-md:px-4 max-md:text-center md:bottom-[-18%] md:right-[-2%] md:left-auto md:translate-x-0 md:px-0 md:text-left md:text-[clamp(4.25rem,18vw,11.5rem)]"
          style={{
            fontFamily: "var(--font-syne), sans-serif",
            fontWeight: 800,
            lineHeight: 0.85,
            letterSpacing: "-0.02em",
            /* #1B1B1B via alpha — separate opacity made it read gray */
            color: "rgba(27, 27, 27, 0.22)",
          }}
          aria-hidden
        >
          Jtomasek
        </p>

        <div className="relative mx-auto max-w-[1400px] px-8 pb-14 pt-16 md:px-12 md:pb-16 md:pt-20 lg:pb-20 lg:pt-24">
          <motion.div
            className="flex flex-col gap-6 md:gap-8"
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: reduceMotion ? 0 : 0.7, ease }}
          >
            <div className="flex w-full min-w-0 max-w-full flex-col items-stretch gap-3 md:ml-auto md:mr-12 md:w-max md:flex-row md:flex-wrap md:items-baseline md:gap-x-4 lg:mr-18 lg:gap-x-5">
              <h2 className="m-0 shrink-0" style={SO_LETS_TALK_FONT}>
                So let&apos;s talk
              </h2>
              <a
                href={MAILTO}
                style={SO_LETS_TALK_FONT}
                className={`group inline-flex min-w-0 max-w-full items-baseline md:max-w-none md:shrink-0 ${emailColorStates} focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg-dark`}
              >
                {/* Mobile: wrap / break so long address stays in viewport */}
                <span
                  className="w-full min-w-0 break-all underline decoration-black/35 underline-offset-[6px] transition-[text-decoration-color] duration-200 group-hover:decoration-[rgba(23,23,23,0.35)] md:hidden"
                  style={{
                    ...SO_LETS_TALK_FONT,
                    fontSize: "clamp(1.125rem, 4.25vw, 1.65rem)",
                  }}
                >
                  {EMAIL}
                </span>
                <span className="hidden md:contents">
                  <SyneSlidingDuplicate text={EMAIL} />
                </span>
              </a>
            </div>

            {links.length > 0 ? (
              <nav aria-label="Contact links">
                <ul className="m-0 flex list-none flex-col gap-3 p-0 sm:flex-row sm:flex-wrap sm:gap-x-10 sm:gap-y-3">
                  {links.map((link, i) => (
                    <motion.li
                      key={link.label}
                      initial={
                        reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }
                      }
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={linkItemTransition(i)}
                    >
                      <a
                        href={link.href}
                        className="font-ui text-lg font-medium underline decoration-black/25 underline-offset-[6px] transition-[color,text-decoration-color] duration-200 hover:text-accent hover:decoration-accent md:text-xl"
                        {...(link.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                      >
                        {link.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>
            ) : null}
          </motion.div>
        </div>
      </div>

      <div
        className="border-t border-black/8"
        style={{ background: BG, color: TEXT }}
      >
        <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-8 py-6 text-sm md:flex-row md:items-center md:justify-between md:gap-6 md:px-12 md:py-7">
          <p className="font-ui m-0 leading-relaxed" style={{ color: MUTED }}>
            © {year} Jan Tomasek · Czech Republic ·{" "}
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center font-ui text-sm font-medium underline decoration-black/20 underline-offset-4"
            >
              <FooterSlidingLines label="Built with Next.js" />
            </a>
          </p>
          <button
            type="button"
            onClick={scrollToTop}
            className="group inline-flex shrink-0 cursor-pointer items-center border-0 bg-transparent p-0 text-left font-ui text-sm font-medium text-inherit underline decoration-black/25 underline-offset-[6px] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg-dark"
          >
            <FooterSlidingLines label="Back to top" />
          </button>
        </div>
      </div>
    </footer>
  );
}
