import { notFound } from "next/navigation";
import { getProductBySlug, PRODUCTS } from "@/lib/products";
import { AddToCartButton } from "./AddToCartButton";
import { ProductCard } from "@eclat/ui";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props) {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: "Product" };
  return {
    title: product.name,
    description: product.description,
  };
}

export default function ProductDetailPage({ params }: Props) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const related = PRODUCTS.filter(
    (p) => p.categorySlug === product.categorySlug && p.id !== product.id
  ).slice(0, 3);

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Image */}
        <div className="aspect-[3/4] bg-brand-muted">
          {product.images[0] ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.images[0]}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-400">
              Image coming soon
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center">
          <p className="text-sm uppercase tracking-wider text-brand-secondary">
            {product.category}
          </p>
          <h1 className="mt-2 font-serif text-4xl">{product.name}</h1>

          <div className="mt-4 flex items-center gap-3">
            <span className="text-xl font-medium">
              PKR {product.price.toLocaleString()}
            </span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-lg text-gray-400 line-through">
                PKR {product.compareAtPrice.toLocaleString()}
              </span>
            )}
          </div>

          <p className="mt-6 text-gray-600 leading-relaxed">
            {product.fullDescription || product.description}
          </p>

          <div className="mt-8">
            <AddToCartButton product={product} />
          </div>

          <div className="mt-8 border-t border-brand-border pt-6 text-sm text-gray-500">
            <p>Free shipping on orders over PKR 15,000</p>
            <p className="mt-1">Easy 7-day returns</p>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-24">
          <h2 className="mb-8 font-serif text-2xl">You may also like</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard
                key={p.id}
                name={p.name}
                price={p.price}
                compareAtPrice={p.compareAtPrice}
                imageUrl={p.images[0]}
                href={`/products/${p.slug}`}
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
