"use client"

import { motion } from "framer-motion"
import Link from "next/link"

const features = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
    title: "Easy to Edit",
    description: "Customize every detail - names, dates, venues, and photos with our intuitive editor",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    title: "Mobile Friendly",
    description: "Share your invitation via WhatsApp - perfect for modern Kerala weddings",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
    ),
    title: "Download & Share",
    description: "Download as high-quality image or PDF - print or share digitally",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Ready in Minutes",
    description: "Create your perfect invitation in just 10 minutes - no design skills needed",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-24 bg-kerala-dark relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="features-pattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M0 5 Q2.5 0 5 5 Q7.5 10 10 5" stroke="#d4af37" fill="none" strokeWidth="0.3" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#features-pattern)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-kerala-gold/20 text-kerala-gold rounded-full text-sm font-medium tracking-widest uppercase mb-4">
            Why Choose Us
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-kerala-ivory mb-4">
            Create Stunning Invitations <span className="text-kerala-gold">in Minutes</span>
          </h2>
          <p className="text-xl text-kerala-ivory/60 max-w-2xl mx-auto">
            Our platform makes it easy to create beautiful, authentic Kerala wedding invitations
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-kerala-green/20 backdrop-blur-sm rounded-2xl p-6 border border-kerala-gold/10 hover:border-kerala-gold/30 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-kerala-gold/20 rounded-xl flex items-center justify-center text-kerala-gold mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-kerala-ivory mb-2">{feature.title}</h3>
              <p className="text-kerala-ivory/60">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <Link
            href="/templates"
            className="inline-flex items-center px-8 py-4 bg-kerala-gold text-kerala-dark rounded-full font-semibold text-lg hover:bg-kerala-ivory transition-all duration-300 hover:shadow-xl hover:shadow-kerala-gold/30"
          >
            Start Creating Now
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
