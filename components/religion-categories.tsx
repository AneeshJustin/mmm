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
    <section className="py-24 bg-kerala-ivory">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-kerala-green/10 text-kerala-green rounded-full text-sm font-medium tracking-widest uppercase mb-4">
            Browse By Religion
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-kerala-dark mb-4">
            Choose Your <span className="text-kerala-green">Tradition</span>
          </h2>
          <p className="text-xl text-kerala-dark/60 max-w-2xl mx-auto">
            Each template is crafted to honor the unique customs and aesthetics
            of Kerala&apos;s diverse wedding traditions
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8, scale: 1.02 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Link href={category.href}>
                <div
                  className={`${category.bgColor} rounded-3xl p-8 h-full premium-card border border-kerala-gold/10 hover:border-kerala-gold/30 group`}
                >
                  <div className="mb-6">{category.icon}</div>
                  <h3 className="text-2xl font-bold text-kerala-dark mb-2">
                    {category.title}
                  </h3>
                  <p className="text-kerala-green font-medium mb-3">
                    {category.subtitle}
                  </p>
                  <p className="text-kerala-dark/60 mb-6">
                    {category.description}
                  </p>
                  <div className="flex items-center text-kerala-green font-medium">
                    <span>Explore Templates</span>
                    <svg
                      className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
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
