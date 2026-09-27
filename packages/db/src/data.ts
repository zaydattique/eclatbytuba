/**
 * Data access layer — catalog from catalog-seed (67 Shopify products + Kiko)
 * Reviews require orderId (verified buyers only).
 */

import catalogSeed from "./catalog-seed";

const mem = {
  categories: [] as any[],
  products: [] as any[],
  orders: [] as any[],
  reviews: [] as any[],
  initialized: false,
};

function ensureMemSeed() {
  if (mem.initialized) return;
  mem.initialized = true;

  const seed = catalogSeed as any;
  mem.categories = seed.categories.map((c: any) => ({ ...c }));
  const catById = Object.fromEntries(mem.categories.map((c: any) => [c.id, c]));

  mem.products = seed.products.map((p: any) => ({
    ...p,
    category: catById[p.categoryId] || null,
  }));

  const p1 =
    mem.products.find((p: any) => p.slug === "eclat-everyday-glam-kit") ||
    mem.products[0];
  const pRhode =
    mem.products.find((p: any) => p.slug === "4-rhode-lip-peptide") ||
    mem.products[1];

  mem.orders = [
    {
      id: "o1",
      orderNumber: "ORD-1004",
      email: "ayesha@email.com",
      phone: "+92 300 1234567",
      status: "DELIVERED",
      paymentStatus: "PAID",
      subtotal: Number(p1.price),
      shippingCost: 250,
      tax: 0,
      discount: 0,
      total: Number(p1.price) + 250,
      currency: "PKR",
      notes: null,
      trackingNumber: null,
      shippingAddress: {
        fullName: "Ayesha Khan",
        line1: "House 12, Street 5",
        city: "Lahore",
        country: "PK",
        shippingMethod: "standard",
      },
      createdAt: new Date("2026-09-26").toISOString(),
      items: [
        {
          id: "oi1",
          productId: p1.id,
          name: p1.name,
          price: Number(p1.price),
          quantity: 1,
          total: Number(p1.price),
        },
      ],
      payments: [
        {
          id: "pay1",
          amount: Number(p1.price) + 250,
          method: "cod",
          status: "PAID",
        },
      ],
    },
    {
      id: "o2",
      orderNumber: "ORD-1003",
      email: "sara@email.com",
      phone: "+92 321 7654321",
      status: "CONFIRMED",
      paymentStatus: "PENDING",
      subtotal: Number(pRhode.price),
      shippingCost: 250,
      tax: 0,
      discount: 0,
      total: Number(pRhode.price) + 250,
      currency: "PKR",
      notes: null,
      trackingNumber: null,
      shippingAddress: {
        fullName: "Sara Ahmed",
        line1: "Apt 4B, Gulberg",
        city: "Lahore",
        country: "PK",
        shippingMethod: "standard",
      },
      createdAt: new Date("2026-09-25").toISOString(),
      items: [
        {
          id: "oi2",
          productId: pRhode.id,
          name: pRhode.name,
          price: Number(pRhode.price),
          quantity: 1,
          total: Number(pRhode.price),
        },
      ],
      payments: [
        {
          id: "pay2",
          amount: Number(pRhode.price) + 250,
          method: "cod",
          status: "PENDING",
        },
      ],
    },
  ];

  mem.reviews = [];
}

function useDb() {
  return Boolean(
    process.env.DATABASE_URL && !process.env.DATABASE_URL.includes("localhost:5432/eclat")
  );
}

function composeNotes(
  notes?: string | null,
  trackingNumber?: string | null
): string | null {
  const parts: string[] = [];
  if (trackingNumber) parts.push(`TRACKING:${trackingNumber}`);
  if (notes) parts.push(notes);
  return parts.length ? parts.join("\n") : null;
}

function parseNotesField(raw?: string | null): {
  notes: string | null;
  trackingNumber: string | null;
} {
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
    return prisma.category.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    });
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
  if (opts?.categorySlug)
    list = list.filter((p) => p.category?.slug === opts.categorySlug);
  return list;
}

export async function getProductBySlug(slug: string) {
  if (useDb()) {
    const { prisma } = await import("./index");
    return prisma.product.findUnique({
      where: { slug },
      include: { category: true },
    });
  }
  ensureMemSeed();
  return mem.products.find((p) => p.slug === slug) || null;
}

