import Link from "next/link";
import { ProductCard } from "@eclat/ui";
import { PRODUCTS, CATEGORIES } from "@/lib/products";

export const metadata = {
  title: "Shop",
};

interface Props {
  searchParams: { category?: string };
}

export default function ProductsPage({ searchParams }: Props) {
  const category = searchParams.category;
  const products = category
    ? PRODUCTS.filter((p) => p.categorySlug === category)
    : PRODUCTS;

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-10">
        <h1 className="font-serif text-4xl">Shop</h1>
        <p className="mt-2 text-gray-500">
          {products.length} piece{products.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Category filters */}
      <div className="mb-10 flex flex-wrap gap-3">
        <Link
          href="/products"
          className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
            !category
              ? "border-brand-primary bg-brand-primary text-white"
              : "border-brand-border hover:border-brand-primary"
          }`}
        >
          All
        </Link>
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            href={`/products?category=${cat.slug}`}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              category === cat.slug
                ? "border-brand-primary bg-brand-primary text-white"
                : "border-brand-border hover:border-brand-primary"
            }`}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {/* Grid */}
      {products.length === 0 ? (
        <p className="py-20 text-center text-gray-500">No products found in this category.</p>
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
            />
          ))}
        </div>
      )}
    </main>
  );
}
