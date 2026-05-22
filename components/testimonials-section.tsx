"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Priya & Arjun",
    location: "Thrissur",
    religion: "Hindu",
    quote:
      "The Guruvayur temple design was exactly what we dreamed of. Our guests loved the digital invitation!",
    image: "hindu",
  },
  {
    name: "Fathima & Rashid",
    location: "Kozhikode",
    religion: "Muslim",
    quote:
      "Beautiful Malabar-style invitation that honored our traditions. The Islamic patterns were stunning.",
    image: "muslim",
  },
  {
    name: "Maria & Thomas",
    location: "Kottayam",
    religion: "Christian",
    quote:
      "Perfect Syrian Christian wedding invitation. The elegant design impressed everyone in our family.",
    image: "christian",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-kerala-ivory">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-kerala-green/10 text-kerala-green rounded-full text-sm font-medium tracking-widest uppercase mb-4">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-kerala-dark mb-4">
            Loved by <span className="text-kerala-green">Kerala Couples</span>
          </h2>
          <p className="text-xl text-kerala-dark/60 max-w-2xl mx-auto">
            See what our happy couples have to say about their experience
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8, scale: 1.01 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-kerala-beige rounded-2xl p-8 border border-kerala-gold/10 hover:border-kerala-gold/30 transition-all duration-300"
            >
              {/* Quote Icon */}
              <svg
                className="w-10 h-10 text-kerala-gold/30 mb-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>

              <p className="text-kerala-dark/80 text-lg mb-6 italic leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-kerala-gold/20 flex items-center justify-center">
                  <TestimonialAvatar religion={testimonial.image} />
                </div>
                <div>
                  <h4 className="font-bold text-kerala-dark">
                    {testimonial.name}
                  </h4>
                  <p className="text-kerala-dark/50 text-sm">
                    {testimonial.location} • {testimonial.religion} Wedding
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialAvatar({ religion }: { religion: string }) {
  const colors: Record<string, string> = {
    hindu: "text-orange-600",
    muslim: "text-emerald-600",
    christian: "text-blue-600",
  };

  return (
    <svg
      className={`w-6 h-6 ${colors[religion]}`}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  );
}
