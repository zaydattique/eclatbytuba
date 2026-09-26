import { Badge } from "@eclat/ui";

export const metadata = { title: "Orders" };

const ORDERS = [
  { id: "ORD-1004", customer: "Ayesha Khan", email: "ayesha@email.com", total: 28500, status: "PENDING", date: "2026-09-26" },
  { id: "ORD-1003", customer: "Sara Ahmed", email: "sara@email.com", total: 42000, status: "CONFIRMED", date: "2026-09-25" },
  { id: "ORD-1002", customer: "Fatima Ali", email: "fatima@email.com", total: 18500, status: "SHIPPED", date: "2026-09-24" },
  { id: "ORD-1001", customer: "Zara Malik", email: "zara@email.com", total: 12500, status: "DELIVERED", date: "2026-09-23" },
  { id: "ORD-1000", customer: "Hina Raza", email: "hina@email.com", total: 16800, status: "DELIVERED", date: "2026-09-22" },
];

const statusVariant: Record<string, "warning" | "default" | "secondary" | "success" | "danger"> = {
  PENDING: "warning",
  CONFIRMED: "default",
  SHIPPED: "secondary",
  DELIVERED: "success",
  CANCELLED: "danger",
};

export default function OrdersPage() {
  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold">Orders</h1>
        <p className="mt-1 text-sm text-gray-500">{ORDERS.length} orders</p>
      </div>

      <div className="mt-8 overflow-hidden rounded-lg border border-gray-200 bg-white">
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
                Date
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
            {ORDERS.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">{order.id}</td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm font-medium">{order.customer}</div>
                  <div className="text-xs text-gray-400">{order.email}</div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">{order.date}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">
                  PKR {order.total.toLocaleString()}
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
