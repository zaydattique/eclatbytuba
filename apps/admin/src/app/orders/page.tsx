import Link from "next/link";
import { Badge } from "@eclat/ui";
import { getOrders } from "@/lib/data";

export const metadata = { title: "Orders" };

const statusVariant: Record<string, "warning" | "default" | "secondary" | "success" | "danger"> = {
  PENDING: "warning",
  CONFIRMED: "default",
  PROCESSING: "secondary",
  SHIPPED: "secondary",
  DELIVERED: "success",
  CANCELLED: "danger",
  REFUNDED: "danger",
};

export default async function OrdersPage() {
  const orders = await getOrders();

  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold text-[#2D2A2B]">Orders</h1>
        <p className="mt-1 text-sm text-[#6B5E62]">{orders.length} orders</p>
      </div>

      <div
        className="mt-8 overflow-hidden rounded-[24px] border border-[#F0D6E0] bg-white"
        style={{
          boxShadow:
            "0 4px 20px rgba(196, 92, 122, 0.08), 0 1px 3px rgba(196, 92, 122, 0.04)",
        }}
      >
        <table className="min-w-full divide-y divide-[#F0D6E0]">
          <thead className="bg-[#FFF0F5]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#6B5E62]">
                Order
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#6B5E62]">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#6B5E62]">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#6B5E62]">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#6B5E62]">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F0D6E0]">
            {orders.map((order: any) => (
              <tr key={order.id} className="hover:bg-[#FFF0F5]/60">
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                  <Link
                    href={`/orders/${order.id}`}
                    className="text-[#2D2A2B] hover:text-[#C45C7A]"
                  >
                    {order.orderNumber}
                  </Link>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm font-medium text-[#2D2A2B]">{order.email}</div>
                  <div className="text-xs text-[#6B5E62]">{order.phone || ""}</div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-[#6B5E62]">
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString("en-GB")
                    : "—"}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-[#2D2A2B]">
                  PKR {Number(order.total).toLocaleString()}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <Badge variant={statusVariant[order.status] || "default"}>
                    {order.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
