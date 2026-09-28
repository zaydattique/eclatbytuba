import Link from "next/link";
import { siteConfig } from "@eclat/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Éclat Everyday Glam Kit Pakistan | What’s Inside | COD",
  description:
    "Éclat Everyday Glam Kit in Pakistan — complete face kit, COD, shipping Rs 250. What’s inside and who it’s for.",
  alternates: { canonical: `${siteConfig.url}/guides/everyday-glam-kit` },
};

export default function GlamKitGuidePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <nav className="mb-6 text-xs text-[#6B5E62]">
        <Link href="/guides" className="hover:text-[#C45C7A]">
          Guides
        </Link>
        <span className="mx-1">/</span>
        <span>Everyday Glam Kit</span>
      </nav>
      <h1 className="text-3xl font-semibold text-[#2D2A2B]">
        Éclat Everyday Glam Kit — Pakistan guide
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-[#2D2A2B]">
        The Everyday Glam Kit is built as a one-deal makeup bag for soft everyday
        looks. Order with COD and Rs 250 shipping from{" "}
        <Link
          href="/products/eclat-everyday-glam-kit"
          className="text-[#C45C7A] underline"
        >
          the product page
        </Link>
        .
      </p>
      <h2 className="mt-10 text-xl font-semibold text-[#2D2A2B]">Who it’s for</h2>
      <p className="mt-3 text-sm text-[#6B5E62]">
        Beginners and anyone who wants fewer separate products — travel, uni, or
        office. Pair with a lip set from our{" "}
        <Link href="/collections/lip-sets" className="text-[#C45C7A] underline">
          lip sets collection
        </Link>{" "}
        for more colour options.
      </p>
      <p className="mt-10 text-sm">
        <Link
          href="/products/eclat-everyday-glam-kit"
          className="font-semibold text-[#C45C7A] underline"
        >
          Shop Everyday Glam Kit →
        </Link>
      </p>
    </main>
  );
}
