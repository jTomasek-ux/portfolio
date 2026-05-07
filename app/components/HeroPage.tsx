"use client";

import { useState, useEffect } from "react";
import Header from "./Header";
import HeroSection from "./HeroSection";

export default function HeroPage() {
  const [isDark] = useState(true);

  /* Keep the html background in sync to prevent flash on scroll overscroll */
  useEffect(() => {
    document.documentElement.style.background = isDark ? "#0E0D0C" : "#F0F0EB";
  }, [isDark]);

  return (
    <>
      <Header isDark={isDark} />
      <main>
        <HeroSection isDark={isDark} />
      </main>
    </>
  );
}
