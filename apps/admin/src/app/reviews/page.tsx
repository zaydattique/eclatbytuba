"use client";

import { useEffect, useState } from "react";
import { Badge, Button } from "@eclat/ui";

type Review = {
  id: string;
  productId: string;
  orderId: string;
  authorEmail: string;
  authorName?: string | null;
  rating: number;
  title?: string | null;
  body?: string | null;
  isApproved: boolean;
  createdAt: string;
  product?: { name: string };
};

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const base = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
      const res = await fetch(`${base}/api/reviews?admin=true`);
      const data = await res.json();
      setReviews(data.reviews || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const moderate = async (id: string, isApproved: boolean) => {
    const base = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    await fetch(`${base}/api/reviews`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, isApproved }),
    });
    load();
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-[#2D2A2B]">Reviews</h1>
      <p className="mt-1 text-sm text-[#6B5E62]">
        Moderate verified reviews (order-linked only)
      </p>

      {loading ? (
        <p className="mt-8 text-sm text-[#6B5E62]">Loading…</p>
      ) : reviews.length === 0 ? (
        <p className="mt-8 text-sm text-[#6B5E62]">No reviews yet.</p>
      ) : (
        <div className="mt-8 space-y-4">
          {reviews.map((r) => (
            <div
              key={r.id}
              className="rounded-[20px] border border-[#F0D6E0] bg-white p-4"
              style={{
                boxShadow:
                  "0 4px 20px rgba(196, 92, 122, 0.08), 0 1px 3px rgba(196, 92, 122, 0.04)",
              }}
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[#F5A623]">{"★".repeat(r.rating)}</span>
                <Badge variant={r.isApproved ? "success" : "warning"}>
                  {r.isApproved ? "Approved" : "Pending"}
                </Badge>
              </div>
              <p className="mt-2 text-sm font-medium text-[#2D2A2B]">
                {r.title || "(no title)"}
              </p>
              <p className="text-sm text-[#6B5E62]">{r.body}</p>
              <p className="mt-2 text-xs text-[#6B5E62]">
                {r.authorEmail} · order {r.orderId} · product {r.productId}
              </p>
              <div className="mt-3 flex gap-2">
                {!r.isApproved && (
                  <Button size="sm" onClick={() => moderate(r.id, true)}>
                    Approve
                  </Button>
                )}
                {r.isApproved && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => moderate(r.id, false)}
                  >
                    Hide
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
