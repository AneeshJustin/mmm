"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { CinematicRsvpForm } from "@/components/rsvp/cinematic-rsvp-form"

function RsvpContent() {
  const searchParams = useSearchParams()
  const invitationId = searchParams.get("invitation") || "default"

  return <CinematicRsvpForm invitationId={invitationId} />
}

export default function RsvpPage() {
  return (
    <main className="min-h-screen bg-[#0a0f0a]">
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 px-4 py-4 flex items-center justify-between bg-[#0a0f0a]/80 backdrop-blur-md border-b border-kerala-gold/10"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-kerala-gold/80 hover:text-kerala-gold text-sm transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Kerala Vivah
        </Link>
        <span className="text-kerala-ivory/40 text-xs tracking-widest uppercase">RSVP</span>
      </motion.header>

      <div className="pt-16">
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-kerala-gold">Loading…</div>}>
          <RsvpContent />
        </Suspense>
      </div>
    </main>
  )
}
