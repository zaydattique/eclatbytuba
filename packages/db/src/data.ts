/**
 * Data access layer for Éclat by Tuba
 * Uses Prisma when DATABASE_URL is available, otherwise in-memory store.
 */

// In-memory store (fallback when no DB)
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
    { id: "c1", name: "Dresses", slug: "dresses", sortOrder: 1, isActive: true },
    { id: "c2", name: "Outerwear", slug: "outerwear", sortOrder: 2, isActive: true },
    { id: "c3", name: "Blazers", slug: "blazers", sortOrder: 3, isActive: true },
    { id: "c4", name: "Bottoms", slug: "bottoms", sortOrder: 4, isActive: true },
    { id: "c5", name: "Accessories", slug: "accessories", sortOrder: 5, isActive: true },
  ];

  mem.products = [
    {
      id: "p1",
      name: "Silk Evening Gown",
      slug: "silk-evening-gown",
      description: "Flowing silk gown with delicate draping.",
      fullDescription: "Crafted from pure mulberry silk, this evening gown features soft draping that flatters every silhouette.",
      price: 28500,
      compareAtPrice: 32000,
      inventory: 12,
      categoryId: "c1",
      isActive: true,
      isFeatured: true,
      tags: ["silk", "evening", "formal"],
      images: [],
      category: mem.categories[0],
    },
    {
      id: "p2",
      name: "Cashmere Wrap Coat",
      slug: "cashmere-wrap-coat",
      description: "Luxurious cashmere coat with a modern wrap silhouette.",
      fullDescription: "Double-faced cashmere coat designed for effortless elegance.",
      price: 42000,
      compareAtPrice: null,
      inventory: 8,
      categoryId: "c2",
      isActive: true,
      isFeatured: true,
      tags: ["cashmere", "coat", "winter"],
      images: [],
      category: mem.categories[1],
    },
    {
      id: "p3",
      name: "Tailored Linen Blazer",
      slug: "tailored-linen-blazer",
      description: "Lightweight linen blazer for elevated everyday wear.",
      fullDescription: "A structured yet breathable linen blazer that transitions seamlessly from office to evening.",
      price: 18500,
      compareAtPrice: 21000,
      inventory: 20,
      categoryId: "c3",
      isActive: true,
      isFeatured: true,
      tags: ["linen", "blazer", "work"],
      images: [],
      category: mem.categories[2],
    },
    {
      id: "p4",
      name: "Pleated Midi Skirt",
      slug: "pleated-midi-skirt",
      description: "Soft pleated midi skirt in ivory crepe.",
      fullDescription: "Elegant midi skirt with fine knife pleats.",
      price: 12500,
      compareAtPrice: null,
      inventory: 15,
      categoryId: "c4",
      isActive: true,
      isFeatured: false,
      tags: ["skirt", "pleated", "midi"],
      images: [],
      category: mem.categories[3],
    },
    {
      id: "p5",
      name: "Embroidered Silk Scarf",
      slug: "embroidered-silk-scarf",
      description: "Hand-finished silk scarf with subtle embroidery.",
      fullDescription: "A versatile accessory piece in pure silk.",
      price: 6500,
      compareAtPrice: 7500,
      inventory: 30,
      categoryId: "c5",
      isActive: true,
      isFeatured: false,
      tags: ["scarf", "silk", "accessory"],
      images: [],
      category: mem.categories[4],
    },
    {
      id: "p6",
      name: "Wide-Leg Wool Trousers",
      slug: "wide-leg-wool-trousers",
      description: "Fluid wide-leg trousers in Italian wool.",
      fullDescription: "High-waisted wide-leg trousers cut from Italian wool.",
      price: 16800,
      compareAtPrice: null,
      inventory: 10,
      categoryId: "c4",
      isActive: true,
      isFeatured: true,
      tags: ["trousers", "wool", "wide-leg"],
      images: [],
      category: mem.categories[3],
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
      subtotal: 28500,
      shippingCost: 0,
      tax: 0,
      discount: 0,
      total: 28500,
      currency: "PKR",
      shippingAddress: { fullName: "Ayesha Khan", line1: "House 12, Street 5", city: "Lahore", country: "PK" },
      createdAt: new Date("2026-09-26").toISOString(),
      items: [
        { id: "oi1", productId: "p1", name: "Silk Evening Gown", price: 28500, quantity: 1, total: 28500 },
      ],
      payments: [{ id: "pay1", amount: 28500, method: "cod", status: "PENDING" }],
    },
    {
      id: "o2",
      orderNumber: "ORD-1003",
      email: "sara@email.com",
      phone: "+92 321 7654321",
      status: "CONFIRMED",
      paymentStatus: "PENDING",
      subtotal: 42000,
      shippingCost: 0,
      tax: 0,
      discount: 0,
      total: 42000,
      currency: "PKR",
      shippingAddress: { fullName: "Sara Ahmed", line1: "Apt 4B, Gulberg", city: "Lahore", country: "PK" },
      createdAt: new Date("2026-09-25").toISOString(),
      items: [
        { id: "oi2", productId: "p2", name: "Cashmere Wrap Coat", price: 42000, quantity: 1, total: 42000 },
      ],
      payments: [{ id: "pay2", amount: 42000, method: "cod", status: "PENDING" }],
    },
  ];
}

