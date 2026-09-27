"use client";

import { useEffect, useState } from "react";
import { Button, Input } from "@eclat/ui";

type Review = {
  id: string;
  rating: number;
  title?: string | null;
  body?: string | null;
  authorName?: string | null;
  imageUrl?: string | null;
  createdAt: string;
};

export function ReviewsSection({ productId }: { productId: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState({ average: 0, count: 0 });
  const [openForm, setOpenForm] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    orderId: "",
    authorEmail: "",
    authorName: "",
    rating: "5",
    title: "",
    body: "",
  });

  const load = async () => {
    const res = await fetch(`/api/reviews?productId=${productId}`);
    const data = await res.json();
    setReviews(data.reviews || []);
    setStats(data.stats || { average: 0, count: 0 });
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErr("");
    setMsg("");
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          orderId: form.orderId.trim(),
          authorEmail: form.authorEmail.trim(),
          authorName: form.authorName.trim() || undefined,
          rating: Number(form.rating),
          title: form.title || undefined,
          body: form.body || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setMsg(data.message || "Submitted for moderation.");
      setOpenForm(false);
      setForm({ orderId: "", authorEmail: "", authorName: "", rating: "5", title: "", body: "" });
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mt-16 border-t border-[#F0D6E0] pt-12">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-[#2D2A2B]">Reviews</h2>
          <p className="mt-1 text-sm text-[#6B5E62]">
            {stats.count > 0 ? (
              <>
                <span className="text-[#F5A623]">★</span>{" "}
                {stats.average.toFixed(1)} · {stats.count} verified review
                {stats.count !== 1 ? "s" : ""}
              </>
            ) : (
              "No reviews yet — be the first verified buyer"
            )}
          </p>
        </div>
        <Button variant="outline" onClick={() => setOpenForm((v) => !v)}>
          {openForm ? "Cancel" : "Write a review"}
        </Button>
      </div>

      {msg && <p className="mb-4 text-sm text-[#4A7C59]">{msg}</p>}

      {openForm && (
        <form
          onSubmit={submit}
          className="mb-8 space-y-3 rounded-[24px] border border-[#F0D6E0] bg-white p-6"
          style={{
            boxShadow:
              "0 4px 20px rgba(196, 92, 122, 0.08), 0 1px 3px rgba(196, 92, 122, 0.04)",
          }}
        >
          <p className="text-xs text-[#6B5E62]">
            Only verified purchases can review. Use the <strong>order ID</strong> from your
            confirmation and the <strong>same email</strong> used at checkout.
          </p>
          <Input
            required
            placeholder="Order ID (e.g. o…)"
            value={form.orderId}
            onChange={(e) => setForm({ ...form, orderId: e.target.value })}
          />
          <Input
            required
            type="email"
            placeholder="Email on order"
            value={form.authorEmail}
            onChange={(e) => setForm({ ...form, authorEmail: e.target.value })}
          />
          <Input
            placeholder="Display name (optional)"
            value={form.authorName}
            onChange={(e) => setForm({ ...form, authorName: e.target.value })}
          />
          <label className="block text-sm text-[#2D2A2B]">
            Rating
            <select
              className="mt-1 w-full rounded-[12px] border border-[#F0D6E0] px-3 py-2 text-sm"
              value={form.rating}
              onChange={(e) => setForm({ ...form, rating: e.target.value })}
            >
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>
                  {n} stars
                </option>
              ))}
            </select>
          </label>
          <Input
            placeholder="Title (optional)"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <textarea
            className="w-full rounded-[12px] border border-[#F0D6E0] px-3 py-2 text-sm"
            rows={3}
            placeholder="Your review"
            value={form.body}
            onChange={(e) => setForm({ ...form, body: e.target.value })}
          />
          {err && <p className="text-sm text-[#C45C5C]">{err}</p>}
          <Button type="submit" disabled={loading}>
            {loading ? "Submitting…" : "Submit for verification"}
          </Button>
        </form>
      )}

      <div className="space-y-4">
        {reviews.map((r) => (
          <div
            key={r.id}
            className="rounded-[20px] border border-[#F0D6E0] bg-white p-4"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[#F5A623]">{"★".repeat(r.rating)}</span>
              <span className="rounded-full bg-[#FFE8F0] px-2 py-0.5 text-xs font-medium text-[#C45C7A]">
                Verified Buyer
              </span>
            </div>
            {r.title && (
              <p className="mt-2 font-medium text-[#2D2A2B]">{r.title}</p>
            )}
            {r.body && <p className="mt-1 text-sm text-[#6B5E62]">{r.body}</p>}
            <p className="mt-2 text-xs text-[#6B5E62]">
              {r.authorName || "Customer"} ·{" "}
              {new Date(r.createdAt).toLocaleDateString("en-GB")}
            </p>
            {r.imageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={r.imageUrl}
                alt=""
                className="mt-3 h-24 w-24 rounded-[12px] object-cover"
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
