"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { templates, TemplateCard } from "@/components/featured-templates"

export default function TrendingPage() {
  // For trending, we'll just show all templates with a "trending" badge
  const trendingTemplates = templates.slice(0, 6)

  return (
    <main className="min-h-screen bg-kerala-ivory">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-kerala-dark via-kerala-green to-kerala-dark relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-kerala-gold/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-kerala-gold/5 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Trending Icon */}
            <div className="mx-auto w-20 h-20 mb-6 bg-kerala-gold/20 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-kerala-gold" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
              </svg>
            </div>

            <span className="inline-block px-4 py-2 bg-kerala-gold/20 text-kerala-gold rounded-full text-sm font-medium tracking-widest uppercase mb-4">
              Most Popular
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-kerala-ivory mb-4">
              Trending <span className="text-kerala-gold">Templates</span>
            </h1>
            <p className="text-xl text-kerala-ivory/60 max-w-2xl mx-auto">
              Our most loved designs, chosen by thousands of Kerala couples
            </p>
          </motion.div>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trendingTemplates.map((template, index) => (
              <div key={template.id} className="relative">
                {/* Trending Badge */}
                <div className="absolute -top-3 -right-3 z-10 bg-kerala-gold text-kerala-dark px-3 py-1 rounded-full text-sm font-bold">
                  #{index + 1} Trending
                </div>
                <TemplateCard template={template} index={index} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-kerala-beige">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "10K+", label: "Invitations Created" },
              { value: "50+", label: "Template Designs" },
              { value: "4.9", label: "User Rating" },
              { value: "3", label: "Religion Categories" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="text-4xl font-bold text-kerala-green mb-2">{stat.value}</div>
                <div className="text-kerala-dark/60">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
