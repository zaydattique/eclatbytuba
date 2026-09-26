import { NextRequest, NextResponse } from "next/server";

/**
 * Create a Stripe PaymentIntent.
 * Requires STRIPE_SECRET_KEY in env.
 * Falls back to a mock intent when Stripe is not configured.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const amount = Math.round(Number(body.amount) * 100);
    const currency = (body.currency || "pkr").toLowerCase();
    const orderId = body.orderId;

    if (!amount || amount < 100) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const secretKey = process.env.STRIPE_SECRET_KEY;

    if (!secretKey) {
      return NextResponse.json({
        clientSecret: `mock_pi_${Date.now()}_secret`,
        paymentIntentId: `mock_pi_${Date.now()}`,
        mock: true,
      });
    }

    const Stripe = (await import("stripe")).default;
    const stripe = new Stripe(secretKey, { apiVersion: "2024-06-20" });

    const intent = await stripe.paymentIntents.create({
      amount,
      currency,
      metadata: { orderId: orderId || "" },
      automatic_payment_methods: { enabled: true },
    });

    return NextResponse.json({
      clientSecret: intent.client_secret,
      paymentIntentId: intent.id,
    });
  } catch (e: any) {
    console.error("Stripe error:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
