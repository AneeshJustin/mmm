"use client"

import { VideoInvitation } from "@/components/video-invitation"
import { ScrollStoryInvitation } from "@/components/scroll-story/scroll-story-invitation"
import type { Template } from "@/components/featured-templates"
import { getTemplateVideo } from "@/lib/template-videos"

const sampleStoryData = {
  brideName: "Priya",
  groomName: "Arjun",
  brideParents: "Daughter of Mr. & Mrs. Nair",
  groomParents: "Son of Mr. & Mrs. Menon",
  message: "Together with our families, we invite you to celebrate our wedding",
  date: "December 15, 2026",
  time: "10:30 AM",
  venue: "Palace Gardens",
  venueAddress: "Thrissur, Kerala",
  couplePhoto: null as string | null,
}

export function TemplatePreview({ template }: { template: Template }) {
  if (template.type === "story") {
    return (
      <ScrollStoryInvitation
        template={template}
        data={sampleStoryData}
        compact
        className="h-full w-full"
      />
    )
  }

  if (template.type === "animated" && getTemplateVideo(template.id)) {
    return (
      <VideoInvitation
        template={template}
        compact
        showPlayBadge
        className="h-full"
      />
    )
  }

  const bgGradients = {
    hindu: "from-orange-100 via-red-50 to-yellow-50",
    muslim: "from-emerald-100 via-teal-50 to-green-50",
    christian: "from-blue-100 via-indigo-50 to-white",
  }

  return (
    <div
      className={`relative w-full h-full bg-gradient-to-br ${bgGradients[template.religion]} flex flex-col items-center justify-center`}
    >
      {template.religion === "hindu" && <HinduDecor />}
      {template.religion === "muslim" && <MuslimDecor />}
      {template.religion === "christian" && <ChristianDecor />}
      <div className="text-center mt-4 relative z-10">
        <p className="text-kerala-gold text-xs tracking-widest uppercase mb-2">
          Wedding Invitation
        </p>
        <h4 className="text-2xl font-bold text-kerala-dark">Bride & Groom</h4>
        <p className="text-kerala-dark/60 text-sm mt-2">Date & Venue</p>
      </div>
    </div>
  )
}

function HinduDecor() {
  return (
    <svg viewBox="0 0 80 80" className="w-20 h-20 text-kerala-gold">
      <circle cx="40" cy="40" r="35" fill="none" stroke="currentColor" strokeWidth="1" />
      <path
        fill="currentColor"
        d="M40 10L45 25H55L47 33L50 48L40 40L30 48L33 33L25 25H35L40 10Z"
      />
      <circle cx="40" cy="40" r="8" fill="#c41e3a" />
    </svg>
  )
}

function MuslimDecor() {
  return (
    <svg viewBox="0 0 80 80" className="w-20 h-20 text-emerald-700">
      <path
        fill="currentColor"
        d="M40 5C30 20 25 30 25 45C25 60 32 70 40 75C48 70 55 60 55 45C55 30 50 20 40 5Z"
      />
      <path
        fill="#d4af37"
        d="M40 20L42 26L48 26L43 30L45 36L40 32L35 36L37 30L32 26L38 26L40 20Z"
      />
    </svg>
  )
}

function ChristianDecor() {
  return (
    <svg viewBox="0 0 80 80" className="w-20 h-20 text-kerala-gold">
      <rect x="36" y="15" width="8" height="50" fill="currentColor" />
      <rect x="25" y="28" width="30" height="8" fill="currentColor" />
      <circle cx="40" cy="12" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}
