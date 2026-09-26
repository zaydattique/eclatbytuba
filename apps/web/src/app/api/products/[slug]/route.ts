import { NextRequest, NextResponse } from "next/server";
import { getProductBySlug } from "@eclat/db";

export async function GET(
  _req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const product = await getProductBySlug(params.slug);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json({ product });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
