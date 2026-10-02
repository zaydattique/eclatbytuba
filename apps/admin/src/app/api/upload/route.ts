import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { validateImageFile } from "@eclat/ui";
import { requireAdminSession } from "@eclat/auth";
import { rateLimit, RATE_LIMITS, clientKey } from "@eclat/config";

/**
 * Admin image upload (session required).
 * Phase 10 will swap local disk for object storage (R2/S3).
 */
export async function POST(req: NextRequest) {
  const user = await requireAdminSession(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  const rl = rateLimit({
    key: clientKey("upload", ip, user.id),
    limit: RATE_LIMITS.upload.limit,
    windowMs: RATE_LIMITS.upload.windowMs,
  });
  if (!rl.success) {
    return NextResponse.json(
      { error: "Too many uploads. Try again later." },
      {
        status: 429,
        headers: rl.retryAfterMs
          ? { "Retry-After": String(Math.ceil(rl.retryAfterMs / 1000)) }
          : undefined,
      }
    );
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const validationError = validateImageFile({
      type: file.type,
      size: file.size,
    });
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const ext = (file.name.split(".").pop() || "jpg")
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext || "jpg"}`;

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, filename), buffer);

    const webBase = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") || "";
    const url = webBase
      ? `${webBase}/uploads/${filename}`
      : `/uploads/${filename}`;

    return NextResponse.json({ url, filename });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Upload failed";
    console.error("Upload error:", e);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
