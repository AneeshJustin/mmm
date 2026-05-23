import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Rsvp from "@/lib/models/Rsvp";
import { requireAdmin } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const authError = requireAdmin(req);
  if (authError) {
    return NextResponse.json(authError.body, { status: authError.status });
  }

  await dbConnect();
  const entry = await Rsvp.findById(params.id).lean();
  if (!entry) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(entry);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const authError = requireAdmin(req);
  if (authError) {
    return NextResponse.json(authError.body, { status: authError.status });
  }

  const body = await req.json();
  const allowed = [
    "name",
    "email",
    "phone",
    "guestCount",
    "attendanceStatus",
    "events",
    "mealPreference",
    "message",
  ];
  const updates: Record<string, any> = {};
  allowed.forEach((field) => {
    if (body[field] !== undefined) {
      updates[field] = body[field];
    }
  });

  await dbConnect();
  const entry = await Rsvp.findByIdAndUpdate(params.id, updates, {
    new: true,
    runValidators: true,
  }).lean();

  if (!entry) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(entry);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const authError = requireAdmin(req);
  if (authError) {
    return NextResponse.json(authError.body, { status: authError.status });
  }

  await dbConnect();
  const entry = await Rsvp.findByIdAndDelete(params.id);
  if (!entry) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
