import Link from "next/link";
import { siteConfig } from "@eclat/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Shipping & COD Pakistan | Rs 250 Flat | ${siteConfig.name}`,
  description:
    "Nationwide Pakistan delivery with cash on delivery. Flat shipping Rs 250 standard. Express options at checkout. Éclat by Tuba.",
  alternates: { canonical: `${siteConfig.url}/shipping` },
};

export default function ShippingPage() {
  const faqs = [
    {
      q: "How much is shipping in Pakistan?",
      a: "Standard shipping is a flat Rs 250 nationwide. Express (faster cities) may be offered at Rs 350 at checkout.",
    },
    {
      q: "Do you offer cash on delivery (COD)?",
      a: "Yes. COD is available across Pakistan on eligible orders. You may also pay by bank transfer, JazzCash, or EasyPaisa when enabled.",
    },
    {
      q: "How long does delivery take?",
      a: "Standard is typically 3–5 working days depending on your city. Remote areas may take longer.",
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
      <h1 className="text-3xl font-semibold text-[#2D2A2B]">
        Shipping & COD in Pakistan
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-[#2D2A2B]">
        {siteConfig.name} delivers nationwide. Standard shipping is{" "}
        <strong>Rs 250</strong>. Cash on delivery is available so you can pay when
        your order arrives.
      </p>
      <h2 className="mt-10 text-xl font-semibold text-[#2D2A2B]">Rates</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[#6B5E62]">
        <li>Standard (3–5 days): Rs 250 · all Pakistan</li>
        <li>Express (1–2 days, select cities): Rs 350 when shown at checkout</li>
      </ul>
      <h2 className="mt-10 text-xl font-semibold text-[#2D2A2B]">Payment methods</h2>
      <p className="mt-3 text-sm text-[#6B5E62]">
        COD, bank transfer, JazzCash, and EasyPaisa can be enabled from our store
        settings. See{" "}
        <Link href="/products" className="text-[#C45C7A] underline">
          shop
        </Link>{" "}
        to order.
      </p>
      <h2 className="mt-10 text-xl font-semibold text-[#2D2A2B]">FAQ</h2>
      <div className="mt-4 space-y-4">
        {faqs.map((f) => (
          <div key={f.q} className="rounded-[16px] border border-[#F0D6E0] p-4">
            <h3 className="text-sm font-semibold text-[#2D2A2B]">{f.q}</h3>
            <p className="mt-2 text-sm text-[#6B5E62]">{f.a}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
