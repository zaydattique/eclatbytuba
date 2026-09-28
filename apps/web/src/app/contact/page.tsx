import { siteConfig } from "@eclat/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Contact | ${siteConfig.name}`,
  description:
    "Contact Éclat by Tuba for orders, COD, shades, and delivery questions across Pakistan.",
  alternates: { canonical: `${siteConfig.url}/contact` },
};

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    email: "hello@eclatbytuba.com",
    areaServed: "PK",
  };

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="text-3xl font-semibold text-[#2D2A2B]">Contact us</h1>
      <p className="mt-4 text-sm leading-relaxed text-[#6B5E62]">
        Questions about shades, COD, or delivery? We respond during business hours
        (Pakistan time).
      </p>
      <ul className="mt-8 space-y-3 text-sm text-[#2D2A2B]">
        <li>
          <strong>Email:</strong>{" "}
          <a href="mailto:hello@eclatbytuba.com" className="text-[#C45C7A] underline">
            hello@eclatbytuba.com
          </a>
        </li>
        <li>
          <strong>Orders:</strong> include your order number (e.g. ORD-123456)
        </li>
        <li>
          <strong>Service area:</strong> All Pakistan · COD · Shipping Rs 250
        </li>
      </ul>
    </main>
  );
}
