import Link from "next/link";
import { Badge, Button } from "@eclat/ui";
import { ADMIN_PRODUCTS } from "@/lib/products";

export const metadata = { title: "Products" };

export default function ProductsPage() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Products</h1>
          <p className="mt-1 text-sm text-gray-500">{ADMIN_PRODUCTS.length} products</p>
        </div>
        <Link href="/products/new">
          <Button>Add Product</Button>
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-lg border border-gray-200 bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Inventory
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {ADMIN_PRODUCTS.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="font-medium">{product.name}</div>
                  <div className="text-xs text-gray-400">{product.slug}</div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                  {product.category}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">
                  PKR {product.price.toLocaleString()}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">
                  {product.inventory}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex gap-1">
                    {product.isActive && <Badge variant="success">Active</Badge>}
                    {product.isFeatured && <Badge variant="secondary">Featured</Badge>}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                  <Link href={`/products/${product.id}`} className="text-gray-500 hover:text-gray-900">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
