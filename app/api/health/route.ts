import { NextResponse } from "next/server";
import dbConnect, { getConnectionState } from "@/lib/db";

export const runtime = "nodejs";

export async function GET() {
  await dbConnect();
  return NextResponse.json({ ok: true, mongo: getConnectionState() === 1 });
}
