"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { ReactElement } from "react";

const footerLinks = {
  templates: [
    { label: "Hindu Templates", href: "/hindu" },
    { label: "Muslim Templates", href: "/muslim" },
    { label: "Christian Templates", href: "/christian" },
    { label: "Trending", href: "/trending" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
  support: [
    { label: "How It Works", href: "/how-it-works" },
    { label: "FAQs", href: "/faq" },
    { label: "Help Center", href: "/help" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-kerala-dark relative overflow-hidden">
      {/* Decorative Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <pattern
            id="footer-pattern"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="10" cy="10" r="1" fill="#d4af37" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#footer-pattern)" />
        </svg>
      </div>

      {/* Top Border Decoration */}
      <div className="h-1 bg-gradient-to-r from-transparent via-kerala-gold to-transparent" />

      <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-kerala-gold/20 flex items-center justify-center">
                <svg viewBox="0 0 40 40" className="w-8 h-8 text-kerala-gold">
                  <path
                    fill="currentColor"
                    d="M20 5c-1 0-2 1-2 2v3c0 1-1 2-2 2s-2-1-2-2V8c0-1-1-2-2-2s-2 1-2 2v7c0 6 4 11 10 12v8h-4v2h12v-2h-4v-8c6-1 10-6 10-12V8c0-1-1-2-2-2s-2 1-2 2v2c0 1-1 2-2 2s-2-1-2-2V7c0-1-1-2-2-2z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-kerala-ivory">
                  Kerala Vivah
                </h3>
                <p className="text-xs text-kerala-gold tracking-widest uppercase">
                  Premium Invitations
                </p>
              </div>
            </Link>
            <p className="text-kerala-ivory/60 mb-6 max-w-sm">
              Create beautiful, personalized wedding invitations that celebrate
              the rich traditions and culture of Kerala weddings.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {["facebook", "instagram", "twitter", "youtube"].map((social) => (
                <a
                  key={social}
                  href={`#${social}`}
                  className="w-10 h-10 rounded-full bg-kerala-gold/10 flex items-center justify-center text-kerala-gold hover:bg-kerala-gold hover:text-kerala-dark transition-all duration-300"
                >
                  <SocialIcon name={social} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-kerala-gold font-semibold mb-4 uppercase tracking-wider text-sm">
              Templates
            </h4>
            <ul className="space-y-3">
              {footerLinks.templates.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-kerala-ivory/60 hover:text-kerala-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-kerala-gold font-semibold mb-4 uppercase tracking-wider text-sm">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-kerala-ivory/60 hover:text-kerala-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-kerala-gold font-semibold mb-4 uppercase tracking-wider text-sm">
              Support
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-kerala-ivory/60 hover:text-kerala-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-kerala-gold/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-kerala-ivory/40 text-sm">
              2024 Kerala Vivah. All rights reserved.
            </p>
            <p className="text-kerala-ivory/40 text-sm">
              Made with love for Kerala weddings
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ name }: { name: string }) {
  const icons: Record<string, ReactElement | null> = {
    facebook: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
    instagram: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <rect
          x="2"
          y="2"
          width="20"
          height="20"
          rx="5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle
          cx="12"
          cy="12"
          r="4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle cx="18" cy="6" r="1" fill="currentColor" />
      </svg>
    ),
    twitter: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
      </svg>
    ),
    youtube: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z" />
        <polygon
          points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"
          fill="#1a3a2a"
        />
      </svg>
    ),
  };
  return icons[name] || null;
}
