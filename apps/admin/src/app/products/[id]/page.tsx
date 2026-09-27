"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Button, Input } from "@eclat/ui";
import { ImageUpload } from "@/components/ImageUpload";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [form, setForm] = useState({
    name: "",
    slug: "",
    price: "",
    compareAtPrice: "",
    inventory: "0",
    description: "",
    isActive: true,
    isFeatured: false,
  });

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    (async () => {
      try {
        const base = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
        const res = await fetch(`${base}/api/products?admin=true`);
        const data = await res.json();
        const product = (data.products || []).find((p: any) => p.id === id);
        if (!product) {
          if (!cancelled) setError("Product not found");
          return;
        }
        if (cancelled) return;
        setForm({
          name: product.name || "",
          slug: product.slug || "",
          price: String(product.price ?? ""),
          compareAtPrice:
            product.compareAtPrice != null ? String(product.compareAtPrice) : "",
          inventory: String(product.inventory ?? 0),
          description: product.description || "",
          isActive: product.isActive ?? true,
          isFeatured: product.isFeatured ?? false,
        });
        setImages(product.images || []);
      } catch (e: any) {
        if (!cancelled) setError(e.message || "Failed to load");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const base = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
      const res = await fetch(`${base}/api/products`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          name: form.name,
          slug: form.slug,
          price: form.price,
          compareAtPrice: form.compareAtPrice || null,
          inventory: form.inventory,
          description: form.description,
          isActive: form.isActive,
          isFeatured: form.isFeatured,
          images,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update");
      router.push("/products");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="text-sm text-[#6B5E62]">Loading product…</p>;
  }

  return (
    <div>
      <div className="mb-8">
        <Link href="/products" className="text-sm text-[#6B5E62] hover:text-[#C45C7A]">
          ← Back to products
        </Link>
        <h1 className="mt-2 text-2xl font-semibold text-[#2D2A2B]">Edit Product</h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div
          className="space-y-4 rounded-[24px] border border-[#F0D6E0] bg-white p-6"
          style={{
            boxShadow:
              "0 4px 20px rgba(196, 92, 122, 0.08), 0 1px 3px rgba(196, 92, 122, 0.04)",
          }}
        >
          <div>
            <label className="block text-sm font-medium text-[#2D2A2B]">Name</label>
            <Input
              className="mt-1"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#2D2A2B]">Slug</label>
            <Input
              className="mt-1"
              required
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#2D2A2B]">Price (PKR)</label>
              <Input
                className="mt-1"
                type="number"
                required
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2D2A2B]">Compare at price</label>
              <Input
                className="mt-1"
                type="number"
                value={form.compareAtPrice}
                onChange={(e) => setForm({ ...form, compareAtPrice: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#2D2A2B]">Inventory</label>
            <Input
              className="mt-1"
              type="number"
              value={form.inventory}
              onChange={(e) => setForm({ ...form, inventory: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#2D2A2B]">Description</label>
            <textarea
              className="mt-1 w-full rounded-[12px] border border-[#F0D6E0] px-3 py-2 text-sm text-[#2D2A2B] focus:outline-none focus:ring-2 focus:ring-[#C45C7A]/40"
              rows={4}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-[#2D2A2B]">Images</label>
            <ImageUpload value={images} onChange={setImages} />
          </div>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-sm text-[#2D2A2B]">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
              />
              Active
            </label>
            <label className="flex items-center gap-2 text-sm text-[#2D2A2B]">
              <input
                type="checkbox"
                checked={form.isFeatured}
                onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
              />
              Featured
            </label>
          </div>
        </div>

        {error && <p className="text-sm text-[#C45C5C]">{error}</p>}

        <div className="flex gap-3">
          <Button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save changes"}
          </Button>
          <Link href="/products">
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
