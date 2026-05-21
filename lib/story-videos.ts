import type { TemplateVideoConfig } from "@/lib/template-videos"

export type StoryVideoKey =
  | "hero"
  | "names"
  | "events"
  | "couple"
  | "route"
  | "car"
  | "auditorium"
  | "celebration"
  | "finale"

const hinduVideos: Record<StoryVideoKey, TemplateVideoConfig> = {
  hero: { src: "/templates/hindu.mp4", startSec: 0, poster: "/templates/hindu-folk-art-radha-krishna.png" },
  names: { src: "/templates/hindu.mp4", startSec: 0 },
  events: { src: "/templates/hindu-animated.mp4", startSec: 0 },
  couple: { src: "/templates/hindu.mp4", startSec: 0 },
  route: { src: "/templates/muslim-3.mp4", startSec: 0, endSec: 11 },
  car: { src: "/templates/hindu-animated.mp4", startSec: 0 },
  auditorium: { src: "/templates/muslim-2.mp4", startSec: 0, poster: "/templates/muslim-cover-poster.png" },
  celebration: { src: "/templates/muslim.mp4", startSec: 0 },
  finale: { src: "/templates/hindu.mp4", startSec: 0 },
}

const muslimVideos: Record<StoryVideoKey, TemplateVideoConfig> = {
  hero: { src: "/templates/muslim.mp4", startSec: 0, poster: "/templates/muslim-poster.png" },
  names: { src: "/templates/muslim-2.mp4", startSec: 0, poster: "/templates/muslim-cover-poster.png" },
  events: { src: "/templates/muslim-2.mp4", startSec: 0 },
  couple: { src: "/templates/muslim.mp4", startSec: 0 },
  route: { src: "/templates/muslim-3.mp4", startSec: 0, endSec: 11 },
  car: { src: "/templates/muslim-3.mp4", startSec: 0, endSec: 11 },
  auditorium: { src: "/templates/muslim-2.mp4", startSec: 0 },
  celebration: { src: "/templates/muslim.mp4", startSec: 0 },
  finale: { src: "/templates/muslim-2.mp4", startSec: 0 },
}

const christianVideos: Record<StoryVideoKey, TemplateVideoConfig> = {
  hero: { src: "/templates/christian.mp4", startSec: 0, poster: "/templates/christian-poster.png" },
  names: { src: "/templates/christian.mp4", startSec: 0 },
  events: { src: "/templates/christian.mp4", startSec: 0 },
  couple: { src: "/templates/christian.mp4", startSec: 0 },
  route: { src: "/templates/muslim-3.mp4", startSec: 0, endSec: 11 },
  car: { src: "/templates/christian.mp4", startSec: 0 },
  auditorium: { src: "/templates/muslim-2.mp4", startSec: 0 },
  celebration: { src: "/templates/christian.mp4", startSec: 0 },
  finale: { src: "/templates/christian.mp4", startSec: 0 },
}

const byReligion = {
  hindu: hinduVideos,
  muslim: muslimVideos,
  christian: christianVideos,
} as const

export function getStoryVideos(religion: keyof typeof byReligion): Record<StoryVideoKey, TemplateVideoConfig> {
  return byReligion[religion]
}
