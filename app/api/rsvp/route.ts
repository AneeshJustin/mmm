import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Rsvp from "@/lib/models/Rsvp";
import { sendConfirmationEmail } from "@/lib/email";
import { validateRsvp } from "@/lib/rsvp-validation";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const errors = validateRsvp(body);
  if (errors.length) {
    return NextResponse.json({ error: errors.join(". ") }, { status: 400 });
  }

  await dbConnect();
  const invitationId = body.invitationId?.trim() || "default";

  const existing = await Rsvp.findOne({
    email: body.email.toLowerCase().trim(),
    phone: body.phone.trim(),
    invitationId,
  });

  if (existing) {
    return NextResponse.json(
      {
        error: "You have already submitted an RSVP with this email and phone.",
      },
      { status: 409 },
    );
  }

  try {
    const rsvp = await Rsvp.create({
      name: body.name.trim(),
      email: body.email.toLowerCase().trim(),
      phone: body.phone.trim(),
      guestCount: Number(body.guestCount),
      attendanceStatus: body.attendanceStatus,
      events: body.attendanceStatus === "attending" ? body.events || [] : [],
      mealPreference:
        body.attendanceStatus === "attending"
          ? body.mealPreference || "veg"
          : "none",
      message: (body.message || "").trim(),
      invitationId,
    });

    try {
      await sendConfirmationEmail(rsvp);
    } catch (emailErr) {
      console.error("[RSVP] Email failed:", (emailErr as Error).message);
    }

    return NextResponse.json({ success: true, id: rsvp._id }, { status: 201 });
  } catch (err: any) {
    if (err.code === 11000) {
      return NextResponse.json(
        { error: "Duplicate RSVP submission." },
        { status: 409 },
      );
    }
    console.error(err);
    return NextResponse.json({ error: "Failed to save RSVP" }, { status: 500 });
  }
}
