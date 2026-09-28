import Link from "next/link";
import { siteConfig } from "@eclat/config";

export function Footer() {
  return (
    <footer className="border-t border-[#F0D6E0] bg-white">
      <div className="border-b border-[#F0D6E0] bg-[#FFF0F5] px-6 py-3 text-center text-sm text-[#2D2A2B]">
        <span className="font-medium">COD · Shipping Rs 250 · All Pakistan</span>
      </div>
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold text-[#2D2A2B]">{siteConfig.name}</h3>
            <p className="mt-2 text-sm text-[#6B5E62]">
              Soft gloss beauty for Pakistan — treat yourself. Nationwide cash on
              delivery.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium uppercase tracking-wider text-[#2D2A2B]">
              Shop
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-[#6B5E62]">
              <li>
                <Link href="/products" className="hover:text-[#C45C7A]">
                  All products
                </Link>
              </li>
              <li>
                <Link href="/collections/lip-gloss" className="hover:text-[#C45C7A]">
                  Lip gloss
                </Link>
              </li>
              <li>
                <Link href="/collections/lip-sets" className="hover:text-[#C45C7A]">
                  Lip sets
                </Link>
              </li>
              <li>
                <Link href="/collections/cosmetic-kits" className="hover:text-[#C45C7A]">
                  Kits
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
              Guides
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-[#6B5E62]">
              <li>
                <Link href="/guides" className="hover:text-[#C45C7A]">
                  All guides
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/rhode-lip-peptide-pakistan"
                  className="hover:text-[#C45C7A]"
                >
                  Rhode Pakistan
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/kiko-3d-hydra-pakistan"
                  className="hover:text-[#C45C7A]"
                >
                  Kiko guide
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/lip-sets-under-2000"
                  className="hover:text-[#C45C7A]"
                >
                  Under Rs 2000
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium uppercase tracking-wider text-[#2D2A2B]">
              Help
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-[#6B5E62]">
              <li>
                <Link href="/about" className="hover:text-[#C45C7A]">
                  About
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-[#C45C7A]">
                  Shipping & COD
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-[#C45C7A]">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#C45C7A]">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#C45C7A]">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#C45C7A]">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/site-map" className="hover:text-[#C45C7A]">
                  Sitemap
                </Link>
              </li>
              <li>hello@eclatbytuba.com</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-[#F0D6E0] pt-6 text-center text-xs text-[#6B5E62]">
          © {new Date().getFullYear()} {siteConfig.name}. COD · Rs 250 shipping ·
          All Pakistan.
        </div>
      </div>
    </footer>
  );
}
