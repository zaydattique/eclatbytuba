"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button, Input } from "@eclat/ui";
import { useCart } from "@/context/CartContext";
import { trackEvent } from "@/components/AnalyticsBeacon";

const PAYMENT_OPTIONS = [
  { value: "cod", label: "Cash on Delivery", hint: "Pay when you receive your order" },
  { value: "bank_transfer", label: "Bank Transfer", hint: "We'll send account details after order" },
  { value: "jazzcash", label: "JazzCash", hint: "Mobile wallet — instructions after order" },
  { value: "easypaisa", label: "EasyPaisa", hint: "Mobile wallet — instructions after order" },
  { value: "stripe", label: "Card (Stripe)", hint: "Pay securely with credit/debit card" },
] as const;

const SHIPPING_OPTIONS = [
  { value: "standard", label: "Standard (3–5 days)", cost: 0 },
  { value: "express", label: "Express (1–2 days)", cost: 250 },
] as const;

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [placed, setPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [form, setForm] = useState({
    email: "",
    fullName: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  useEffect(() => {
    if (items.length > 0) {
      trackEvent("begin_checkout", { itemCount: items.length, value: subtotal });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const shippingCost =
    SHIPPING_OPTIONS.find((s) => s.value === shippingMethod)?.cost ?? 0;
  const total = subtotal + shippingCost;

  if (items.length === 0 && !placed) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h1 className="text-3xl font-semibold text-[#2D2A2B]">Checkout</h1>
        <p className="mt-4 text-[#6B5E62]">Your cart is empty.</p>
        <Link href="/products" className="mt-8 inline-block">
          <Button>Continue Shopping</Button>
        </Link>
      </main>
    );
  }

  if (placed) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h1 className="text-3xl font-semibold text-[#2D2A2B]">Thank you</h1>
        <p className="mt-4 text-[#6B5E62]">
          Your order <strong className="text-[#2D2A2B]">{orderNumber}</strong> has been placed.
        </p>
        <p className="mt-2 text-sm text-[#6B5E62]">
          {paymentMethod === "cod"
            ? "We'll contact you shortly to confirm. Pay on delivery."
            : paymentMethod === "stripe"
              ? "Payment received (or mock). We'll process your order shortly."
              : "We'll send payment instructions shortly."}
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
          shippingMethod,
          shippingAddress: {
            fullName: form.fullName,
            line1: form.address,
            city: form.city,
            postalCode: form.postalCode,
            country: "PK",
            shippingMethod,
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

      if (paymentMethod === "stripe") {
        const payRes = await fetch("/api/payments/create-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: total,
            currency: "pkr",
            orderId: data.order.id,
          }),
        });
        const payData = await payRes.json();
        if (!payRes.ok) throw new Error(payData.error || "Payment failed");
      }

      trackEvent("purchase", {
        orderId: data.order.id,
        orderNumber: data.order.orderNumber,
        value: total,
        paymentMethod,
      });

      setOrderNumber(data.order.orderNumber);
      clearCart();
      setPlaced(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const radioClass =
    "flex cursor-pointer items-center gap-3 rounded-[16px] border border-[#F0D6E0] p-3 hover:bg-[#FFF0F5]";

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-3xl font-semibold text-[#2D2A2B]">Checkout</h1>

      <form onSubmit={handleSubmit} className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="space-y-6">
          <h2 className="text-lg font-medium text-[#2D2A2B]">Contact & Shipping (Pakistan)</h2>
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
            placeholder="Phone (03XX…)"
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
            <h3 className="mb-3 text-sm font-medium text-[#2D2A2B]">Shipping</h3>
            <div className="space-y-2">
              {SHIPPING_OPTIONS.map((opt) => (
                <label key={opt.value} className={radioClass}>
                  <input
                    type="radio"
                    name="shipping"
                    value={opt.value}
                    checked={shippingMethod === opt.value}
                    onChange={() => setShippingMethod(opt.value)}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#2D2A2B]">{opt.label}</p>
                    <p className="text-xs text-[#6B5E62]">
                      {opt.cost === 0 ? "Free" : `PKR ${opt.cost}`}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-medium text-[#2D2A2B]">Payment Method</h3>
            <div className="space-y-2">
              {PAYMENT_OPTIONS.map((opt) => (
                <label key={opt.value} className={radioClass}>
                  <input
                    type="radio"
                    name="payment"
                    value={opt.value}
                    checked={paymentMethod === opt.value}
                    onChange={() => setPaymentMethod(opt.value)}
                  />
                  <div>
                    <p className="text-sm font-medium text-[#2D2A2B]">{opt.label}</p>
                    <p className="text-xs text-[#6B5E62]">{opt.hint}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-medium text-[#2D2A2B]">Order Summary</h2>
          <div
            className="mt-6 space-y-4 rounded-[24px] border border-[#F0D6E0] bg-white p-6"
            style={{
              boxShadow:
                "0 4px 20px rgba(196, 92, 122, 0.08), 0 1px 3px rgba(196, 92, 122, 0.04)",
            }}
          >
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm text-[#2D2A2B]">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>PKR {(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
            <div className="space-y-2 border-t border-[#F0D6E0] pt-4 text-sm">
              <div className="flex justify-between text-[#6B5E62]">
                <span>Subtotal</span>
                <span>PKR {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[#6B5E62]">
                <span>Shipping</span>
                <span>{shippingCost === 0 ? "Free" : `PKR ${shippingCost}`}</span>
              </div>
              <div className="flex justify-between font-semibold text-[#2D2A2B]">
                <span>Total</span>
                <span>PKR {total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {error && <p className="mt-4 text-sm text-[#C45C5C]">{error}</p>}

          <Button type="submit" size="lg" className="mt-6 w-full" disabled={loading}>
            {loading ? "Placing Order..." : "Place Order"}
          </Button>
        </div>
      </form>
    </main>
  );
}
