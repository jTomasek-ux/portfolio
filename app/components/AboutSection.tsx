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
    <section
      id="about"
      className="pb-[min(32vh,12rem)] lg:pb-0"
      style={{ background: BG }}
    >
      <div className="mx-auto max-w-[1400px] px-8 md:px-12">

        {/* ── Two-column: scroll-reveal text (with label inside) | sticky photo ── */}
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[3fr_2fr] lg:gap-16 py-20 md:py-28 lg:py-32">

          {/* Left: scroll-reveal — second on mobile so portrait can lead */}
          <ScrollRevealText
            className="order-2 min-w-0 lg:order-none"
            text={BIO}
            baseColor={TEXT}
            bgColor={BG}
            label="About Me"
          />

          {/* Right (lg): sticky photo; mobile: visible, full-width / capped width */}
          <div className="order-1 w-full lg:order-none lg:mt-10 lg:sticky lg:top-[15vh] lg:self-start">
            <motion.div
              className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl lg:mx-0 lg:max-w-none"
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
                sizes="(max-width: 1023px) min(90vw, 448px), 40vw"
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
