import { NextRequest, NextResponse } from "next/server";
import { getOrders, createOrder } from "@eclat/db";
import { rateLimit, RATE_LIMITS, clientKey } from "@eclat/config";
import { sendOrderConfirmation } from "@eclat/emails";

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
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";
    const rl = rateLimit({
      key: clientKey("checkout", ip),
      limit: RATE_LIMITS.checkout.limit,
      windowMs: RATE_LIMITS.checkout.windowMs,
    });
    if (!rl.success) {
      return NextResponse.json(
        { error: "Too many checkout attempts. Please try again later." },
        {
          status: 429,
          headers: rl.retryAfterMs
            ? { "Retry-After": String(Math.ceil(rl.retryAfterMs / 1000)) }
            : undefined,
        }
      );
    }

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
      shippingAddress: {
        ...(body.shippingAddress || {}),
        shippingMethod: body.shippingMethod || "standard",
      },
      items: body.items,
      paymentMethod: body.paymentMethod || "cod",
      shippingCost:
        body.shippingCost != null
          ? Number(body.shippingCost)
          : body.shippingMethod === "express"
            ? 350
            : 250,
    });

    try {
      await sendOrderConfirmation({
        to: body.email,
        orderNumber: (order as any).orderNumber,
        total: Number((order as any).total),
        paymentMethod: body.paymentMethod || "cod",
      });
    } catch (emailErr) {
      console.warn("Order email skipped:", emailErr);
    }

    return NextResponse.json({ order }, { status: 201 });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
