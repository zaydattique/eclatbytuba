import Link from "next/link";
import { Badge } from "@eclat/ui";
import { getDashboardStats } from "@/lib/data";

const statusVariant: Record<string, "warning" | "default" | "secondary" | "success"> = {
  PENDING: "warning",
  CONFIRMED: "default",
  SHIPPED: "secondary",
  DELIVERED: "success",
};

export default async function AdminDashboard() {
  const stats = await getDashboardStats();

  return (
    <div>
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="mt-1 text-sm text-gray-500">Welcome back to Éclat by Tuba admin.</p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Orders", value: String(stats.totalOrders) },
          { label: "Revenue", value: `PKR ${Number(stats.revenue).toLocaleString()}` },
          { label: "Products", value: String(stats.products) },
          { label: "Customers", value: String(stats.customers) },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
          >
            <p className="text-sm font-medium text-gray-500">{stat.label}</p>
            <p className="mt-2 text-2xl font-semibold">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent Orders</h2>
          <Link href="/orders" className="text-sm text-gray-500 hover:text-gray-900">
            View all →
          </Link>
        </div>
        <div className="mt-4 overflow-hidden rounded-lg border border-gray-200 bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Order</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {stats.recentOrders.map((order: any) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                    <Link href={`/orders/${order.id}`} className="hover:underline">
                      {order.orderNumber}
                    </Link>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">{order.email}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">PKR {Number(order.total).toLocaleString()}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    <Badge variant={statusVariant[order.status] || "default"}>{order.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
