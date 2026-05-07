"use client";

import { useState, useEffect, useCallback } from "react";
import Header from "./Header";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";

export default function HeroPage() {
  const [isDark] = useState(true);
  const [f1LightsOut, setF1LightsOut] = useState(false);

  const handleF1LightsOut = useCallback(() => {
    setF1LightsOut(true);
  }, []);

  /* Keep the html background in sync to prevent flash on scroll overscroll */
  useEffect(() => {
    document.documentElement.style.background = isDark ? "#171717" : "#ebd8c9";
  }, [isDark]);

  return (
    <>
      <Header isDark={isDark} />
      <main>
        <HeroSection
          isDark={isDark}
          f1LightsOut={f1LightsOut}
          onF1LightsOut={handleF1LightsOut}
        />
        <AboutSection />
      </main>
    </>
  );
}
