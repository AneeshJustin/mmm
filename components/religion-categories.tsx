"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const categories = [
  {
    id: "hindu",
    title: "Hindu Weddings",
    subtitle: "Traditional Kerala Hindu Ceremonies",
    description: "Temple bells, elephant motifs, and sacred traditions",
    href: "/hindu",
    gradient: "from-orange-600 via-red-600 to-yellow-600",
    bgColor: "bg-gradient-to-br from-orange-50 to-red-50",
    icon: (
      <svg viewBox="0 0 60 60" className="w-16 h-16">
        <path
          fill="#d4af37"
          d="M30 5L35 20H45L37 30L40 45L30 37L20 45L23 30L15 20H25L30 5Z"
        />
        <circle cx="30" cy="35" r="8" fill="#c41e3a" />
        <path fill="#d4af37" d="M26 33h8v4h-8z" />
      </svg>
    ),
  },
  {
    id: "muslim",
    title: "Muslim Weddings",
    subtitle: "Elegant Malabar Nikah Invitations",
    description: "Islamic patterns with Kerala Mappila traditions",
    href: "/muslim",
    gradient: "from-emerald-600 via-teal-600 to-green-600",
    bgColor: "bg-gradient-to-br from-emerald-50 to-teal-50",
    icon: (
      <svg viewBox="0 0 60 60" className="w-16 h-16">
        <path
          fill="#065f46"
          d="M30 5C25 15 20 20 20 30C20 40 25 50 30 55C35 50 40 40 40 30C40 20 35 15 30 5Z"
        />
        <path
          fill="#d4af37"
          d="M30 15L32 20L37 20L33 24L35 30L30 26L25 30L27 24L23 20L28 20L30 15Z"
        />
      </svg>
    ),
  },
  {
    id: "christian",
    title: "Christian Weddings",
    subtitle: "Syrian Christian & Catholic Ceremonies",
    description: "Church elegance with Kerala Christian heritage",
    href: "/christian",
    gradient: "from-blue-600 via-indigo-600 to-purple-600",
    bgColor: "bg-gradient-to-br from-blue-50 to-indigo-50",
    icon: (
      <svg viewBox="0 0 60 60" className="w-16 h-16">
        <rect x="27" y="10" width="6" height="40" fill="#d4af37" />
        <rect x="18" y="20" width="24" height="6" fill="#d4af37" />
        <circle
          cx="30"
          cy="15"
          r="5"
          fill="none"
          stroke="#d4af37"
          strokeWidth="2"
        />
      </svg>
    ),
  },
];

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

        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <Link href={category.href}>
                <div
                  className="bg-white hover:bg-kerala-beige/35 rounded-3xl p-8 h-full border border-kerala-gold/15 hover:border-kerala-green/30 hover:shadow-2xl hover:shadow-kerala-green/10 group transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="mb-6 w-20 h-20 rounded-2xl bg-kerala-ivory flex items-center justify-center border border-kerala-gold/10 group-hover:scale-105 transition-transform duration-300">
                      {category.icon}
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-kerala-dark mb-2 group-hover:text-kerala-green transition-colors duration-300">
                      {category.title}
                    </h3>
                    <p className="text-kerala-green font-serif italic text-sm tracking-wider font-semibold mb-4">
                      {category.subtitle}
                    </p>
                    <p className="text-kerala-dark/60 font-sans text-sm leading-relaxed mb-6">
                      {category.description}
                    </p>
                  </div>
                  <div className="flex items-center text-kerala-green font-serif tracking-wider font-bold text-sm">
                    <span>Explore Templates</span>
                    <svg
                      className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
