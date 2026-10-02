import { NextRequest, NextResponse } from "next/server";
import { getProducts, createProduct, updateProduct } from "@eclat/db";
import { requireAdminSession } from "@eclat/auth";

export async function GET(req: NextRequest) {
  const user = await requireAdminSession(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const products = await getProducts({ activeOnly: false });
    return NextResponse.json({ products });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Failed to load products";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const user = await requireAdminSession(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
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
      images: body.images,
    });
    return NextResponse.json({ product }, { status: 201 });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Failed to create product";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const user = await requireAdminSession(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    if (!body.id) {
      return NextResponse.json({ error: "id required" }, { status: 400 });
    }
    const product = await updateProduct(body.id, {
      name: body.name,
      slug: body.slug,
      description: body.description,
      price: body.price !== undefined ? Number(body.price) : undefined,
      compareAtPrice:
        body.compareAtPrice === null || body.compareAtPrice === ""
          ? null
          : body.compareAtPrice !== undefined
            ? Number(body.compareAtPrice)
            : undefined,
      inventory:
        body.inventory !== undefined ? Number(body.inventory) : undefined,
      categoryId: body.categoryId,
      isActive: body.isActive,
      isFeatured: body.isFeatured,
      tags: body.tags,
      images: body.images,
    });
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json({ product });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Failed to update product";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
