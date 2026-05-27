"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

const allNavLinks = [
  { href: "/", label: "Home" },
  { href: "/hindu", label: "Hindu Invitations" },
  { href: "/muslim", label: "Muslim Invitations" },
  { href: "/christian", label: "Christian Invitations" },
  { href: "/trending", label: "Trending" },
  { href: "/rsvp", label: "RSVP" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between h-[52px]">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
              <div
                className="w-9 h-9 bg-gradient-to-br from-gray-900 to-black rounded-lg flex items-center justify-center relative overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105"
                style={{ clipPath: "polygon(0 0, 75% 0, 100% 25%, 100% 100%, 25% 100%, 0 75%)" }}
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
                </svg>
              </div>
              <span className="text-[18px] font-bold text-black tracking-tight leading-none font-sans group-hover:text-gray-700 transition-colors duration-300">
                Kerala Vivah<sup className="text-[9px] font-medium ml-0.5 align-super text-gray-500">®</sup>
              </span>
            </Link>

            {/* Right: CTA + Hamburger */}
            <div className="flex items-center gap-3">
              <Link
                href="/templates"
                className="px-5 py-2.5 bg-black text-white rounded-full text-[13px] font-sans font-semibold hover:bg-gray-800 hover:shadow-lg hover:shadow-black/20 hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap"
              >
                Choose a template
              </Link>
              <button
                onClick={() => setIsOpen(true)}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-black hover:bg-gray-50 transition-all duration-300 flex-shrink-0"
                aria-label="Open menu"
              >
                {/* Minus/dash icon like Missingpiece */}
                <svg width="14" height="2" viewBox="0 0 14 2" fill="none">
                  <line x1="0" y1="1" x2="14" y2="1" stroke="black" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Full-screen overlay menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-[100] bg-white flex flex-col"
          >
            {/* Overlay header */}
            <div className="flex items-center justify-between px-5 sm:px-8 h-[52px] border-b border-gray-200 bg-white/50 backdrop-blur-sm">
              <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 bg-black rounded-[6px] flex items-center justify-center"
                  style={{ clipPath: "polygon(0 0, 75% 0, 100% 25%, 100% 100%, 25% 100%, 0 75%)" }}
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
                  </svg>
                </div>
                <span className="text-[18px] font-bold text-black tracking-tight font-sans">
                  Kerala Vivah<sup className="text-[9px] font-medium ml-0.5 align-super">®</sup>
                </span>
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-black hover:bg-gray-50 transition-all duration-300"
                aria-label="Close menu"
              >
                <X size={16} strokeWidth={1.8} />
              </button>
            </div>

            {/* Menu links */}
            <div className="flex-1 flex flex-col items-start justify-center px-8 sm:px-16 gap-1">
              {allNavLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-4xl sm:text-5xl font-bold text-black hover:text-gray-400 transition-all duration-300 py-2 font-sans hover:translate-x-2"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
