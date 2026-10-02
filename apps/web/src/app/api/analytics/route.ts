import { NextRequest, NextResponse } from "next/server";
import { recordHit } from "@eclat/db";
import { requireAdminApiSecret } from "@eclat/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    if (body.type || body.path || body.sessionId) {
      await recordHit({
        type: typeof body.type === "string" ? body.type : "pageview",
        path: typeof body.path === "string" ? body.path : "/",
        sessionId: typeof body.sessionId === "string" ? body.sessionId : undefined,
        userId: typeof body.userId === "string" ? body.userId : undefined,
        durationMs: typeof body.durationMs === "number" ? body.durationMs : undefined,
        engaged: typeof body.engaged === "boolean" ? body.engaged : undefined,
        props: body.props && typeof body.props === "object" ? body.props : undefined,
        source: typeof body.source === "string" ? body.source : undefined,
        medium: typeof body.medium === "string" ? body.medium : undefined,
        campaign: typeof body.campaign === "string" ? body.campaign : undefined,
        device: typeof body.device === "string" ? body.device : undefined,
        country: typeof body.country === "string" ? body.country : undefined,
      });
    }
    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Analytics error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  if (!requireAdminApiSecret(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(
    { error: "Use admin app analytics API" },
    { status: 410 }
  );
}
