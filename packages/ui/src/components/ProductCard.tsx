import * as React from "react";
import { cn } from "../lib/utils";

interface ProductCardProps {
  name: string;
  price: number | string;
  compareAtPrice?: number | string | null;
  imageUrl?: string | null;
  href?: string;
  inventory?: number;
  rating?: number;
  reviewCount?: number;
  className?: string;
}

export function ProductCard({
  name,
  price,
  compareAtPrice,
  imageUrl,
  href = "#",
  inventory,
  rating = 0,
  reviewCount = 0,
  className,
}: ProductCardProps) {
  const priceN = Number(price);
  const compareN = compareAtPrice != null ? Number(compareAtPrice) : null;
  const hasDiscount = compareN != null && compareN > priceN;
  const discountPct = hasDiscount
    ? Math.round(((compareN! - priceN) / compareN!) * 100)
    : 0;
  const lowStock = inventory != null && inventory > 0 && inventory <= 10;

  return (
    <a href={href} className={cn("group block", className)}>
      <div
        className="relative aspect-[3/4] overflow-hidden rounded-[24px] bg-[#FFE8F0]"
        style={{
          boxShadow:
            "0 4px 20px rgba(196, 92, 122, 0.08), 0 1px 3px rgba(196, 92, 122, 0.04)",
        }}
      >
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-[#6B5E62]">
            No image
          </div>
        )}
        {hasDiscount && (
          <span className="absolute left-3 top-3 rounded-full bg-[#C45C7A] px-2.5 py-0.5 text-xs font-medium text-white">
            -{discountPct}%
          </span>
        )}
        {lowStock && (
          <span className="absolute bottom-3 left-3 rounded-full bg-[#C49A3C]/90 px-2.5 py-0.5 text-xs font-medium text-white">
            Only a few left
          </span>
        )}
      </div>
      <div className="mt-3 space-y-1 px-0.5">
        <h3 className="font-medium text-[#2D2A2B] group-hover:text-[#C45C7A]">{name}</h3>
        {(rating > 0 || reviewCount > 0) && (
          <div className="flex items-center gap-1 text-xs text-[#6B5E62]">
            <span className="text-[#F5A623]">★</span>
            <span>{rating > 0 ? rating.toFixed(1) : "—"}</span>
            {reviewCount > 0 && <span>({reviewCount})</span>}
          </div>
        )}
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-[#2D2A2B]">
            PKR {priceN.toLocaleString()}
          </span>
          {hasDiscount && (
            <span className="text-sm text-[#6B5E62] line-through">
              PKR {compareN!.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </a>
  );
}
