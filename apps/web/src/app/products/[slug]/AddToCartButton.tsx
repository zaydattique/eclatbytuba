"use client";

import { Button } from "@eclat/ui";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/lib/products";
import { useState } from "react";

export function AddToCartButton({
  product,
  sticky,
}: {
  product: Product;
  sticky?: boolean;
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const outOfStock = (product.inventory ?? 0) <= 0;

  const handleAdd = () => {
    if (outOfStock) return;
    addItem({
      productId: product.id,
      name: product.name,
      price: Number(product.price),
      imageUrl: product.images[0] || null,
      slug: product.slug,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const btn = (
    <Button
      size="lg"
      onClick={handleAdd}
      disabled={outOfStock}
      className={sticky ? "w-full" : "w-full sm:w-auto"}
    >
      {outOfStock ? "Out of stock" : added ? "Added to Cart ✓" : "Add to Cart"}
    </Button>
  );

  if (!sticky) return btn;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#F0D6E0] bg-white/95 p-3 backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-6xl items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-[#2D2A2B]">{product.name}</p>
          <p className="text-sm text-[#C45C7A]">
            PKR {Number(product.price).toLocaleString()}
          </p>
        </div>
        {btn}
      </div>
    </div>
  );
}
