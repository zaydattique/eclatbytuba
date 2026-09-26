import Link from "next/link";
import { Badge } from "@eclat/ui";
import { getOrders } from "@/lib/data";

export const metadata = { title: "Orders" };

const statusVariant: Record<string, "warning" | "default" | "secondary" | "success" | "danger"> = {
  PENDING: "warning",
  CONFIRMED: "default",
  SHIPPED: "secondary",
  DELIVERED: "success",
  CANCELLED: "danger",
};

export default async function OrdersPage() {
  const orders = await getOrders();

  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold">Orders</h1>
        <p className="mt-1 text-sm text-gray-500">{orders.length} orders</p>
      </div>

      <div className="mt-8 overflow-hidden rounded-lg border border-gray-200 bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Order</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order: any) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                  <Link href={`/orders/${order.id}`} className="hover:underline">{order.orderNumber}</Link>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm font-medium">{order.email}</div>
                  <div className="text-xs text-gray-400">{order.phone || ""}</div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                  {order.createdAt ? new Date(order.createdAt).toLocaleDateString("en-GB") : "—"}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">PKR {Number(order.total).toLocaleString()}</td>
                <td className="whitespace-nowrap px-6 py-4">
                  <Badge variant={statusVariant[order.status] || "default"}>{order.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
