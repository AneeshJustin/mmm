const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"

export interface RsvpPayload {
  name: string
  email: string
  phone: string
  guestCount: number
  attendanceStatus: "attending" | "declining"
  events: string[]
  mealPreference: "veg" | "non-veg" | "none"
  message: string
  invitationId?: string
}

export interface RsvpStats {
  total: number
  attending: number
  declining: number
  totalGuests: number
  eventCounts: Record<string, number>
  mealCounts: { veg: number; "non-veg": number }
}

export interface RsvpEntry extends RsvpPayload {
  _id: string
  createdAt: string
  updatedAt: string
}

export async function submitRsvp(data: RsvpPayload): Promise<{ success: boolean; id?: string }> {
  const res = await fetch(`${API_BASE}/api/rsvp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  const json = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(json.error || "Failed to submit RSVP")
  return json
}

export async function fetchRsvpStats(): Promise<RsvpStats> {
  const res = await fetch(`${API_BASE}/api/rsvp/stats`)
  if (!res.ok) throw new Error("Failed to load stats")
  return res.json()
}

function adminHeaders(secret: string) {
  return { "x-admin-secret": secret, "Content-Type": "application/json" }
}

export async function fetchAdminRsvps(
  secret: string,
  params?: { search?: string; status?: string; event?: string }
): Promise<RsvpEntry[]> {
  const q = new URLSearchParams()
  if (params?.search) q.set("search", params.search)
  if (params?.status) q.set("status", params.status)
  if (params?.event) q.set("event", params.event)
  const res = await fetch(`${API_BASE}/api/admin/rsvp?${q}`, {
    headers: adminHeaders(secret),
  })
  if (!res.ok) throw new Error("Failed to fetch RSVPs")
  return res.json()
}

export async function updateAdminRsvp(
  secret: string,
  id: string,
  data: Partial<RsvpPayload>
): Promise<RsvpEntry> {
  const res = await fetch(`${API_BASE}/api/admin/rsvp/${id}`, {
    method: "PATCH",
    headers: adminHeaders(secret),
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error("Failed to update")
  return res.json()
}

export async function deleteAdminRsvp(secret: string, id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/api/admin/rsvp/${id}`, {
    method: "DELETE",
    headers: adminHeaders(secret),
  })
  if (!res.ok) throw new Error("Failed to delete")
}

export function getExcelExportUrl(secret: string): string {
  return `${API_BASE}/api/admin/rsvp/export/excel?secret=${encodeURIComponent(secret)}`
}

export function buildWhatsAppRsvpUrl(data: Partial<RsvpPayload>): string {
  const lines = [
    "Kerala Vivah — RSVP",
    data.name ? `Name: ${data.name}` : "",
    data.phone ? `Phone: ${data.phone}` : "",
    data.attendanceStatus === "attending"
      ? `Attending with ${data.guestCount || 1} guest(s)`
      : data.attendanceStatus === "declining"
        ? "Regretfully declining"
        : "",
    data.events?.length ? `Events: ${data.events.join(", ")}` : "",
    data.message ? `Message: ${data.message}` : "",
  ].filter(Boolean)
  return `https://wa.me/?text=${encodeURIComponent(lines.join("\n"))}`
}
