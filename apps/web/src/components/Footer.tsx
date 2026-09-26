import Link from "next/link";
import { siteConfig } from "@eclat/config";

export function Footer() {
  return (
    <footer className="border-t border-brand-border bg-white">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="font-serif text-lg">{siteConfig.name}</h3>
            <p className="mt-2 text-sm text-gray-500">
              Timeless elegance. Modern luxury.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium uppercase tracking-wider">Shop</h4>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li><Link href="/products" className="hover:text-brand-primary">All Products</Link></li>
              <li><Link href="/products?category=dresses" className="hover:text-brand-primary">Dresses</Link></li>
              <li><Link href="/products?category=outerwear" className="hover:text-brand-primary">Outerwear</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium uppercase tracking-wider">Contact</h4>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li>hello@eclatbytuba.com</li>
              <li>+92 300 0000000</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-brand-border pt-6 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
