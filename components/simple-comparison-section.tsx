"use client"

import { motion } from "framer-motion"

const rows = [
  {
    icon: "₹",
    feature: "Cost",
    printed: "High",
    whatsapp: "Moderate",
    ours: "Low",
  },
  {
    icon: "✏️",
    feature: "Customization",
    printed: "Limited",
    whatsapp: "Hard",
    ours: "Easy",
  },
  {
    icon: "☝️",
    feature: "Interactivity",
    printed: "Static",
    whatsapp: "View-only",
    ours: "Responsive",
  },
  {
    icon: "🔄",
    feature: "Updating",
    printed: "Impossible",
    whatsapp: "Difficult",
    ours: "Instant",
  },
]

export function SimpleComparisonSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight mb-5">
            What Cards and Video Invites Can't Do<br />(But These Templates Can)
          </h2>
          <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
            See how your invite can go from one-time share to a lasting experience — without extra cost or hassle.
          </p>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Column headers */}
          <div className="grid grid-cols-4 pb-4 border-b border-gray-200">
            <div />
            <div className="text-sm font-semibold text-gray-800">Printed Cards</div>
            <div className="text-sm font-semibold text-gray-800">Whatsapp Videos</div>
            {/* Kerala Vivah logo column */}
            <div className="flex items-center gap-1.5">
              <div
                className="w-6 h-6 bg-black rounded-md flex items-center justify-center flex-shrink-0"
                style={{ clipPath: "polygon(0 0, 75% 0, 100% 25%, 100% 100%, 25% 100%, 0 75%)" }}
              >
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-white" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
                </svg>
              </div>
              <span className="text-sm font-bold text-black">
                Kerala<span className="font-light">vivah</span>
                <sup className="text-[8px] font-normal ml-0.5">®</sup>
              </span>
            </div>
          </div>

          {/* Rows */}
          {rows.map((row, i) => (
            <motion.div
              key={row.feature}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="grid grid-cols-4 items-center py-6 border-b border-gray-100 last:border-b-0"
            >
              {/* Feature */}
              <div className="flex items-center gap-2.5">
                <span className="text-lg w-6 text-center">{row.icon}</span>
                <span className="text-base font-semibold text-black">{row.feature}</span>
              </div>
              {/* Printed Cards */}
              <div className="text-base text-gray-500">{row.printed}</div>
              {/* WhatsApp */}
              <div className="text-base text-gray-500">{row.whatsapp}</div>
              {/* Ours */}
              <div className="text-base font-bold text-black">{row.ours}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
