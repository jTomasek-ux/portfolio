"use client";

import { useState, useEffect } from "react";
import Header from "./Header";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";

export default function HeroPage() {
  const [isDark] = useState(true);

  /* Keep the html background in sync to prevent flash on scroll overscroll */
  useEffect(() => {
    document.documentElement.style.background = isDark ? "#171717" : "#ebd8c9";
  }, [isDark]);

  return (
    <>
      <Header isDark={isDark} />
      <main>
        <HeroSection isDark={isDark} />
        <AboutSection />
      </main>
    </>
  );
}
