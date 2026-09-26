"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Input } from "@eclat/ui";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [placed, setPlaced] = useState(false);
  const [form, setForm] = useState({
    email: "",
    fullName: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  if (items.length === 0 && !placed) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h1 className="font-serif text-3xl">Checkout</h1>
        <p className="mt-4 text-gray-500">Your cart is empty.</p>
        <Link href="/products" className="mt-8 inline-block">
          <Button>Continue Shopping</Button>
        </Link>
      </main>
    );
  }

  if (placed) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h1 className="font-serif text-3xl">Thank you</h1>
        <p className="mt-4 text-gray-600">
          Your order has been placed. We’ll contact you shortly to confirm.
        </p>
        <Link href="/products" className="mt-8 inline-block">
          <Button>Continue Shopping</Button>
        </Link>
      </main>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Order:", { form, items, subtotal });
    clearCart();
    setPlaced(true);
  };

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="font-serif text-3xl">Checkout</h1>

      <form onSubmit={handleSubmit} className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="space-y-6">
          <h2 className="text-lg font-medium">Contact & Shipping</h2>
          <Input
            placeholder="Email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <Input
            placeholder="Full Name"
            required
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          />
          <Input
            placeholder="Phone"
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <Input
            placeholder="Address"
            required
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="City"
              required
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
            />
            <Input
              placeholder="Postal Code"
              value={form.postalCode}
              onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
            />
          </div>
        </div>

        <div>
          <h2 className="text-lg font-medium">Order Summary</h2>
          <div className="mt-6 space-y-4 border border-brand-border bg-white p-6">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>PKR {(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
            <div className="border-t border-brand-border pt-4">
              <div className="flex justify-between font-medium">
                <span>Subtotal</span>
                <span>PKR {subtotal.toLocaleString()}</span>
              </div>
              <p className="mt-1 text-xs text-gray-400">
                Shipping & taxes calculated after confirmation
              </p>
            </div>
          </div>
          <Button type="submit" size="lg" className="mt-6 w-full">
            Place Order
          </Button>
          <p className="mt-3 text-center text-xs text-gray-400">
            Cash on delivery available. We’ll confirm your order by phone.
          </p>
        </div>
      </form>
    </main>
  );
}
