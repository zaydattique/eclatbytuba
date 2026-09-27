import Link from "next/link";
import { getAllProductImages } from "@/lib/data";

export const metadata = { title: "Media" };

export default async function MediaPage() {
  const images = await getAllProductImages();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#2D2A2B]">Media library</h1>
        <p className="mt-1 text-sm text-[#6B5E62]">
          Images attached to products ({images.length}). Upload via product create/edit.
        </p>
      </div>

      {images.length === 0 ? (
        <div
          className="rounded-[24px] border border-dashed border-[#F0D6E0] bg-white p-12 text-center text-sm text-[#6B5E62]"
          style={{
            boxShadow:
              "0 4px 20px rgba(196, 92, 122, 0.08), 0 1px 3px rgba(196, 92, 122, 0.04)",
          }}
        >
          No product images yet.{" "}
          <Link href="/products/new" className="text-[#C45C7A] hover:underline">
            Add a product
          </Link>{" "}
          and upload images.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {images.map((item) => (
            <div
              key={`${item.productId}-${item.url}`}
              className="overflow-hidden rounded-[20px] border border-[#F0D6E0] bg-white"
              style={{
                boxShadow:
                  "0 4px 20px rgba(196, 92, 122, 0.08), 0 1px 3px rgba(196, 92, 122, 0.04)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.url}
                alt={item.productName}
                className="aspect-square w-full object-cover"
              />
              <div className="p-2">
                <Link
                  href={`/products/${item.productId}`}
                  className="line-clamp-1 text-xs font-medium text-[#2D2A2B] hover:text-[#C45C7A]"
                >
                  {item.productName}
                </Link>
                <p className="mt-0.5 truncate text-[10px] text-[#6B5E62]">{item.url}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
