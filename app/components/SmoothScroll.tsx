"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

import { setRootLenis } from "../lib/lenisRoot";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const apply = () => {
      lenisRef.current?.destroy();
      lenisRef.current = null;
      setRootLenis(null);
      if (mq.matches) return;

      lenisRef.current = new Lenis({
        lerp: 0.075,
        wheelMultiplier: 1.05,
        smoothWheel: true,
        autoRaf: true,
      });
      setRootLenis(lenisRef.current);
    };

    apply();
    mq.addEventListener("change", apply);
    return () => {
      mq.removeEventListener("change", apply);
      lenisRef.current?.destroy();
      lenisRef.current = null;
      setRootLenis(null);
    };
  }, []);

  return <>{children}</>;
}
