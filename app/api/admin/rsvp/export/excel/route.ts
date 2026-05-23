import { NextRequest, NextResponse } from "next/server";
import XLSX from "xlsx";
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
  const entries = await Rsvp.find().sort({ createdAt: -1 }).lean();

  const rows = entries.map((entry) => ({
    Name: entry.name,
    Email: entry.email,
    Phone: entry.phone,
    Guests: entry.guestCount,
    Status: entry.attendanceStatus,
    Events: (entry.events || []).join(", "),
    Meal: entry.mealPreference,
    Message: entry.message,
    Date: new Date(entry.createdAt).toLocaleString(),
  }));

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(rows);
  XLSX.utils.book_append_sheet(workbook, worksheet, "RSVPs");
  const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      "Content-Disposition": 'attachment; filename="kerala-vivah-rsvps.xlsx"',
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    },
  });
}
