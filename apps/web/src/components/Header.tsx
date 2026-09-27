"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { siteConfig } from "@eclat/config";

export function Header() {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-[#F0D6E0] bg-[#FFF0F5]/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <nav className="hidden items-center gap-8 text-sm md:flex">
          <Link href="/products" className="text-[#2D2A2B] transition-colors hover:text-[#C45C7A]">
            Shop
          </Link>
          <Link
            href="/products?category=lipstick"
            className="text-[#2D2A2B] transition-colors hover:text-[#C45C7A]"
          >
            Lips
          </Link>
          <Link
            href="/products?category=cosmetic-kits"
            className="text-[#2D2A2B] transition-colors hover:text-[#C45C7A]"
          >
            Kits
          </Link>
        </nav>

        <Link href="/" className="text-xl font-semibold tracking-wide text-[#2D2A2B]">
          {siteConfig.name}
        </Link>

        <div className="flex items-center gap-6 text-sm">
          <Link href="/cart" className="relative text-[#2D2A2B] transition-colors hover:text-[#C45C7A]">
            Cart
            {totalItems > 0 && (
              <span className="absolute -right-3 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#C45C7A] text-[10px] text-white">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
