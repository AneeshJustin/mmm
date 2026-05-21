"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-kerala-ivory">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-kerala-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="about-pattern" x="0" y="0" width="15" height="15" patternUnits="userSpaceOnUse">
              <path d="M0 7.5 Q3.75 3.75 7.5 7.5 Q11.25 11.25 15 7.5" stroke="#d4af37" fill="none" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#about-pattern)" />
          </svg>
        </div>

        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 bg-kerala-gold/20 text-kerala-gold rounded-full text-sm font-medium tracking-widest uppercase mb-4">
              About Us
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-kerala-ivory mb-6">
              Celebrating <span className="text-kerala-gold">Kerala Weddings</span>
            </h1>
            <p className="text-xl text-kerala-ivory/60 max-w-2xl mx-auto">
              We are dedicated to preserving and celebrating the rich wedding traditions of Kerala 
              through beautiful, personalized digital invitations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-kerala-dark mb-6">
                Our Story
              </h2>
              <p className="text-kerala-dark/70 leading-relaxed mb-4">
                Kerala Vivah was born from a deep appreciation for the diverse and beautiful wedding 
                traditions of Kerala. From the sacred rituals of Hindu weddings at Guruvayur Temple 
                to the elegant Nikah ceremonies of Malabar Muslims and the blessed unions in 
                Syrian Christian churches - each tradition tells a unique story.
              </p>
              <p className="text-kerala-dark/70 leading-relaxed mb-4">
                We noticed that while modern couples wanted digital invitations for their convenience, 
                most available options were generic and failed to capture the authentic essence of 
                Kerala&apos;s cultural heritage.
              </p>
              <p className="text-kerala-dark/70 leading-relaxed">
                That&apos;s why we created Kerala Vivah - to bridge tradition and technology, offering 
                stunning, culturally authentic wedding invitations that honor your heritage while 
                embracing modern convenience.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-square bg-kerala-beige rounded-2xl overflow-hidden relative">
                {/* Kerala Art Illustration */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg viewBox="0 0 200 200" className="w-3/4 h-3/4">
                    {/* Traditional Lamp */}
                    <ellipse cx="100" cy="40" rx="15" ry="25" fill="#d4af37">
                      <animate attributeName="ry" values="25;28;25" dur="1s" repeatCount="indefinite" />
                    </ellipse>
                    <ellipse cx="100" cy="40" rx="8" ry="15" fill="#fff5e0">
                      <animate attributeName="ry" values="15;18;15" dur="1s" repeatCount="indefinite" />
                    </ellipse>
                    <path d="M75 60 Q100 50 125 60 L115 100 Q100 110 85 100 Z" fill="#d4af37" />
                    <path d="M90 100 L90 150 Q100 160 110 150 L110 100" fill="#d4af37" />
                    <ellipse cx="100" cy="160" rx="40" ry="15" fill="#d4af37" />
                    <ellipse cx="100" cy="170" rx="50" ry="20" fill="#b8941f" />
                    <ellipse cx="100" cy="180" rx="40" ry="15" fill="#d4af37" />
                  </svg>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-kerala-beige/50 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-kerala-beige">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-kerala-dark mb-4">
              What We Stand For
            </h2>
            <p className="text-kerala-dark/60 max-w-2xl mx-auto">
              Our core values guide everything we create
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Cultural Authenticity",
                description: "Every design element is researched and crafted to honor the true traditions of Kerala weddings.",
                icon: (
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                ),
              },
              {
                title: "Premium Quality",
                description: "We never compromise on design quality. Every template is crafted with attention to detail.",
                icon: (
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ),
              },
              {
                title: "Easy to Use",
                description: "Our editor is designed to be simple and intuitive, so anyone can create beautiful invitations.",
                icon: (
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11v6h2v-6h-2zm0-4v2h2V7h-2z" />
                  </svg>
                ),
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-kerala-ivory rounded-2xl p-8 text-center border border-kerala-gold/10"
              >
                <div className="w-16 h-16 bg-kerala-gold/20 rounded-xl flex items-center justify-center text-kerala-gold mx-auto mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-kerala-dark mb-3">{value.title}</h3>
                <p className="text-kerala-dark/60">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Kerala Traditions Section */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-kerala-dark mb-4">
              Kerala Wedding Traditions
            </h2>
            <p className="text-kerala-dark/60 max-w-2xl mx-auto">
              Kerala is home to diverse wedding traditions that reflect its multicultural heritage
            </p>
          </motion.div>

          <div className="space-y-8">
            {[
              {
                title: "Hindu Weddings",
                color: "from-orange-100 to-red-100",
                accent: "text-orange-700",
                description: "Kerala Hindu weddings are known for their simplicity and elegance. The ceremonies often take place at temples like Guruvayur, featuring traditional rituals like Kanyadaanam, Thaali tying, and Saptapadi. The bride typically wears a white and gold Kasavu saree.",
              },
              {
                title: "Muslim Weddings",
                color: "from-emerald-100 to-teal-100",
                accent: "text-emerald-700",
                description: "Malabar Muslim weddings blend Islamic traditions with local customs. The Nikah ceremony is the central ritual, followed by elaborate celebrations with traditional Mappila cuisine. The Mahr presentation and exchange of vows are key moments.",
              },
              {
                title: "Christian Weddings",
                color: "from-blue-100 to-indigo-100",
                accent: "text-blue-700",
                description: "Kerala has a rich Christian heritage dating back to St. Thomas. Syrian Christian and Catholic weddings feature church ceremonies with the exchange of vows, blessing of rings, and the traditional Mantrakodi. The bride often wears white or gold.",
              },
            ].map((tradition, index) => (
              <motion.div
                key={tradition.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`bg-gradient-to-br ${tradition.color} rounded-2xl p-8 border border-kerala-gold/10`}
              >
                <h3 className={`text-2xl font-bold ${tradition.accent} mb-4`}>{tradition.title}</h3>
                <p className="text-kerala-dark/70 leading-relaxed">{tradition.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
