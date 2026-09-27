import Link from "next/link";
import { Button } from "@eclat/ui";
import { ProductCard } from "@eclat/ui";
import { siteConfig } from "@eclat/config";
import { getFeaturedProducts } from "@/lib/products";

export default async function HomePage() {
  const featured = await getFeaturedProducts();

  return (
    <main>
      <section className="relative flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.25em] text-[#C45C7A]">
          Soft Gloss · Self-care
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-[#2D2A2B] md:text-6xl">
          {siteConfig.name}
        </h1>
        <p className="mt-6 max-w-md text-lg text-[#6B5E62]">
          Soft, glossy, elevated beauty for GenZ & young pros. Treat yourself — handpicked in Lahore vibes.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/products">
            <Button size="lg">Shop Now</Button>
          </Link>
          <Link href="/products">
            <Button variant="outline" size="lg">
              View Collection
            </Button>
          </Link>
        </div>
      </section>

      <section className="border-t border-[#F0D6E0] px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex items-end justify-between">
            <h2 className="text-2xl font-semibold text-[#2D2A2B]">Bestsellers</h2>
            <Link href="/products" className="text-sm text-[#C45C7A] hover:underline">
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
                inventory={product.inventory}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
