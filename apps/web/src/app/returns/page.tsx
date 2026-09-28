import Link from "next/link";
import { siteConfig } from "@eclat/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Returns Policy | 7 Days | ${siteConfig.name}`,
  description:
    "Return unused items within 7 days in original condition. Hygiene limits on opened cosmetics. Contact Éclat by Tuba support.",
  alternates: { canonical: `${siteConfig.url}/returns` },
};

export default function ReturnsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-semibold text-[#2D2A2B]">Returns policy</h1>
      <p className="mt-4 text-sm leading-relaxed text-[#2D2A2B]">
        You may return <strong>unused</strong> items in original packaging within{" "}
        <strong>7 days</strong> of delivery.
      </p>
      <h2 className="mt-10 text-xl font-semibold text-[#2D2A2B]">Conditions</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[#6B5E62]">
        <li>Product must be unused and resellable</li>
        <li>Include original outer packaging when possible</li>
        <li>Opened cosmetics may be refused for hygiene reasons</li>
        <li>Damaged-in-transit orders: contact us with photos within 48 hours</li>
      </ul>
      <h2 className="mt-10 text-xl font-semibold text-[#2D2A2B]">How to start a return</h2>
      <p className="mt-3 text-sm text-[#6B5E62]">
        Email{" "}
        <a href="mailto:hello@eclatbytuba.com" className="text-[#C45C7A] underline">
          hello@eclatbytuba.com
        </a>{" "}
        with your order number and reason. We will confirm next steps. See also{" "}
        <Link href="/shipping" className="text-[#C45C7A] underline">
          shipping & COD
        </Link>
        .
      </p>
    </main>
  );
}
