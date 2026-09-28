import Link from "next/link";
import { siteConfig } from "@eclat/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rhode Lip Peptide Pakistan | Price, COD, Original Set | Éclat by Tuba",
  description:
    "Buy Rhode lip peptide deal in Pakistan with COD. Price, shipping Rs 250, and how to order the 4-piece imported set from Éclat by Tuba.",
  alternates: {
    canonical: `${siteConfig.url}/guides/rhode-lip-peptide-pakistan`,
  },
};

export default function RhodeGuidePage() {
  const faqs = [
    {
      q: "How much is Rhode lip peptide in Pakistan?",
      a: "Our current deal of 4 Rhode Lip Peptide (imported) is listed on the product page in PKR. Shipping is a flat Rs 250; COD is available nationwide.",
    },
    {
      q: "Is COD available?",
      a: "Yes. You can order with cash on delivery across Pakistan, or use bank transfer / mobile wallets when enabled at checkout.",
    },
    {
      q: "Is it original?",
      a: "We list the set as original imported with intake checks. Request packaging photos from support if you need them before buying.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav className="mb-6 text-xs text-[#6B5E62]">
        <Link href="/guides" className="hover:text-[#C45C7A]">
          Guides
        </Link>
        <span className="mx-1">/</span>
        <span>Rhode Lip Peptide Pakistan</span>
      </nav>
      <h1 className="text-3xl font-semibold text-[#2D2A2B]">
        Rhode Lip Peptide in Pakistan — price, COD & how to order
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-[#2D2A2B]">
        Rhode lip peptide is one of the most searched soft-gloss products in
        Pakistan. At {siteConfig.name} you can order our{" "}
        <Link
          href="/products/4-rhode-lip-peptide"
          className="font-medium text-[#C45C7A] underline"
        >
          Deal of 4 Rhode Lip Peptide
        </Link>{" "}
        with nationwide cash on delivery and flat shipping of Rs 250.
      </p>
      <h2 className="mt-10 text-xl font-semibold text-[#2D2A2B]">
        Who it is for
      </h2>
      <p className="mt-3 text-sm text-[#6B5E62]">
        Everyday hydration and soft shine — students, office wear, and gifting.
        Pair with a liner for definition or wear alone for a clean look.
      </p>
      <h2 className="mt-10 text-xl font-semibold text-[#2D2A2B]">
        How to order with COD
      </h2>
      <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-[#6B5E62]">
        <li>Open the product page and add to cart</li>
        <li>Checkout with your Pakistan address and phone</li>
        <li>Choose Cash on Delivery (or JazzCash / EasyPaisa if shown)</li>
        <li>Confirm the call if our team verifies the order</li>
      </ol>
      <h2 className="mt-10 text-xl font-semibold text-[#2D2A2B]">FAQ</h2>
      <div className="mt-4 space-y-4">
        {faqs.map((f) => (
          <div key={f.q} className="rounded-[16px] border border-[#F0D6E0] p-4">
            <h3 className="text-sm font-semibold text-[#2D2A2B]">{f.q}</h3>
            <p className="mt-2 text-sm text-[#6B5E62]">{f.a}</p>
          </div>
        ))}
      </div>
      <p className="mt-10 text-sm">
        <Link
          href="/products/4-rhode-lip-peptide"
          className="font-semibold text-[#C45C7A] underline"
        >
          Shop Rhode Lip Peptide →
        </Link>
      </p>
    </main>
  );
}
