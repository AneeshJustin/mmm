"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { templates, TemplateCard } from "@/components/featured-templates"

export default function MuslimTemplatesPage() {
  const muslimTemplates = templates.filter(t => t.religion === "muslim")

  return (
    <main className="min-h-screen bg-kerala-ivory">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 relative overflow-hidden">
        {/* Islamic Geometric Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="islamic-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <polygon points="10,0 20,10 10,20 0,10" fill="none" stroke="#065f46" strokeWidth="0.5" />
              <circle cx="10" cy="10" r="3" fill="none" stroke="#065f46" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#islamic-pattern)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Decorative Icon - Crescent and Star */}
            <div className="mx-auto w-24 h-24 mb-6">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path fill="#065f46" d="M50 10C35 10 25 25 25 45C25 65 35 80 50 85C40 75 35 60 35 45C35 30 40 20 50 10Z" />
                <path fill="#d4af37" d="M65 30L67 36L73 36L68 40L70 46L65 42L60 46L62 40L57 36L63 36L65 30Z" />
              </svg>
            </div>

            <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium tracking-widest uppercase mb-4">
              Muslim Wedding Invitations
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-kerala-dark mb-4">
              Elegant <span className="text-emerald-700">Malabar Nikah</span> Designs
            </h1>
            <p className="text-xl text-kerala-dark/60 max-w-2xl mx-auto mb-8">
              Honor your sacred union with stunning Islamic geometric patterns, elegant Arabic typography accents, 
              and the rich heritage of Kerala Mappila traditions.
            </p>
            
            {/* Features */}
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {["Animated Video", "Nikah Designs", "Arabic Accents", "Emerald & Gold"].map((feature) => (
                <span key={feature} className="px-4 py-2 bg-white/80 rounded-full text-kerala-dark/70">
                  {feature}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Animated Video Templates */}
      <section className="py-12 bg-gradient-to-b from-emerald-50/80 to-kerala-ivory">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium tracking-widest uppercase mb-3">
              Animated & Cinematic
            </span>
            <h2 className="text-3xl font-bold text-kerala-dark mb-2">
              Video & <span className="text-emerald-700">Scroll Story</span> Invitations
            </h2>
            <p className="text-kerala-dark/60 max-w-xl mx-auto">
              Nikah video, emerald scroll chapters, auditorium, car arrival, and celebration scenes.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {muslimTemplates
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
            {muslimTemplates
              .filter((t) => t.type !== "animated" && t.type !== "story")
              .map((template, index) => (
                <TemplateCard key={template.id} template={template} index={index} />
              ))}
          </div>
        </div>
      </section>

      {/* About Muslim Weddings */}
      <section className="py-16 bg-kerala-beige">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-kerala-dark mb-6">About Kerala Muslim Weddings</h2>
            <p className="text-kerala-dark/70 leading-relaxed mb-6">
              Kerala Muslim weddings, particularly in the Malabar region, are known for their unique blend 
              of Islamic traditions and local customs. The Nikah ceremony is the central religious ritual, 
              often followed by elaborate celebrations featuring traditional Mappila cuisine and music.
            </p>
            <p className="text-kerala-dark/70 leading-relaxed">
              Our templates honor this rich heritage with elegant Islamic geometric patterns, 
              crescent moon motifs, Arabic calligraphy accents, and a refined emerald and gold color palette 
              that reflects the sophistication of Kerala Muslim weddings.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Create Your Nikah Invitation
          </h2>
          <p className="text-white/80 mb-8">
            Choose a template and customize it with your details in minutes
          </p>
          <Link
            href="/templates"
            className="inline-block px-8 py-4 bg-white text-emerald-700 rounded-full font-semibold hover:bg-kerala-gold hover:text-kerala-dark transition-all duration-300"
          >
            Browse All Templates
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
