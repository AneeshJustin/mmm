import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Rsvp from "@/lib/models/Rsvp";

export const runtime = "nodejs";

export async function GET() {
  await dbConnect();

  const all = await Rsvp.find().lean();
  const attending = all.filter((r) => r.attendanceStatus === "attending");
  const declining = all.filter((r) => r.attendanceStatus === "declining");
  const totalGuests = attending.reduce(
    (sum, r) => sum + Number(r.guestCount || 0),
    0,
  );

  const eventCounts = { wedding: 0, reception: 0, mehendi: 0, haldi: 0 };
  attending.forEach((r) => {
    r.events?.forEach((event) => {
      if (eventCounts[event as keyof typeof eventCounts] !== undefined) {
        eventCounts[event as keyof typeof eventCounts] += Number(
          r.guestCount || 0,
        );
      }
    });
  });

  return NextResponse.json({
    total: all.length,
    attending: attending.length,
    declining: declining.length,
    totalGuests,
    eventCounts,
    mealCounts: {
      veg: attending.filter((r) => r.mealPreference === "veg").length,
      "non-veg": attending.filter((r) => r.mealPreference === "non-veg").length,
    },
  });
}
