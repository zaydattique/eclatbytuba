/**
 * Data access layer for Éclat by Tuba
 * Uses Prisma when DATABASE_URL is available, otherwise in-memory store.
 * Seed products are from the official 67-product catalog only — never invent.
 */

const mem = {
  categories: [] as any[],
  products: [] as any[],
  orders: [] as any[],
  initialized: false,
};

function ensureMemSeed() {
  if (mem.initialized) return;
  mem.initialized = true;

  mem.categories = [
    { id: "c1", name: "Cosmetic Kits", slug: "cosmetic-kits", sortOrder: 1, isActive: true },
    { id: "c2", name: "Lipstick", slug: "lipstick", sortOrder: 2, isActive: true },
    { id: "c3", name: "Lip Gloss", slug: "lip-gloss", sortOrder: 3, isActive: true },
    { id: "c4", name: "Lip Sets", slug: "lip-sets", sortOrder: 4, isActive: true },
    { id: "c5", name: "Nails", slug: "nails", sortOrder: 5, isActive: true },
  ];

  mem.products = [
    {
      id: "p1",
      name: "Éclat Everyday Glam Kit",
      slug: "eclat-everyday-glam-kit",
      description: "Complete everyday glam kit for soft, glossy looks.",
      fullDescription: "Handpicked kit for daily self-expression — soft gloss, blush tones, and treat-yourself vibes.",
      price: 2250,
      compareAtPrice: 2999,
      inventory: 24,
      categoryId: "c1",
      isActive: true,
      isFeatured: true,
      tags: ["kit", "everyday", "glam"],
      images: [],
      category: mem.categories[0],
    },
    {
      id: "p2",
      name: "18-Color Mini Capsule Lipstick Pack",
      slug: "18-color-mini-capsule-lipstick-pack",
      description: "Eighteen mini capsule lipsticks for every mood.",
      fullDescription: "Shade range from soft peach to deep berry — perfect for the Soft Gloss Pastel aesthetic.",
      price: 1299,
      compareAtPrice: 2000,
      inventory: 40,
      categoryId: "c2",
      isActive: true,
      isFeatured: true,
      tags: ["lipstick", "capsule", "set"],
      images: [],
      category: mem.categories[1],
    },
    {
      id: "p3",
      name: "6-Shade Lipstick Set with Case",
      slug: "6-shade-lipstick-set-with-case",
      description: "Six essential shades with travel case.",
      fullDescription: "Curated lip set with case — soft nudes and rose tones.",
      price: 999,
      compareAtPrice: 1499,
      inventory: 35,
      categoryId: "c3",
      isActive: true,
      isFeatured: true,
      tags: ["lip", "set", "case"],
      images: [],
      category: mem.categories[2],
    },
    {
      id: "p4",
      name: "Deal of 4 Rhode Lip Peptide (100% Original) Imported",
      slug: "4-rhode-lip-peptide",
      description: "Four Rhode lip peptide — imported, bestseller energy.",
      fullDescription: "Peptide lip treatment set. High demand in Lahore — limited stock messaging applies.",
      price: 1299,
      compareAtPrice: 1999,
      inventory: 8,
      categoryId: "c4",
      isActive: true,
      isFeatured: true,
      tags: ["rhode", "peptide", "lip"],
      images: [],
      category: mem.categories[3],
    },
    {
      id: "p5",
      name: "5-Shade Nude Nail Polish Set",
      slug: "5-shade-nude-nail-polish-set",
      description: "Soft nude nail polish set.",
      fullDescription: "Five nude shades for clean, elevated nails.",
      price: 999,
      compareAtPrice: 1600,
      inventory: 22,
      categoryId: "c5",
      isActive: true,
      isFeatured: false,
      tags: ["nails", "nude"],
      images: [],
      category: mem.categories[4],
    },
    {
      id: "p6",
      name: "3-Piece Lip Gloss, Liner & Oil Set",
      slug: "3-piece-lip-gloss-liner-oil-set",
      description: "Gloss, liner, and oil — complete lip ritual.",
      fullDescription: "Three-piece lip set for glossy, defined lips.",
      price: 799,
      compareAtPrice: 1200,
      inventory: 28,
      categoryId: "c3",
      isActive: true,
      isFeatured: false,
      tags: ["gloss", "liner", "oil"],
      images: [],
      category: mem.categories[2],
    },
  ];

  mem.orders = [
    {
      id: "o1",
      orderNumber: "ORD-1004",
      email: "ayesha@email.com",
      phone: "+92 300 1234567",
      status: "PENDING",
      paymentStatus: "PENDING",
      subtotal: 2250,
      shippingCost: 0,
      tax: 0,
      discount: 0,
      total: 2250,
      currency: "PKR",
      notes: null,
      trackingNumber: null,
      shippingAddress: { fullName: "Ayesha Khan", line1: "House 12, Street 5", city: "Lahore", country: "PK", shippingMethod: "standard" },
      createdAt: new Date("2026-09-26").toISOString(),
      items: [
        { id: "oi1", productId: "p1", name: "Éclat Everyday Glam Kit", price: 2250, quantity: 1, total: 2250 },
      ],
      payments: [{ id: "pay1", amount: 2250, method: "cod", status: "PENDING" }],
    },
    {
      id: "o2",
      orderNumber: "ORD-1003",
      email: "sara@email.com",
      phone: "+92 321 7654321",
      status: "CONFIRMED",
      paymentStatus: "PENDING",
      subtotal: 1299,
      shippingCost: 0,
      tax: 0,
      discount: 0,
      total: 1299,
      currency: "PKR",
      notes: null,
      trackingNumber: null,
      shippingAddress: { fullName: "Sara Ahmed", line1: "Apt 4B, Gulberg", city: "Lahore", country: "PK", shippingMethod: "express" },
      createdAt: new Date("2026-09-25").toISOString(),
      items: [
        { id: "oi2", productId: "p4", name: "Deal of 4 Rhode Lip Peptide (100% Original) Imported", price: 1299, quantity: 1, total: 1299 },
      ],
      payments: [{ id: "pay2", amount: 1299, method: "cod", status: "PENDING" }],
    },
  ];
}

