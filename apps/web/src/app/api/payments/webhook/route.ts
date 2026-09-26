import { NextRequest, NextResponse } from "next/server";

/**
 * Stripe webhook handler.
 * Configure endpoint: POST /api/payments/webhook
 */
export async function POST(req: NextRequest) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!secretKey || !webhookSecret) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 503 });
  }

  try {
    const body = await req.text();
    const sig = req.headers.get("stripe-signature") || "";

    const Stripe = (await import("stripe")).default;
    const stripe = new Stripe(secretKey, { apiVersion: "2024-06-20" });

    const event = stripe.webhooks.constructEvent(body, sig, webhookSecret);

    switch (event.type) {
      case "payment_intent.succeeded": {
        const intent = event.data.object as { id: string; metadata?: { orderId?: string } };
        console.log("Payment succeeded:", intent.id, "order:", intent.metadata?.orderId);
        break;
      }
      case "payment_intent.payment_failed": {
        const intent = event.data.object as { id: string };
        console.log("Payment failed:", intent.id);
        break;
      }
      default:
        console.log("Unhandled event:", event.type);
    }

    return NextResponse.json({ received: true });
  } catch (e: any) {
    console.error("Webhook error:", e);
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
