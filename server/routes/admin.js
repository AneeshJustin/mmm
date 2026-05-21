const express = require("express")
const XLSX = require("xlsx")
const Rsvp = require("../models/Rsvp")
const { requireAdmin } = require("../middleware/auth")

const router = express.Router()
router.use(requireAdmin)

router.get("/export/excel", async (req, res) => {
  try {
    const entries = await Rsvp.find().sort({ createdAt: -1 }).lean()
    const rows = entries.map((e) => ({
      Name: e.name,
      Email: e.email,
      Phone: e.phone,
      Guests: e.guestCount,
      Status: e.attendanceStatus,
      Events: (e.events || []).join(", "),
      Meal: e.mealPreference,
      Message: e.message,
      Date: new Date(e.createdAt).toLocaleString(),
    }))

    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.json_to_sheet(rows)
    XLSX.utils.book_append_sheet(wb, ws, "RSVPs")
    const buf = XLSX.write(wb, { type: "buffer", bookType: "xlsx" })

    res.setHeader(
      "Content-Disposition",
      'attachment; filename="kerala-vivah-rsvps.xlsx"'
    )
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )
    res.send(buf)
  } catch (err) {
    res.status(500).json({ error: "Export failed" })
  }
})

router.get("/", async (req, res) => {
  try {
    const { search, status, event } = req.query
    const filter = {}

    if (status && ["attending", "declining"].includes(status)) {
      filter.attendanceStatus = status
    }
    if (event) {
      filter.events = event
    }
    if (search) {
      const q = search.trim()
      filter.$or = [
        { name: { $regex: q, $options: "i" } },
        { email: { $regex: q, $options: "i" } },
        { phone: { $regex: q, $options: "i" } },
      ]
    }

    const entries = await Rsvp.find(filter).sort({ createdAt: -1 }).lean()
    res.json(entries)
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch entries" })
  }
})

router.get("/:id", async (req, res) => {
  try {
    const entry = await Rsvp.findById(req.params.id).lean()
    if (!entry) return res.status(404).json({ error: "Not found" })
    res.json(entry)
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch entry" })
  }
})

router.patch("/:id", async (req, res) => {
  try {
    const allowed = [
      "name",
      "email",
      "phone",
      "guestCount",
      "attendanceStatus",
      "events",
      "mealPreference",
      "message",
    ]
    const updates = {}
    allowed.forEach((k) => {
      if (req.body[k] !== undefined) updates[k] = req.body[k]
    })

    const entry = await Rsvp.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    })
    if (!entry) return res.status(404).json({ error: "Not found" })
    res.json(entry)
  } catch (err) {
    res.status(500).json({ error: "Failed to update entry" })
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const entry = await Rsvp.findByIdAndDelete(req.params.id)
    if (!entry) return res.status(404).json({ error: "Not found" })
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: "Failed to delete entry" })
  }
})

module.exports = router
