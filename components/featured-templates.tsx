"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { TemplateCoverflowCarousel } from "@/components/template-coverflow-carousel";
import { TemplatePreview } from "@/components/template-preview";

export interface Template {
  id: string;
  name: string;
  religion: "hindu" | "muslim" | "christian";
  style: string;
  preview: string;
  colors: string[];
  type?: "static" | "animated" | "story";
  thumbnail?: string;
}

export const templates: Template[] = [
  // Hindu Templates
  {
    id: "hindu-temple",
    name: "Guruvayur Temple Elegance",
    religion: "hindu",
    style: "Traditional",
    preview: "hindu-temple",
    colors: ["#d4af37", "#8B0000", "#FFF8DC"],
  },
  {
    id: "hindu-radha-krishna",
    name: "Radha Krishna Folk Art",
    religion: "hindu",
    style: "Animated Video",
    preview: "hindu-folk-art",
    type: "animated",
    thumbnail: "/templates/hindu.mp4",
    colors: ["#f9a8d4", "#d4af37", "#fef3c7"],
  },
  {
    id: "hindu-varmala",
    name: "Varmala Ceremony",
    religion: "hindu",
    style: "Animated Video",
    preview: "hindu-folk-art",
    type: "animated",
    thumbnail: "/templates/hindu.mp4",
    colors: ["#fda4af", "#ea580c", "#fff7ed"],
  },
  {
    id: "hindu-palace-garden",
    name: "Palace Garden Celebration",
    religion: "hindu",
    style: "Animated Video",
    preview: "hindu-folk-art",
    type: "animated",
    thumbnail: "/templates/hindu.mp4",
    colors: ["#fbcfe8", "#16a34a", "#fef9c3"],
  },
  // Muslim Templates
  {
    id: "muslim-minimal",
    name: "Minimal Green Muslim",
    religion: "muslim",
    style: "Minimal",
    preview: "muslim-minimal",
    colors: ["#065f46", "#d4af37", "#ffffff"],
  },
  {
    id: "muslim-nikah-pairs",
    name: "Created In Pairs — Nikah",
    religion: "muslim",
    style: "Animated Video",
    preview: "muslim-nikah",
    type: "animated",
    thumbnail: "/templates/muslim.mp4",
    colors: ["#065f46", "#d4af37", "#f0fdf4"],
  },
  {
    id: "muslim-golden-arch",
    name: "Golden Arch & Candles",
    religion: "muslim",
    style: "Animated Video",
    preview: "muslim-arch",
    type: "animated",
    thumbnail: "/templates/muslim-2.mp4",
    colors: ["#065f46", "#d4af37", "#14532d"],
  },
  {
    id: "muslim-candles",
    name: "Emerald Candlelight",
    religion: "muslim",
    style: "Animated Video",
    preview: "muslim-candles",
    type: "animated",
    thumbnail: "/templates/muslim-3.mp4",
    colors: ["#064e3b", "#d4af37", "#ecfdf5"],
  },
  // Christian Templates
  {
    id: "christian-floral",
    name: "Floral Christian Elegance",
    religion: "christian",
    style: "Floral",
    preview: "christian-floral",
    colors: ["#fce7f3", "#d4af37", "#1a3a2a"],
  },
  {
    id: "christian-blessed",
    name: "Blessed Union — Cross & Roses",
    religion: "christian",
    style: "Animated Video",
    preview: "christian-blessed",
    type: "animated",
    thumbnail: "/templates/christian.mp4",
    colors: ["#fef3c7", "#d4af37", "#1e3a5f"],
  },
  // Scroll-story cinematic templates (Missingpiece-style)
  {
    id: "hindu-scroll-story",
    name: "Lantern Palace — Scroll Story",
    religion: "hindu",
    style: "Cinematic Scroll",
    preview: "hindu-scroll",
    type: "story",
    colors: ["#3d8b7a", "#d4af37", "#1e3a5f"],
  },
  {
    id: "muslim-scroll-story",
    name: "Emerald Nights — Scroll Story",
    religion: "muslim",
    style: "Cinematic Scroll",
    preview: "muslim-scroll",
    type: "story",
    colors: ["#065f46", "#d4af37", "#ecfdf5"],
  },
  {
    id: "christian-scroll-story",
    name: "Blessed Journey — Scroll Story",
    religion: "christian",
    style: "Cinematic Scroll",
    preview: "christian-scroll",
    type: "story",
    colors: ["#1e3a5f", "#d4af37", "#f8fafc"],
  },
];

export function FeaturedTemplates() {
  return (
    <section className="py-24 bg-kerala-beige">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-kerala-green/10 text-kerala-green rounded-full text-sm font-medium tracking-widest uppercase mb-4">
            All Religions
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-kerala-dark mb-4">
            Hindu, Muslim & <span className="text-kerala-green">Christian</span>
          </h2>
          <p className="text-xl text-kerala-dark/60 max-w-2xl mx-auto">
            Browse every template — {templates.length} designs across all Kerala
            wedding traditions
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="overflow-hidden rounded-3xl"
        >
          <TemplateCoverflowCarousel items={templates} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/templates"
            className="inline-flex items-center px-8 py-4 bg-kerala-green text-kerala-ivory rounded-full font-semibold text-lg hover:bg-kerala-dark transition-all duration-300"
          >
            View All Templates
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export function TemplateCard({
  template,
  index,
}: {
  template: Template;
  index: number;
}) {
  const religionLabels = {
    hindu: "Hindu",
    muslim: "Muslim",
    christian: "Christian",
  };

  const religionColors = {
    hindu: "bg-orange-100 text-orange-800",
    muslim: "bg-emerald-100 text-emerald-800",
    christian: "bg-blue-100 text-blue-800",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link href={`/editor/${template.id}`}>
        <div className="bg-kerala-ivory rounded-2xl overflow-hidden premium-card border border-kerala-gold/10 hover:border-kerala-gold/30 group">
          {/* Template Preview */}
          <div className="aspect-[3/4] relative overflow-hidden">
            <TemplatePreview template={template} />
            <div className="absolute inset-0 bg-kerala-dark/0 group-hover:bg-kerala-dark/20 transition-all duration-300 flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 px-6 py-3 bg-kerala-gold text-kerala-dark rounded-full font-semibold">
                Edit Template
              </span>
            </div>
          </div>

          {/* Template Info */}
          <div className="p-5">
            <motion.div className="flex items-center justify-between mb-2 flex-wrap gap-1">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${religionColors[template.religion]}`}
              >
                {religionLabels[template.religion]}
              </span>
              {template.type === "animated" && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide bg-rose-100 text-rose-700">
                  Video
                </span>
              )}
              {template.type === "story" && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide bg-amber-100 text-amber-900">
                  Cinematic
                </span>
              )}
              <span className="text-sm text-kerala-dark/50 ml-auto">
                {template.style}
              </span>
            </motion.div>
            <h3 className="text-lg font-bold text-kerala-dark">
              {template.name}
            </h3>
            <div className="flex gap-2 mt-3">
              {template.colors.map((color, i) => (
                <div
                  key={i}
                  className="w-5 h-5 rounded-full border border-kerala-dark/10"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
