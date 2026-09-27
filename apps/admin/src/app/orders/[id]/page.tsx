import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@eclat/ui";
import { getOrderById } from "@/lib/data";
import { OrderStatusForm } from "./OrderStatusForm";

interface Props {
  params: { id: string };
}

const statusVariant: Record<string, "warning" | "default" | "secondary" | "success" | "danger"> = {
  PENDING: "warning",
  CONFIRMED: "default",
  PROCESSING: "secondary",
  SHIPPED: "secondary",
  DELIVERED: "success",
  CANCELLED: "danger",
  REFUNDED: "danger",
};

const cardClass = "rounded-[24px] border border-[#F0D6E0] bg-white p-6";
const cardStyle = {
  boxShadow:
    "0 4px 20px rgba(196, 92, 122, 0.08), 0 1px 3px rgba(196, 92, 122, 0.04)",
};

export default async function OrderDetailPage({ params }: Props) {
  const order = await getOrderById(params.id);
  if (!order) notFound();

  const o = order as any;
  const addr = o.shippingAddress || {};

  return (
    <div>
      <Link href="/orders" className="text-sm text-[#6B5E62] hover:text-[#C45C7A]">
        ← Back to orders
      </Link>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#2D2A2B]">{o.orderNumber}</h1>
          <p className="mt-1 text-sm text-[#6B5E62]">
            {o.createdAt ? new Date(o.createdAt).toLocaleString("en-GB") : ""}
          </p>
        </div>
        <Badge variant={statusVariant[o.status] || "default">{o.status}</Badge>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className={cardClass} style={cardStyle}>
            <h2 className="font-medium text-[#2D2A2B]">Items</h2>
            <div className="mt-4 space-y-3">
              {(o.items || []).map((item: any) => (
                <div key={item.id} className="flex justify-between text-sm text-[#2D2A2B]">
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>PKR {Number(item.total).toLocaleString()}</span>
                </div>
              ))}
              <div className="flex justify-between border-t border-[#F0D6E0] pt-3 font-medium text-[#2D2A2B]">
                <span>Total</span>
                <span>PKR {Number(o.total).toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className={cardClass} style={cardStyle}>
            <h2 className="font-medium text-[#2D2A2B]">Payment</h2>
            <div className="mt-4 space-y-2 text-sm">
              {(o.payments || []).map((p: any) => (
                <div key={p.id} className="flex justify-between gap-2">
                  <span className="capitalize text-[#2D2A2B]">
                    {p.method?.replace(/_/g, " ")}
                  </span>
                  <span className="flex items-center gap-2 text-[#2D2A2B]">
                    PKR {Number(p.amount).toLocaleString()}{" "}
                    <Badge variant={p.status === "PAID" ? "success" : "warning"}>
                      {p.status}
                    </Badge>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {(o.trackingNumber || o.notes) && (
            <div className={cardClass} style={cardStyle}>
              <h2 className="font-medium text-[#2D2A2B]">Fulfillment</h2>
              <div className="mt-3 space-y-1 text-sm text-[#6B5E62]">
                {o.trackingNumber && (
                  <p>
                    Tracking: <span className="text-[#2D2A2B]">{o.trackingNumber}</span>
                  </p>
                )}
                {o.notes && <p className="whitespace-pre-wrap">{o.notes}</p>}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className={cardClass} style={cardStyle}>
            <h2 className="font-medium text-[#2D2A2B]">Customer</h2>
            <div className="mt-3 space-y-1 text-sm text-[#6B5E62]">
              <p>{addr.fullName || "—"}</p>
              <p>{o.email}</p>
              <p>{o.phone || "—"}</p>
            </div>
          </div>

          <div className={cardClass} style={cardStyle}>
            <h2 className="font-medium text-[#2D2A2B]">Shipping Address</h2>
            <div className="mt-3 space-y-1 text-sm text-[#6B5E62]">
              <p>{addr.line1}</p>
              <p>
                {addr.city}
                {addr.postalCode ? `, ${addr.postalCode}` : ""}
              </p>
              <p>{addr.country || "PK"}</p>
              {addr.shippingMethod && (
                <p className="pt-1 capitalize">Method: {addr.shippingMethod}</p>
              )}
            </div>
          </div>

          <div className={cardClass} style={cardStyle}>
            <h2 className="font-medium text-[#2D2A2B]">Update order</h2>
            <OrderStatusForm
              orderId={o.id}
              currentStatus={o.status}
              initialNotes={o.notes}
              initialTracking={o.trackingNumber}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
