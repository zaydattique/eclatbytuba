"use client";

import Link from "next/link";
import { Button } from "@eclat/ui";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h1 className="font-serif text-3xl">Your Cart</h1>
        <p className="mt-4 text-gray-500">Your cart is empty.</p>
        <Link href="/products" className="mt-8 inline-block">
          <Button>Continue Shopping</Button>
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="font-serif text-3xl">Your Cart</h1>
      <p className="mt-1 text-sm text-gray-500">{totalItems} item{totalItems !== 1 ? "s" : ""}</p>

      <div className="mt-10 space-y-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex gap-6 border-b border-brand-border pb-6"
          >
            <div className="h-28 w-24 flex-shrink-0 bg-brand-muted">
              {item.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover" />
              ) : null}
            </div>
            <div className="flex flex-1 flex-col justify-between">
              <div>
                <Link href={`/products/${item.slug}`} className="font-medium hover:underline">
                  {item.name}
                </Link>
                <p className="mt-1 text-sm text-gray-500">
                  PKR {item.price.toLocaleString()}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-brand-border">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-3 py-1 text-sm hover:bg-brand-muted"
                  >
                    −
                  </button>
                  <span className="w-8 text-center text-sm">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-3 py-1 text-sm hover:bg-brand-muted"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-sm text-gray-400 hover:text-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
            <div className="text-right font-medium">
              PKR {(item.price * item.quantity).toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-col items-end gap-4">
        <div className="text-right">
          <p className="text-sm text-gray-500">Subtotal</p>
          <p className="text-2xl font-medium">PKR {subtotal.toLocaleString()}</p>
          <p className="mt-1 text-xs text-gray-400">Shipping calculated at checkout</p>
        </div>
        <Link href="/checkout">
          <Button size="lg">Proceed to Checkout</Button>
        </Link>
      </div>
    </main>
  );
}
