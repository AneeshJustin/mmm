"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { pseudoRandom } from "@/lib/pseudo-random";

interface FloatingLanternsProps {
  count?: number;
  className?: string;
}

function formatPercent(value: number) {
  return `${value.toFixed(4)}%`;
}

function formatPx(value: number) {
  return `${value.toFixed(4)}px`;
}

export function FloatingLanterns({
  count = 18,
  className = "",
}: FloatingLanternsProps) {
  const lanterns = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: formatPercent(pseudoRandom(i * 5 + 1) * 100),
        size: Number((12 + pseudoRandom(i * 5 + 2) * 28).toFixed(4)),
        delay: Number((pseudoRandom(i * 5 + 3) * 4).toFixed(4)),
        duration: Number((12 + pseudoRandom(i * 5 + 4) * 10).toFixed(4)),
        drift: Number(((pseudoRandom(i * 5 + 5) - 0.5) * 40).toFixed(4)),
        opacity: Number((0.35 + pseudoRandom(i * 5 + 6) * 0.55).toFixed(4)),
      })),
    [count],
  );

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {lanterns.map((l) => (
        <motion.div
          key={l.id}
          className="absolute"
          style={{ left: l.left, bottom: "-10%" }}
          initial={{ y: 0, opacity: 0 }}
          animate={{
            y: [0, -420, -840],
            x: [0, l.drift, l.drift * 0.5],
            opacity: [0, l.opacity, 0],
          }}
          transition={{
            duration: l.duration,
            delay: l.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div
            className="relative rounded-full"
            style={{
              width: formatPx(l.size),
              height: formatPx(l.size * 1.35),
              background:
                "radial-gradient(ellipse at 50% 30%, #fff7c2 0%, #fbbf24 35%, #ea580c 70%, transparent 100%)",
              boxShadow: `0 0 ${formatPx(l.size)} rgba(251, 191, 36, 0.7), 0 0 ${formatPx(
                l.size * 2,
              )} rgba(234, 88, 12, 0.35)`,
            }}
          >
            <div
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-px rounded-full bg-amber-200/40"
              style={{ height: formatPx(l.size * 0.8) }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
