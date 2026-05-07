"use client";

import { useEffect, useRef } from "react";
import { useAnimate } from "framer-motion";

interface F1LightsProps {
  onLightsOut?: () => void;
}

export default function F1Lights({ onLightsOut }: F1LightsProps) {
  const [scope, animate] = useAnimate();
  const onLightsOutRef = useRef(onLightsOut);
  onLightsOutRef.current = onLightsOut;

  useEffect(() => {
    let cancelled = false;
    let blinkLoop: { stop: () => void } | undefined;

    const runF1Sequence = async () => {
      await animate(".f1-light", { opacity: 0.1, scale: 1 }, { duration: 0 });
      if (cancelled) return;

      const lights = scope.current?.querySelectorAll(".f1-light");
      if (!lights?.length) return;

      for (let i = 0; i < lights.length; i++) {
        await new Promise<void>((resolve) => {
          setTimeout(resolve, 500);
        });
        if (cancelled) return;
        await animate(lights[i], { opacity: 1, scale: 1.05 }, { duration: 0.1 });
      }

      const randomHoldTime = Math.floor(Math.random() * 2000) + 1000;
      await new Promise<void>((resolve) => {
        setTimeout(resolve, randomHoldTime);
      });
      if (cancelled) return;

      /* Lights out — all off together (GO) */
      await animate(".f1-light", { opacity: 0.1, scale: 1 }, { duration: 0.1 });
      if (cancelled) return;
      onLightsOutRef.current?.();

      /* 2s pause: fully dark before the repeat blink */
      await animate(".f1-light", { opacity: 0.1, scale: 1 }, { duration: 0.2 });
      if (cancelled) return;
      await new Promise<void>((resolve) => {
        setTimeout(resolve, 2000);
      });
      if (cancelled) return;

      /* All five blink on/off in sync, repeating */
      const playback = animate(
        ".f1-light",
        {
          opacity: [0.1, 1, 0.1],
          scale: [1, 1.06, 1],
        },
        {
          duration: 0.85,
          repeat: Infinity,
          ease: "easeInOut",
        },
      );
      blinkLoop = playback as { stop: () => void };
    };

    void runF1Sequence();

    return () => {
      cancelled = true;
      blinkLoop?.stop();
    };
  }, [animate, scope]);

  return (
    <div
      ref={scope}
      className="flex max-h-10 shrink-0 items-center justify-center md:max-h-12"
    >
      <svg
        width={889}
        height={191}
        viewBox="0 0 889 191"
        fill="none"
        className="h-8 w-auto max-w-[min(42vw,240px)] md:h-10 md:max-w-[min(50vw,320px)]"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <rect
          width="889"
          height="191"
          rx={10}
          fill="#050505"
          fillOpacity={0.75}
        />
        <circle className="f1-light" cx={93} cy={96} r={65} fill="#EE252E" />
        <circle className="f1-light" cx={268} cy={96} r={65} fill="#EE252E" />
        <circle className="f1-light" cx={443} cy={96} r={65} fill="#EE252E" />
        <circle className="f1-light" cx={618} cy={96} r={65} fill="#EE252E" />
        <circle className="f1-light" cx={793} cy={96} r={65} fill="#EE252E" />
      </svg>
    </div>
  );
}

