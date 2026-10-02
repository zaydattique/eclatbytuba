import { NextRequest, NextResponse } from "next/server";
import { createOrder } from "@eclat/db";
import { rateLimit, RATE_LIMITS, clientKey } from "@eclat/config";
import { sendOrderConfirmation } from "@eclat/emails";

/**
 * Public checkout only.
 * Admin order list/update live on admin app (session-protected).
 */
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
      shippingAddress: body.shippingAddress || {},
      items: body.items,
      paymentMethod: body.paymentMethod,
      shippingCost: body.shippingCost,
    });

    try {
      await sendOrderConfirmation({
        to: body.email,
        orderNumber: (order as { orderNumber?: string }).orderNumber || "",
        total: Number((order as { total?: number }).total || 0),
        paymentMethod: body.paymentMethod || "cod",
      });
    } catch (mailErr) {
      console.error("Order email failed:", mailErr);
    }

    return NextResponse.json({ order }, { status: 201 });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Checkout failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
