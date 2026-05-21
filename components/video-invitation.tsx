"use client"

import { motion } from "framer-motion"
import { Play } from "lucide-react"
import { AnimatedPetals } from "@/components/animated-petals"
import { ReligionVideoBackground } from "@/components/religion-video-background"
import { getTemplateVideo } from "@/lib/template-videos"
import type { Template } from "@/components/featured-templates"

export interface InvitationText {
  brideName: string
  groomName: string
  message?: string
  date?: string
  time?: string
  venue?: string
}

interface VideoInvitationProps {
  template: Template
  compact?: boolean
  showPlayBadge?: boolean
  data?: InvitationText
  className?: string
}

const religionOverlays = {
  hindu: "from-rose-950/45 via-transparent to-amber-950/65",
  muslim: "from-emerald-950/50 via-transparent to-emerald-950/70",
  christian: "from-slate-950/40 via-transparent to-amber-950/55",
}

const defaultNames: Record<Template["religion"], InvitationText> = {
  hindu: {
    brideName: "Radha",
    groomName: "Krishna",
    message: "Together with our families",
    date: "Save the Date",
    time: "Ceremony begins",
    venue: "Palace Gardens",
  },
  muslim: {
    brideName: "Aisha",
    groomName: "Ahmed",
    message: "And We Created You In Pairs",
    date: "Nikah Ceremony",
    time: "Reception follows",
    venue: "Malabar Hall",
  },
  christian: {
    brideName: "Maria",
    groomName: "Thomas",
    message: "With God's blessings",
    date: "Holy Matrimony",
    time: "Church ceremony",
    venue: "St. Mary's Church",
  },
}

export function VideoInvitation({
  template,
  compact = false,
  showPlayBadge = false,
  data,
  className = "",
}: VideoInvitationProps) {
  const videoConfig = getTemplateVideo(template.id)
  if (!videoConfig) return null

  const displayData = data ?? defaultNames[template.religion]
  const petalColor = template.religion === "hindu" ? "pink" : "gold"

  return (
    <motion.div
      data-capture-root
      data-religion={template.religion}
      className={`relative overflow-hidden bg-stone-100 ${compact ? "h-full w-full" : "aspect-[3/4] w-full rounded-lg"} ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ReligionVideoBackground config={videoConfig} />

      <motion.div
        className={`absolute inset-0 bg-gradient-to-b ${religionOverlays[template.religion]}`}
        animate={{ opacity: [0.7, 0.82, 0.7] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {template.religion === "hindu" && (
        <AnimatedPetals count={compact ? 8 : 12} color={petalColor} />
      )}

      {showPlayBadge && (
        <motion.div
          data-capture-hide
          className="absolute top-3 right-3 z-20 flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Play size={10} className="fill-white" />
          Video
        </motion.div>
      )}

      <motion.div
        className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center px-4 pb-5 pt-16 text-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <motion.p
          className="mb-1 text-[10px] font-medium uppercase tracking-[0.25em] text-amber-200/90"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          {displayData.message || "Wedding Invitation"}
        </motion.p>

        <motion.h3
          className={`font-bold text-white drop-shadow-lg ${compact ? "text-lg leading-tight" : "text-2xl md:text-3xl"}`}
        >
          {displayData.brideName}
        </motion.h3>

        <span className="my-0.5 text-sm text-amber-300/90">&</span>

        <motion.h3
          className={`font-bold text-white drop-shadow-lg ${compact ? "text-lg leading-tight" : "text-2xl md:text-3xl"}`}
        >
          {displayData.groomName}
        </motion.h3>

        {!compact && (
          <div className="mt-3 space-y-0.5 text-xs text-white/85">
            {displayData.date && <p className="font-medium">{displayData.date}</p>}
            {displayData.time && <p>{displayData.time}</p>}
            {displayData.venue && <p className="text-white/70">{displayData.venue}</p>}
          </div>
        )}

        <motion.div
          className="mt-3 h-0.5 w-16 rounded-full bg-gradient-to-r from-transparent via-amber-300 to-transparent"
          animate={{ scaleX: [0.6, 1, 0.6], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </motion.div>

      <motion.div
        className="pointer-events-none absolute inset-2 rounded-md border border-amber-300/40"
        animate={{ borderColor: ["rgba(252, 211, 77, 0.3)", "rgba(252, 211, 77, 0.6)", "rgba(252, 211, 77, 0.3)"] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </motion.div>
  )
}
