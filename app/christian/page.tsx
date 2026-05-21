"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { templates, TemplateCard } from "@/components/featured-templates"

export default function ChristianTemplatesPage() {
  const christianTemplates = templates.filter(t => t.religion === "christian")

  return (
    <main className="min-h-screen bg-kerala-ivory">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-white relative overflow-hidden">
        {/* Cross Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="christian-pattern" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
              <rect x="13" y="5" width="4" height="20" fill="#1e3a5f" />
              <rect x="8" y="10" width="14" height="4" fill="#1e3a5f" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#christian-pattern)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Decorative Icon - Cross */}
            <div className="mx-auto w-24 h-24 mb-6">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <rect x="42" y="15" width="16" height="70" fill="#d4af37" />
                <rect x="25" y="32" width="50" height="16" fill="#d4af37" />
                <circle cx="50" cy="10" r="8" fill="none" stroke="#d4af37" strokeWidth="3" />
              </svg>
            </div>

            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium tracking-widest uppercase mb-4">
              Christian Wedding Invitations
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-kerala-dark mb-4">
              Elegant <span className="text-blue-700">Kerala Christian</span> Designs
            </h1>
            <p className="text-xl text-kerala-dark/60 max-w-2xl mx-auto mb-8">
              Celebrate your blessed union with church-inspired elegance, floral beauty, 
              and the timeless traditions of Syrian Christian and Catholic heritage.
            </p>
            
            {/* Features */}
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {["Animated Video", "Church Elegance", "Floral Designs", "White & Gold"].map((feature) => (
                <span key={feature} className="px-4 py-2 bg-white/80 rounded-full text-kerala-dark/70">
                  {feature}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Animated Video */}
      <section className="py-12 bg-gradient-to-b from-blue-50/80 to-kerala-ivory">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium tracking-widest uppercase mb-3">
              Animated & Cinematic
            </span>
            <h2 className="text-3xl font-bold text-kerala-dark mb-2">
              Video & <span className="text-blue-700">Scroll Story</span> Invitations
            </h2>
            <p className="text-kerala-dark/60 max-w-xl mx-auto mb-2">
              Blessed union video with scroll chapters, auditorium, and car journey sections.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-lg mx-auto lg:max-w-none">
            {christianTemplates
              .filter((t) => t.type === "animated" || t.type === "story")
              .map((template, index) => (
                <TemplateCard key={template.id} template={template} index={index} />
              ))}
          </div>
        </div>
      </section>

      {/* Static Templates */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-kerala-dark mb-8 text-center">Classic Static Designs</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {christianTemplates
              .filter((t) => t.type !== "animated" && t.type !== "story")
              .map((template, index) => (
                <TemplateCard key={template.id} template={template} index={index} />
              ))}
          </div>
        </div>
      </section>

      {/* About Christian Weddings */}
      <section className="py-16 bg-kerala-beige">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-kerala-dark mb-6">About Kerala Christian Weddings</h2>
            <p className="text-kerala-dark/70 leading-relaxed mb-6">
              Kerala has a rich Christian heritage, with Syrian Christians tracing their roots to 
              St. Thomas the Apostle. Kerala Christian weddings beautifully blend ancient traditions 
              with church ceremonies, featuring the exchange of vows, blessing of rings, and the 
              traditional Mantrakodi ceremony.
            </p>
            <p className="text-kerala-dark/70 leading-relaxed">
              Our templates capture this sacred beauty with elegant church motifs, delicate floral 
              designs, cross symbols, and a refined white and gold color palette that reflects 
              the purity and grace of Christian matrimony.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Create Your Christian Wedding Invitation
          </h2>
          <p className="text-white/80 mb-8">
            Choose a template and customize it with your details in minutes
          </p>
          <Link
            href="/templates"
            className="inline-block px-8 py-4 bg-white text-blue-700 rounded-full font-semibold hover:bg-kerala-gold hover:text-kerala-dark transition-all duration-300"
          >
            Browse All Templates
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
