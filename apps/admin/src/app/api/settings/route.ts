import { NextRequest, NextResponse } from "next/server";
import {
  getAdminSettings,
  updateSettings,
  type StoreSettings,
} from "@eclat/db";
import { requireAdminSession } from "@eclat/auth";

export async function GET(req: NextRequest) {
  const user = await requireAdminSession(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(getAdminSettings());
}

export async function PUT(req: NextRequest) {
  const user = await requireAdminSession(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = (await req.json()) as Partial<StoreSettings>;
    const updated = updateSettings(body);
    return NextResponse.json(updated);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Failed to update settings";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
