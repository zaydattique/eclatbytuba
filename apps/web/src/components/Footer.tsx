import Link from "next/link";
import { siteConfig } from "@eclat/config";

export function Footer() {
  return (
    <footer className="border-t border-[#F0D6E0] bg-white">
      <div className="border-b border-[#F0D6E0] bg-[#FFF0F5] px-6 py-3 text-center text-sm text-[#2D2A2B]">
        <span className="font-medium">COD · Shipping Rs 250 · All Pakistan</span>
      </div>
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-semibold text-[#2D2A2B]">{siteConfig.name}</h3>
            <p className="mt-2 text-sm text-[#6B5E62]">
              Soft gloss beauty — treat yourself. Nationwide cash on delivery.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium uppercase tracking-wider text-[#2D2A2B]">
              Shop
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-[#6B5E62]">
              <li>
                <Link href="/products" className="hover:text-[#C45C7A]">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/products?category=lip-gloss" className="hover:text-[#C45C7A]">
                  Lip Gloss
                </Link>
              </li>
              <li>
                <Link href="/products?category=lipstick" className="hover:text-[#C45C7A]">
                  Lips
                </Link>
              </li>
              <li>
                <Link
                  href="/products/kiko-3d-hydra-lipgloss"
                  className="hover:text-[#C45C7A]"
                >
                  Kiko 3D Hydra
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium uppercase tracking-wider text-[#2D2A2B]">
              Contact
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-[#6B5E62]">
              <li>hello@eclatbytuba.com</li>
              <li>+92 300 0000000</li>
              <li>Shipping Rs 250 · COD</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-[#F0D6E0] pt-6 text-center text-xs text-[#6B5E62]">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
