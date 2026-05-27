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
    <footer className="bg-white relative overflow-hidden pt-20 pb-12 border-t border-gray-200">
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
            <circle cx="10" cy="10" r="1" fill="#000000" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#footer-pattern)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
          {/* Brand & Identity */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div>
              <Link href="/" className="flex items-center gap-3 mb-6 group">
                <div className="w-11 h-11 rounded-full bg-black/5 flex items-center justify-center border border-gray-200 group-hover:scale-105 transition-transform duration-300">
                  <svg viewBox="0 0 40 40" className="w-6 h-6 text-black">
                    <path
                      fill="currentColor"
                      d="M20 5c-1 0-2 1-2 2v3c0 1-1 2-2 2s-2-1-2-2V8c0-1-1-2-2-2s-2 1-2 2v7c0 6 4 11 10 12v8h-4v2h12v-2h-4v-8c6-1 10-6 10-12V8c0-1-1-2-2-2s-2 1-2 2v2c0 1-1 2-2 2s-2-1-2-2V7c0-1-1-2-2-2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-bold text-black tracking-wide uppercase group-hover:text-gray-600 transition-colors duration-300">
                    Kerala Vivah
                  </h3>
                  <p className="text-[10px] text-gray-500 tracking-[0.25em] uppercase font-sans font-semibold">
                    Premium Invitations
                  </p>
                </div>
              </Link>
              <p className="text-gray-500 font-sans text-sm leading-relaxed mb-6 max-w-sm font-light">
                Beautiful, personalized web invitations and dynamic cinematic video templates that honor the sacred traditions and cultural aesthetics of Kerala weddings.
              </p>
            </div>
            {/* Social Links */}
            <div className="flex gap-3 mt-4">
              {["facebook", "instagram", "twitter", "youtube"].map((social) => (
                <a
                  key={social}
                  href={`#${social}`}
                  className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-500 hover:text-white hover:bg-black hover:border-black transition-all duration-300"
                >
                  <SocialIcon name={social} />
                </a>
              ))}
            </div>
          </div>

          {/* Links 1: Templates */}
          <div>
            <h4 className="text-black font-serif font-bold mb-5 uppercase tracking-widest text-xs">
              Collections
            </h4>
            <ul className="space-y-3">
              {footerLinks.templates.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-500 hover:text-black font-sans text-sm tracking-wide transition-colors font-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links 2: Company */}
          <div>
            <h4 className="text-black font-serif font-bold mb-5 uppercase tracking-widest text-xs">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-500 hover:text-black font-sans text-sm tracking-wide transition-colors font-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links 3: Support */}
          <div>
            <h4 className="text-black font-serif font-bold mb-5 uppercase tracking-widest text-xs">
              Support
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-500 hover:text-black font-sans text-sm tracking-wide transition-colors font-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / Stay Updated (Missingpiece style) */}
          <div className="lg:col-span-1">
            <h4 className="text-black font-serif font-bold mb-5 uppercase tracking-widest text-xs">
              Newsletter
            </h4>
            <p className="text-xs text-gray-500 mb-4 font-sans font-light leading-relaxed">
              Stay updated when new template drops and feature releases are launched.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2.5">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-xs focus:outline-none focus:border-black transition-colors font-sans"
              />
              <button
                type="submit"
                className="w-full px-4 py-2.5 rounded-xl bg-black hover:bg-gray-800 text-white font-serif tracking-wider font-semibold text-xs transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <p className="text-gray-400 font-sans text-xs tracking-wider font-light">
              &copy; {new Date().getFullYear()} Kerala Vivah. All rights reserved.
            </p>
            <p className="text-gray-400 font-sans text-xs tracking-wider font-light italic">
              Crafted with devotion for beautiful Kerala weddings
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
