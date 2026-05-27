"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const steps = [
  {
    num: "1",
    title: "Choose a template",
    desc: "Choose a design that fits your wedding aesthetics, religion, and style.",
  },
  {
    num: "2",
    title: "Customise & Publish",
    desc: "Add your love story, venue address, maps, schedules, and custom music.",
  },
  {
    num: "3",
    title: "Share anywhere",
    desc: "Instantly copy your custom web link and share it on WhatsApp, text, or email.",
  },
];

const benefits = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Cheaper & Premium",
    description: "Costs less than printed cards or custom videographers, yet feels far more premium.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    title: "Elder-Friendly Design",
    description: "No more squinting at tiny-boring whatsapp video text. Perfect legibility and clear maps.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: "Pre-Wedding Highlight",
    description: "Showcase your beautiful pre-wedding shoots, love timeline, and custom galleries in style.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H17" />
      </svg>
    ),
    title: "Instant Live Updates",
    description: "Changed a venue timing? Corrected a spelling? Update anything instantly even after sharing.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    title: "Ritual-Ready Motifs",
    description: "Traditional deity silhouettes, holy mantras, and wedding symbols matching Kerala custom styles.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "Private Event Routing",
    description: "Want distant cousins only for Muhurtham/Nikah? Create custom lists and private routes easily.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-28 bg-white relative overflow-hidden">
      {/* Editorial subtle pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="features-pattern" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
            <path d="M0 6 Q3 0 6 6 Q9 12 12 6" stroke="#d4af37" fill="none" strokeWidth="0.4" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#features-pattern)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* ROW 1: 3-STEP TIMELINE */}
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-black/5 text-black rounded-full text-xs font-semibold tracking-[0.25em] uppercase mb-4">
              Simple Process
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-black mb-4">
              Invite Your Guests in <span className="text-gray-500 font-medium italic">10 Minutes</span>
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto font-sans font-light">
              Designing your premium Kerala wedding website-invite is as effortless as filling a beautiful form.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {steps.map((step, index) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="bg-gray-50 backdrop-blur-md rounded-3xl p-8 border border-gray-200 hover:border-gray-300 hover:bg-gray-100 transition-all duration-300 relative flex flex-col justify-start group"
              >
                <div className="absolute top-6 right-8 text-5xl font-serif font-bold text-gray-300 group-hover:text-gray-400 transition-colors duration-300">
                  {step.num}
                </div>
                <h3 className="text-xl font-serif font-bold text-black mb-3 mt-4">
                  {step.title}
                </h3>
                <p className="text-gray-500 font-sans text-sm leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* HR divider */}
        <div className="border-t border-gray-200 my-16" />

        {/* ROW 2: CORE BENEFITS */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-black/5 text-black rounded-full text-xs font-semibold tracking-[0.25em] uppercase mb-4">
              Modern Advancements
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-black mb-4">
              What Cards and Video Invites <span className="text-gray-500 font-medium italic">Can&apos;t Do</span>
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto font-sans font-light">
              Discover the dynamic, smart, and interactive capabilities that make our website-invites a massive upgrade.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 rounded-3xl p-8 border border-gray-200 hover:border-gray-300 hover:bg-gray-100 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-black/5 rounded-2xl flex items-center justify-center text-black mb-5 group-hover:scale-105 transition-transform duration-300">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-serif font-bold text-black mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-500 font-sans text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-20"
        >
          <Link
            href="/templates"
            className="inline-flex items-center px-10 py-4.5 bg-black text-white rounded-full font-serif font-bold text-lg hover:bg-gray-800 transition-all duration-300 hover:shadow-2xl hover:shadow-black/20"
          >
            Start personalizing your invite
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
