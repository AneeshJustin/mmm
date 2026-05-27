"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative bg-[#f5f5f5] overflow-hidden pt-[60px]">
      {/* Main content */}
      <div className="flex flex-col items-center text-center pt-16 pb-6 px-5 relative z-10">

        {/* Introducing tag */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-gray-500 text-sm font-sans font-medium mb-5 tracking-wide"
        >
          Introducing
        </motion.p>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-[clamp(2.6rem,7vw,5.5rem)] font-bold text-black font-sans leading-[1.05] tracking-tight max-w-3xl mb-5"
        >
          Website Templates for<br />Wedding Invites
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-gray-500 text-base sm:text-[17px] font-sans font-normal leading-relaxed max-w-sm mb-10"
        >
          Easy-to-customise, Effortless to Share,<br />
          Website Templates for your Big Day.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-10"
        >
          <Link
            href="/templates"
            className="inline-flex items-center px-8 py-4 bg-black text-white rounded-full text-[15px] font-sans font-semibold hover:bg-gray-800 transition-all duration-200 hover:shadow-xl hover:shadow-black/20 hover:-translate-y-0.5"
          >
            Choose a template
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
