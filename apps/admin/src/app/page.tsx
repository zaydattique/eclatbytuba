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

  const cardStyle = {
    boxShadow:
      "0 4px 20px rgba(196, 92, 122, 0.08), 0 1px 3px rgba(196, 92, 122, 0.04)",
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-[#2D2A2B]">Dashboard</h1>
      <p className="mt-1 text-sm text-[#6B5E62]">
        Welcome back.{" "}
        <Link href="/analytics" className="text-[#C45C7A] hover:underline">
          Full analytics →
        </Link>
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Orders", value: String(stats.totalOrders) },
          { label: "Revenue", value: `PKR ${Number(stats.revenue).toLocaleString()}` },
          { label: "Products", value: String(stats.products) },
          { label: "Customers", value: String(stats.customers) },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-[24px] border border-[#F0D6E0] bg-white p-6"
            style={cardStyle}
          >
            <p className="text-sm font-medium text-[#6B5E62]">{stat.label}</p>
            <p className="mt-2 text-2xl font-semibold text-[#2D2A2B]">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#2D2A2B]">Recent Orders</h2>
          <Link href="/orders" className="text-sm text-[#6B5E62] hover:text-[#C45C7A]">
            View all →
          </Link>
        </div>
        <div
          className="mt-4 overflow-hidden rounded-[24px] border border-[#F0D6E0] bg-white"
          style={cardStyle}
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
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#6B5E62]">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0D6E0]">
              {stats.recentOrders.map((order: any) => (
                <tr key={order.id} className="hover:bg-[#FFF0F5]/60">
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                    <Link
                      href={`/orders/${order.id}`}
                      className="text-[#2D2A2B] hover:text-[#C45C7A]"
                    >
                      {order.orderNumber}
                    </Link>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-[#6B5E62]">
                    {order.email}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-[#2D2A2B]">
                    PKR {Number(order.total).toLocaleString()}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
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
    </div>
  );
}
