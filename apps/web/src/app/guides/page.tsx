import Link from "next/link";
import { siteConfig } from "@eclat/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Beauty Guides Pakistan | COD Shopping Tips | ${siteConfig.name}`,
  description:
    "Guides for Rhode lip peptide, Kiko 3D Hydra, lip sets under Rs 2000, and COD shopping in Pakistan.",
  alternates: { canonical: `${siteConfig.url}/guides` },
};

const GUIDES = [
  {
    href: "/guides/rhode-lip-peptide-pakistan",
    title: "Rhode Lip Peptide in Pakistan",
    blurb: "Price, COD, and how to order the 4-piece peptide deal.",
  },
  {
    href: "/guides/kiko-3d-hydra-pakistan",
    title: "Kiko 3D Hydra Lipgloss Pakistan",
    blurb: "Six shades, Rs 1499, nationwide COD.",
  },
  {
    href: "/guides/lip-sets-under-2000",
    title: "Lip sets under Rs 2000",
    blurb: "Budget soft-gloss sets with COD and Rs 250 shipping.",
  },
  {
    href: "/guides/everyday-glam-kit",
    title: "Everyday Glam Kit",
    blurb: "What’s inside the Éclat kit and who it’s for.",
  },
];

export default function GuidesIndexPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-semibold text-[#2D2A2B]">
        Beauty guides for Pakistan
      </h1>
      <p className="mt-3 text-sm text-[#6B5E62]">
        Answer-first guides for popular searches — COD, prices in PKR, and shipping
        Rs 250.
      </p>
      <ul className="mt-10 space-y-4">
        {GUIDES.map((g) => (
          <li
            key={g.href}
            className="rounded-[16px] border border-[#F0D6E0] bg-white p-4"
          >
            <Link href={g.href} className="text-base font-semibold text-[#C45C7A]">
              {g.title}
            </Link>
            <p className="mt-1 text-sm text-[#6B5E62]">{g.blurb}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
