"use client";

import { motion, useReducedMotion } from "framer-motion";

const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

export default function ILoveSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="love"
      className="bg-bg-dark px-8 pt-20 pb-10 text-cream md:px-12 md:pt-28 md:pb-12"
    >
      <div className="mx-auto max-w-[1400px]">
        <motion.p
          className="text-center"
          style={{
            fontFamily: "var(--font-syne), sans-serif",
            fontWeight: 800,
            fontSize: "clamp(2.5rem, 8vw, 6rem)",
            lineHeight: 1,
            letterSpacing: "-0.02em",
          }}
          initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{
            duration: reduceMotion ? 0 : 0.8,
            ease,
          }}
        >
          &quot;I LOVE CREATING COOL SH*T&quot;
        </motion.p>
      </div>
    </section>
  );
}
