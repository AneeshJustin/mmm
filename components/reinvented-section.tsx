"use client"

import Link from "next/link"
import { motion } from "framer-motion"

const features = [
  {
    icon: "🐷",
    label: "Cost",
    labelColor: "#e85d04",
    description: "Cheaper than most WhatsApp and printed invites *",
    descColor: "#e85d04",
  },
  {
    icon: "🔍",
    label: "Elder-Friendly Design",
    labelColor: "#2d6a4f",
    description: "No more squinting at tiny-boring whatsapp videos",
    descColor: "#2d6a4f",
  },
  {
    icon: "📷",
    label: "Pre-Wedding Highlight",
    labelColor: "#1d3557",
    description: "Showcase your shoot like never before",
    descColor: "#1d3557",
  },
  {
    icon: "⚙️",
    label: "Instant Edits",
    labelColor: "#6a0572",
    description: "Any change? Update anything instantly even after sharing",
    descColor: "#6a0572",
  },
  {
    icon: "🪔",
    label: "Ritual-Ready Templates",
    labelColor: "#c77dff",
    description: "Includes deities and editable mantras (Hindu weddings only)",
    descColor: "#c77dff",
  },
  {
    icon: "🔒",
    label: "Private Event Pages",
    labelColor: "#0077b6",
    description: "Invite different guests to different events",
    descColor: "#0077b6",
  },
]

export function ReinventedSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-[1fr_1.4fr] gap-16 items-start">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="sticky top-24"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-black leading-tight mb-4">
            The Wedding Invite,<br />Reinvented.
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed mb-8">
            Mobile-first, effortless to share. Costs less than printed cards, but feels far more premium.
          </p>
          <Link
            href="/templates"
            className="inline-block px-6 py-3 bg-black text-white rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors duration-300"
          >
            Choose a template
          </Link>
        </motion.div>

        {/* Right */}
        <div className="divide-y divide-gray-100">
          {features.map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="flex items-start gap-5 py-6 first:pt-0 last:pb-0"
            >
              <span className="text-3xl flex-shrink-0 w-12 h-12 flex items-center justify-center">
                {f.icon}
              </span>
              <div>
                <p className="text-xs font-semibold tracking-wide mb-1" style={{ color: f.labelColor }}>
                  {f.label}
                </p>
                <p className="text-base font-semibold leading-snug" style={{ color: f.descColor }}>
                  {f.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
