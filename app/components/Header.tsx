"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface HeaderProps {
  isDark: boolean;
}

const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

export default function Header({ isDark }: HeaderProps) {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 md:px-12"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.05, ease }}
    >
      {/* ── Logo ── */}
      <Link
        href="/"
        style={{
          fontFamily: "var(--font-syne), sans-serif",
          fontStyle: "normal",
          fontWeight: 800,
          fontSize: "15px",
          lineHeight: "normal",
          color: isDark ? "#ebd8c9" : "#171717",
          transition: "color 0.5s ease",
        }}
      >
        Jtomasek
      </Link>

      <a
        href="mailto:tomasekjan08@email.cz"
        className="group inline-flex items-center justify-center rounded-full bg-[#ebd8c9] px-6 py-3 font-cta text-[17px] font-semibold leading-[26px] text-[#171717] no-underline outline-none transition-[color,box-shadow] focus-visible:ring-2 focus-visible:ring-[#171717] focus-visible:ring-offset-2 focus-visible:ring-offset-[#171717]"
      >
        <span className="block h-[26px] overflow-hidden">
          <span className="flex flex-col transition-transform duration-300 ease-out motion-reduce:transition-none group-hover:-translate-y-[26px] motion-reduce:group-hover:translate-y-0">
            <span className="block h-[26px] shrink-0 leading-[26px] whitespace-nowrap">
              Get in touch
            </span>
            <span className="block h-[26px] shrink-0 leading-[26px] whitespace-nowrap">
              Get in touch
            </span>
          </span>
        </span>
      </a>
    </motion.header>
  );
}
