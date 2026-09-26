import { NextRequest, NextResponse } from "next/server";
import { getProducts, createProduct } from "@eclat/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category") || undefined;
    const featured = searchParams.get("featured") === "true";

    const products = await getProducts({
      categorySlug: category,
      featured: featured || undefined,
    });

    return NextResponse.json({ products });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const product = await createProduct({
      name: body.name,
      slug: body.slug,
      description: body.description,
      price: Number(body.price),
      compareAtPrice: body.compareAtPrice ? Number(body.compareAtPrice) : null,
      inventory: body.inventory ? Number(body.inventory) : 0,
      categoryId: body.categoryId,
      isActive: body.isActive ?? true,
      isFeatured: body.isFeatured ?? false,
      tags: body.tags,
    });
    return NextResponse.json({ product }, { status: 201 });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
