import mongoose from "mongoose";

const rsvpSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    guestCount: { type: Number, required: true, min: 1, max: 20 },
    attendanceStatus: {
      type: String,
      enum: ["attending", "declining"],
      required: true,
    },
    events: {
      type: [String],
      enum: ["wedding", "reception", "mehendi", "haldi"],
      default: [],
    },
    mealPreference: {
      type: String,
      enum: ["veg", "non-veg", "none"],
      default: "veg",
    },
    message: { type: String, default: "", maxlength: 1000 },
    invitationId: { type: String, default: "default" },
  },
  { timestamps: true },
);

rsvpSchema.index({ email: 1, phone: 1, invitationId: 1 }, { unique: true });

const Rsvp = mongoose.models.Rsvp || mongoose.model("Rsvp", rsvpSchema);

export default Rsvp;
