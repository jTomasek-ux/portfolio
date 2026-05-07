"use client";

import { motion } from "framer-motion";

interface HeaderProps {
  isDark: boolean;
  onToggle: () => void;
}

const NAV_LINKS = ["Work", "About", "Contact"] as const;

const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

export default function Header({ isDark, onToggle }: HeaderProps) {
  const linkColor   = isDark ? "#93938F" : "#6B6B67";
  const borderColor = isDark ? "rgba(236,236,231,0.15)" : "rgba(14,13,12,0.15)";

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 md:px-12"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.05, ease }}
    >
      {/* ── Logo ── */}
      <a
        href="/"
        style={{
          fontFamily: "var(--font-syne), sans-serif",
          fontStyle: "normal",
          fontWeight: 800,
          fontSize: "15px",
          lineHeight: "normal",
          color: isDark ? "rgb(237, 237, 232)" : "#0E0D0C",
          transition: "color 0.5s ease",
        }}
      >
        Jtomasek
      </a>

      {/* ── Right cluster ── */}
      <div className="flex items-center gap-6 md:gap-8">
        {/* Nav links — hidden on mobile */}
        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="font-ui text-[11px] tracking-[0.2em] uppercase transition-all duration-200 hover:-translate-y-px"
              style={{ color: linkColor, transition: "color 0.5s ease" }}
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Dark / Light pill toggle */}
        <button
          onClick={onToggle}
          className="font-ui flex items-center gap-2 rounded-full px-4 py-[7px] text-[10px] tracking-[0.2em] uppercase transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
          style={{
            border: `1px solid ${borderColor}`,
            color: linkColor,
            transition: "color 0.5s ease, border-color 0.5s ease",
          }}
          aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
        >
          {/* Indicator dot */}
          <span
            className="h-[6px] w-[6px] rounded-full flex-shrink-0"
            style={{
              background: isDark ? "#ECECE7" : "#0E0D0C",
              transition: "background 0.5s ease",
            }}
          />
          {isDark ? "Light" : "Dark"}
        </button>
      </div>
    </motion.header>
  );
}
