import { NextRequest, NextResponse } from "next/server";
import { getOrders, summarizeAnalytics } from "@eclat/db";
import { requireAdminSession } from "@eclat/auth";

export async function GET(req: NextRequest) {
  const user = await requireAdminSession(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const days = Number(req.nextUrl.searchParams.get("days") || "30");
    const orders = await getOrders();
    const summary = summarizeAnalytics(
      orders as Parameters<typeof summarizeAnalytics>[0],
      days
    );
    return NextResponse.json(summary);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Failed to load analytics";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