function useDb() {
  return Boolean(process.env.DATABASE_URL && !process.env.DATABASE_URL.includes("localhost:5432/eclat"));
}

function composeNotes(notes?: string | null, trackingNumber?: string | null): string | null {
  const parts: string[] = [];
  if (trackingNumber) parts.push(`TRACKING:${trackingNumber}`);
  if (notes) parts.push(notes);
  return parts.length ? parts.join("\n") : null;
}

function parseNotesField(raw?: string | null): { notes: string | null; trackingNumber: string | null } {
  if (!raw) return { notes: null, trackingNumber: null };
  const lines = raw.split("\n");
  let trackingNumber: string | null = null;
  const rest: string[] = [];
  for (const line of lines) {
    if (line.startsWith("TRACKING:")) trackingNumber = line.slice(9).trim();
    else rest.push(line);
  }
  return { notes: rest.join("\n").trim() || null, trackingNumber };
}

export async function getCategories() {
  if (useDb()) {
    const { prisma } = await import("./index");
    return prisma.category.findMany({ where: { isActive: true }, orderBy: { sortOrder: "asc" } });
  }
  ensureMemSeed();
  return mem.categories;
}

export async function getProducts(opts?: {
  categorySlug?: string;
  featured?: boolean;
  activeOnly?: boolean;
}) {
  const activeOnly = opts?.activeOnly !== false;

  if (useDb()) {
    const { prisma } = await import("./index");
    return prisma.product.findMany({
      where: {
        ...(activeOnly ? { isActive: true } : {}),
        ...(opts?.featured ? { isFeatured: true } : {}),
        ...(opts?.categorySlug ? { category: { slug: opts.categorySlug } } : {}),
      },
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });
  }
  ensureMemSeed();
  let list = [...mem.products];
  if (activeOnly) list = list.filter((p) => p.isActive);
  if (opts?.featured) list = list.filter((p) => p.isFeatured);
  if (opts?.categorySlug) list = list.filter((p) => p.category?.slug === opts.categorySlug);
  return list;
}

export async function getProductBySlug(slug: string) {
  if (useDb()) {
    const { prisma } = await import("./index");
    return prisma.product.findUnique({ where: { slug }, include: { category: true } });
  }
  ensureMemSeed();
  return mem.products.find((p) => p.slug === slug) || null;
}

