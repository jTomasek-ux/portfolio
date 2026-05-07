"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import ScrollRevealText from "./ScrollRevealText";


const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const BG   = "#F1E4DA";
const TEXT = "#171717";

const BIO =
  "I'm a 17-year-old design engineer obsessed with the intersection of sharp aesthetics and modern web tech. " +
  "I don't just design interfaces; I build them with Next.js, Tailwind, and Framer Motion. " +
  "Currently looking for a summer internship to absorb as much knowledge as possible, " +
  "learn from experienced teams, and gain hands-on, real-world experience.";

export default function AboutSection() {
  return (
    <section id="about" style={{ background: BG }}>
      <div className="mx-auto max-w-[1400px] px-8 md:px-12">

        {/* ── Two-column: scroll-reveal text (with label inside) | sticky photo ── */}
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[3fr_2fr] lg:gap-16 py-20 md:py-28 lg:py-32">

          {/* Left: h-[200vh] sticky word scramble — label lives inside */}
          <ScrollRevealText text={BIO} baseColor={TEXT} bgColor={BG} label="About Me" />

          {/* Right: photo stays pinned while you scroll through the text */}
          <div className="hidden lg:mt-10 lg:block lg:sticky lg:top-[15vh] lg:self-start">
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
