"use client";

import { Button } from "@eclat/ui";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/lib/products";
import { useState } from "react";

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
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

  return (
    <Button size="lg" onClick={handleAdd} className="w-full sm:w-auto">
      {added ? "Added to Cart ✓" : "Add to Cart"}
    </Button>
  );
}
