import { NextRequest, NextResponse } from "next/server";
import { getPublicSettings } from "@eclat/db";
import { requireAdminApiSecret } from "@eclat/auth";

/** Public settings only. Full admin settings on admin app. */
export async function GET(request: NextRequest) {
  const wantsAdmin = request.nextUrl.searchParams.get("admin") === "1";
  if (wantsAdmin && !requireAdminApiSecret(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(getPublicSettings());
}

export async function PUT(request: NextRequest) {
  if (!requireAdminApiSecret(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(
    { error: "Use admin app settings API" },
    { status: 410 }
  );
}
