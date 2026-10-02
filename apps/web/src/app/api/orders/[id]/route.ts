import { NextRequest, NextResponse } from "next/server";
import { requireAdminApiSecret } from "@eclat/auth";

/** Admin order ops live on admin app. Web path locked. */
export async function GET(req: NextRequest) {
  if (!requireAdminApiSecret(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ error: "Use admin app order API" }, { status: 410 });
}

export async function PATCH(req: NextRequest) {
  if (!requireAdminApiSecret(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ error: "Use admin app order API" }, { status: 410 });
}
