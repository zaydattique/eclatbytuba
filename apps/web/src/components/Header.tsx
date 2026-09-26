"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { siteConfig } from "@eclat/config";

export function Header() {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-brand-border bg-brand-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <nav className="hidden items-center gap-8 text-sm md:flex">
          <Link href="/products" className="hover:text-brand-secondary transition-colors">
            Shop
          </Link>
          <Link href="/products?category=dresses" className="hover:text-brand-secondary transition-colors">
            Dresses
          </Link>
          <Link href="/products?category=outerwear" className="hover:text-brand-secondary transition-colors">
            Outerwear
          </Link>
        </nav>

        <Link href="/" className="font-serif text-xl tracking-wide">
          {siteConfig.name}
        </Link>

        <div className="flex items-center gap-6 text-sm">
          <Link href="/cart" className="relative hover:text-brand-secondary transition-colors">
            Cart
            {totalItems > 0 && (
              <span className="absolute -right-3 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-brand-primary text-[10px] text-white">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
