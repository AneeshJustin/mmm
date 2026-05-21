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
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-kerala-ivory/90 backdrop-blur-md border-b border-kerala-gold/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-kerala-green flex items-center justify-center">
              <svg viewBox="0 0 40 40" className="w-8 h-8 text-kerala-gold">
                <path
                  fill="currentColor"
                  d="M20 5c-1 0-2 1-2 2v3c0 1-1 2-2 2s-2-1-2-2V8c0-1-1-2-2-2s-2 1-2 2v7c0 6 4 11 10 12v8h-4v2h12v-2h-4v-8c6-1 10-6 10-12V8c0-1-1-2-2-2s-2 1-2 2v2c0 1-1 2-2 2s-2-1-2-2V7c0-1-1-2-2-2z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-kerala-green tracking-wide">Kerala Vivah</h1>
              <p className="text-xs text-kerala-gold font-medium tracking-widest uppercase">Premium Invitations</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-kerala-dark/80 hover:text-kerala-green transition-colors duration-300 font-medium text-sm tracking-wide"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link
              href="/templates"
              className="px-6 py-3 bg-kerala-green text-kerala-ivory rounded-full font-medium text-sm hover:bg-kerala-dark transition-all duration-300 hover:shadow-lg hover:shadow-kerala-green/20"
            >
              Create Invitation
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-kerala-green"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-kerala-ivory border-t border-kerala-gold/20"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-kerala-dark/80 hover:text-kerala-green transition-colors py-2 font-medium"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/templates"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center px-6 py-3 bg-kerala-green text-kerala-ivory rounded-full font-medium mt-4"
              >
                Create Invitation
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
