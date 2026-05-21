const express = require("express")
const Rsvp = require("../models/Rsvp")
const { sendConfirmationEmail } = require("../services/email")

const router = express.Router()

function validateBody(body) {
  const errors = []
  if (!body.name?.trim()) errors.push("Name is required")
  if (!body.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    errors.push("Valid email is required")
  }
  if (!body.phone?.trim() || body.phone.replace(/\D/g, "").length < 10) {
    errors.push("Valid phone number is required")
  }
  const guestCount = Number(body.guestCount)
  if (!guestCount || guestCount < 1 || guestCount > 20) {
    errors.push("Guest count must be between 1 and 20")
  }
  if (!["attending", "declining"].includes(body.attendanceStatus)) {
    errors.push("Attendance status is required")
  }
  return errors
}

router.post("/", async (req, res) => {
  try {
    const errors = validateBody(req.body)
    if (errors.length) {
      return res.status(400).json({ error: errors.join(". ") })
    }

    const invitationId = req.body.invitationId || "default"
    const existing = await Rsvp.findOne({
      email: req.body.email.toLowerCase().trim(),
      phone: req.body.phone.trim(),
      invitationId,
    })

    if (existing) {
      return res.status(409).json({
        error: "You have already submitted an RSVP with this email and phone.",
      })
    }

    const rsvp = await Rsvp.create({
      name: req.body.name.trim(),
      email: req.body.email.toLowerCase().trim(),
      phone: req.body.phone.trim(),
      guestCount: Number(req.body.guestCount),
      attendanceStatus: req.body.attendanceStatus,
      events: req.body.attendanceStatus === "attending" ? req.body.events || [] : [],
      mealPreference:
        req.body.attendanceStatus === "attending"
          ? req.body.mealPreference || "veg"
          : "none",
      message: (req.body.message || "").trim(),
      invitationId,
    })

    try {
      await sendConfirmationEmail(rsvp)
    } catch (emailErr) {
      console.error("[RSVP] Email failed:", emailErr.message)
    }

    res.status(201).json({ success: true, id: rsvp._id })
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ error: "Duplicate RSVP submission." })
    }
    console.error(err)
    res.status(500).json({ error: "Failed to save RSVP" })
  }
})

router.get("/stats", async (req, res) => {
  try {
    const all = await Rsvp.find().lean()
    const attending = all.filter((r) => r.attendanceStatus === "attending")
    const declining = all.filter((r) => r.attendanceStatus === "declining")
    const totalGuests = attending.reduce((s, r) => s + r.guestCount, 0)

    const eventCounts = { wedding: 0, reception: 0, mehendi: 0, haldi: 0 }
    attending.forEach((r) => {
      r.events?.forEach((e) => {
        if (eventCounts[e] !== undefined) eventCounts[e] += r.guestCount
      })
    })

    res.json({
      total: all.length,
      attending: attending.length,
      declining: declining.length,
      totalGuests,
      eventCounts,
      mealCounts: {
        veg: attending.filter((r) => r.mealPreference === "veg").length,
        "non-veg": attending.filter((r) => r.mealPreference === "non-veg").length,
      },
    })
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch stats" })
  }
})

module.exports = router
