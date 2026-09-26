"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Input } from "@eclat/ui";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [placed, setPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
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
          Your order <strong>{orderNumber}</strong> has been placed.
        </p>
        <p className="mt-2 text-sm text-gray-500">
          {paymentMethod === "cod"
            ? "We’ll contact you shortly to confirm. Pay on delivery."
            : "We’ll send payment instructions shortly."}
        </p>
        <Link href="/products" className="mt-8 inline-block">
          <Button>Continue Shopping</Button>
        </Link>
      </main>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          phone: form.phone,
          paymentMethod,
          shippingAddress: {
            fullName: form.fullName,
            line1: form.address,
            city: form.city,
            postalCode: form.postalCode,
            country: "PK",
          },
          items: items.map((i) => ({
            productId: i.productId,
            name: i.name,
            price: i.price,
            quantity: i.quantity,
            imageUrl: i.imageUrl,
          })),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to place order");

      setOrderNumber(data.order.orderNumber);
      clearCart();
      setPlaced(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
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

          <div>
            <h3 className="mb-3 text-sm font-medium">Payment Method</h3>
            <div className="space-y-2">
              <label className="flex cursor-pointer items-center gap-3 rounded-md border border-brand-border p-3 hover:bg-brand-muted">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />
                <div>
                  <p className="text-sm font-medium">Cash on Delivery</p>
                  <p className="text-xs text-gray-500">Pay when you receive your order</p>
                </div>
              </label>
              <label className="flex cursor-pointer items-center gap-3 rounded-md border border-brand-border p-3 hover:bg-brand-muted">
                <input
                  type="radio"
                  name="payment"
                  value="bank_transfer"
                  checked={paymentMethod === "bank_transfer"}
                  onChange={() => setPaymentMethod("bank_transfer")}
                />
                <div>
                  <p className="text-sm font-medium">Bank Transfer</p>
                  <p className="text-xs text-gray-500">We’ll send account details after order</p>
                </div>
              </label>
            </div>
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
                Shipping calculated after confirmation
              </p>
            </div>
          </div>

          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

          <Button type="submit" size="lg" className="mt-6 w-full" disabled={loading}>
            {loading ? "Placing Order..." : "Place Order"}
          </Button>
        </div>
      </form>
    </main>
  );
}
