import Link from "next/link";
import { Badge } from "@eclat/ui";

const stats = [
  { label: "Total Orders", value: "24", change: "+12%" },
  { label: "Revenue", value: "PKR 486,000", change: "+8%" },
  { label: "Products", value: "6", change: null },
  { label: "Customers", value: "18", change: "+3" },
];

const recentOrders = [
  { id: "ORD-1004", customer: "Ayesha Khan", total: 28500, status: "PENDING" },
  { id: "ORD-1003", customer: "Sara Ahmed", total: 42000, status: "CONFIRMED" },
  { id: "ORD-1002", customer: "Fatima Ali", total: 18500, status: "SHIPPED" },
  { id: "ORD-1001", customer: "Zara Malik", total: 12500, status: "DELIVERED" },
];

const statusVariant: Record<string, "warning" | "default" | "secondary" | "success"> = {
  PENDING: "warning",
  CONFIRMED: "default",
  SHIPPED: "secondary",
  DELIVERED: "success",
};

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="mt-1 text-sm text-gray-500">Welcome back to Éclat by Tuba admin.</p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
          >
            <p className="text-sm font-medium text-gray-500">{stat.label}</p>
            <p className="mt-2 text-2xl font-semibold">{stat.value}</p>
            {stat.change && (
              <p className="mt-1 text-xs text-green-600">{stat.change} from last month</p>
            )}
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
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                    {order.id}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                    {order.customer}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    PKR {order.total.toLocaleString()}
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
