"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

const faqs = [
  {
    question: "How do I create a wedding invitation?",
    answer: "Simply browse our template gallery, choose a design that matches your wedding style, and click to edit. Our intuitive editor lets you customize names, dates, venues, and upload your couple photo. Once done, download as PNG or PDF to share.",
  },
  {
    question: "Can I customize the invitation colors and fonts?",
    answer: "Yes! Our editor allows you to change font styles between elegant serif, modern sans-serif, and classic mono. The color schemes are carefully curated to match each template's cultural aesthetic.",
  },
  {
    question: "What religions are supported?",
    answer: "We specifically focus on Kerala wedding traditions - Hindu, Muslim (Malabar/Mappila), and Christian (Syrian Christian, Catholic). Each category has multiple templates designed with authentic cultural elements.",
  },
  {
    question: "How do I share my invitation?",
    answer: "After downloading your invitation as a PNG or PDF, you can share it via WhatsApp, email, social media, or print it. The high-resolution downloads ensure perfect quality for both digital and print use.",
  },
  {
    question: "Is it free to use?",
    answer: "You can browse all templates and create invitations for free. We offer premium features like additional customization options and priority support for subscribers.",
  },
  {
    question: "Can I add my couple photo?",
    answer: "Absolutely! Our editor includes a photo upload feature. Simply click the photo upload area and select your favorite couple photo. It will be beautifully integrated into your invitation design.",
  },
]

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-kerala-ivory">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-16 bg-kerala-dark relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 bg-kerala-gold/20 text-kerala-gold rounded-full text-sm font-medium tracking-widest uppercase mb-4">
              How It Works
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-kerala-ivory mb-6">
              Create Your Invitation in <span className="text-kerala-gold">3 Simple Steps</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Choose a Template",
                description: "Browse our collection of premium Kerala wedding invitation templates. Filter by religion - Hindu, Muslim, or Christian.",
              },
              {
                step: "02",
                title: "Customize Your Details",
                description: "Edit names, dates, venues, and add your couple photo. Choose your preferred font style for a personalized touch.",
              },
              {
                step: "03",
                title: "Download & Share",
                description: "Download your invitation as a high-quality PNG or PDF. Share via WhatsApp, email, or print for your guests.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                <div className="text-8xl font-bold text-kerala-gold/10 absolute -top-6 left-0">
                  {item.step}
                </div>
                <div className="pt-12 relative z-10">
                  <h3 className="text-2xl font-bold text-kerala-dark mb-4">{item.title}</h3>
                  <p className="text-kerala-dark/60">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 bg-kerala-beige">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-kerala-dark mb-4">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="bg-kerala-ivory rounded-xl border border-kerala-gold/10 overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left"
      >
        <span className="font-semibold text-kerala-dark">{question}</span>
        <ChevronDown
          className={`text-kerala-gold transition-transform ${isOpen ? "rotate-180" : ""}`}
          size={20}
        />
      </button>
      {isOpen && (
        <div className="px-6 pb-5">
          <p className="text-kerala-dark/60">{answer}</p>
        </div>
      )}
    </motion.div>
  )
}
