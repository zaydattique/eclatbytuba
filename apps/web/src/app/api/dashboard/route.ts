import { NextResponse } from "next/server";
import { getDashboardStats } from "@eclat/db";

export async function GET() {
  try {
    const stats = await getDashboardStats();
    return NextResponse.json(stats);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
