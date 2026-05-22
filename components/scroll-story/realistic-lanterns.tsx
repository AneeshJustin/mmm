"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { pseudoRandom } from "@/lib/pseudo-random";

/** Soft bokeh sky-lantern glow — not cartoon shapes */
interface RealisticLanternsProps {
  count?: number;
  className?: string;
}

function formatPercent(value: number) {
  return `${value.toFixed(4)}%`;
}

function formatPx(value: number) {
  return `${value.toFixed(4)}px`;
}

export function RealisticLanterns({
  count = 16,
  className = "",
}: RealisticLanternsProps) {
  const lights = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const leftValue = pseudoRandom(i * 7 + 1) * 100;
        const sizeValue = 20 + pseudoRandom(i * 7 + 2) * 48;
        const blurValue = 8 + pseudoRandom(i * 7 + 6) * 16;

        return {
          id: i,
          left: formatPercent(leftValue),
          size: sizeValue,
          delay: Number((pseudoRandom(i * 7 + 3) * 6).toFixed(4)),
          duration: Number((14 + pseudoRandom(i * 7 + 4) * 12).toFixed(4)),
          drift: Number(((pseudoRandom(i * 7 + 5) - 0.5) * 60).toFixed(4)),
          blur: blurValue,
          flickerDuration: Number(
            (1.5 + pseudoRandom(i * 7 + 7) * 2).toFixed(4),
          ),
        };
      }),
    [count],
  );

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {lights.map((l) => (
        <motion.div
          key={l.id}
          className="absolute rounded-full"
          style={{
            left: l.left,
            bottom: "-5%",
            width: formatPx(l.size),
            height: formatPx(l.size),
            filter: `blur(${l.blur.toFixed(4)}px)`,
            background:
              "radial-gradient(circle at 40% 35%, rgba(255,250,220,0.95) 0%, rgba(251,191,36,0.75) 25%, rgba(234,88,12,0.45) 55%, transparent 72%)",
            mixBlendMode: "screen",
          }}
          initial={{ y: 0, opacity: 0, scale: 0.6 }}
          animate={{
            y: [0, -500, -1000],
            x: [0, l.drift * 0.6, l.drift],
            opacity: [0, 0.85, 0],
            scale: [0.7, 1, 0.85],
          }}
          transition={{
            y: {
              duration: l.duration,
              delay: l.delay,
              repeat: Infinity,
              ease: "linear",
            },
            x: {
              duration: l.duration,
              delay: l.delay,
              repeat: Infinity,
              ease: "linear",
            },
            opacity: {
              duration: l.duration,
              delay: l.delay,
              repeat: Infinity,
              ease: "linear",
            },
            scale: {
              duration: l.duration,
              delay: l.delay,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{ opacity: [0.7, 1, 0.75, 1, 0.7] }}
            transition={{
              duration: l.flickerDuration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              boxShadow: `0 0 ${formatPx(l.size * 0.8)} rgba(251, 191, 36, 0.5), 0 0 ${formatPx(
                l.size * 1.5,
              )} rgba(234, 88, 12, 0.25)`,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}
