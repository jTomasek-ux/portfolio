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

        {/* ── Label ── */}
        <motion.p
          className="font-saans mb-12 md:mb-16 uppercase"
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
          Myself
        </motion.p>

        {/* ── Two-column grid: text 3fr / photo 2fr ── */}
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[3fr_2fr] lg:gap-20">

          {/* ── Left: large editorial justified text ── */}
          <motion.h2
            className="font-saans"
            style={{
              fontWeight: 600,
              /*
               * Match the reference: 50px size / 50px line-height on desktop.
               * clamp ensures it scales gracefully on narrower viewports.
               */
              fontSize: "clamp(1.75rem, 3.5vw, 50px)",
              lineHeight: "clamp(1.75rem, 3.5vw, 50px)",
              color: TEXT,
              textAlign: "justify",
              hyphens: "auto",
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.1, ease }}
            viewport={{ once: true, margin: "-80px" }}
          >
            Passionate about merging design and engineering, I craft smooth,
            interactive experiences with purpose. With a focus on performance,
            detail, and modern web technologies, I help bring digital products
            to life for forward-thinking teams around the world.
          </motion.h2>

          {/* ── Right: portrait photo ── */}
          <motion.div
            className="relative w-full overflow-hidden rounded-3xl"
            style={{ aspectRatio: "3 / 4" }}
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
