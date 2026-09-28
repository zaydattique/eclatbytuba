import Link from "next/link";
import { Button } from "@eclat/ui";
import { ProductCard } from "@eclat/ui";
import { siteConfig } from "@eclat/config";
import { getFeaturedProducts } from "@/lib/products";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Éclat by Tuba | Soft Gloss Beauty Pakistan | COD | Rs 250 Shipping",
  description:
    "Soft gloss beauty for Pakistan — lip sets, Kiko, Rhode peptide & kits. Nationwide COD, shipping Rs 250. Verified reviews only.",
  alternates: { canonical: process.env.NEXT_PUBLIC_APP_URL || "https://eclatbytuba.com" },
};

export default async function HomePage() {
  const featured = await getFeaturedProducts();

  return (
    <main>
      <section className="relative flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.25em] text-[#C45C7A]">
          Soft Gloss · Pakistan · COD
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-[#2D2A2B] md:text-6xl">
          Soft-gloss beauty with COD across Pakistan
        </h1>
        <p className="mt-6 max-w-lg text-lg text-[#6B5E62]">
          Éclat by Tuba — lip sets, Kiko, Rhode peptide deals and kits. Flat
          shipping Rs 250, cash on delivery nationwide.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/products">
            <Button size="lg">Shop Now</Button>
          </Link>
          <Link href="/collections/lip-sets">
            <Button variant="outline" size="lg">
              Lip sets
            </Button>
          </Link>
        </div>
        <p className="mt-6 text-xs text-[#6B5E62]">
          <Link href="/shipping" className="underline hover:text-[#C45C7A]">
            Shipping and COD
          </Link>
          {" · "}
          <Link
            href="/guides/rhode-lip-peptide-pakistan"
            className="underline hover:text-[#C45C7A]"
          >
            Rhode guide
          </Link>
          {" · "}
          <Link
            href="/guides/kiko-3d-hydra-pakistan"
            className="underline hover:text-[#C45C7A]"
          >
            Kiko guide
          </Link>
        </p>
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

      <section className="border-t border-[#F0D6E0] bg-white px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-xl font-semibold text-[#2D2A2B]">Shop by collection</h2>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <Link
              href="/collections/lip-sets"
              className="rounded-full border border-[#F0D6E0] px-4 py-2 text-[#2D2A2B] hover:border-[#C45C7A]"
            >
              Lip sets
            </Link>
            <Link
              href="/collections/lip-gloss"
              className="rounded-full border border-[#F0D6E0] px-4 py-2 text-[#2D2A2B] hover:border-[#C45C7A]"
            >
              Lip gloss
            </Link>
            <Link
              href="/collections/lipstick"
              className="rounded-full border border-[#F0D6E0] px-4 py-2 text-[#2D2A2B] hover:border-[#C45C7A]"
            >
              Lipstick
            </Link>
            <Link
              href="/collections/cosmetic-kits"
              className="rounded-full border border-[#F0D6E0] px-4 py-2 text-[#2D2A2B] hover:border-[#C45C7A]"
            >
              Kits
            </Link>
            <Link
              href="/collections/nails"
              className="rounded-full border border-[#F0D6E0] px-4 py-2 text-[#2D2A2B] hover:border-[#C45C7A]"
            >
              Nails
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
