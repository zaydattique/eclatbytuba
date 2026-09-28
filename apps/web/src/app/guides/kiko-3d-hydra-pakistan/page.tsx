import Link from "next/link";
import { siteConfig } from "@eclat/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kiko 3D Hydra Lipgloss Pakistan | 6 Shades | Rs 1499 | COD",
  description:
    "Kiko Milano 3D Hydra Lipgloss in Pakistan at Rs 1499. Six shades, non-sticky shine, nationwide COD, shipping Rs 250.",
  alternates: {
    canonical: `${siteConfig.url}/guides/kiko-3d-hydra-pakistan`,
  },
};

const SHADES = [
  "01 Clear",
  "05 Pearly Pink",
  "11 Golden Red",
  "12 Pearly Amaryllis Red",
  "17 Pearly Mauve",
  "21 Brun Rose",
];

export default function KikoGuidePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Kiko 3D Hydra Lipgloss Pakistan",
    description:
      "Guide to buying Kiko 3D Hydra Lipgloss in Pakistan with COD and shade list.",
    author: { "@type": "Organization", name: siteConfig.name },
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
        <span>Kiko 3D Hydra Pakistan</span>
      </nav>
      <h1 className="text-3xl font-semibold text-[#2D2A2B]">
        Kiko 3D Hydra Lipgloss in Pakistan — 6 shades, Rs 1499, COD
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-[#2D2A2B]">
        Kiko 3D Hydra is a hydrating, non-sticky gloss with glassy shine.{" "}
        {siteConfig.name} lists it at <strong>Rs 1499</strong> with nationwide
        COD and flat shipping Rs 250.{" "}
        <Link
          href="/products/kiko-3d-hydra-lipgloss"
          className="text-[#C45C7A] underline"
        >
          View product
        </Link>
        .
      </p>
      <h2 className="mt-10 text-xl font-semibold text-[#2D2A2B]">Shades we stock</h2>
      <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {SHADES.map((s) => (
          <li
            key={s}
            className="rounded-[12px] border border-[#F0D6E0] px-3 py-2 text-sm text-[#6B5E62]"
          >
            {s}
          </li>
        ))}
      </ul>
      <h2 className="mt-10 text-xl font-semibold text-[#2D2A2B]">
        Why Pakistan shoppers search for it
      </h2>
      <p className="mt-3 text-sm text-[#6B5E62]">
        Comfortable wear in heat, buildable shine, and shade range from clear
        everyday to deeper reds and mauves. Pair with a nude liner for longer
        definition.
      </p>
      <p className="mt-10 text-sm">
        <Link
          href="/products/kiko-3d-hydra-lipgloss"
          className="font-semibold text-[#C45C7A] underline"
        >
          Shop Kiko 3D Hydra →
        </Link>
      </p>
    </main>
  );
}