function useDb() {
  return Boolean(process.env.DATABASE_URL && !process.env.DATABASE_URL.includes("localhost:5432/eclat"));
}

export async function getCategories() {
  if (useDb()) {
    const { prisma } = await import("./index");
    return prisma.category.findMany({ where: { isActive: true }, orderBy: { sortOrder: "asc" } });
  }
  ensureMemSeed();
  return mem.categories;
}

export async function getProducts(opts?: { categorySlug?: string; featured?: boolean }) {
  if (useDb()) {
    const { prisma } = await import("./index");
    return prisma.product.findMany({
      where: {
        isActive: true,
        ...(opts?.featured ? { isFeatured: true } : {}),
        ...(opts?.categorySlug ? { category: { slug: opts.categorySlug } } : {}),
      },
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });
  }
  ensureMemSeed();
  let list = mem.products.filter((p) => p.isActive);
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
        images: [],
      },
      include: { category: true },
    });
  }
  ensureMemSeed();
  const cat = mem.categories.find((c) => c.id === data.categoryId);
  const product = {
    id: `p${Date.now()}`,
    ...data,
    inventory: data.inventory ?? 0,
    isActive: data.isActive ?? true,
    isFeatured: data.isFeatured ?? false,
    tags: data.tags ?? [],
    images: [],
    category: cat,
  };
  mem.products.push(product);
  return product;
}

export async function getOrders() {
  if (useDb()) {
    const { prisma } = await import("./index");
    return prisma.order.findMany({
      include: { items: true, payments: true },
      orderBy: { createdAt: "desc" },
    });
  }
  ensureMemSeed();
  return mem.orders;
}

export async function getOrderById(id: string) {
  if (useDb()) {
    const { prisma } = await import("./index");
    return prisma.order.findUnique({
      where: { id },
      include: { items: true, payments: true },
    });
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

export async function updateOrderStatus(id: string, status: string) {
  if (useDb()) {
    const { prisma } = await import("./index");
    return prisma.order.update({
      where: { id },
      data: {
        status: status as any,
        ...(status === "SHIPPED" ? { shippedAt: new Date() } : {}),
        ...(status === "DELIVERED" ? { deliveredAt: new Date() } : {}),
      },
      include: { items: true, payments: true },
    });
  }
  ensureMemSeed();
  const order = mem.orders.find((o) => o.id === id);
  if (!order) return null;
  order.status = status;
  return order;
}

export async function getDashboardStats() {
  const products = await getProducts();
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
