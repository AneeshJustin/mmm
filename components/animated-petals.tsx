"use client"

import { motion } from "framer-motion"
import { pseudoRandom } from "@/lib/pseudo-random"

type PetalColor = "gold" | "pink"

const petalColors: Record<PetalColor, string> = {
  gold: "text-kerala-gold/40",
  pink: "text-pink-400/50",
}

interface AnimatedPetalsProps {
  count?: number
  color?: PetalColor
  className?: string
}

export function AnimatedPetals({
  count = 12,
  color = "pink",
  className = "",
}: AnimatedPetalsProps) {
  const petals = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${pseudoRandom(i * 4 + 1) * 100}%`,
    delay: pseudoRandom(i * 4 + 2) * 5,
    duration: 8 + pseudoRandom(i * 4 + 3) * 4,
    size: 8 + pseudoRandom(i * 4 + 4) * 12,
  }))

  return (
    <motion.div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className={`absolute ${petalColors[color]}`}
          style={{ left: petal.left, top: "-20px" }}
          animate={{
            y: ["0vh", "110vh"],
            rotate: [0, 360],
            opacity: [0.7, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <svg
            width={petal.size}
            height={petal.size}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c1.5 0 3-.5 4-1-2.5-2-4-5-4-9s1.5-7 4-9c-1-.5-2.5-1-4-1z" />
          </svg>
        </motion.div>
      ))}
    </motion.div>
  )
}
