import { notFound } from "next/navigation";
import { getProductBySlug, getAllProducts } from "@/lib/products";
import { getReviewStats } from "@eclat/db";
import { AddToCartButton } from "./AddToCartButton";
import { ProductGallery } from "./ProductGallery";
import { ProductAccordions } from "./ProductAccordions";
import { ReviewsSection } from "./ReviewsSection";
import { ProductCard } from "@eclat/ui";
import { siteConfig } from "@eclat/config";
import type { Metadata } from "next";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) return { title: "Product" };
  return {
    title: product.name,
    description: product.description || undefined,
    openGraph: {
      title: product.name,
      description: product.description || undefined,
      images: product.images[0] ? [product.images[0]] : undefined,
      type: "website",
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  const all = await getAllProducts(product.category?.slug);
  const related = all.filter((p) => p.id !== product.id).slice(0, 3);
  const stats = await getReviewStats(product.id);

  const lowStock =
    product.inventory > 0 && product.inventory <= 10;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        name: product.name,
        description: product.description,
        image: product.images,
        sku: product.slug,
        offers: {
          "@type": "Offer",
          price: product.price,
          priceCurrency: "PKR",
          availability:
            product.inventory > 0
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
          url: `${siteConfig.url}/products/${product.slug}`,
        },
        brand: { "@type": "Brand", name: siteConfig.name },
        ...(stats.count > 0
          ? {
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: stats.average.toFixed(1),
                reviewCount: stats.count,
              },
            }
          : {}),
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Do you offer cash on delivery?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, COD is available across Pakistan.",
            },
          },
          {
            "@type": "Question",
            name: "What is your return policy?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Easy 7-day returns on unused items.",
            },
          },
        ],
      },
    ],
  };

  return (
    <main className="mx-auto max-w-6xl px-6 py-12 pb-28 md:pb-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <ProductGallery images={product.images || []} name={product.name} />

        <div className="flex flex-col justify-center">
          <p className="text-sm uppercase tracking-wider text-[#C45C7A]">
            {product.category?.name}
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-[#2D2A2B] md:text-4xl">
            {product.name}
          </h1>

          {stats.count > 0 && (
            <p className="mt-2 text-sm text-[#6B5E62]">
              <span className="text-[#F5A623]">★</span> {stats.average.toFixed(1)}{" "}
              ({stats.count})
            </p>
          )}

          <div className="mt-4 flex items-center gap-3">
            <span className="text-xl font-semibold text-[#2D2A2B]">
              PKR {Number(product.price).toLocaleString()}
            </span>
            {product.compareAtPrice &&
              Number(product.compareAtPrice) > Number(product.price) && (
                <span className="text-lg text-[#6B5E62] line-through">
                  PKR {Number(product.compareAtPrice).toLocaleString()}
                </span>
              )}
          </div>

          {lowStock && (
            <p className="mt-3 text-sm font-medium text-[#C49A3C]">
              Only a few left — {product.inventory} in stock
            </p>
          )}

          <p className="mt-6 leading-relaxed text-[#6B5E62]">
            {product.fullDescription || product.description}
          </p>

          <div className="mt-8 hidden md:block">
            <AddToCartButton product={product} />
          </div>

          <div className="mt-8 border-t border-[#F0D6E0] pt-6 text-sm text-[#6B5E62]">
            <p>Free shipping on orders over PKR 15,000</p>
            <p className="mt-1">Easy 7-day returns</p>
            <p className="mt-1">Cash on delivery available</p>
          </div>

          <ProductAccordions
            description={product.fullDescription || product.description}
          />
        </div>
      </div>

      <AddToCartButton product={product} sticky />

      <ReviewsSection productId={product.id} />

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="mb-8 text-2xl font-semibold text-[#2D2A2B]">
            Complete the look
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard
                key={p.id}
                name={p.name}
                price={p.price}
                compareAtPrice={p.compareAtPrice}
                imageUrl={p.images[0]}
                href={`/products/${p.slug}`}
                inventory={p.inventory}
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
