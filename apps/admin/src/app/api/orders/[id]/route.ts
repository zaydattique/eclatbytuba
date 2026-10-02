import { NextRequest, NextResponse } from "next/server";
import { getOrderById, updateOrderStatus } from "@eclat/db";
import { requireAdminSession } from "@eclat/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await requireAdminSession(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const order = await getOrderById(params.id);
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    return NextResponse.json({ order });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Failed to load order";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await requireAdminSession(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    if (!body.status) {
      return NextResponse.json({ error: "status is required" }, { status: 400 });
    }
    const order = await updateOrderStatus(params.id, body.status, {
      notes: body.notes,
      trackingNumber: body.trackingNumber,
    });
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    return NextResponse.json({ order });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Failed to update order";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
