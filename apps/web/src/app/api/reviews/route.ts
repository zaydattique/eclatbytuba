import { NextRequest, NextResponse } from "next/server";
import {
  getProductReviews,
  getReviewStats,
  createReview,
} from "@eclat/db";
import { rateLimit, RATE_LIMITS, clientKey } from "@eclat/config";
import { requireAdminApiSecret } from "@eclat/auth";

/** Public: product reviews + submit. Admin list/moderate → admin app. */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");
    const admin = searchParams.get("admin") === "true";

    if (admin) {
      if (!requireAdminApiSecret(req)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      return NextResponse.json(
        { error: "Use admin app reviews API" },
        { status: 410 }
      );
    }

    if (!productId) {
      return NextResponse.json({ error: "productId required" }, { status: 400 });
    }

    const [reviews, stats] = await Promise.all([
      getProductReviews(productId),
      getReviewStats(productId),
    ]);
    return NextResponse.json({ reviews, stats });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Failed to load reviews";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";
    const rl = rateLimit({
      key: clientKey("review", ip),
      limit: RATE_LIMITS.review.limit,
      windowMs: RATE_LIMITS.review.windowMs,
    });
    if (!rl.success) {
      return NextResponse.json(
        { error: "Too many review submissions. Try again later." },
        { status: 429 }
      );
    }

    const body = await req.json();
    if (!body.productId || !body.orderId || !body.authorEmail || !body.rating) {
      return NextResponse.json(
        { error: "productId, orderId, authorEmail, and rating are required" },
        { status: 400 }
      );
    }

    const review = await createReview({
      productId: body.productId,
      orderId: body.orderId,
      authorEmail: body.authorEmail,
      authorName: body.authorName,
      rating: Number(body.rating),
      title: body.title,
      body: body.body,
      imageUrl: body.imageUrl,
    });

    return NextResponse.json(
      {
        review,
        message: "Review submitted. It will appear after admin approval.",
      },
      { status: 201 }
    );
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Failed to submit review";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function PATCH(req: NextRequest) {
  if (!requireAdminApiSecret(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(
    { error: "Use admin app reviews API" },
    { status: 410 }
  );
}
