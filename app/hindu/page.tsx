"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { templates, TemplateCard } from "@/components/featured-templates"

export default function HinduTemplatesPage() {
  const hinduTemplates = templates.filter(t => t.religion === "hindu")

  return (
    <main className="min-h-screen bg-kerala-ivory">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="hindu-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M10 0L12 6H18L13 10L15 16L10 12L5 16L7 10L2 6H8L10 0Z" fill="#d4af37" fillOpacity="0.3" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#hindu-pattern)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Decorative Icon */}
            <div className="mx-auto w-24 h-24 mb-6">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#d4af37" strokeWidth="2" />
                <path fill="#d4af37" d="M50 10L55 30H70L58 42L63 62L50 50L37 62L42 42L30 30H45L50 10Z" />
                <circle cx="50" cy="50" r="12" fill="#c41e3a" />
                <path fill="#d4af37" d="M45 48h10v4h-10z" />
              </svg>
            </div>

            <span className="inline-block px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium tracking-widest uppercase mb-4">
              Hindu Wedding Invitations
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-kerala-dark mb-4">
              Traditional <span className="text-orange-700">Kerala Hindu</span> Designs
            </h1>
            <p className="text-xl text-kerala-dark/60 max-w-2xl mx-auto mb-8">
              Celebrate your sacred union with temple bells, elephant motifs, Kathakali accents, 
              and the timeless elegance of Kerala Hindu traditions.
            </p>
            
            {/* Features */}
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {["Animated Video", "Folk Art Style", "Floating Petals", "Temple Designs"].map((feature) => (
                <span key={feature} className="px-4 py-2 bg-white/80 rounded-full text-kerala-dark/70">
                  {feature}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Animated Video Templates */}
      <section className="py-12 bg-gradient-to-b from-rose-50/80 to-kerala-ivory">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="inline-block px-4 py-2 bg-rose-100 text-rose-800 rounded-full text-sm font-medium tracking-widest uppercase mb-3">
              Animated & Cinematic
            </span>
            <h2 className="text-3xl font-bold text-kerala-dark mb-2">
              Video & <span className="text-rose-700">Scroll Story</span> Invitations
            </h2>
            <p className="text-kerala-dark/60 max-w-xl mx-auto">
              Folk-art video, floating lanterns, grand auditorium, car arrival, and full scroll chapters — all with your names and dates.
            </p>
          </motion.div>
          <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hinduTemplates
              .filter((t) => t.type === "animated" || t.type === "story")
              .map((template, index) => (
                <TemplateCard key={template.id} template={template} index={index} />
              ))}
          </motion.div>
        </div>
      </section>

      {/* Static Templates */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-kerala-dark mb-8 text-center">Classic Static Designs</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hinduTemplates
              .filter((t) => t.type !== "animated" && t.type !== "story")
              .map((template, index) => (
                <TemplateCard key={template.id} template={template} index={index} />
              ))}
          </div>
        </div>
      </section>

      {/* About Hindu Weddings */}
      <section className="py-16 bg-kerala-beige">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-kerala-dark mb-6">About Kerala Hindu Weddings</h2>
            <p className="text-kerala-dark/70 leading-relaxed mb-6">
              Kerala Hindu weddings are known for their simplicity and elegance. The ceremonies typically 
              take place in temples or traditional venues decorated with flowers and traditional lamps (Nilavilakku). 
              The bride often wears the traditional Kerala Kasavu saree with gold border, while the groom 
              dons a mundu with gold-bordered angavastram.
            </p>
            <p className="text-kerala-dark/70 leading-relaxed">
              Our templates capture the essence of these sacred ceremonies, featuring temple architecture, 
              traditional lamp motifs, elephant designs, and the iconic gold-and-white color palette that 
              defines Kerala Hindu aesthetics.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-red-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Create Your Hindu Wedding Invitation
          </h2>
          <p className="text-white/80 mb-8">
            Choose a template and customize it with your details in minutes
          </p>
          <Link
            href="/templates"
            className="inline-block px-8 py-4 bg-white text-orange-700 rounded-full font-semibold hover:bg-kerala-gold hover:text-kerala-dark transition-all duration-300"
          >
            Browse All Templates
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
