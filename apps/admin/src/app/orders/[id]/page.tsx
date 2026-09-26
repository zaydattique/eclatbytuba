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
  SHIPPED: "secondary",
  DELIVERED: "success",
  CANCELLED: "danger",
};

export default async function OrderDetailPage({ params }: Props) {
  const order = await getOrderById(params.id);
  if (!order) notFound();

  const addr = (order as any).shippingAddress || {};

  return (
    <div>
      <Link href="/orders" className="text-sm text-gray-500 hover:text-gray-900">
        ← Back to orders
      </Link>

      <div className="mt-4 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{(order as any).orderNumber}</h1>
          <p className="mt-1 text-sm text-gray-500">
            {(order as any).createdAt
              ? new Date((order as any).createdAt).toLocaleString("en-GB")
              : ""}
          </p>
        </div>
        <Badge variant={statusVariant[(order as any).status] || "default"}>
          {(order as any).status}
        </Badge>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h2 className="font-medium">Items</h2>
            <div className="mt-4 space-y-3">
              {((order as any).items || []).map((item: any) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.name} × {item.quantity}</span>
                  <span>PKR {Number(item.total).toLocaleString()}</span>
                </div>
              ))}
              <div className="border-t border-gray-100 pt-3 flex justify-between font-medium">
                <span>Total</span>
                <span>PKR {Number((order as any).total).toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h2 className="font-medium">Payment</h2>
            <div className="mt-4 space-y-2 text-sm">
              {((order as any).payments || []).map((p: any) => (
                <div key={p.id} className="flex justify-between">
                  <span className="capitalize">{p.method?.replace("_", " ")}</span>
                  <span>
                    PKR {Number(p.amount).toLocaleString()} —{" "}
                    <Badge variant={p.status === "PAID" ? "success" : "warning"}>{p.status}</Badge>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h2 className="font-medium">Customer</h2>
            <div className="mt-3 space-y-1 text-sm text-gray-600">
              <p>{addr.fullName || "—"}</p>
              <p>{(order as any).email}</p>
              <p>{(order as any).phone || "—"}</p>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h2 className="font-medium">Shipping Address</h2>
            <div className="mt-3 space-y-1 text-sm text-gray-600">
              <p>{addr.line1}</p>
              <p>{addr.city}{addr.postalCode ? `, ${addr.postalCode}` : ""}</p>
              <p>{addr.country || "PK"}</p>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h2 className="font-medium">Update Status</h2>
            <OrderStatusForm orderId={(order as any).id} currentStatus={(order as any).status} />
          </div>
        </div>
      </div>
    </div>
  );
}
