"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/hindu", label: "Hindu Invitations" },
  { href: "/muslim", label: "Muslim Invitations" },
  { href: "/christian", label: "Christian Invitations" },
  { href: "/trending", label: "Trending" },
  { href: "/rsvp", label: "RSVP" },
  { href: "/invitation/hindu-scroll-story", label: "Scroll Story" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-kerala-ivory/90 backdrop-blur-md border-b border-kerala-gold/20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-kerala-green flex items-center justify-center">
                <svg viewBox="0 0 40 40" className="w-5 h-5 text-kerala-gold">
                  <path
                    fill="currentColor"
                    d="M20 5c-1 0-2 1-2 2v3c0 1-1 2-2 2s-2-1-2-2V8c0-1-1-2-2-2s-2 1-2 2v7c0 6 4 11 10 12v8h-4v2h12v-2h-4v-8c6-1 10-6 10-12V8c0-1-1-2-2-2s-2 1-2 2v2c0 1-1 2-2 2s-2-1-2-2V7c0-1-1-2-2-2z"
                  />
                </svg>
              </div>
              <h1 className="text-base font-bold text-kerala-green tracking-wide">Kerala Vivah</h1>
            </Link>

            {/* Right: CTA + Hamburger */}
            <div className="flex items-center gap-3">
              <Link
                href="/templates"
                className="hidden sm:inline-flex px-4 py-1.5 bg-kerala-green text-kerala-ivory rounded-full font-medium text-xs hover:bg-kerala-dark transition-all duration-300"
              >
                Create Invitation
              </Link>
              <button
                onClick={() => setIsOpen(true)}
                className="p-1.5 text-kerala-green hover:text-kerala-dark transition-colors"
                aria-label="Open menu"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Full-screen overlay menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-kerala-ivory flex flex-col"
          >
            {/* Overlay header */}
            <div className="flex items-center justify-between px-6 sm:px-10 h-14 border-b border-kerala-gold/20">
              <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-kerala-green flex items-center justify-center">
                  <svg viewBox="0 0 40 40" className="w-5 h-5 text-kerala-gold">
                    <path
                      fill="currentColor"
                      d="M20 5c-1 0-2 1-2 2v3c0 1-1 2-2 2s-2-1-2-2V8c0-1-1-2-2-2s-2 1-2 2v7c0 6 4 11 10 12v8h-4v2h12v-2h-4v-8c6-1 10-6 10-12V8c0-1-1-2-2-2s-2 1-2 2v2c0 1-1 2-2 2s-2-1-2-2V7c0-1-1-2-2-2z"
                    />
                  </svg>
                </div>
                <h1 className="text-base font-bold text-kerala-green tracking-wide">Kerala Vivah</h1>
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="w-9 h-9 rounded-full border border-kerala-dark/20 flex items-center justify-center text-kerala-dark hover:border-kerala-green hover:text-kerala-green transition-colors"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            {/* Centered menu links */}
            <div className="flex-1 flex flex-col items-center justify-center gap-1">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-kerala-dark/40 mb-6">Menu</p>
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.04, duration: 0.25 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-2xl font-semibold text-kerala-dark hover:text-kerala-green transition-colors duration-200 text-center py-1.5 underline-offset-4 hover:underline"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + navLinks.length * 0.04 + 0.06, duration: 0.25 }}
                className="mt-8"
              >
                <Link
                  href="/templates"
                  onClick={() => setIsOpen(false)}
                  className="px-7 py-2.5 bg-kerala-green text-kerala-ivory rounded-full font-medium text-sm hover:bg-kerala-dark transition-all duration-300"
                >
                  Create Invitation
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
