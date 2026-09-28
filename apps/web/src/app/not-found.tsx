import Link from "next/link";
import { Button } from "@eclat/ui";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-lg px-6 py-24 text-center">
      <p className="text-sm uppercase tracking-wider text-[#C45C7A]">404</p>
      <h1 className="mt-2 text-3xl font-semibold text-[#2D2A2B]">
        Page not found
      </h1>
      <p className="mt-4 text-sm text-[#6B5E62]">
        That link may be outdated. Try the shop or a popular collection.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/products">
          <Button>Shop all</Button>
        </Link>
        <Link href="/collections/lip-sets">
          <Button variant="outline">Lip sets</Button>
        </Link>
        <Link href="/guides">
          <Button variant="outline">Guides</Button>
        </Link>
      </div>
    </main>
  );
}
