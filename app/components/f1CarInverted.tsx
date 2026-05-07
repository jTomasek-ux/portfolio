"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Strong ease-out — fast start, heavy settle at the end (counterpart vibe to `easeInHeavy` on `F1Car`). */
const easeOutHeavy: [number, number, number, number] = [0.33, 1, 0.68, 1];

interface F1CarInvertedProps {
  className?: string;
  /** When true, animates from off-screen right into place (after lead car exit). */
  slideIn?: boolean;
}

/** Mirrored F1 car; wrapper + SVG sizing match `F1Car`. Slides in when `slideIn` becomes true. */
export default function F1CarInverted({
  className,
  slideIn = false,
}: F1CarInvertedProps) {
  const reduceMotion = useReducedMotion();

  const enterTransition = reduceMotion
    ? { duration: 0.4, delay: 0.05, ease: "linear" as const }
    : { duration: 1.95, delay: 0.05, ease: easeOutHeavy };

  const holdTransition = { duration: 0 };

  return (
    <motion.div
      className="pointer-events-none w-[min(100%,min(92cqi,300px))] max-w-[min(100%,min(92cqi,300px))] shrink-0 flex-none"
      aria-hidden
      initial={{ x: "120vw" }}
      animate={slideIn ? { x: 0 } : { x: "120vw" }}
      transition={slideIn ? enterTransition : holdTransition}
    >
      <div className={className ? `w-full ${className}` : "w-full"}>
        <svg
          width={1086}
          height={461}
          viewBox="0 0 1086 461"
          fill="none"
          className="h-auto w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
        <path
          d="M43.3891 226.087C35.5242 227.34 35.5243 238.66 43.3891 239.913L562.649 322.642C566.9 323.319 570.75 320.034 570.75 315.729V150.271C570.75 145.966 566.9 142.681 562.649 143.358L43.3891 226.087Z"
          fill="#A6051A"
        />
        <rect
          width={423}
          height={300}
          rx={127}
          transform="matrix(-1 0 0 1 839 84)"
          fill="#A6051A"
        />
        <path
          opacity={0.75}
          d="M963.352 272.432C995.99 256.274 995.99 209.726 963.352 193.568L757.522 91.665C745.22 85.5745 730.78 85.5745 718.478 91.665L512.648 193.568C480.01 209.726 480.01 256.274 512.648 272.432L718.478 374.335C730.78 380.426 745.22 380.426 757.522 374.335L963.352 272.432Z"
          fill="#A6051A"
        />
        <rect
          width={108}
          height={255}
          transform="matrix(-1 0 0 1 1086 105)"
          fill="#A6051A"
        />
        <rect
          width={20}
          height={131}
          transform="matrix(-1 0 0 1 962 253)"
          fill="#A6051A"
        />
        <rect
          width={20}
          height={131}
          transform="matrix(0.766044 -0.642788 -0.642788 -0.766044 936.679 384.208)"
          fill="#A6051A"
        />
        <rect
          width={151}
          height={93}
          rx={13}
          transform="matrix(-1 0 0 1 1027 368)"
          fill="#0E0E0E"
        />
        <rect x={241.474} y={253} width={20} height={131} fill="#A6051A" />
        <rect
          x={266.795}
          y={384.208}
          width={20}
          height={131}
          transform="rotate(-140 266.795 384.208)"
          fill="#A6051A"
        />
        <rect x={176.474} y={368} width={151} height={93} rx={13} fill="#0E0E0E" />
        <rect
          width={20}
          height={131}
          transform="matrix(1 0 0 -1 241.474 208)"
          fill="#A6051A"
        />
        <rect
          width={20}
          height={131}
          transform="matrix(-0.766044 0.642788 0.642788 0.766044 266.795 76.7924)"
          fill="#A6051A"
        />
        <rect
          width={151}
          height={93}
          rx={13}
          transform="matrix(1 0 0 -1 176.474 93)"
          fill="#0E0E0E"
        />
        <rect
          x={962}
          y={208}
          width={20}
          height={131}
          transform="rotate(180 962 208)"
          fill="#A6051A"
        />
        <rect
          x={936.679}
          y={76.7924}
          width={20}
          height={131}
          transform="rotate(40 936.679 76.7924)"
          fill="#A6051A"
        />
        <rect
          x={1027}
          y={93}
          width={151}
          height={93}
          rx={13}
          transform="rotate(180 1027 93)"
          fill="#0E0E0E"
        />
        <path
          d="M163.005 33.3996C164.541 26.5264 159.313 20 152.27 20H51.9971C46.7629 20 42.2537 23.6882 41.2156 28.8183L0.441464 230.318C0.150106 231.758 0.150108 233.242 0.441466 234.682L41.2156 436.182C42.2537 441.312 46.7629 445 51.9971 445H152.27C159.313 445 164.541 438.474 163.005 431.6L119.036 234.9C118.683 233.319 118.683 231.681 119.036 230.1L163.005 33.3996Z"
          fill="#A6051A"
        />
        <ellipse
          cx={91}
          cy={55.5}
          rx={91}
          ry={55.5}
          transform="matrix(-1 0 0 1 644 177)"
          fill="#0E0E0E"
        />
        <ellipse
          cx={183}
          cy={55.5}
          rx={183}
          ry={55.5}
          transform="matrix(-1 0 0 1 919 177)"
          fill="#A6051A"
        />
        </svg>
      </div>
    </motion.div>
  );
}
