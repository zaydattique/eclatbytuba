import Link from "next/link";
import { ProductCard } from "@eclat/ui";
import { siteConfig } from "@eclat/config";
import { getAllProducts, getCategories } from "@/lib/products";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Shop Soft Gloss Beauty Pakistan | COD | ${siteConfig.name}`,
  description:
    "Shop lip sets, gloss, kits and more in Pakistan. Nationwide COD, flat shipping Rs 250. Soft-gloss beauty at Éclat by Tuba.",
  alternates: { canonical: `${siteConfig.url}/products` },
};

interface Props {
  searchParams: { category?: string };
}

export default async function ProductsPage({ searchParams }: Props) {
  const category = searchParams.category;
  // Prefer collections URLs — redirect-style hint via links below
  const [products, categories] = await Promise.all([
    getAllProducts(category),
    getCategories(),
  ]);

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-semibold text-[#2D2A2B] md:text-4xl">
          Shop soft-gloss beauty in Pakistan
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-[#6B5E62]">
          {products.length} piece{products.length !== 1 ? "s" : ""} · COD · Shipping
          Rs 250 nationwide. Browse by collection for cleaner category pages.
        </p>
      </div>

      <div className="mb-10 flex flex-wrap gap-3">
        <Link
          href="/products"
          className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
            !category
              ? "border-[#C45C7A] bg-[#C45C7A] text-white"
              : "border-[#F0D6E0] hover:border-[#C45C7A]"
          }`}
        >
          All
        </Link>
        {(categories as any[]).map((cat) => (
          <Link
            key={cat.slug}
            href={`/collections/${cat.slug}`}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              category === cat.slug
                ? "border-[#C45C7A] bg-[#C45C7A] text-white"
                : "border-[#F0D6E0] hover:border-[#C45C7A]"
            }`}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {products.length === 0 ? (
        <p className="py-20 text-center text-[#6B5E62]">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              price={product.price}
              compareAtPrice={product.compareAtPrice}
              imageUrl={product.images[0]}
              href={`/products/${product.slug}`}
              inventory={product.inventory}
            />
          ))}
        </div>
      )}
    </main>
  );
}
