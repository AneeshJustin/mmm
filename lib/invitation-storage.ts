import type { ScrollStoryData } from "@/components/scroll-story/scroll-story-invitation"

export type StoredInvitationData = ScrollStoryData

export function saveInvitationData(templateId: string, data: StoredInvitationData) {
  if (typeof window === "undefined") return
  sessionStorage.setItem(
    `kerala-vivah-invitation-${templateId}`,
    JSON.stringify(data)
  )
}

export function loadInvitationData(templateId: string): StoredInvitationData | null {
  if (typeof window === "undefined") return null
  const raw = sessionStorage.getItem(`kerala-vivah-invitation-${templateId}`)
  if (!raw) return null
  try {
    return JSON.parse(raw) as StoredInvitationData
  } catch {
    return null
  }
}

export function formatInvitationDate(dateStr: string): string {
  if (!dateStr) return "Date"
  const date = new Date(dateStr)
  if (Number.isNaN(date.getTime())) return dateStr
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function toScrollStoryData(data: {
  brideName: string
  groomName: string
  brideParents: string
  groomParents: string
  message: string
  date: string
  time: string
  venue: string
  venueAddress: string
  couplePhoto: string | null
  musicFile?: string | null
}): StoredInvitationData {
  return {
    brideName: data.brideName,
    groomName: data.groomName,
    brideParents: data.brideParents,
    groomParents: data.groomParents,
    message: data.message,
    date: formatInvitationDate(data.date),
    time: data.time,
    venue: data.venue,
    venueAddress: data.venueAddress,
    couplePhoto: data.couplePhoto,
    musicFile: data.musicFile || null,
  }
}
