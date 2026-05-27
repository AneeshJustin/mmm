"use client";

import { motion } from "framer-motion";

export function ReligionCategories() {
  return (
    <section className="py-24 bg-kerala-ivory relative overflow-hidden">
      {/* Soft warm glow background */}
      <div className="absolute inset-0 radial-glow-green opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-kerala-green/10 text-kerala-green rounded-full text-xs font-semibold tracking-[0.25em] uppercase mb-4">
            Curated Collections
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-kerala-dark mb-4">
            Choose Your <span className="text-kerala-green italic font-medium">Tradition</span>
          </h2>
          <p className="text-lg md:text-xl text-kerala-dark/65 max-w-2xl mx-auto font-sans font-light">
            Each template is meticulously curated to honor the sacred rituals, traditional symbols, and distinct visual elegance of Kerala's diverse wedding heritage.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
