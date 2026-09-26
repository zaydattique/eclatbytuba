import * as React from "react";
import { cn } from "../lib/utils";

interface ProductCardProps {
  name: string;
  price: number | string;
  compareAtPrice?: number | string | null;
  imageUrl?: string | null;
  href?: string;
  className?: string;
}

export function ProductCard({
  name,
  price,
  compareAtPrice,
  imageUrl,
  href = "#",
  className,
}: ProductCardProps) {
  return (
    <a href={href} className={cn("group block", className)}>
      <div className="aspect-[3/4] overflow-hidden bg-[#f5f3ef]">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-gray-400">
            No image
          </div>
        )}
      </div>
      <div className="mt-4 space-y-1">
        <h3 className="font-medium text-[#1a1a1a] group-hover:underline">{name}</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">PKR {Number(price).toLocaleString()}</span>
          {compareAtPrice && Number(compareAtPrice) > Number(price) && (
            <span className="text-sm text-gray-400 line-through">
              PKR {Number(compareAtPrice).toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </a>
  );
}
