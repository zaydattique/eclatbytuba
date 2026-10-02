import { NextRequest, NextResponse } from "next/server";
import { requireAdminApiSecret } from "@eclat/auth";

export async function POST(req: NextRequest) {
  if (!requireAdminApiSecret(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ error: "Use admin app upload API" }, { status: 410 });
}