export async function getProductById(id: string) {
  if (useDb()) {
    const { prisma } = await import("./index");
    return prisma.product.findUnique({ where: { id }, include: { category: true } });
  }
  ensureMemSeed();
  return mem.products.find((p) => p.id === id) || null;
}

export async function createProduct(data: {
  name: string;
  slug: string;
  description?: string;
  price: number;
  compareAtPrice?: number | null;
  inventory?: number;
  categoryId?: string;
  isActive?: boolean;
  isFeatured?: boolean;
  tags?: string[];
  images?: string[];
}) {
  if (useDb()) {
    const { prisma } = await import("./index");
    return prisma.product.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        price: data.price,
        compareAtPrice: data.compareAtPrice,
        inventory: data.inventory ?? 0,
        categoryId: data.categoryId,
        isActive: data.isActive ?? true,
        isFeatured: data.isFeatured ?? false,
        tags: data.tags ?? [],
        images: data.images ?? [],
      },
      include: { category: true },
    });
  }
  ensureMemSeed();
  const cat = mem.categories.find((c) => c.id === data.categoryId);
  const product = {
    id: `p${Date.now()}`,
    name: data.name,
    slug: data.slug,
    description: data.description,
    price: data.price,
    compareAtPrice: data.compareAtPrice ?? null,
    inventory: data.inventory ?? 0,
    categoryId: data.categoryId,
    isActive: data.isActive ?? true,
    isFeatured: data.isFeatured ?? false,
    tags: data.tags ?? [],
    images: data.images ?? [],
    category: cat,
  };
  mem.products.push(product);
  return product;
}

export async function updateProduct(
  id: string,
  data: {
    name?: string;
    slug?: string;
    description?: string;
    price?: number;
    compareAtPrice?: number | null;
    inventory?: number;
    categoryId?: string | null;
    isActive?: boolean;
    isFeatured?: boolean;
    tags?: string[];
    images?: string[];
  }
) {
  if (useDb()) {
    const { prisma } = await import("./index");
    return prisma.product.update({
      where: { id },
      data: {
        ...(data.name !== undefined ? { name: data.name } : {}),
        ...(data.slug !== undefined ? { slug: data.slug } : {}),
        ...(data.description !== undefined ? { description: data.description } : {}),
        ...(data.price !== undefined ? { price: data.price } : {}),
        ...(data.compareAtPrice !== undefined ? { compareAtPrice: data.compareAtPrice } : {}),
        ...(data.inventory !== undefined ? { inventory: data.inventory } : {}),
        ...(data.categoryId !== undefined ? { categoryId: data.categoryId } : {}),
        ...(data.isActive !== undefined ? { isActive: data.isActive } : {}),
        ...(data.isFeatured !== undefined ? { isFeatured: data.isFeatured } : {}),
        ...(data.tags !== undefined ? { tags: data.tags } : {}),
        ...(data.images !== undefined ? { images: data.images } : {}),
      },
      include: { category: true },
    });
  }
  ensureMemSeed();
  const idx = mem.products.findIndex((p) => p.id === id);
  if (idx < 0) return null;
  const prev = mem.products[idx];
  const cat =
    data.categoryId !== undefined
      ? mem.categories.find((c) => c.id === data.categoryId) || null
      : prev.category;
  mem.products[idx] = {
    ...prev,
    ...data,
    category: cat,
  };
  return mem.products[idx];
}

export async function getAllProductImages(): Promise<
  { url: string; productId: string; productName: string }[]
> {
  const products = await getProducts({ activeOnly: false });
  const out: { url: string; productId: string; productName: string }[] = [];
  for (const p of products) {
    for (const url of p.images || []) {
      if (url) out.push({ url, productId: p.id, productName: p.name });
    }
  }
  return out;
}

export async function getOrders() {
  if (useDb()) {
    const { prisma } = await import("./index");
    const orders = await prisma.order.findMany({
      include: { items: true, payments: true },
      orderBy: { createdAt: "desc" },
    });
    return orders.map((o) => {
      const parsed = parseNotesField(o.notes);
      return { ...o, notes: parsed.notes, trackingNumber: parsed.trackingNumber };
    });
  }
  ensureMemSeed();
  return mem.orders;
}

