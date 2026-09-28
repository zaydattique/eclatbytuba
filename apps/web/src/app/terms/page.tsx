import { siteConfig } from "@eclat/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Terms of Service | ${siteConfig.name}`,
  description: `Terms for ordering from ${siteConfig.name} in Pakistan.`,
  alternates: { canonical: `${siteConfig.url}/terms` },
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-semibold text-[#2D2A2B]">Terms of service</h1>
      <p className="mt-4 text-sm leading-relaxed text-[#6B5E62]">
        By placing an order you agree to provide accurate contact and delivery
        details. Prices are in PKR. Shipping rates and COD availability are shown
        at checkout.
      </p>
      <h2 className="mt-8 text-lg font-semibold text-[#2D2A2B]">Orders</h2>
      <p className="mt-3 text-sm text-[#6B5E62]">
        We may call or message to confirm COD orders. Refusal on delivery without
        a valid reason may affect future COD eligibility.
      </p>
      <h2 className="mt-8 text-lg font-semibold text-[#2D2A2B]">Returns</h2>
      <p className="mt-3 text-sm text-[#6B5E62]">
        See our Returns page for the 7-day unused-item policy and hygiene limits
        on opened cosmetics.
      </p>
    </main>
  );
}
