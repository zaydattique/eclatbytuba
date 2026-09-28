import Link from "next/link";
import { siteConfig } from "@eclat/config";
import { getAllProducts, getCategories } from "@/lib/products";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `HTML Sitemap | ${siteConfig.name}`,
  description: "All main pages, collections, guides, and products.",
  alternates: { canonical: `${siteConfig.url}/site-map` },
};

export default async function HtmlSitemapPage() {
  const [products, categories] = await Promise.all([
    getAllProducts(),
    getCategories(),
  ]);

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-semibold text-[#2D2A2B]">Sitemap</h1>
      <p className="mt-2 text-sm text-[#6B5E62]">
        Human-readable map of {siteConfig.name}.
      </p>

      <h2 className="mt-10 text-lg font-semibold text-[#2D2A2B]">Main</h2>
      <ul className="mt-2 space-y-1 text-sm text-[#C45C7A]">
        {["/", "/products", "/about", "/shipping", "/returns", "/contact", "/privacy", "/terms", "/guides"].map(
          (p) => (
            <li key={p}>
              <Link href={p} className="underline">
                {p === "/" ? "Home" : p}
              </Link>
            </li>
          )
        )}
      </ul>

      <h2 className="mt-10 text-lg font-semibold text-[#2D2A2B]">Collections</h2>
      <ul className="mt-2 space-y-1 text-sm text-[#C45C7A]">
        {(categories as any[]).map((c) => (
          <li key={c.slug}>
            <Link href={`/collections/${c.slug}`} className="underline">
              {c.name}
            </Link>
          </li>
        ))}
      </ul>

      <h2 className="mt-10 text-lg font-semibold text-[#2D2A2B]">Guides</h2>
      <ul className="mt-2 space-y-1 text-sm text-[#C45C7A]">
        <li>
          <Link href="/guides/rhode-lip-peptide-pakistan" className="underline">
            Rhode Lip Peptide Pakistan
          </Link>
        </li>
        <li>
          <Link href="/guides/kiko-3d-hydra-pakistan" className="underline">
            Kiko 3D Hydra Pakistan
          </Link>
        </li>
        <li>
          <Link href="/guides/lip-sets-under-2000" className="underline">
            Lip sets under Rs 2000
          </Link>
        </li>
        <li>
          <Link href="/guides/everyday-glam-kit" className="underline">
            Everyday Glam Kit
          </Link>
        </li>
      </ul>

      <h2 className="mt-10 text-lg font-semibold text-[#2D2A2B]">
        Products ({products.length})
      </h2>
      <ul className="mt-2 columns-1 gap-4 text-sm text-[#C45C7A] sm:columns-2">
        {products.map((p) => (
          <li key={p.id} className="break-inside-avoid">
            <Link href={`/products/${p.slug}`} className="underline">
              {p.name}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
