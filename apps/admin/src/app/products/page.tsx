import Link from "next/link";
import { Badge, Button } from "@eclat/ui";
import { getProducts } from "@/lib/data";

export const metadata = { title: "Products" };

export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string }>;
}) {
  const sp = (await searchParams) || {};
  const q = (sp.q || "").toLowerCase().trim();
  let products = await getProducts();
  if (q) {
    products = products.filter(
      (p: any) =>
        p.name?.toLowerCase().includes(q) ||
        p.slug?.toLowerCase().includes(q) ||
        p.category?.name?.toLowerCase().includes(q)
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#2D2A2B]">Products</h1>
          <p className="mt-1 text-sm text-[#6B5E62]">{products.length} products</p>
        </div>
        <Link href="/products/new">
          <Button>Add Product</Button>
        </Link>
      </div>

      <form className="mt-6" method="get">
        <input
          name="q"
          defaultValue={sp.q || ""}
          placeholder="Search name, slug, category…"
          className="w-full max-w-md rounded-[12px] border border-[#F0D6E0] bg-white px-3 py-2 text-sm text-[#2D2A2B] placeholder:text-[#6B5E62] focus:outline-none focus:ring-2 focus:ring-[#C45C7A]/40"
        />
      </form>

      <div
        className="mt-6 overflow-hidden rounded-[24px] border border-[#F0D6E0] bg-white"
        style={{
          boxShadow:
            "0 4px 20px rgba(196, 92, 122, 0.08), 0 1px 3px rgba(196, 92, 122, 0.04)",
        }}
      >
        <table className="min-w-full divide-y divide-[#F0D6E0]">
          <thead className="bg-[#FFF0F5]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#6B5E62]">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#6B5E62]">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#6B5E62]">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#6B5E62]">
                Inventory
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#6B5E62]">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F0D6E0]">
            {products.map((product: any) => (
              <tr key={product.id} className="hover:bg-[#FFF0F5]/60">
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="font-medium text-[#2D2A2B]">{product.name}</div>
                  <div className="text-xs text-[#6B5E62]">{product.slug}</div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-[#6B5E62]">
                  {product.category?.name || "—"}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-[#2D2A2B]">
                  PKR {Number(product.price).toLocaleString()}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">
                  {product.inventory}
                  {product.inventory != null && product.inventory <= 10 && product.inventory > 0 && (
                    <span className="ml-2 text-xs text-[#C49A3C]">low</span>
                  )}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex gap-1">
                    {product.isActive && <Badge variant="success">Active</Badge>}
                    {product.isFeatured && <Badge variant="secondary">Featured</Badge>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
