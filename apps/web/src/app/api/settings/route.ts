import { NextRequest, NextResponse } from "next/server";
import {
  getPublicSettings,
  getAdminSettings,
  updateSettings,
  type StoreSettings,
} from "@eclat/db/settings-store";

/**
 * GET ?admin=1 → full settings (admin only; no auth gate yet beyond obscurity — tighten Phase 7)
 * GET → public settings (no secrets)
 * PUT → update settings body
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
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Failed to update settings" },
      { status: 400 }
    );
  }
}
