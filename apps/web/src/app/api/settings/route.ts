import { NextRequest, NextResponse } from "next/server";
import {
  getPublicSettings,
  getAdminSettings,
  updateSettings,
  type StoreSettings,
} from "@eclat/db";

/**
 * GET ?admin=1 → full settings (admin)
 * GET → public (no secrets)
 * PUT → update settings
 */
export async function GET(request: NextRequest) {
  const admin = request.nextUrl.searchParams.get("admin") === "1";
  if (admin) {
    return NextResponse.json(getAdminSettings());
  }
  return NextResponse.json(getPublicSettings());
}

export async function PUT(request: NextRequest) {
  try {
    const body = (await request.json()) as Partial<StoreSettings>;
    const updated = updateSettings(body);
    return NextResponse.json(updated);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Failed to update settings";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
