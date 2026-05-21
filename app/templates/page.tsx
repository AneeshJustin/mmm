"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { templates } from "@/components/featured-templates"
import { TemplateCoverflowCarousel } from "@/components/template-coverflow-carousel"

type FilterType = "all" | "hindu" | "muslim" | "christian"

const filters: { value: FilterType; label: string; color: string }[] = [
  { value: "all", label: "All Templates", color: "bg-kerala-green" },
  { value: "hindu", label: "Hindu", color: "bg-orange-600" },
  { value: "muslim", label: "Muslim", color: "bg-emerald-600" },
  { value: "christian", label: "Christian", color: "bg-blue-600" },
]

export default function TemplatesPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all")

  const filteredTemplates = activeFilter === "all" 
    ? templates 
    : templates.filter(t => t.religion === activeFilter)

  return (
    <main className="min-h-screen bg-kerala-ivory">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-kerala-dark relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="gallery-pattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="5" cy="5" r="1" fill="#d4af37" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#gallery-pattern)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="inline-block px-4 py-2 bg-kerala-gold/20 text-kerala-gold rounded-full text-sm font-medium tracking-widest uppercase mb-4">
              Template Gallery
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-kerala-ivory mb-4">
              Choose Your Perfect <span className="text-kerala-gold">Template</span>
            </h1>
            <p className="text-xl text-kerala-ivory/60 max-w-2xl mx-auto">
              Browse our collection of premium Kerala wedding invitation templates
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-kerala-beige sticky top-20 z-40 border-b border-kerala-gold/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeFilter === filter.value
                    ? `${filter.color} text-white`
                    : "bg-white text-kerala-dark hover:bg-kerala-gold/10"
                }`}
              >
                {filter.label}
                <span className="ml-2 text-sm opacity-70">
                  ({filter.value === "all" ? templates.length : templates.filter(t => t.religion === filter.value).length})
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <TemplateCoverflowCarousel items={filteredTemplates} />
            </motion.div>
          </AnimatePresence>

          {filteredTemplates.length === 0 && (
            <div className="text-center py-16">
              <p className="text-kerala-dark/50 text-xl">No templates found for this category.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
