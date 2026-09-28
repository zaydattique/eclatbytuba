import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@eclat/ui";
import { siteConfig } from "@eclat/config";
import { getAllProducts, getCategories } from "@/lib/products";
import { collectionCanonical } from "@/lib/seo";
import type { Metadata } from "next";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const categories = await getCategories();
  const cat = (categories as any[]).find((c) => c.slug === params.slug);
  if (!cat) return { title: "Collection" };
  const title = `${cat.name} Pakistan | COD | Shipping Rs 250 | ${siteConfig.name}`;
  const description = `Shop ${cat.name} in Pakistan at ${siteConfig.name}. Nationwide cash on delivery, flat shipping Rs 250. Soft-gloss beauty for everyday looks.`;
  const canonical = collectionCanonical(cat.slug);
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: "website" },
  };
}

export default async function CollectionPage({ params }: Props) {
  const categories = await getCategories();
  const cat = (categories as any[]).find((c) => c.slug === params.slug);
  if (!cat) notFound();

  const products = await getAllProducts(cat.slug);
  const canonical = collectionCanonical(cat.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
          {
            "@type": "ListItem",
            position: 2,
            name: "Shop",
            item: `${siteConfig.url}/products`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: cat.name,
            item: canonical,
          },
        ],
      },
      {
        "@type": "CollectionPage",
        name: `${cat.name} Pakistan`,
        description: `Shop ${cat.name} with COD and Rs 250 shipping nationwide.`,
        url: canonical,
      },
      {
        "@type": "ItemList",
        itemListElement: products.slice(0, 20).map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${siteConfig.url}/products/${p.slug}`,
          name: p.name,
        })),
      },
    ],
  };

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="mb-6 text-xs text-[#6B5E62]">
        <Link href="/" className="hover:text-[#C45C7A]">
          Home
        </Link>
        <span className="mx-1">/</span>
        <Link href="/products" className="hover:text-[#C45C7A]">
          Shop
        </Link>
        <span className="mx-1">/</span>
        <span className="text-[#2D2A2B]">{cat.name}</span>
      </nav>

      <h1 className="text-3xl font-semibold text-[#2D2A2B] md:text-4xl">
        {cat.name} in Pakistan
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#6B5E62]">
        Browse {cat.name.toLowerCase()} with nationwide cash on delivery and flat
        shipping of Rs 250. Every product page lists clear PKR pricing and
        verified-buyer reviews only. {products.length} product
        {products.length !== 1 ? "s" : ""} in this collection.
      </p>
      <p className="mt-2 text-sm font-medium text-[#2D2A2B]">
        COD · Shipping Rs 250 · All Pakistan
      </p>

      {products.length === 0 ? (
        <p className="mt-16 text-center text-[#6B5E62]">No products in this collection yet.</p>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
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

      <section className="mt-16 max-w-2xl rounded-[20px] border border-[#F0D6E0] bg-white p-6">
        <h2 className="text-lg font-semibold text-[#2D2A2B]">
          Why shop {cat.name} from {siteConfig.name}?
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[#6B5E62]">
          <li>Cash on delivery available across Pakistan</li>
          <li>Flat Rs 250 shipping on standard delivery</li>
          <li>Clear PKR prices on every product page</li>
          <li>Verified reviews only (real orders required)</li>
        </ul>
        <p className="mt-4 text-sm text-[#6B5E62]">
          Guides:{" "}
          <Link href="/guides/rhode-lip-peptide-pakistan" className="text-[#C45C7A] underline">
            Rhode Pakistan
          </Link>{" "}
          ·{" "}
          <Link href="/guides/kiko-3d-hydra-pakistan" className="text-[#C45C7A] underline">
            Kiko 3D Hydra
          </Link>{" "}
          ·{" "}
          <Link href="/guides/lip-sets-under-2000" className="text-[#C45C7A] underline">
            Lip sets under Rs 2000
          </Link>
        </p>
      </section>
    </main>
  );
}
