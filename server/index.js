require("dotenv").config({ path: require("path").join(__dirname, "..", ".env.local") })
require("dotenv").config({ path: require("path").join(__dirname, "..", ".env") })

const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const rsvpRoutes = require("./routes/rsvp")
const adminRoutes = require("./routes/admin")

const app = express()
const PORT = process.env.API_PORT || 4000

app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
    ],
    credentials: true,
  })
)
app.use(express.json())

app.get("/api/health", (_, res) => {
  res.json({ ok: true, mongo: mongoose.connection.readyState === 1 })
})

app.use("/api/rsvp", rsvpRoutes)
app.use("/api/admin/rsvp", adminRoutes)

async function start() {
  const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/kerala-vivah"
  try {
    await mongoose.connect(uri)
    console.log("[RSVP API] MongoDB connected")
  } catch (err) {
    console.warn("[RSVP API] MongoDB unavailable:", err.message)
    console.warn("[RSVP API] Running without database — submissions will fail")
  }

  app.listen(PORT, () => {
    console.log(`[RSVP API] http://localhost:${PORT}`)
  })
}

start()
