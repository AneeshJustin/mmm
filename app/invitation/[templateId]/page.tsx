"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { templates } from "@/components/featured-templates"
import { ScrollStoryInvitation } from "@/components/scroll-story/scroll-story-invitation"
import { VideoInvitation } from "@/components/video-invitation"
import { loadInvitationData, type StoredInvitationData } from "@/lib/invitation-storage"
import { getTemplateVideo } from "@/lib/template-videos"

const defaultData: StoredInvitationData = {
  brideName: "Priya",
  groomName: "Arjun",
  brideParents: "Daughter of Mr. & Mrs. Krishnan Nair",
  groomParents: "Son of Mr. & Mrs. Raghavan Menon",
  message:
    "We are both so delighted that you are able to join us in celebrating what we hope will be one of the happiest days of our lives.",
  date: "Saturday, December 15, 2026",
  time: "10:30 AM",
  venue: "Palace Gardens, Thrissur",
  venueAddress: "Guruvayur Road, Thrissur, Kerala",
  couplePhoto: null,
  musicFile: null,
}

export default function FullscreenInvitationPage() {
  const params = useParams()
  const templateId = params.templateId as string
  const template = templates.find((t) => t.id === templateId)
  const [data, setData] = useState<StoredInvitationData>(defaultData)

  useEffect(() => {
    const saved = loadInvitationData(templateId)
    if (saved) setData(saved)
  }, [templateId])

  if (!template) {
    return (
      <main className="min-h-screen bg-stone-900 flex flex-col items-center justify-center text-kerala-ivory p-6">
        <p className="mb-4">Template not found.</p>
        <Link href="/templates" className="text-kerala-gold hover:underline">
          Browse templates
        </Link>
      </main>
    )
  }

  const isVideoTemplate =
    template.type === "animated" && Boolean(getTemplateVideo(templateId))
  const isStoryTemplate = template.type === "story"

  return (
    <main className="min-h-screen bg-stone-900">
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-black/40 backdrop-blur-md border-b border-amber-300/10"
      >
        <Link
          href={`/editor/${templateId}`}
          className="inline-flex items-center gap-2 text-amber-200/80 text-sm hover:text-amber-100"
        >
          <ArrowLeft className="w-4 h-4" />
          Customize
        </Link>
        <span className="text-xs tracking-widest uppercase text-amber-200/50 hidden sm:inline">
          {template.name}
        </span>
        <Link
          href={`/rsvp?invitation=${templateId}`}
          className="inline-flex items-center gap-1 text-xs text-amber-200/70 hover:text-amber-100"
        >
          RSVP <ExternalLink className="w-3 h-3" />
        </Link>
      </motion.header>

      <div className="pt-14">
        {isStoryTemplate ? (
          <ScrollStoryInvitation template={template} data={data} />
        ) : isVideoTemplate ? (
          <div className="flex items-center justify-center min-h-[calc(100vh-3.5rem)] p-4">
            <VideoInvitation
              template={template}
              className="font-serif"
              data={{
                brideName: data.brideName,
                groomName: data.groomName,
                message: data.message,
                date: data.date,
                time: `at ${data.time}`,
                venue: `${data.venue}, ${data.venueAddress}`,
                couplePhoto: data.couplePhoto,
              }}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center min-h-[calc(100vh-3.5rem)] p-4">
            <div className="max-w-md w-full">
              <StaticInvitationPreview template={template} data={data} />
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

function StaticInvitationPreview({
  template,
  data,
}: {
  template: (typeof templates)[0]
  data: StoredInvitationData
}) {
  const bgGradients = {
    hindu: "from-orange-50 via-red-50 to-yellow-50",
    muslim: "from-emerald-50 via-teal-50 to-green-50",
    christian: "from-blue-50 via-indigo-50 to-white",
  }

  const accentColors = {
    hindu: "text-orange-700",
    muslim: "text-emerald-700",
    christian: "text-blue-700",
  }

  return (
    <div
      data-religion={template.religion}
      className={`font-serif aspect-[3/4] bg-gradient-to-br ${bgGradients[template.religion]} rounded-lg overflow-hidden relative shadow-2xl`}
    >
      {/* Background Music */}
      {data.musicFile && (
        <audio
          src={data.musicFile}
          autoPlay
          loop
          className="hidden"
        />
      )}

      {/* Decorative Border */}
      <div className="absolute inset-3 border-2 border-amber-600/40 rounded-lg" />
      <div className="absolute inset-4 border border-amber-600/20 rounded-lg" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 text-center">
        {/* Top Decoration */}
        <div className="mb-4">
          {template.religion === "hindu" && <HinduDecorSmall />}
          {template.religion === "muslim" && <MuslimDecorSmall />}
          {template.religion === "christian" && <ChristianDecorSmall />}
        </div>

        {/* Invitation Text */}
        <p className="text-amber-600 text-xs tracking-[0.2em] uppercase mb-2">
          Wedding Invitation
        </p>

        <p className="text-stone-700/60 text-sm mb-4 max-w-xs">
          {data.message}
        </p>

        {/* Couple Photo */}
        {data.couplePhoto && (
          <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-amber-600/30 mb-4">
            <img
              src={data.couplePhoto}
              alt="Couple"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Names */}
        <h2
          className={`text-3xl font-bold ${accentColors[template.religion]} mb-1`}
        >
          {data.brideName}
        </h2>
        <p className="text-amber-600 text-lg mb-1">&</p>
        <h2
          className={`text-3xl font-bold ${accentColors[template.religion]} mb-4`}
        >
          {data.groomName}
        </h2>

        {/* Parents */}
        <div className="text-xs text-stone-700/50 mb-4 space-y-1">
          <p>Daughter of {data.brideParents}</p>
          <p>Son of {data.groomParents}</p>
        </div>

        {/* Divider */}
        <div className="w-16 h-px bg-amber-600/40 mb-4" />

        {/* Date & Time */}
        <p className="text-sm font-semibold text-stone-800 mb-1">
          {data.date}
        </p>
        <p className="text-sm text-stone-700/60 mb-4">at {data.time}</p>

        {/* Venue */}
        <p className="font-semibold text-stone-800">{data.venue}</p>
        <p className="text-xs text-stone-700/50">{data.venueAddress}</p>

        {/* Bottom Decoration */}
        <div className="mt-6">
          <svg viewBox="0 0 100 20" className="w-24 h-4 text-amber-600/40">
            <path
              fill="currentColor"
              d="M0 10 Q25 0 50 10 Q75 20 100 10 L100 20 L0 20 Z"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

function HinduDecorSmall() {
  return (
    <svg viewBox="0 0 60 60" className="w-12 h-12">
      <path
        fill="#d4af37"
        d="M30 5L35 18H48L38 27L42 40L30 32L18 40L22 27L12 18H25L30 5Z"
      />
      <circle cx="30" cy="28" r="6" fill="#c41e3a" />
    </svg>
  )
}

function MuslimDecorSmall() {
  return (
    <svg viewBox="0 0 60 60" className="w-12 h-12">
      <path
        fill="#065f46"
        d="M30 5C22 15 18 25 18 35C18 50 24 55 30 58C36 55 42 50 42 35C42 25 38 15 30 5Z"
      />
      <path
        fill="#d4af37"
        d="M30 18L32 24L38 24L33 28L35 34L30 30L25 34L27 28L22 24L28 24L30 18Z"
      />
    </svg>
  )
}

function ChristianDecorSmall() {
  return (
    <svg viewBox="0 0 60 60" className="w-12 h-12">
      <rect x="27" y="10" width="6" height="40" fill="#d4af37" />
      <rect x="18" y="20" width="24" height="6" fill="#d4af37" />
    </svg>
  )
}
