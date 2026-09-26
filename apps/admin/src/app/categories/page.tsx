import { Button } from "@eclat/ui";
import { getCategories, getProducts } from "@/lib/data";

export const metadata = { title: "Categories" };

export default async function CategoriesPage() {
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);

  const counts: Record<string, number> = {};
  for (const p of products as any[]) {
    const key = p.categoryId || p.category?.id || "";
    counts[key] = (counts[key] || 0) + 1;
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Categories</h1>
          <p className="mt-1 text-sm text-gray-500">{categories.length} categories</p>
        </div>
        <Button>Add Category</Button>
      </div>

      <div className="mt-8 overflow-hidden rounded-lg border border-gray-200 bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Slug</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Products</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {categories.map((cat: any) => (
              <tr key={cat.id} className="hover:bg-gray-50">
                <td className="whitespace-nowrap px-6 py-4 font-medium">{cat.name}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{cat.slug}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">{counts[cat.id] || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
