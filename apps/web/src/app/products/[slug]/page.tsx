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
import {
  buildSeoTitle,
  buildSeoDescription,
  buildAnswerFirst,
  buildLongDescription,
  buildProductFaqs,
  buildHowToSchema,
  productCanonical,
} from "@/lib/seo";
import type { Metadata } from "next";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) return { title: "Product" };
  const seoProduct = {
    ...product,
    price: Number(product.price),
    compareAtPrice:
      product.compareAtPrice != null ? Number(product.compareAtPrice) : null,
  };
  const title = buildSeoTitle(seoProduct);
  const description = buildSeoDescription(seoProduct);
  const canonical = productCanonical(product.slug);

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      images: product.images[0]
        ? [{ url: product.images[0], alt: product.name }]
        : undefined,
      type: "website",
      locale: "en_PK",
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: { index: true, follow: true },
  };
}

function renderMarkdownish(text: string) {
  return text.split("\n").map((line, i) => {
    if (line.startsWith("## ")) {
      return (
        <h2 key={i} className="mt-8 text-xl font-semibold text-[#2D2A2B]">
          {line.replace(/^## /, "")}
        </h2>
      );
    }
    if (line.startsWith("### ")) {
      return (
        <h3 key={i} className="mt-6 text-base font-semibold text-[#2D2A2B]">
          {line.replace(/^### /, "")}
        </h3>
      );
    }
    if (line.startsWith("- ")) {
      return (
        <li key={i} className="ml-4 list-disc text-sm text-[#6B5E62]">
          {line.replace(/^- /, "").replace(/\*\*(.*?)\*\*/g, "$1")}
        </li>
      );
    }
    if (!line.trim()) return <br key={i} />;
    return (
      <p key={i} className="mt-2 text-sm leading-relaxed text-[#6B5E62]">
        {line.replace(/\*\*(.*?)\*\*/g, "$1")}
      </p>
    );
  });
}

export default async function ProductDetailPage({ params }: Props) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  const seoProduct = {
    ...product,
    price: Number(product.price),
    compareAtPrice:
      product.compareAtPrice != null ? Number(product.compareAtPrice) : null,
  };

  const all = await getAllProducts(product.category?.slug);
  const related = all.filter((p) => p.id !== product.id).slice(0, 4);
  const stats = await getReviewStats(product.id);
  const meta = product.metadata || {};
  const variants = (meta.variants || []) as {
    code: string;
    name: string;
    inventory?: number;
  }[];
  const lowStock = product.inventory > 0 && product.inventory <= 10;
  const answerFirst = buildAnswerFirst(seoProduct);
  const longCopy = buildLongDescription(seoProduct);
  const faqs = buildProductFaqs(seoProduct);
  const productUrl = productCanonical(product.slug);
  const isLip =
    (product.category?.slug || "").includes("lip") ||
    /lip/i.test(product.slug) ||
    (product.tags || []).some((t) => /lip/i.test(t));

  const graph: any[] = [
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
        ...(product.category
          ? [
              {
                "@type": "ListItem",
                position: 3,
                name: product.category.name,
                item: `${siteConfig.url}/collections/${product.category.slug}`,
              },
              {
                "@type": "ListItem",
                position: 4,
                name: product.name,
                item: productUrl,
              },
            ]
          : [
              {
                "@type": "ListItem",
                position: 3,
                name: product.name,
                item: productUrl,
              },
            ]),
      ],
    },
    {
      "@type": "Product",
      name: product.name,
      description: buildSeoDescription(seoProduct),
      image: product.images,
      sku: product.slug,
      brand: { "@type": "Brand", name: siteConfig.name },
      category: product.category?.name,
      offers: {
        "@type": "Offer",
        price: Number(product.price),
        priceCurrency: "PKR",
        availability:
          product.inventory > 0
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
        url: productUrl,
        seller: { "@type": "Organization", name: siteConfig.name },
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
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
    {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      description: siteConfig.description,
    },
  ];

  if (isLip) {
    graph.push(buildHowToSchema(seoProduct));
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": graph,
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
        {product.category && (
          <>
            <span className="mx-1">/</span>
            <Link
              href={`/collections/${product.category.slug}`}
              className="hover:text-[#C45C7A]"
            >
              {product.category.name}
            </Link>
          </>
        )}
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

          <p className="mt-3 text-sm leading-relaxed text-[#2D2A2B]">{answerFirst}</p>

          {stats.count > 0 && (
            <p className="mt-2 text-sm text-[#6B5E62]">
              <span className="text-[#F5A623]">★</span> {stats.average.toFixed(1)}{" "}
              ({stats.count} verified reviews)
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
                  <li
                    key={v.code}
                    className="rounded-[12px] border border-[#F0D6E0] px-2 py-1"
                  >
                    {v.code} {v.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

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

      <article className="prose-sm mt-16 max-w-3xl">
        {renderMarkdownish(longCopy)}
      </article>

      <section className="mt-16 max-w-3xl" aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="text-2xl font-semibold text-[#2D2A2B]">
          Frequently asked questions
        </h2>
        <div className="mt-6 space-y-4">
          {faqs.map((f) => (
            <details
              key={f.question}
              className="rounded-[16px] border border-[#F0D6E0] bg-white p-4"
            >
              <summary className="cursor-pointer text-sm font-semibold text-[#2D2A2B]">
                {f.question}
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-[#6B5E62]">{f.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <ReviewsSection productId={product.id} />

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="mb-4 text-2xl font-semibold text-[#2D2A2B]">
            Complete the look
          </h2>
          <p className="mb-8 text-sm text-[#6B5E62]">
            Related {product.category?.name || "products"} — also COD · Rs 250
            shipping.{" "}
            {product.category && (
              <Link
                href={`/collections/${product.category.slug}`}
                className="text-[#C45C7A] underline"
              >
                View all {product.category.name}
              </Link>
            )}
          </p>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
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
        Last updated:{" "}
        {new Date().toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}{" "}
        · {siteConfig.name} ·{" "}
        <Link href="/shipping" className="underline hover:text-[#C45C7A]">
          Shipping & COD
        </Link>{" "}
        ·{" "}
        <Link href="/returns" className="underline hover:text-[#C45C7A]">
          Returns
        </Link>
      </p>
    </main>
  );
}
