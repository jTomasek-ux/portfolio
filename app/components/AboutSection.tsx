"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import ScrollRevealText from "./ScrollRevealText";

const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const BG   = "#ECECE7";
const TEXT = "#0E0D0C";

const BIO =
  "Passionate about merging design and engineering, I craft smooth, " +
  "interactive experiences with purpose. With a focus on motion, " +
  "performance, and detail, I help bring digital products to life for " +
  "forward-thinking brands around the world.";

export default function AboutSection() {
  return (
    <section id="about" style={{ background: BG }}>
      <div className="mx-auto max-w-[1400px] px-8 md:px-12">

        {/* ── "MYSELF" label — scrolls away before sticky text takes over ── */}
        <div className="pt-20 md:pt-28 lg:pt-32 pb-10 md:pb-14">
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
            Myself
          </motion.p>
        </div>

        {/* ── Two-column: scroll-reveal text | sticky photo ── */}
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[3fr_2fr] lg:gap-16 pb-20">

          {/* Left: h-[200vh] sticky word scramble */}
          <ScrollRevealText text={BIO} baseColor={TEXT} bgColor={BG} />

          {/* Right: photo stays pinned while you scroll through the text */}
          <div className="hidden lg:block lg:sticky lg:top-[15vh] lg:self-start">
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
                sizes="40vw"
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
