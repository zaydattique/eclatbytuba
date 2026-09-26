"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@eclat/ui";

const STATUSES = ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"];

export function OrderStatusForm({
  orderId,
  currentStatus,
}: {
  orderId: string;
  currentStatus: string;
}) {
  const router = useRouter();
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const base = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
      const res = await fetch(`${base}/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update");
      router.refresh();
    } catch (e) {
      console.error(e);
      alert("Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-3 space-y-3">
      <select
        className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        {STATUSES.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
      <Button
        onClick={handleUpdate}
        disabled={loading || status === currentStatus}
        className="w-full"
      >
        {loading ? "Updating..." : "Update Status"}
      </Button>
    </div>
  );
}
