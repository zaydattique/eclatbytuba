import Link from "next/link";
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
  const meta = (product as any).metadata || {};
  const title =
    meta.seoTitle ||
    `${product.name} Pakistan | Rs ${Number(product.price).toLocaleString()} | COD`;
  const description =
    meta.seoDescription ||
    `${product.description || product.name}. Nationwide COD. Shipping Rs 250. ${siteConfig.name}.`;
  const canonical = `${siteConfig.url}/products/${product.slug}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      images: product.images[0] ? [product.images[0]] : undefined,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  const all = await getAllProducts(product.category?.slug);
  const related = all.filter((p) => p.id !== product.id).slice(0, 3);
  const stats = await getReviewStats(product.id);
  const meta = (product as any).metadata || {};
  const variants = (meta.variants || []) as { code: string; name: string; inventory?: number }[];
  const lowStock = product.inventory > 0 && product.inventory <= 10;
  const answerFirst =
    product.description ||
    `${product.name} in Pakistan — cash on delivery, shipping Rs 250 nationwide.`;

  const productUrl = `${siteConfig.url}/products/${product.slug}`;

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
            name: product.name,
            item: productUrl,
          },
        ],
      },
      {
        "@type": "Product",
        name: product.name,
        description: product.description,
        image: product.images,
        sku: product.slug,
        brand: { "@type": "Brand", name: siteConfig.name },
        offers: {
          "@type": "Offer",
          price: Number(product.price),
          priceCurrency: "PKR",
          availability:
            product.inventory > 0
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
          url: productUrl,
          shippingDetails: {
            "@type": "OfferShippingDetails",
            shippingRate: {
              "@type": "MonetaryAmount",
              value: "250",
              currency: "PKR",
            },
            shippingDestination: {
              "@type": "DefinedRegion",
              addressCountry: "PK",
            },
          },
        },
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
            name: `Is ${product.name} available with COD in Pakistan?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `Yes. ${product.name} ships all Pakistan with cash on delivery. Flat shipping is Rs 250.`,
            },
          },
          {
            "@type": "Question",
            name: "How much is shipping?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Flat shipping Rs 250 nationwide across Pakistan.",
            },
          },
          {
            "@type": "Question",
            name: "Can I return the product?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Easy 7-day returns on unused items in original condition.",
            },
          },
          {
            "@type": "Question",
            name: "Are reviews verified?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Only customers with a real order for this product can leave a review.",
            },
          },
        ],
      },
      {
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.url,
      },
    ],
  };

  return (
    <main className="mx-auto max-w-6xl px-6 py-12 pb-28 md:pb-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="mb-6 text-xs text-[#6B5E62]" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-[#C45C7A]">
          Home
        </Link>
        <span className="mx-1">/</span>
        <Link href="/products" className="hover:text-[#C45C7A]">
          Shop
        </Link>
        <span className="mx-1">/</span>
        <span className="text-[#2D2A2B]">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <ProductGallery images={product.images || []} name={product.name} />

        <div className="flex flex-col justify-center">
          <p className="text-sm uppercase tracking-wider text-[#C45C7A]">
            {product.category?.name}
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-[#2D2A2B] md:text-4xl">
            {product.name}
          </h1>

          {/* AEO answer-first */}
          <p className="mt-3 text-sm leading-relaxed text-[#2D2A2B]">{answerFirst}</p>

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

          {variants.length > 0 && (
            <div className="mt-6">
              <h2 className="text-sm font-semibold text-[#2D2A2B]">Shades</h2>
              <ul className="mt-2 grid grid-cols-1 gap-1 text-sm text-[#6B5E62] sm:grid-cols-2">
                {variants.map((v) => (
                  <li key={v.code} className="rounded-[12px] border border-[#F0D6E0] px-2 py-1">
                    {v.code} {v.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <p className="mt-6 leading-relaxed text-[#6B5E62]">
            {product.fullDescription || product.description}
          </p>

          <div className="mt-8 hidden md:block">
            <AddToCartButton product={product} />
          </div>

          <div className="mt-8 rounded-[16px] border border-[#F0D6E0] bg-[#FFF0F5] p-4 text-sm text-[#2D2A2B]">
            <p className="font-medium">COD · Shipping Rs 250 · All Pakistan</p>
            <p className="mt-1 text-[#6B5E62]">Easy 7-day returns on unused items</p>
            <p className="mt-1 text-[#6B5E62]">Verified buyer reviews only</p>
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

      <p className="mt-12 text-xs text-[#6B5E62]">
        Last updated: 27 Sep 2026 · {siteConfig.name}
      </p>
    </main>
  );
}
