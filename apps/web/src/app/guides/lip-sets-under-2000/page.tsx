import Link from "next/link";
import { siteConfig } from "@eclat/config";
import { getAllProducts } from "@/lib/products";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lip Sets Under Rs 2000 Pakistan | COD | Éclat by Tuba",
  description:
    "Best lip sets and kits under Rs 2000 in Pakistan. COD available, flat shipping Rs 250. Soft-gloss deals at Éclat by Tuba.",
  alternates: { canonical: `${siteConfig.url}/guides/lip-sets-under-2000` },
};

export default async function LipSetsUnder2000Page() {
  const all = await getAllProducts();
  const under = all
    .filter((p) => Number(p.price) < 2000)
    .filter(
      (p) =>
        (p.category?.slug || "").includes("lip") ||
        (p.tags || []).some((t) => /lip/i.test(t)) ||
        /lip/i.test(p.slug)
    )
    .slice(0, 12);

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <nav className="mb-6 text-xs text-[#6B5E62]">
        <Link href="/guides" className="hover:text-[#C45C7A]">
          Guides
        </Link>
        <span className="mx-1">/</span>
        <span>Lip sets under Rs 2000</span>
      </nav>
      <h1 className="text-3xl font-semibold text-[#2D2A2B]">
        Lip sets under Rs 2000 in Pakistan
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-[#2D2A2B]">
        Looking for affordable lip kits with COD? These picks stay under{" "}
        <strong>Rs 2000</strong> before shipping. Flat shipping is Rs 250
        nationwide at {siteConfig.name}.
      </p>
      <ul className="mt-8 space-y-3">
        {under.map((p) => (
          <li
            key={p.id}
            className="flex items-center justify-between gap-4 rounded-[16px] border border-[#F0D6E0] px-4 py-3"
          >
            <Link
              href={`/products/${p.slug}`}
              className="text-sm font-medium text-[#C45C7A] hover:underline"
            >
              {p.name}
            </Link>
            <span className="shrink-0 text-sm text-[#2D2A2B]">
              Rs {Number(p.price).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-sm text-[#6B5E62]">
        Browse all{" "}
        <Link href="/collections/lip-sets" className="text-[#C45C7A] underline">
          lip sets
        </Link>{" "}
        and{" "}
        <Link href="/collections/lip-gloss" className="text-[#C45C7A] underline">
          lip gloss
        </Link>
        .
      </p>
    </main>
  );
}
