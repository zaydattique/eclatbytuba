import { Button } from "@eclat/ui";
import { siteConfig } from "@eclat/config";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative flex min-h-[85vh] flex-col items-center justify-center px-6 text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-brand-secondary">
          New Collection
        </p>
        <h1 className="font-serif text-5xl font-medium tracking-tight md:text-7xl">
          {siteConfig.name}
        </h1>
        <p className="mt-6 max-w-md text-lg text-gray-600">
          Timeless elegance. Modern luxury. Crafted for the woman who knows her worth.
        </p>
        <div className="mt-10 flex gap-4">
          <Button size="lg">Shop Now</Button>
          <Button variant="outline" size="lg">
            Explore Collection
          </Button>
        </div>
      </section>

      {/* Featured placeholder */}
      <section className="border-t border-brand-border px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center font-serif text-3xl">Featured Pieces</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-[3/4] bg-brand-muted transition-opacity group-hover:opacity-90" />
                <h3 className="mt-4 font-medium">Product Name {i}</h3>
                <p className="text-sm text-gray-500">PKR 12,500</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
