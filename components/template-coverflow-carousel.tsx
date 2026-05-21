"use client"

import { useCallback, useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import type { Template } from "@/components/featured-templates"
import { TemplatePreview } from "@/components/template-preview"

interface TemplateCoverflowCarouselProps {
  items: Template[]
  className?: string
  autoplayMs?: number
}

const religionLabels = {
  hindu: "Hindu",
  muslim: "Muslim",
  christian: "Christian",
}

const religionColors = {
  hindu: "bg-orange-100 text-orange-800",
  muslim: "bg-emerald-100 text-emerald-800",
  christian: "bg-blue-100 text-blue-800",
}

function getSlideOffset(
  index: number,
  selectedIndex: number,
  total: number
): number {
  let diff = index - selectedIndex
  if (diff > total / 2) diff -= total
  if (diff < -total / 2) diff += total
  return diff
}

export function TemplateCoverflowCarousel({
  items,
  className,
  autoplayMs = 4500,
}: TemplateCoverflowCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    containScroll: false,
    dragFree: false,
  })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)
    return () => {
      emblaApi.off("select", onSelect)
      emblaApi.off("reInit", onSelect)
    }
  }, [emblaApi, onSelect])

  useEffect(() => {
    if (!emblaApi || !autoplayMs) return
    const timer = window.setInterval(() => emblaApi.scrollNext(), autoplayMs)
    return () => window.clearInterval(timer)
  }, [emblaApi, autoplayMs])

  if (items.length === 0) return null

  const active = items[selectedIndex]

  return (
    <div className={cn("relative w-full", className)}>
      {/* 3D stage */}
      <div
        className="overflow-hidden py-6 md:py-10"
        ref={emblaRef}
        style={{ perspective: "1400px" }}
      >
        <div className="flex touch-pan-y" style={{ transformStyle: "preserve-3d" }}>
          {items.map((template, index) => {
            const offset = getSlideOffset(index, selectedIndex, items.length)
            const abs = Math.abs(offset)
            const isActive = offset === 0

            return (
              <div
                key={template.id}
                className="min-w-0 shrink-0 grow-0 basis-[78%] sm:basis-[58%] md:basis-[46%] lg:basis-[38%] flex justify-center px-2 md:px-4"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div
                  role="button"
                  tabIndex={isActive ? -1 : 0}
                  onClick={() => !isActive && emblaApi?.scrollTo(index)}
                  onKeyDown={(e) => { if ((e.key === "Enter" || e.key === " ") && !isActive) emblaApi?.scrollTo(index) }}
                  className={cn(
                    "w-full max-w-[280px] text-left transition-all duration-500 ease-out",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-kerala-gold focus-visible:ring-offset-2 rounded-2xl",
                    !isActive && "cursor-pointer"
                  )}
                  style={{
                    transform: `rotateY(${offset * -48}deg) scale(${isActive ? 1 : abs === 1 ? 0.86 : 0.72}) translateZ(${isActive ? 40 : -abs * 30}px)`,
                    opacity: abs > 2 ? 0.4 : abs === 2 ? 0.6 : abs === 1 ? 0.88 : 1,
                    zIndex: 10 - abs,
                    filter: isActive ? "none" : `brightness(${1 - abs * 0.08})`,
                  }}
                  aria-label={`View ${template.name}`}
                  aria-current={isActive ? "true" : undefined}
                >
                  <div
                    className={cn(
                      "rounded-2xl overflow-hidden border bg-kerala-ivory shadow-xl transition-shadow duration-500",
                      isActive
                        ? "border-kerala-gold/50 shadow-kerala-gold/20 shadow-2xl"
                        : "border-kerala-gold/15"
                    )}
                  >
                    <div className="aspect-[3/4] relative overflow-hidden">
                      <TemplatePreview template={template} />
                      {isActive && (
                        <div className="absolute inset-0 flex items-center justify-center bg-kerala-dark/0 hover:bg-kerala-dark/15 transition-colors">
                          <span className="opacity-0 hover:opacity-100 px-5 py-2.5 bg-kerala-gold text-kerala-dark rounded-full text-sm font-semibold shadow-lg">
                            Edit Template
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 flex-wrap mb-1.5">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium ${religionColors[template.religion]}`}
                        >
                          {religionLabels[template.religion]}
                        </span>
                        {template.type === "animated" && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase bg-rose-100 text-rose-700">
                            Video
                          </span>
                        )}
                        {template.type === "story" && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase bg-amber-100 text-amber-900">
                            Cinematic
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between gap-2 mt-1">
                        <h3 className="font-bold text-kerala-dark text-sm md:text-base line-clamp-2">
                          {template.name}
                        </h3>
                        <Link
                          href={`/payment?templateId=${template.id}`}
                          onClick={(e) => e.stopPropagation()}
                          className="shrink-0 px-2.5 py-1 rounded-full bg-kerala-gold/20 hover:bg-kerala-gold/40 text-kerala-dark text-xs font-semibold transition-colors"
                        >
                          ₹3,999
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Floor reflection */}
      <div
        className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 w-[min(320px,70%)] h-8 rounded-[100%] bg-kerala-gold/10 blur-xl"
        aria-hidden
      />

      {/* Controls */}
      <button
        type="button"
        onClick={scrollPrev}
        className="absolute left-0 top-1/2 z-20 -translate-y-1/2 rounded-full bg-kerala-dark/80 p-2.5 text-kerala-ivory shadow-lg backdrop-blur-sm transition hover:bg-kerala-dark md:left-2"
        aria-label="Previous template"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        type="button"
        onClick={scrollNext}
        className="absolute right-0 top-1/2 z-20 -translate-y-1/2 rounded-full bg-kerala-dark/80 p-2.5 text-kerala-ivory shadow-lg backdrop-blur-sm transition hover:bg-kerala-dark md:right-2"
        aria-label="Next template"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Active template CTA + dots */}
      <div className="mt-6 flex flex-col items-center gap-4">
        {active && (
          <Link
            href={`/editor/${active.id}`}
            className="inline-flex items-center gap-2 rounded-full bg-kerala-green px-8 py-3.5 font-semibold text-kerala-ivory shadow-lg transition hover:bg-kerala-dark"
          >
            Customize {active.name}
            <ChevronRight className="h-5 w-5" />
          </Link>
        )}
        <div className="flex gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => emblaApi?.scrollTo(index)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                index === selectedIndex
                  ? "w-8 bg-kerala-gold"
                  : "w-2 bg-kerala-gold/30 hover:bg-kerala-gold/50"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
