"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { templates } from "@/components/featured-templates"
import { ScrollStoryInvitation } from "@/components/scroll-story/scroll-story-invitation"
import { loadInvitationData, type StoredInvitationData } from "@/lib/invitation-storage"

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

  if (!template || template.type !== "story") {
    return (
      <main className="min-h-screen bg-stone-900 flex flex-col items-center justify-center text-kerala-ivory p-6">
        <p className="mb-4">Scroll-story template not found.</p>
        <Link href="/templates" className="text-kerala-gold hover:underline">
          Browse templates
        </Link>
      </main>
    )
  }

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
        <ScrollStoryInvitation template={template} data={data} />
      </div>
    </main>
  )
}
