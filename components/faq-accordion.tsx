"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Do I need complex software to edit these templates?",
    answer: "Not at all! Our templates run on our custom browser editor and are designed to edit as easily as filling out a simple text form. Most couples finish customizing everything in under 10 minutes, with no design skills required.",
  },
  {
    question: "Why choose an interactive web invite over a standard WhatsApp video?",
    answer: "A WhatsApp video is a generic, low-resolution file where text is tiny and hard to read. A web invitation is an interactive, high-definition website that works flawlessly on all mobile devices. Guests can RSVP dynamically, click direct links to navigate to the venue via Google Maps, listen to music, and check private event routines—all in one place.",
  },
  {
    question: "Will this open like a real website?",
    answer: "Yes! Once you publish your invitation, it becomes a live webpage. Your guests will be able to see a stunning, dynamic layout with transitions, direct RSVP options, map integration, and links to your wedding social media.",
  },
  {
    question: "What if I want to invite different guests to different sub-events?",
    answer: "Our system has a smart event-filtering system built directly into the builder. You can easily select which sub-events (e.g. Mehendi, Nikah, Muhurtham, or Reception) show up for specific guest lists, so you can call separate guests to separate ceremonies with ease.",
  },
  {
    question: "Is there an expiry to my customized wedding invite?",
    answer: "No, there is no expiry! Once you build and publish your wedding invite, you get lifetime hosting and unlimited access. You can keep it as a beautiful digital keepsake forever.",
  },
  {
    question: "Will I need to buy a custom domain name?",
    answer: "No, you don't need to. We provide a beautiful, free web link (e.g. kerala-vivah.com/invitation/arjun-weds-priya) for every invite. However, if you'd like your own premium .com domain (like arjunandpriya.com), we support easy custom domain integration with a single click.",
  },
  {
    question: "Can I make changes to the venue or timing after sharing the link?",
    answer: "Absolutely! This is one of the biggest advantages over printed cards and video files. You can edit any detail—venue, address, map links, dates, or greetings—anytime in our editor, and the changes are instantly reflected on the live website for everyone, with no need to re-share the link.",
  },
];

export function FAQAccordion() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-kerala-beige/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 radial-glow-gold opacity-35 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-kerala-green/10 text-kerala-green rounded-full text-xs font-semibold tracking-[0.25em] uppercase mb-4">
            Common Inquiries
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-kerala-dark mb-4">
            Questions ? <span className="text-kerala-green italic font-medium">Answers.</span>
          </h2>
          <p className="text-lg text-kerala-dark/65 max-w-2xl mx-auto font-sans font-light">
            Everything you need to know about setting up, updating, and sharing your digital wedding invitation.
          </p>
        </motion.div>

        {/* FAQ list */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {

            const isOpen = activeIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="bg-white rounded-2xl border border-kerala-gold/15 overflow-hidden transition-all duration-300 hover:border-kerala-green/30 hover:shadow-lg hover:shadow-kerala-green/5"
              >
                <button
                  onClick={() => setActiveIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className="font-serif font-bold text-lg text-kerala-dark hover:text-kerala-green transition-colors duration-200">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-1 rounded-full bg-kerala-ivory text-kerala-green stroke-[2.5]"
                  >
                    <ChevronDown size={18} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-1 border-t border-kerala-gold/10 font-sans text-kerala-dark/70 text-sm leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Email CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mt-12"
        >
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=sudhi@metquay.com&su=Wedding%20Invitation%20Enquiry"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors duration-300 shadow-lg"
          >
            Any other question?{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent font-bold">
              Email Us
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
