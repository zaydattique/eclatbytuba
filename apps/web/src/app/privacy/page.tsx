import { siteConfig } from "@eclat/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Privacy Policy | ${siteConfig.name}`,
  description: `How ${siteConfig.name} handles order and contact data in Pakistan.`,
  alternates: { canonical: `${siteConfig.url}/privacy` },
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-semibold text-[#2D2A2B]">Privacy policy</h1>
      <p className="mt-4 text-sm leading-relaxed text-[#6B5E62]">
        We collect information you provide at checkout (name, phone, address,
        email) to fulfil orders and contact you about delivery. Payment wallet
        credentials are never stored by us when you pay COD.
      </p>
      <h2 className="mt-8 text-lg font-semibold text-[#2D2A2B]">What we use data for</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[#6B5E62]">
        <li>Order processing and shipping</li>
        <li>Order confirmation and status messages</li>
        <li>Fraud prevention and failed-delivery reduction</li>
        <li>Analytics in aggregate (if pixels are enabled)</li>
      </ul>
      <h2 className="mt-8 text-lg font-semibold text-[#2D2A2B]">Contact</h2>
      <p className="mt-3 text-sm text-[#6B5E62]">
        Questions:{" "}
        <a href="mailto:hello@eclatbytuba.com" className="text-[#C45C7A] underline">
          hello@eclatbytuba.com
        </a>
      </p>
    </main>
  );
}
