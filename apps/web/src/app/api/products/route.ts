import { NextRequest, NextResponse } from "next/server";
import { getProducts } from "@eclat/db";
import { requireAdminApiSecret } from "@eclat/auth";

/** Storefront product list. Admin create/update on admin app. */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category") || undefined;
    const featured = searchParams.get("featured") === "true";
    const admin = searchParams.get("admin") === "true";

    if (admin && !requireAdminApiSecret(req)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const products = await getProducts({
      categorySlug: category,
      featured: featured || undefined,
      activeOnly: admin ? false : true,
    });

    return NextResponse.json({ products });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Failed to load products";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!requireAdminApiSecret(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(
    { error: "Use admin app products API" },
    { status: 410 }
  );
}

export async function PUT(req: NextRequest) {
  if (!requireAdminApiSecret(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(
    { error: "Use admin app products API" },
    { status: 410 }
  );
}
