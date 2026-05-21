"use client"

import { useCallback, useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  Users,
  UserCheck,
  UserX,
  Search,
  Download,
  Trash2,
  Pencil,
  BarChart3,
  Lock,
} from "lucide-react"
import { jsPDF } from "jspdf"
import autoTable from "jspdf-autotable"
import {
  fetchAdminRsvps,
  fetchRsvpStats,
  deleteAdminRsvp,
  updateAdminRsvp,
  getExcelExportUrl,
  type RsvpEntry,
  type RsvpStats,
} from "@/lib/rsvp-api"
import { cn } from "@/lib/utils"
import Link from "next/link"

const EVENT_LABELS: Record<string, string> = {
  wedding: "Wedding",
  reception: "Reception",
  mehendi: "Mehendi",
  haldi: "Haldi",
}

export default function AdminRsvpPage() {
  const [secret, setSecret] = useState("")
  const [storedSecret, setStoredSecret] = useState<string | null>(null)
  const [entries, setEntries] = useState<RsvpEntry[]>([])
  const [stats, setStats] = useState<RsvpStats | null>(null)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [editing, setEditing] = useState<RsvpEntry | null>(null)

  useEffect(() => {
    const s = sessionStorage.getItem("rsvp_admin_secret")
    if (s) setStoredSecret(s)
  }, [])

  const load = useCallback(async () => {
    if (!storedSecret) return
    setLoading(true)
    setError("")
    try {
      const [list, st] = await Promise.all([
        fetchAdminRsvps(storedSecret, {
          search: search || undefined,
          status: statusFilter || undefined,
        }),
        fetchRsvpStats(),
      ])
      setEntries(list)
      setStats(st)
    } catch {
      setError("Failed to load — check admin secret and API server")
      sessionStorage.removeItem("rsvp_admin_secret")
      setStoredSecret(null)
    } finally {
      setLoading(false)
    }
  }, [storedSecret, search, statusFilter])

  useEffect(() => {
    if (storedSecret) load()
  }, [storedSecret, load])

  const login = () => {
    sessionStorage.setItem("rsvp_admin_secret", secret)
    setStoredSecret(secret)
  }

  const handleDelete = async (id: string) => {
    if (!storedSecret || !confirm("Delete this RSVP?")) return
    await deleteAdminRsvp(storedSecret, id)
    load()
  }

  const handleSaveEdit = async () => {
    if (!storedSecret || !editing) return
    await updateAdminRsvp(storedSecret, editing._id, {
      name: editing.name,
      email: editing.email,
      phone: editing.phone,
      guestCount: editing.guestCount,
      attendanceStatus: editing.attendanceStatus,
      events: editing.events,
      mealPreference: editing.mealPreference,
      message: editing.message,
    })
    setEditing(null)
    load()
  }

  const exportPdf = () => {
    const doc = new jsPDF()
    doc.setFontSize(18)
    doc.text("Kerala Vivah — RSVP List", 14, 20)
    autoTable(doc, {
      startY: 28,
      head: [["Name", "Email", "Phone", "Guests", "Status", "Events", "Meal"]],
      body: entries.map((e) => [
        e.name,
        e.email,
        e.phone,
        String(e.guestCount),
        e.attendanceStatus,
        (e.events || []).join(", "),
        e.mealPreference,
      ]),
    })
    doc.save("kerala-vivah-rsvps.pdf")
  }

  if (!storedSecret) {
    return (
      <main className="min-h-screen bg-kerala-dark flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md p-8 rounded-2xl bg-kerala-ivory/5 border border-kerala-gold/20 backdrop-blur-xl"
        >
          <Lock className="w-10 h-10 text-kerala-gold mx-auto mb-4" />
          <h1 className="text-2xl font-serif text-kerala-ivory text-center mb-2">
            Admin Dashboard
          </h1>
          <p className="text-kerala-ivory/50 text-center text-sm mb-6">
            Enter your admin secret to view RSVP analytics
          </p>
          <input
            type="password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            placeholder="Admin secret"
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-kerala-gold/30 text-kerala-ivory mb-4 focus:outline-none focus:border-kerala-gold"
          />
          <button
            type="button"
            onClick={login}
            className="w-full py-3 rounded-xl bg-kerala-gold text-kerala-dark font-semibold hover:opacity-90 transition"
          >
            Enter Dashboard
          </button>
          <Link href="/" className="block text-center text-kerala-gold/60 text-sm mt-4 hover:text-kerala-gold">
            ← Back to site
          </Link>
        </motion.div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-kerala-dark to-[#0a0f0a] text-kerala-ivory">
      <header className="border-b border-kerala-gold/15 px-6 py-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-kerala-gold">RSVP Analytics</h1>
          <p className="text-kerala-ivory/50 text-sm">Kerala Vivah Admin</p>
        </div>
        <div className="flex gap-2">
          <a
            href={getExcelExportUrl(storedSecret)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-800/40 border border-emerald-500/30 text-sm hover:bg-emerald-800/60 transition"
          >
            <Download className="w-4 h-4" />
            Excel
          </a>
          <button
            type="button"
            onClick={exportPdf}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-kerala-gold/20 border border-kerala-gold/40 text-kerala-gold text-sm hover:bg-kerala-gold/30 transition"
          >
            <Download className="w-4 h-4" />
            PDF
          </button>
        </div>
      </header>

      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
          {[
            { label: "Total RSVPs", value: stats.total, icon: Users, color: "text-kerala-gold" },
            { label: "Attending", value: stats.attending, icon: UserCheck, color: "text-emerald-400" },
            { label: "Declining", value: stats.declining, icon: UserX, color: "text-rose-400" },
            { label: "Total Guests", value: stats.totalGuests, icon: BarChart3, color: "text-kerala-gold" },
          ].map((card) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 rounded-2xl bg-white/5 border border-kerala-gold/10"
            >
              <card.icon className={cn("w-5 h-5 mb-2", card.color)} />
              <p className="text-2xl font-bold">{card.value}</p>
              <p className="text-xs text-kerala-ivory/50 uppercase tracking-wider">{card.label}</p>
            </motion.div>
          ))}
        </div>
      )}

      {stats && (
        <div className="px-6 pb-4 grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-white/5 border border-kerala-gold/10">
            <p className="text-xs uppercase tracking-wider text-kerala-gold/70 mb-3">Event attendance (guests)</p>
            <div className="space-y-2">
              {Object.entries(stats.eventCounts).map(([ev, count]) => (
                <div key={ev} className="flex justify-between text-sm">
                  <span>{EVENT_LABELS[ev] || ev}</span>
                  <span className="text-kerala-gold">{count}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-kerala-gold/10">
            <p className="text-xs uppercase tracking-wider text-kerala-gold/70 mb-3">Meal preferences</p>
            <div className="flex gap-6 text-sm">
              <span>Veg: <strong className="text-kerala-gold">{stats.mealCounts.veg}</strong></span>
              <span>Non-Veg: <strong className="text-kerala-gold">{stats.mealCounts["non-veg"]}</strong></span>
            </div>
          </div>
        </div>
      )}

      <div className="px-6 pb-4 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-kerala-ivory/40" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && load()}
            placeholder="Search name, email, phone…"
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/5 border border-kerala-gold/20 text-sm focus:outline-none focus:border-kerala-gold/50"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 rounded-lg bg-white/5 border border-kerala-gold/20 text-sm"
        >
          <option value="">All statuses</option>
          <option value="attending">Attending</option>
          <option value="declining">Declining</option>
        </select>
        <button
          type="button"
          onClick={load}
          className="px-5 py-2.5 rounded-lg bg-kerala-gold text-kerala-dark text-sm font-medium"
        >
          Search
        </button>
      </div>

      {error && <p className="px-6 text-rose-400 text-sm">{error}</p>}

      <div className="px-6 pb-12 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-kerala-gold/20 text-kerala-gold/70 text-left">
              <th className="py-3 pr-4">Name</th>
              <th className="py-3 pr-4">Contact</th>
              <th className="py-3 pr-4">Guests</th>
              <th className="py-3 pr-4">Status</th>
              <th className="py-3 pr-4">Events</th>
              <th className="py-3 pr-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-kerala-ivory/50">
                  Loading…
                </td>
              </tr>
            ) : entries.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-kerala-ivory/50">
                  No entries yet
                </td>
              </tr>
            ) : (
              entries.map((e) => (
                <tr key={e._id} className="border-b border-white/5 hover:bg-white/[0.02]">
                  <td className="py-3 pr-4 font-medium">{e.name}</td>
                  <td className="py-3 pr-4 text-kerala-ivory/60">
                    <div>{e.email}</div>
                    <div className="text-xs">{e.phone}</div>
                  </td>
                  <td className="py-3 pr-4">{e.guestCount}</td>
                  <td className="py-3 pr-4">
                    <span
                      className={cn(
                        "px-2 py-0.5 rounded-full text-xs",
                        e.attendanceStatus === "attending"
                          ? "bg-emerald-900/40 text-emerald-300"
                          : "bg-rose-900/40 text-rose-300"
                      )}
                    >
                      {e.attendanceStatus}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-kerala-ivory/50">
                    {(e.events || []).map((ev) => EVENT_LABELS[ev] || ev).join(", ") || "—"}
                  </td>
                  <td className="py-3 pr-4">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setEditing(e)}
                        className="p-1.5 rounded hover:bg-kerala-gold/20 text-kerala-gold"
                        aria-label="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(e._id)}
                        className="p-1.5 rounded hover:bg-rose-900/30 text-rose-400"
                        aria-label="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg p-6 rounded-2xl bg-kerala-dark border border-kerala-gold/30 space-y-4"
          >
            <h3 className="text-lg font-serif text-kerala-gold">Edit RSVP</h3>
            <input
              value={editing.name}
              onChange={(ev) => setEditing({ ...editing, name: ev.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-white/5 border border-kerala-gold/20"
              placeholder="Name"
            />
            <input
              value={editing.email}
              onChange={(ev) => setEditing({ ...editing, email: ev.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-white/5 border border-kerala-gold/20"
              placeholder="Email"
            />
            <input
              value={editing.phone}
              onChange={(ev) => setEditing({ ...editing, phone: ev.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-white/5 border border-kerala-gold/20"
              placeholder="Phone"
            />
            <input
              type="number"
              min={1}
              max={20}
              value={editing.guestCount}
              onChange={(ev) =>
                setEditing({ ...editing, guestCount: Number(ev.target.value) })
              }
              className="w-full px-3 py-2 rounded-lg bg-white/5 border border-kerala-gold/20"
            />
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={handleSaveEdit}
                className="flex-1 py-2 rounded-lg bg-kerala-gold text-kerala-dark font-medium"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="flex-1 py-2 rounded-lg border border-kerala-gold/30"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </main>
  )
}