export async function getOrderById(id: string) {
  if (useDb()) {
    const { prisma } = await import("./index");
    const order = await prisma.order.findUnique({
      where: { id },
      include: { items: true, payments: true },
    });
    if (!order) return null;
    const parsed = parseNotesField(order.notes);
    return { ...order, notes: parsed.notes, trackingNumber: parsed.trackingNumber };
  }
  ensureMemSeed();
  return mem.orders.find((o) => o.id === id) || null;
}

export async function createOrder(input: {
  email: string;
  phone?: string;
  shippingAddress: Record<string, any>;
  items: { productId: string; name: string; price: number; quantity: number; imageUrl?: string }[];
  paymentMethod?: string;
}) {
  const subtotal = input.items.reduce((s, i) => s + i.price * i.quantity, 0);
  const orderNumber = `ORD-${Date.now().toString().slice(-6)}`;

  if (useDb()) {
    const { prisma } = await import("./index");
    return prisma.order.create({
      data: {
        orderNumber,
        email: input.email,
        phone: input.phone,
        status: "PENDING",
        paymentStatus: "PENDING",
        subtotal,
        total: subtotal,
        currency: "PKR",
        shippingAddress: input.shippingAddress,
        items: {
          create: input.items.map((i) => ({
            productId: i.productId,
            name: i.name,
            price: i.price,
            quantity: i.quantity,
            total: i.price * i.quantity,
            imageUrl: i.imageUrl,
          })),
        },
        payments: {
          create: {
            amount: subtotal,
            method: input.paymentMethod || "cod",
            status: "PENDING",
            currency: "PKR",
          },
        },
      },
      include: { items: true, payments: true },
    });
  }

  ensureMemSeed();
  const order = {
    id: `o${Date.now()}`,
    orderNumber,
    email: input.email,
    phone: input.phone,
    status: "PENDING",
    paymentStatus: "PENDING",
    subtotal,
    shippingCost: 0,
    tax: 0,
    discount: 0,
    total: subtotal,
    currency: "PKR",
    notes: null as string | null,
    trackingNumber: null as string | null,
    shippingAddress: input.shippingAddress,
    createdAt: new Date().toISOString(),
    items: input.items.map((i, idx) => ({
      id: `oi${Date.now()}${idx}`,
      productId: i.productId,
      name: i.name,
      price: i.price,
      quantity: i.quantity,
      total: i.price * i.quantity,
    })),
    payments: [
      {
        id: `pay${Date.now()}`,
        amount: subtotal,
        method: input.paymentMethod || "cod",
        status: "PENDING",
      },
    ],
  };
  mem.orders.unshift(order);
  return order;
}

export async function updateOrderStatus(
  id: string,
  status: string,
  opts?: { notes?: string; trackingNumber?: string }
) {
  if (useDb()) {
    const { prisma } = await import("./index");
    const existing = await prisma.order.findUnique({ where: { id } });
    if (!existing) return null;
    const parsed = parseNotesField(existing.notes);
    const nextNotes =
      opts?.notes !== undefined || opts?.trackingNumber !== undefined
        ? composeNotes(
            opts?.notes !== undefined ? opts.notes : parsed.notes,
            opts?.trackingNumber !== undefined ? opts.trackingNumber : parsed.trackingNumber
          )
        : existing.notes;

    const updated = await prisma.order.update({
      where: { id },
      data: {
        status: status as any,
        notes: nextNotes,
        ...(status === "SHIPPED" ? { shippedAt: new Date() } : {}),
        ...(status === "DELIVERED" ? { deliveredAt: new Date() } : {}),
      },
      include: { items: true, payments: true },
    });
    const out = parseNotesField(updated.notes);
    return { ...updated, notes: out.notes, trackingNumber: out.trackingNumber };
  }
  ensureMemSeed();
  const order = mem.orders.find((o) => o.id === id);
  if (!order) return null;
  order.status = status;
  if (opts?.notes !== undefined) order.notes = opts.notes;
  if (opts?.trackingNumber !== undefined) order.trackingNumber = opts.trackingNumber;
  return order;
}

export async function getDashboardStats() {
  const products = await getProducts({ activeOnly: false });
  const orders = await getOrders();
  const revenue = orders.reduce((s: number, o: any) => s + Number(o.total), 0);
  return {
    totalOrders: orders.length,
    revenue,
    products: products.length,
    customers: new Set(orders.map((o: any) => o.email)).size,
    recentOrders: orders.slice(0, 5),
  };
}
