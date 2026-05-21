"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import QRCode from "qrcode"
import { motion } from "framer-motion"
import { ArrowLeft, Download } from "lucide-react"

export default function RsvpQrPage() {
  const [qrDataUrl, setQrDataUrl] = useState<string>("")

  useEffect(() => {
    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}/rsvp`
        : process.env.NEXT_PUBLIC_SITE_URL
          ? `${process.env.NEXT_PUBLIC_SITE_URL}/rsvp`
          : "http://localhost:3000/rsvp"

    QRCode.toDataURL(url, {
      width: 320,
      margin: 2,
      color: { dark: "#1a0f0a", light: "#fef3c7" },
    }).then(setQrDataUrl)
  }, [])

  const downloadQr = () => {
    if (!qrDataUrl) return
    const a = document.createElement("a")
    a.href = qrDataUrl
    a.download = "kerala-vivah-rsvp-qr.png"
    a.click()
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a0f0a] to-[#120a08] flex flex-col items-center justify-center px-6 py-16">
      <Link
        href="/rsvp"
        className="absolute top-6 left-6 inline-flex items-center gap-2 text-kerala-gold/80 text-sm hover:text-kerala-gold"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to RSVP
      </Link>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-md"
      >
        <p className="text-kerala-gold/70 tracking-[0.3em] uppercase text-xs mb-4">
          Scan to RSVP
        </p>
        <h1 className="text-3xl font-serif text-kerala-ivory mb-8">Guest QR Access</h1>

        {qrDataUrl ? (
          <div className="p-6 rounded-3xl bg-kerala-ivory/95 border-2 border-kerala-gold/40 shadow-[0_0_48px_rgba(212,175,55,0.3)] inline-block mb-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={qrDataUrl} alt="RSVP QR Code" width={280} height={280} />
          </div>
        ) : (
          <div className="w-[280px] h-[280px] rounded-3xl bg-white/10 animate-pulse mb-8 mx-auto" />
        )}

        <p className="text-kerala-ivory/50 text-sm mb-6">
          Print or share this code so guests can open the cinematic RSVP on their phones.
        </p>

        <button
          type="button"
          onClick={downloadQr}
          disabled={!qrDataUrl}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-kerala-gold text-kerala-dark font-medium hover:shadow-[0_0_24px_rgba(212,175,55,0.4)] transition disabled:opacity-50"
        >
          <Download className="w-4 h-4" />
          Download QR
        </button>
      </motion.div>
    </main>
  )
}
