"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { AnimatedPetals } from "@/components/animated-petals"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-kerala-dark">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="kerala-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="1" fill="#d4af37" />
            <path d="M0 10 Q5 5 10 10 Q15 15 20 10" stroke="#d4af37" fill="none" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#kerala-pattern)" />
        </svg>
      </div>

      {/* Floating Petals */}
      <FloatingPetals />

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <span className="inline-block px-4 py-2 bg-kerala-gold/20 text-kerala-gold rounded-full text-sm font-medium tracking-widest uppercase">
            Premium Kerala Wedding Invitations
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-kerala-ivory mb-6 leading-tight"
        >
          Celebrate Your
          <span className="block text-gold-gradient">Kerala Wedding</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl md:text-2xl text-kerala-ivory/70 max-w-3xl mx-auto mb-10 font-light leading-relaxed"
        >
          Create stunning, personalized wedding invitations that honor the rich traditions 
          of Kerala. Hindu, Muslim, and Christian templates crafted with love.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/templates"
            className="px-8 py-4 bg-kerala-gold text-kerala-dark rounded-full font-semibold text-lg hover:bg-kerala-ivory transition-all duration-300 hover:shadow-xl hover:shadow-kerala-gold/30 animate-glow"
          >
            Browse Templates
          </Link>
          <Link
            href="/about"
            className="px-8 py-4 border-2 border-kerala-gold/50 text-kerala-gold rounded-full font-semibold text-lg hover:bg-kerala-gold/10 transition-all duration-300"
          >
            Learn More
          </Link>
        </motion.div>

        {/* Decorative Lamp */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16"
        >
          <NilavilakkuLamp />
        </motion.div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-kerala-ivory to-transparent" />
    </section>
  )
}

function FloatingPetals() {
  return <AnimatedPetals count={15} color="gold" />
}

function NilavilakkuLamp() {
  return (
    <div className="relative w-32 h-40 mx-auto">
      {/* Lamp Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-20 bg-kerala-gold/30 rounded-full blur-xl animate-pulse" />
      
      {/* Lamp SVG */}
      <svg viewBox="0 0 100 120" className="w-full h-full">
        {/* Flame */}
        <ellipse cx="50" cy="15" rx="8" ry="12" fill="#d4af37">
          <animate attributeName="ry" values="12;14;12" dur="0.5s" repeatCount="indefinite" />
        </ellipse>
        <ellipse cx="50" cy="15" rx="4" ry="8" fill="#fff5e0">
          <animate attributeName="ry" values="8;10;8" dur="0.5s" repeatCount="indefinite" />
        </ellipse>
        
        {/* Lamp Body */}
        <path
          d="M35 30 Q50 25 65 30 L60 50 Q50 55 40 50 Z"
          fill="#d4af37"
        />
        <ellipse cx="50" cy="50" rx="15" ry="5" fill="#b8941f" />
        
        {/* Stand */}
        <path
          d="M45 55 L45 90 Q50 95 55 90 L55 55"
          fill="#d4af37"
        />
        
        {/* Base */}
        <ellipse cx="50" cy="95" rx="25" ry="8" fill="#d4af37" />
        <ellipse cx="50" cy="100" rx="30" ry="10" fill="#b8941f" />
        <ellipse cx="50" cy="105" rx="25" ry="8" fill="#d4af37" />
      </svg>
    </div>
  )
}
