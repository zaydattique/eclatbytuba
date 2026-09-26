import Link from "next/link";
import { Button } from "@eclat/ui";
import { ProductCard } from "@eclat/ui";
import { siteConfig } from "@eclat/config";
import { getFeaturedProducts } from "@/lib/products";

export default async function HomePage() {
  const featured = await getFeaturedProducts();

  return (
    <main>
      <section className="relative flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-brand-secondary">
          New Collection
        </p>
        <h1 className="font-serif text-5xl font-medium tracking-tight md:text-7xl">
          {siteConfig.name}
        </h1>
        <p className="mt-6 max-w-md text-lg text-gray-600">
          Timeless elegance. Modern luxury. Crafted for the woman who knows her worth.
        </p>
        <div className="mt-10 flex gap-4">
          <Link href="/products">
            <Button size="lg">Shop Now</Button>
          </Link>
          <Link href="/products?category=dresses">
            <Button variant="outline" size="lg">
              Explore Collection
            </Button>
          </Link>
        </div>
      </section>

      <section className="border-t border-brand-border px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 flex items-end justify-between">
            <h2 className="font-serif text-3xl">Featured Pieces</h2>
            <Link href="/products" className="text-sm underline hover:text-brand-secondary">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((product) => (
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
        </div>
      </section>
    </main>
  );
}
