"use client"

import { motion } from "framer-motion"

export function KeralaLamp({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={`relative ${className}`}
      animate={{ opacity: [0.7, 1, 0.7] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg viewBox="0 0 120 160" className="w-16 h-24 md:w-20 md:h-28 text-kerala-gold drop-shadow-[0_0_24px_rgba(212,175,55,0.6)]">
        <ellipse cx="60" cy="28" rx="22" ry="8" fill="currentColor" opacity="0.9" />
        <path
          d="M38 36h44v70c0 8-10 14-22 14s-22-6-22-14V36z"
          fill="currentColor"
          opacity="0.85"
        />
        <ellipse cx="60" cy="120" rx="30" ry="10" fill="currentColor" />
        <motion.ellipse
          cx="60"
          cy="18"
          rx="14"
          ry="18"
          fill="#fef08a"
          animate={{ opacity: [0.4, 0.9, 0.4], scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          style={{ filter: "blur(2px)" }}
        />
      </svg>
    </motion.div>
  )
}
