"use client"

import { useCallback, useEffect, useRef } from "react"
import type { TemplateVideoConfig } from "@/lib/template-videos"

interface ReligionVideoBackgroundProps {
  config: TemplateVideoConfig
  className?: string
}

export function ReligionVideoBackground({
  config,
  className = "",
}: ReligionVideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const { src, startSec, endSec, poster } = config

  const clampToSegment = useCallback(() => {
    const video = videoRef.current
    if (!video) return

    if (video.currentTime < startSec) {
      video.currentTime = startSec
      return
    }

    if (endSec !== undefined && video.currentTime >= endSec - 0.05) {
      video.currentTime = startSec
    }
  }, [startSec, endSec])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const onLoadedMetadata = () => {
      video.currentTime = startSec
      void video.play().catch(() => {})
    }

    const onTimeUpdate = () => {
      if (endSec !== undefined && video.currentTime >= endSec - 0.05) {
        video.currentTime = startSec
      }
    }

    const onEnded = () => {
      video.currentTime = startSec
      void video.play().catch(() => {})
    }

    video.addEventListener("loadedmetadata", onLoadedMetadata)
    video.addEventListener("timeupdate", onTimeUpdate)
    video.addEventListener("ended", onEnded)

    if (video.readyState >= 1) {
      onLoadedMetadata()
    }

    return () => {
      video.removeEventListener("loadedmetadata", onLoadedMetadata)
      video.removeEventListener("timeupdate", onTimeUpdate)
      video.removeEventListener("ended", onEnded)
    }
  }, [src, startSec, endSec])

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      className={`absolute inset-0 h-full w-full object-cover object-center ${className}`}
      autoPlay
      muted
      playsInline
      preload="auto"
      aria-hidden
      onSeeked={clampToSegment}
    />
  )
}
