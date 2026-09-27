"use client";

import Link from "next/link";
import { Button } from "@eclat/ui";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h1 className="text-3xl font-semibold text-[#2D2A2B]">Your Cart</h1>
        <p className="mt-4 text-[#6B5E62]">Your cart is empty.</p>
        <Link href="/products" className="mt-8 inline-block">
          <Button>Continue Shopping</Button>
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-semibold text-[#2D2A2B]">Your Cart</h1>
      <p className="mt-1 text-sm text-[#6B5E62]">
        {totalItems} item{totalItems !== 1 ? "s" : ""}
      </p>

      <div className="mt-10 space-y-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex gap-6 border-b border-[#F0D6E0] pb-6"
          >
            <div className="h-28 w-24 flex-shrink-0 overflow-hidden rounded-[12px] bg-[#FFE8F0]">
              {item.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover" />
              ) : null}
            </div>
            <div className="flex flex-1 flex-col justify-between">
              <div>
                <Link
                  href={`/products/${item.slug}`}
                  className="font-medium text-[#2D2A2B] hover:text-[#C45C7A]"
                >
                  {item.name}
                </Link>
                <p className="mt-1 text-sm text-[#6B5E62]">
                  PKR {item.price.toLocaleString()}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center overflow-hidden rounded-[12px] border border-[#F0D6E0]">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-3 py-1 text-sm text-[#2D2A2B] hover:bg-[#FFF0F5]"
                  >
                    −
                  </button>
                  <span className="w-8 text-center text-sm">{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-3 py-1 text-sm text-[#2D2A2B] hover:bg-[#FFF0F5]"
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="text-sm text-[#6B5E62] hover:text-[#C45C5C]"
                >
                  Remove
                </button>
              </div>
            </div>
            <div className="text-right font-medium text-[#2D2A2B]">
              PKR {(item.price * item.quantity).toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-col items-end gap-4">
        <div className="text-right">
          <p className="text-sm text-[#6B5E62]">Subtotal</p>
          <p className="text-2xl font-semibold text-[#2D2A2B]">
            PKR {subtotal.toLocaleString()}
          </p>
          <p className="mt-1 text-xs text-[#6B5E62]">Shipping calculated at checkout</p>
        </div>
        <Link href="/checkout">
          <Button size="lg">Proceed to Checkout</Button>
        </Link>
      </div>
    </main>
  );
}
