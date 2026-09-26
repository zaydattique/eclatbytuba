import { NextRequest, NextResponse } from "next/server";
import { getOrders, createOrder } from "@eclat/db";

export async function GET() {
  try {
    const orders = await getOrders();
    return NextResponse.json({ orders });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.email || !body.items?.length) {
      return NextResponse.json(
        { error: "email and items are required" },
        { status: 400 }
      );
    }

    const order = await createOrder({
      email: body.email,
      phone: body.phone,
      shippingAddress: body.shippingAddress || {},
      items: body.items,
      paymentMethod: body.paymentMethod || "cod",
    });

    return NextResponse.json({ order }, { status: 201 });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
