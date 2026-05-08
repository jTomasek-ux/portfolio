"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { ContainerScroll } from "@/components/ui/container-scroll-animation";

const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

/** Matches --color-muted in globals */
const MUTED = "#93938F";

/** Same tan band as About / Contact */
const SECTION_TAN = "#F1E4DA";

const CARD_BG = "#242424";

/** Intrinsic size of public/images/431shots_so.png — Development row */
const CODE_MOCKUP_SRC = "/images/431shots_so.png";
const CODE_MOCKUP_W = 1920;
const CODE_MOCKUP_H = 1536;

/** Intrinsic size of public/images/designMockupFinal_so.png — Digital Design row */
const DESIGN_MOCKUP_SRC = "/images/designMockupFinal_so.png";
const DESIGN_MOCKUP_W = 1920;
const DESIGN_MOCKUP_H = 1440;

const ROWS: {
  title: string;
  description: string;
  tags: string[];
  imageSrc?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
}[] = [
  {
    title: "Digital Design",
    description:
      "Designing digital interfaces that combine structural hierarchy, intentional typography, and UX strategy to deliver intuitive and engaging user journeys.",
    tags: [
      "WIREFRAMING",
      "UI",
      "UX",
      "TYPOGRAPHY",
      "LAYOUT",
      "FIGMA",
    ],
    imageSrc: DESIGN_MOCKUP_SRC,
    imageAlt: "Design mockup",
    imageWidth: DESIGN_MOCKUP_W,
    imageHeight: DESIGN_MOCKUP_H,
  },
  {
    title: "Development",
    description:
      "Building robust frontend architectures that combine modern web technologies, clean component design, and purposeful motion to deliver highly performant user experiences.",
    tags: [
      "NEXT.JS",
      "REACT",
      "TYPESCRIPT",
      "TAILWIND CSS",
      "FRAMER MOTION",
      "SCROLL UX",
      "MICRO-INTERACTIONS",
    ],
    imageSrc: CODE_MOCKUP_SRC,
    imageAlt: "Code mockup",
    imageWidth: CODE_MOCKUP_W,
    imageHeight: CODE_MOCKUP_H,
  },
];

const processCardInnerClassName =
  "w-full rounded-2xl bg-[#242424] px-3 pb-5 pt-8 text-[#ebd8c9] sm:rounded-3xl sm:px-4 sm:pb-6 sm:pt-10 md:px-5 md:pb-8 md:pt-12 lg:rounded-[1.75rem] lg:pb-9 lg:pl-4 lg:pr-8 lg:pt-14 xl:pl-5 xl:pr-12";

function ProcessHeading({ className }: { className?: string }) {
  return (
    <h2
      className={className}
      style={{
        fontFamily: "var(--font-syne), sans-serif",
        fontWeight: 800,
        fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
        letterSpacing: "-0.02em",
        lineHeight: 1.1,
        color: "#171717",
      }}
    >
      Process
    </h2>
  );
}

function ProcessList({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <ol className="m-0 flex list-none flex-col p-0">
      {ROWS.map((row, index) => (
        <motion.li
          key={row.title}
          className="grid grid-cols-1 gap-5 border-t border-white/12 pt-9 first:border-t-0 first:pt-0 sm:gap-6 sm:pt-10 md:gap-7 lg:grid-cols-[auto_max-content_minmax(0,1fr)_minmax(200px,300px)] lg:items-start lg:gap-x-6 lg:gap-y-0 lg:py-16 lg:first:pt-10 lg:first:pb-16 xl:grid-cols-[auto_max-content_minmax(0,1fr)_minmax(220px,340px)] xl:gap-x-10 xl:py-20 xl:first:pt-12 xl:first:pb-20 2xl:gap-x-14"
          initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{
            duration: reduceMotion ? 0 : 0.7,
            delay: reduceMotion ? 0 : index * 0.06,
            ease,
          }}
        >
          <div className="flex items-start gap-4 sm:gap-6 lg:contents">
            <span
              className="w-8 shrink-0 pt-1 font-ui text-xs font-medium tabular-nums sm:w-9 sm:text-[13px] sm:pt-1.5 lg:w-9 lg:pt-2 lg:text-sm"
              style={{ color: MUTED }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            <h3
              className="m-0 min-w-0 flex-1 leading-[1.02] tracking-[-0.03em] lg:max-w-[min(22ch,100%)] lg:flex-none lg:pt-1"
              style={{
                fontFamily: "var(--font-syne), sans-serif",
                fontWeight: 800,
                fontSize: "clamp(1.65rem, 3.8vw, 2.65rem)",
              }}
            >
              {row.title}
            </h3>
          </div>

          <div className="flex min-w-0 flex-col gap-3 sm:gap-4 lg:max-w-[min(52ch,100%)] lg:pr-4">
            <p className="font-ui m-0 text-pretty text-[13px] font-normal leading-[1.58] text-cream/72 sm:text-sm md:text-[15px] md:leading-relaxed">
              {row.description}
            </p>
            <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0 sm:gap-2 lg:justify-start">
              {row.tags.map((tag) => (
                <li key={tag}>
                  <span className="font-ui inline-block rounded-md bg-white/9 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-cream/90 sm:rounded-full sm:px-3 sm:py-1.5 sm:text-[10px] md:text-[11px]">
                    {tag}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex w-full flex-col pl-12 sm:pl-15 lg:max-w-[300px] lg:justify-self-end lg:pl-0 xl:max-w-[340px]">
            <div className="w-full shrink-0">
              {row.imageSrc &&
              row.imageWidth != null &&
              row.imageHeight != null ? (
                <Image
                  src={row.imageSrc}
                  alt={row.imageAlt ?? ""}
                  width={row.imageWidth}
                  height={row.imageHeight}
                  sizes="(max-width: 1023px) min(92vw, 480px), 320px"
                  className="h-auto w-full rounded-xl bg-[#3a3a3a]"
                  style={{
                    maxHeight: "min(42vh, 380px)",
                  }}
                />
              ) : (
                <div
                  className="min-h-[180px] w-full rounded-xl bg-[#3a3a3a] sm:min-h-[200px]"
                  aria-hidden
                />
              )}
            </div>
          </div>
        </motion.li>
      ))}
    </ol>
  );
}

export default function ProcessSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="process"
      className="py-20 md:py-28 lg:py-32"
      style={{ background: SECTION_TAN, color: "#171717" }}
    >
      <div className="w-full px-2 sm:px-3 md:px-4">
        {reduceMotion ? (
          <div className="mx-auto max-w-[1400px]">
            <ProcessHeading className="mb-6 md:mb-8" />
            <motion.div
              className={processCardInnerClassName}
              style={{ background: CARD_BG, color: "#ebd8c9" }}
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0, ease }}
            >
              <ProcessList reduceMotion />
            </motion.div>
          </div>
        ) : (
          <ContainerScroll
            containerClassName="relative flex min-h-[30rem] w-full items-center justify-center py-4 md:min-h-[40rem] md:py-8"
            perspectiveClassName="relative w-full"
            titleComponent={
              <div className="mx-auto w-full max-w-[1400px] px-1 pb-2 text-left md:px-0">
                <ProcessHeading />
              </div>
            }
            cardClassName="mx-auto h-auto min-h-0 w-full max-w-[1400px] -mt-4 border-0 bg-transparent p-0 md:-mt-8"
            cardInnerClassName={processCardInnerClassName}
            flat
            scrollOffset={["start 0.9", "end 0.24"]}
          >
            <ProcessList reduceMotion={false} />
          </ContainerScroll>
        )}
      </div>
    </section>
  );
}
