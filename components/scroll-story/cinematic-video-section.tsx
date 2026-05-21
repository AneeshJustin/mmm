"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ReligionVideoBackground } from "@/components/religion-video-background"
import type { TemplateVideoConfig } from "@/lib/template-videos"
import { cn } from "@/lib/utils"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface CinematicVideoSectionProps {
  video: TemplateVideoConfig
  overlayClassName?: string
  children: React.ReactNode
  className?: string
  minHeight?: string
  parallax?: boolean
  filmGrain?: boolean
  scrollSnap?: boolean
}

export function CinematicVideoSection({
  video,
  overlayClassName = "bg-black/50",
  children,
  className,
  minHeight = "min-h-screen",
  parallax = true,
  filmGrain = true,
  scrollSnap = true,
}: CinematicVideoSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const videoWrapRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = section.querySelector("video")
        if (!video) return
        if (entry.isIntersecting) {
          void video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!parallax || !sectionRef.current || !videoWrapRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        videoWrapRef.current,
        { scale: 1.08 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [parallax])

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative flex flex-col items-center justify-center overflow-hidden",
        minHeight,
        className
      )}
      style={scrollSnap ? { scrollSnapAlign: "start" } : undefined}
    >
      <div ref={videoWrapRef} className="absolute inset-0 will-change-transform">
        <ReligionVideoBackground config={video} />
      </div>

      <div className={cn("absolute inset-0", overlayClassName)} />

      {filmGrain && (
        <div
          className="absolute inset-0 opacity-[0.12] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
      )}

      <div className="relative z-10 w-full">{children}</div>
    </section>
  )
}
