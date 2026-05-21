export interface TemplateVideoConfig {
  src: string
  startSec: number
  /** When set, loops back to startSec at this time. Omit to loop full clip. */
  endSec?: number
  poster?: string
}

/** Video source + loop segment per animated template. */
export const TEMPLATE_VIDEOS: Record<string, TemplateVideoConfig> = {
  // Hindu — hindu.mp4 (full clip)
  "hindu-radha-krishna": {
    src: "/templates/hindu.mp4",
    startSec: 0,
  },
  "hindu-varmala": {
    src: "/templates/hindu.mp4",
    startSec: 0,
  },
  "hindu-palace-garden": {
    src: "/templates/hindu.mp4",
    startSec: 0,
  },
  // Muslim
  "muslim-nikah-pairs": {
    src: "/templates/muslim.mp4",
    startSec: 0,
    poster: "/templates/muslim-poster.png",
  },
  "muslim-golden-arch": {
    src: "/templates/muslim-2.mp4",
    startSec: 0,
    poster: "/templates/muslim-cover-poster.png",
  },
  "muslim-candles": {
    src: "/templates/muslim-3.mp4",
    startSec: 0,
    endSec: 11,
    poster: "/templates/muslim-cover-poster.png",
  },
  // Christian — christian.mp4 (full clip)
  "christian-blessed": {
    src: "/templates/christian.mp4",
    startSec: 0,
    poster: "/templates/christian-poster.png",
  },
  // Cinematic scroll-story (download uses hero clip)
  "hindu-scroll-story": {
    src: "/templates/hindu.mp4",
    startSec: 0,
    poster: "/templates/hindu-folk-art-radha-krishna.png",
  },
  "muslim-scroll-story": {
    src: "/templates/muslim.mp4",
    startSec: 0,
    poster: "/templates/muslim-poster.png",
  },
  "christian-scroll-story": {
    src: "/templates/christian.mp4",
    startSec: 0,
    poster: "/templates/christian-poster.png",
  },
}

export function getTemplateVideo(templateId: string): TemplateVideoConfig | undefined {
  return TEMPLATE_VIDEOS[templateId]
}

/** Video download for animated + cinematic scroll templates */
export function getDownloadVideoConfig(
  templateId: string
): TemplateVideoConfig | undefined {
  return TEMPLATE_VIDEOS[templateId]
}

export function supportsVideoDownload(templateId: string): boolean {
  return Boolean(getDownloadVideoConfig(templateId))
}
