"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

const CARD_SHADOW =
  "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003";

export type ContainerScrollProps = {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
  /** Outer scroll-track wrapper (height drives scroll range) */
  containerClassName?: string;
  /** Wrapper around header + card (perspective lives here) */
  perspectiveClassName?: string;
  /** Motion card shell (3D transforms) */
  cardClassName?: string;
  /** Inner content shell (background, padding, overflow) */
  cardInnerClassName?: string;
  /** Passed to Framer `useScroll` */
  scrollOffset?: NonNullable<Parameters<typeof useScroll>[0]>["offset"];
  /** Omit layered shadow on the motion card */
  flat?: boolean;
};

export function ContainerScroll({
  titleComponent,
  children,
  containerClassName,
  perspectiveClassName,
  cardClassName,
  cardInnerClassName,
  scrollOffset = ["start 0.88", "end 0.28"],
  flat = false,
}: ContainerScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: scrollOffset,
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const scaleRange = (): [number, number] =>
    isMobile ? [0.88, 1] : [1.02, 1];

  const rotate = useTransform(scrollYProgress, [0, 1], [12, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleRange());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -56]);

  return (
    <div
      ref={containerRef}
      className={
        containerClassName ??
        "relative flex h-[36rem] items-center justify-center p-2 md:h-[48rem] md:p-10"
      }
    >
      <div
        className={perspectiveClassName ?? "relative w-full py-6 md:py-12"}
        style={{ perspective: "1000px" }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card
          rotate={rotate}
          scale={scale}
          cardClassName={cardClassName}
          cardInnerClassName={cardInnerClassName}
          flat={flat}
        >
          {children}
        </Card>
      </div>
    </div>
  );
}

type HeaderProps = {
  translate: MotionValue<number>;
  titleComponent: string | React.ReactNode;
  className?: string;
};

export function Header({
  translate,
  titleComponent,
  className,
}: HeaderProps) {
  return (
    <motion.div
      style={{ y: translate }}
      className={className ?? "mx-auto max-w-5xl text-center"}
    >
      {titleComponent}
    </motion.div>
  );
}

type CardProps = {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  children: React.ReactNode;
  cardClassName?: string;
  cardInnerClassName?: string;
  flat?: boolean;
};

export function Card({
  rotate,
  scale,
  children,
  cardClassName,
  cardInnerClassName,
  flat,
}: CardProps) {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow: flat ? undefined : CARD_SHADOW,
        transformStyle: "preserve-3d",
      }}
      className={
        cardClassName ??
        "mx-auto -mt-12 h-[30rem] w-full max-w-5xl rounded-[30px] border-4 border-[#6C6C6C] bg-[#222222] p-2 shadow-2xl md:h-[40rem] md:p-6"
      }
    >
      <div
        className={
          cardInnerClassName ??
          "h-full w-full overflow-hidden rounded-2xl bg-gray-100 md:rounded-2xl md:p-4 dark:bg-zinc-900"
        }
      >
        {children}
      </div>
    </motion.div>
  );
}