export async function getProductById(id: string) {
  if (useDb()) {
    const { prisma } = await import("./index");
    return prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });
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
        ...(data.compareAtPrice !== undefined
          ? { compareAtPrice: data.compareAtPrice }
          : {}),
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
  mem.products[idx] = { ...prev, ...data, category: cat };
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
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    imageUrl?: string;
  }[];
  paymentMethod?: string;
  shippingCost?: number;
}) {
  const subtotal = input.items.reduce((s, i) => s + i.price * i.quantity, 0);
  const shippingCost =
    input.shippingCost ??
    (input.shippingAddress?.shippingMethod === "express" ? 350 : 250);
  const total = subtotal + shippingCost;
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
        shippingCost,
        total,
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
            amount: total,
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
    shippingCost,
    tax: 0,
    discount: 0,
    total,
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
        amount: total,
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
            opts?.trackingNumber !== undefined
              ? opts.trackingNumber
              : parsed.trackingNumber
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

export async function getProductReviews(productId: string) {
  if (useDb()) {
    const { prisma } = await import("./index");
    return prisma.review.findMany({
      where: { productId, isApproved: true },
      orderBy: [{ imageUrl: "desc" }, { createdAt: "desc" }],
    });
  }
  ensureMemSeed();
  return mem.reviews
    .filter((r) => r.productId === productId && r.isApproved)
    .sort((a, b) => {
      if (a.imageUrl && !b.imageUrl) return -1;
      if (!a.imageUrl && b.imageUrl) return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
}

export async function getReviewStats(productId: string) {
  const reviews = await getProductReviews(productId);
  if (!reviews.length) return { average: 0, count: 0 };
  const sum = reviews.reduce((s: number, r: any) => s + r.rating, 0);
  return { average: sum / reviews.length, count: reviews.length };
}

export async function getAllReviews(opts?: { approvedOnly?: boolean }) {
  if (useDb()) {
    const { prisma } = await import("./index");
    return prisma.review.findMany({
      where: opts?.approvedOnly ? { isApproved: true } : undefined,
      orderBy: { createdAt: "desc" },
      include: { product: true },
    });
  }
  ensureMemSeed();
  let list = [...mem.reviews];
  if (opts?.approvedOnly) list = list.filter((r) => r.isApproved);
  return list.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function createReview(input: {
  productId: string;
  orderId: string;
  authorEmail: string;
  authorName?: string;
  rating: number;
  title?: string;
  body?: string;
  imageUrl?: string;
}) {
  const email = input.authorEmail.trim().toLowerCase();
  if (input.rating < 1 || input.rating > 5) throw new Error("Rating must be 1–5");

  const order = await getOrderById(input.orderId);
  if (!order) throw new Error("Order not found");
  if ((order as any).email?.toLowerCase() !== email) {
    throw new Error("Email does not match this order");
  }
  const allowed = ["CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED"];
  if (!allowed.includes((order as any).status)) {
    throw new Error("Order is not eligible for review yet");
  }
  const onOrder = ((order as any).items || []).some(
    (i: any) => i.productId === input.productId
  );
  if (!onOrder) throw new Error("Product was not in this order");

  if (useDb()) {
    const { prisma } = await import("./index");
    const existing = await prisma.review.findUnique({
      where: {
        productId_orderId: { productId: input.productId, orderId: input.orderId },
      },
    });
    if (existing) throw new Error("You already reviewed this product for this order");
    return prisma.review.create({
      data: {
        productId: input.productId,
        orderId: input.orderId,
        authorEmail: email,
        authorName: input.authorName,
        rating: input.rating,
        title: input.title,
        body: input.body,
        imageUrl: input.imageUrl,
        isApproved: false,
      },
    });
  }

  ensureMemSeed();
  if (
    mem.reviews.some(
      (r) => r.productId === input.productId && r.orderId === input.orderId
    )
  ) {
    throw new Error("You already reviewed this product for this order");
  }
  const review = {
    id: `r${Date.now()}`,
    productId: input.productId,
    orderId: input.orderId,
    authorEmail: email,
    authorName: input.authorName || null,
    rating: input.rating,
    title: input.title || null,
    body: input.body || null,
    imageUrl: input.imageUrl || null,
    isApproved: false,
    createdAt: new Date().toISOString(),
  };
  mem.reviews.push(review);
  return review;
}

export async function moderateReview(id: string, isApproved: boolean) {
  if (useDb()) {
    const { prisma } = await import("./index");
    return prisma.review.update({ where: { id }, data: { isApproved } });
  }
  ensureMemSeed();
  const r = mem.reviews.find((x) => x.id === id);
  if (!r) return null;
  r.isApproved = isApproved;
  return r;
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
