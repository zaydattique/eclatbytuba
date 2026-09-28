import Link from "next/link";
import { siteConfig } from "@eclat/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `About ${siteConfig.name} | Soft Gloss Beauty Pakistan`,
  description:
    "Éclat by Tuba is a Pakistan soft-gloss beauty shop — lip sets, gloss, kits. Nationwide COD, shipping Rs 250. Real people, verified reviews.",
  alternates: { canonical: `${siteConfig.url}/about` },
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: `About ${siteConfig.name}`,
    url: `${siteConfig.url}/about`,
    mainEntity: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      description: siteConfig.description,
      areaServed: "PK",
    },
  };

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="text-3xl font-semibold text-[#2D2A2B]">
        About {siteConfig.name}
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-[#6B5E62]">
        {siteConfig.name} is a soft-gloss beauty store built for Pakistan.
        We focus on lips, kits, and everyday glam — clear PKR pricing, cash on
        delivery nationwide, and flat shipping of Rs 250.
      </p>
      <h2 className="mt-10 text-xl font-semibold text-[#2D2A2B]">What we stand for</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[#6B5E62]">
        <li>Honest product pages with price, COD, and shipping upfront</li>
        <li>Verified buyer reviews only (linked to real orders)</li>
        <li>Mobile-first shopping for GenZ and young professionals</li>
        <li>Support in English; city delivery across Pakistan</li>
      </ul>
      <h2 className="mt-10 text-xl font-semibold text-[#2D2A2B]">Contact</h2>
      <p className="mt-3 text-sm text-[#6B5E62]">
        Email{" "}
        <a href="mailto:hello@eclatbytuba.com" className="text-[#C45C7A] underline">
          hello@eclatbytuba.com
        </a>
        . See also{" "}
        <Link href="/contact" className="text-[#C45C7A] underline">
          contact
        </Link>
        ,{" "}
        <Link href="/shipping" className="text-[#C45C7A] underline">
          shipping & COD
        </Link>
        , and{" "}
        <Link href="/returns" className="text-[#C45C7A] underline">
          returns
        </Link>
        .
      </p>
    </main>
  );
}
