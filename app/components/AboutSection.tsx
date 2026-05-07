"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const BG   = "#ECECE7";
const TEXT = "#0E0D0C";

export default function AboutSection() {
  return (
    <section
      id="about"
      style={{ background: BG }}
      className="px-8 md:px-12 py-20 md:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-[1400px]">

        {/* ── Two-column grid: 3fr text / 2fr photo ── */}
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[3fr_2fr] lg:gap-16">

          {/* ── Left: label + paragraph stacked, so label aligns with top of photo ── */}
          <div className="flex flex-col gap-10 md:gap-12">
            <motion.p
              className="font-ui uppercase"
              style={{
                fontWeight: 600,
                fontSize: "16px",
                lineHeight: "24px",
                letterSpacing: "0.12em",
                color: TEXT,
              }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              viewport={{ once: true, margin: "-80px" }}
            >
              About me
            </motion.p>

            <motion.h2
              className="font-ui select-text"
              style={{
                fontWeight: 600,
                fontSize: "clamp(1.5rem, 3vw, 40px)",
                lineHeight: 1.1,
                color: "oklch(0.205 0 0)",
                textAlign: "justify",
                hyphens: "auto",
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.1, ease }}
              viewport={{ once: true, margin: "-80px" }}
            >
              Passionate about merging design and engineering, I craft smooth,
              interactive experiences with purpose. With a focus on motion,
              performance, and detail, I help bring digital products to life for
              forward-thinking brands around the world.
            </motion.h2>
          </div>

          {/* ── Right: portrait photo — 5/6 ratio keeps it compact like the reference ── */}
          <motion.div
            className="relative w-full overflow-hidden rounded-2xl"
            style={{ aspectRatio: "5 / 6" }}
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.95, delay: 0.25, ease }}
            viewport={{ once: true, margin: "-80px" }}
          >
            <Image
              src="/images/P3170579.jpg"
              alt="Jan Tomasek"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
