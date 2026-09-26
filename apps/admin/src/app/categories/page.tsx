import { Button } from "@eclat/ui";
import { ADMIN_CATEGORIES } from "@/lib/products";

export const metadata = { title: "Categories" };

export default function CategoriesPage() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Categories</h1>
          <p className="mt-1 text-sm text-gray-500">{ADMIN_CATEGORIES.length} categories</p>
        </div>
        <Button>Add Category</Button>
      </div>

      <div className="mt-8 overflow-hidden rounded-lg border border-gray-200 bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Slug
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Products
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {ADMIN_CATEGORIES.map((cat) => (
              <tr key={cat.id} className="hover:bg-gray-50">
                <td className="whitespace-nowrap px-6 py-4 font-medium">{cat.name}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{cat.slug}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">{cat.productCount}</td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                  <button className="text-gray-500 hover:text-gray-900">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
