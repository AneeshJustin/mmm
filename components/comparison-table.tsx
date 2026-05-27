"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const rows = [
  {
    feature: "Average Cost",
    printed: "High (INR 15,000+)",
    video: "Moderate (INR 5,000+)",
    vivah: "Low (INR 3,999)",
    isPremium: true,
  },
  {
    feature: "Customization Limits",
    printed: "Fixed upon printing",
    video: "Locked after rendering",
    vivah: "Unlimited options",
    isPremium: true,
  },
  {
    feature: "Interactivity",
    printed: "Static paper",
    video: "Static MP4 / WebM",
    vivah: "Fully Interactive",
    isPremium: true,
  },
  {
    feature: "Post-Sharing Updates",
    printed: "Impossible",
    video: "Requires re-rendering & re-sending",
    vivah: "Instant, real-time sync",
    isPremium: true,
  },
  {
    feature: "RSVP Tracking",
    printed: "Manual phone calls",
    video: "Manual spreadsheets",
    vivah: "Dynamic automated admin panel",
    isPremium: true,
  },
  {
    feature: "Elder Legibility",
    printed: "Hard (Tiny gold fonts)",
    video: "Difficult (Squinting at mobile videos)",
    vivah: "Elder-Friendly large fonts & maps",
    isPremium: true,
  },
  {
    feature: "Map Navigation",
    printed: "Static venue names",
    video: "None",
    vivah: "One-click Google Maps routing",
    isPremium: true,
  },
];

export function ComparisonTable() {
  return (
    <section className="py-24 bg-kerala-ivory relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 radial-glow-green opacity-30 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-kerala-green/10 text-kerala-green rounded-full text-xs font-semibold tracking-[0.25em] uppercase mb-4">
            Visual Comparison
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-kerala-dark mb-4">
            How We <span className="text-kerala-green italic font-medium">Outperform</span> the Rest
          </h2>
          <p className="text-lg text-kerala-dark/65 max-w-2xl mx-auto font-sans font-light">
            A head-to-head comparison demonstrating why personalized web invitations are the ultimate choice.
          </p>
        </motion.div>

        {/* Table container */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-white rounded-3xl border border-kerala-gold/15 shadow-xl shadow-kerala-green/5 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-kerala-beige/35 border-b border-kerala-gold/15">
                  <th className="p-6 font-serif font-bold text-lg text-kerala-dark tracking-wide w-1/4">
                    Features
                  </th>
                  <th className="p-6 font-serif font-bold text-lg text-kerala-dark/50 tracking-wide w-1/4">
                    Printed Cards
                  </th>
                  <th className="p-6 font-serif font-bold text-lg text-kerala-dark/50 tracking-wide w-1/4">
                    WhatsApp Videos
                  </th>
                  <th className="p-6 font-serif font-bold text-lg text-kerala-green tracking-wide bg-kerala-green/5 w-1/4">
                    Kerala Vivah Web Invites
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr
                    key={row.feature}
                    className={`border-b border-kerala-gold/10 hover:bg-kerala-beige/10 transition-colors duration-150 ${
                      index === rows.length - 1 ? "border-b-0" : ""
                    }`}
                  >
                    <td className="p-6 font-sans font-semibold text-kerala-dark">
                      {row.feature}
                    </td>
                    <td className="p-6 font-sans text-sm text-kerala-dark/60">
                      <div className="flex items-center gap-2">
                        <X className="w-4 h-4 text-red-500 stroke-[2.5] shrink-0" />
                        <span>{row.printed}</span>
                      </div>
                    </td>
                    <td className="p-6 font-sans text-sm text-kerala-dark/60">
                      <div className="flex items-center gap-2">
                        <X className="w-4 h-4 text-red-500 stroke-[2.5] shrink-0" />
                        <span>{row.video}</span>
                      </div>
                    </td>
                    <td className="p-6 font-sans text-sm font-semibold text-kerala-green bg-kerala-green/5">
                      <div className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-kerala-green stroke-[3] shrink-0" />
                        <span>{row.vivah}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
