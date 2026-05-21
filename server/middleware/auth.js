function requireAdmin(req, res, next) {
  const secret =
    req.headers["x-admin-secret"] ||
    req.query.secret ||
    req.headers.authorization?.replace("Bearer ", "")
  if (!process.env.ADMIN_SECRET) {
    return res.status(503).json({ error: "Admin not configured" })
  }
  if (secret !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: "Unauthorized" })
  }
  next()
}

module.exports = { requireAdmin }
