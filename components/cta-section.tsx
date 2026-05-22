"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-24 bg-kerala-green relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <pattern
            id="cta-pattern"
            x="0"
            y="0"
            width="15"
            height="15"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 7.5 Q3.75 3.75 7.5 7.5 Q11.25 11.25 15 7.5"
              stroke="#d4af37"
              fill="none"
              strokeWidth="0.5"
            />
            <circle cx="7.5" cy="7.5" r="1" fill="#d4af37" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#cta-pattern)" />
        </svg>
      </div>

      {/* Decorative Lamps */}
      <motion.div
        className="absolute left-10 top-1/2 -translate-y-1/2 opacity-20"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 60 80" className="w-16 h-24 text-kerala-gold">
          <ellipse cx="30" cy="10" rx="6" ry="10" fill="currentColor" />
          <path
            d="M20 20 Q30 15 40 20 L35 40 Q30 45 25 40 Z"
            fill="currentColor"
          />
          <path d="M27 45 L27 65 Q30 70 33 65 L33 45" fill="currentColor" />
          <ellipse cx="30" cy="70" rx="15" ry="5" fill="currentColor" />
        </svg>
      </motion.div>
      <motion.div
        className="absolute right-10 top-1/2 -translate-y-1/2 opacity-20"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 60 80" className="w-16 h-24 text-kerala-gold">
          <ellipse cx="30" cy="10" rx="6" ry="10" fill="currentColor" />
          <path
            d="M20 20 Q30 15 40 20 L35 40 Q30 45 25 40 Z"
            fill="currentColor"
          />
          <path d="M27 45 L27 65 Q30 70 33 65 L33 45" fill="currentColor" />
          <ellipse cx="30" cy="70" rx="15" ry="5" fill="currentColor" />
        </svg>
      </motion.div>

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-kerala-ivory mb-6">
            Ready to Create Your{" "}
            <span className="text-kerala-gold">Dream Invitation?</span>
          </h2>
          <p className="text-xl text-kerala-ivory/70 mb-10 max-w-2xl mx-auto">
            Join thousands of Kerala couples who have celebrated their special
            day with our beautiful, culturally authentic wedding invitations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/templates"
              className="px-8 py-4 bg-kerala-gold text-kerala-dark rounded-full font-semibold text-lg hover:bg-kerala-ivory transition-all duration-300 hover:shadow-xl hover:shadow-kerala-gold/30 transform hover:-translate-y-1 hover:scale-[1.02]"
            >
              Start Creating Free
            </Link>
            <Link
              href="/rsvp"
              className="px-8 py-4 border-2 border-kerala-gold/50 text-kerala-gold rounded-full font-semibold text-lg hover:bg-kerala-gold/10 transition-all duration-300"
            >
              Cinematic RSVP
            </Link>
            <Link
              href="/about"
              className="px-8 py-4 border-2 border-kerala-gold/30 text-kerala-ivory/80 rounded-full font-semibold text-lg hover:bg-white/5 transition-all duration-300"
            >
              Learn More
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
