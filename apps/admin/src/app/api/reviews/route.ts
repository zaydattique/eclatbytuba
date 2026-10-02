import { NextRequest, NextResponse } from "next/server";
import { getAllReviews, moderateReview } from "@eclat/db";
import { requireAdminSession } from "@eclat/auth";

export async function GET(req: NextRequest) {
  const user = await requireAdminSession(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const reviews = await getAllReviews();
    return NextResponse.json({ reviews });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Failed to load reviews";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const user = await requireAdminSession(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    if (!body.id || typeof body.isApproved !== "boolean") {
      return NextResponse.json(
        { error: "id and isApproved (boolean) required" },
        { status: 400 }
      );
    }
    const review = await moderateReview(body.id, body.isApproved);
    if (!review) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }
    return NextResponse.json({ review });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Failed to moderate review";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
