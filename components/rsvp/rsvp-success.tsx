"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import gsap from "gsap"
import { AnimatedPetals } from "@/components/animated-petals"
import { Check } from "lucide-react"

interface RsvpSuccessProps {
  attending: boolean
  guestName: string
}

export function RsvpSuccess({ attending, guestName }: RsvpSuccessProps) {
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (!titleRef.current) return
    const chars = titleRef.current.querySelectorAll(".char")
    gsap.fromTo(
      chars,
      { opacity: 0, y: 30, rotateX: -40 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        stagger: 0.04,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.3,
      }
    )
  }, [])

  const seeYouText = "See You At The Wedding"
  const chars = seeYouText.split("")

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-16"
    >
      <AnimatedPetals count={20} color="gold" className="z-0" />

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.2 }}
        className="relative z-10 w-24 h-24 rounded-full bg-kerala-gold/20 border-2 border-kerala-gold flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(212,175,55,0.5)]"
      >
        <Check className="w-12 h-12 text-kerala-gold" strokeWidth={2.5} />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="relative z-10 text-kerala-gold/80 tracking-[0.35em] uppercase text-xs mb-4"
      >
        With Gratitude
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65 }}
        className="relative z-10 text-3xl md:text-5xl font-light text-kerala-ivory mb-4"
      >
        {attending ? `Thank You, ${guestName}` : `Received, ${guestName}`}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.85 }}
        className="relative z-10 text-kerala-ivory/60 max-w-md text-lg leading-relaxed mb-12"
      >
        {attending
          ? "Your presence will make our celebration complete. A confirmation has been sent to your email."
          : "We appreciate you letting us know. You remain in our hearts on this special day."}
      </motion.p>

      {attending && (
        <h3
          ref={titleRef}
          className="relative z-10 text-2xl md:text-4xl font-serif text-kerala-gold tracking-wide"
          style={{ perspective: 600 }}
        >
          {chars.map((c, i) => (
            <span key={i} className="char inline-block" style={{ transformStyle: "preserve-3d" }}>
              {c === " " ? "\u00A0" : c}
            </span>
          ))}
        </h3>
      )}

      {/* Confetti dots */}
      {Array.from({ length: 24 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-kerala-gold/80 pointer-events-none"
          initial={{
            x: 0,
            y: 0,
            opacity: 1,
          }}
          animate={{
            x: (Math.random() - 0.5) * 400,
            y: (Math.random() - 0.5) * 400,
            opacity: 0,
          }}
          transition={{ duration: 2 + Math.random(), delay: 0.2 + i * 0.05 }}
          style={{ left: "50%", top: "40%" }}
        />
      ))}
    </motion.div>
  )
}
