import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Rsvp from "@/lib/models/Rsvp";
import { requireAdmin } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const authError = requireAdmin(req);
  if (authError) {
    return NextResponse.json(authError.body, { status: authError.status });
  }

  await dbConnect();
  const url = new URL(req.url);
  const search = url.searchParams.get("search");
  const status = url.searchParams.get("status");
  const event = url.searchParams.get("event");

  const filter: Record<string, any> = {};
  if (status && ["attending", "declining"].includes(status)) {
    filter.attendanceStatus = status;
  }
  if (event) {
    filter.events = event;
  }

  if (search) {
    const q = search.trim();
    filter.$or = [
      { name: { $regex: q, $options: "i" } },
      { email: { $regex: q, $options: "i" } },
      { phone: { $regex: q, $options: "i" } },
    ];
  }

  const entries = await Rsvp.find(filter).sort({ createdAt: -1 }).lean();
  return NextResponse.json(entries);
}
