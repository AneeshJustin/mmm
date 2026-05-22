"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How do I create a wedding invitation?",
    answer:
      "Browse our template collection, choose the design you love, and customize it using the editor. You can edit names, dates, venues, messages, font style, and upload your couple photo.",
  },
  {
    question: "Can I add my own couple photo?",
    answer:
      "Yes. The editor includes a photo upload option. Once uploaded, your photo will integrate into the invitation design and appear in the live preview.",
  },
  {
    question: "What religions and wedding styles are supported?",
    answer:
      "We currently support Hindu, Muslim, and Christian Kerala wedding templates, including traditional, animated video, and cinematic scroll story styles.",
  },
  {
    question: "How can I download the invitation?",
    answer:
      "After customizing your invitation, use the download button to save a high-quality PNG or video file depending on the selected template.",
  },
  {
    question: "Can I share my invitation online?",
    answer:
      "Yes. You can download the invitation and share it via WhatsApp, email, social media, or print it for guests.",
  },
  {
    question: "Is the editor mobile-friendly?",
    answer:
      "Absolutely. The editor and preview are designed to work across devices so you can customize invitations from mobile, tablet, or desktop.",
  },
];

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-kerala-ivory">
      <Navbar />

      <section className="pt-32 pb-16 bg-kerala-dark relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 bg-kerala-gold/20 text-kerala-gold rounded-full text-sm font-medium tracking-widest uppercase mb-4">
              FAQs
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-kerala-ivory mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-kerala-ivory/70 max-w-2xl mx-auto">
              Answers to the most common questions about creating, customizing,
              and sharing your Kerala wedding invitations.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-kerala-beige">
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="bg-kerala-ivory rounded-3xl border border-kerala-gold/10 overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left"
      >
        <span className="font-semibold text-kerala-dark">{question}</span>
        <ChevronDown
          className={`text-kerala-gold transition-transform ${isOpen ? "rotate-180" : ""}`}
          size={22}
        />
      </button>
      {isOpen && (
        <div className="px-6 pb-5 text-kerala-dark/70">
          <p>{answer}</p>
        </div>
      )}
    </motion.div>
  );
}
