export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  fullDescription?: string;
  price: number;
  compareAtPrice?: number | null;
  images: string[];
  category: string;
  categorySlug: string;
  tags: string[];
  inventory: number;
  isFeatured: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Silk Evening Gown",
    slug: "silk-evening-gown",
    description: "Flowing silk gown with delicate draping.",
    fullDescription:
      "Crafted from pure mulberry silk, this evening gown features soft draping that flatters every silhouette. Perfect for formal occasions and elevated evenings.",
    price: 28500,
    compareAtPrice: 32000,
    images: [],
    category: "Dresses",
    categorySlug: "dresses",
    tags: ["silk", "evening", "formal"],
    inventory: 12,
    isFeatured: true,
  },
  {
    id: "2",
    name: "Cashmere Wrap Coat",
    slug: "cashmere-wrap-coat",
    description: "Luxurious cashmere coat with a modern wrap silhouette.",
    fullDescription:
      "Double-faced cashmere coat designed for effortless elegance. Soft, warm, and refined — a true wardrobe investment.",
    price: 42000,
    compareAtPrice: null,
    images: [],
    category: "Outerwear",
    categorySlug: "outerwear",
    tags: ["cashmere", "coat", "winter"],
    inventory: 8,
    isFeatured: true,
  },
  {
    id: "3",
    name: "Tailored Linen Blazer",
    slug: "tailored-linen-blazer",
    description: "Lightweight linen blazer for elevated everyday wear.",
    fullDescription:
      "A structured yet breathable linen blazer that transitions seamlessly from office to evening. Features a single-breasted cut and soft shoulder.",
    price: 18500,
    compareAtPrice: 21000,
    images: [],
    category: "Blazers",
    categorySlug: "blazers",
    tags: ["linen", "blazer", "work"],
    inventory: 20,
    isFeatured: true,
  },
  {
    id: "4",
    name: "Pleated Midi Skirt",
    slug: "pleated-midi-skirt",
    description: "Soft pleated midi skirt in ivory crepe.",
    fullDescription:
      "Elegant midi skirt with fine knife pleats. Sits high on the waist and falls beautifully with movement.",
    price: 12500,
    compareAtPrice: null,
    images: [],
    category: "Bottoms",
    categorySlug: "bottoms",
    tags: ["skirt", "pleated", "midi"],
    inventory: 15,
    isFeatured: false,
  },
  {
    id: "5",
    name: "Embroidered Silk Scarf",
    slug: "embroidered-silk-scarf",
    description: "Hand-finished silk scarf with subtle embroidery.",
    fullDescription:
      "A versatile accessory piece in pure silk, finished with delicate tonal embroidery along the edges.",
    price: 6500,
    compareAtPrice: 7500,
    images: [],
    category: "Accessories",
    categorySlug: "accessories",
    tags: ["scarf", "silk", "accessory"],
    inventory: 30,
    isFeatured: false,
  },
  {
    id: "6",
    name: "Wide-Leg Wool Trousers",
    slug: "wide-leg-wool-trousers",
    description: "Fluid wide-leg trousers in Italian wool.",
    fullDescription:
      "High-waisted wide-leg trousers cut from Italian wool. Clean lines and a refined drape make them a foundation piece.",
    price: 16800,
    compareAtPrice: null,
    images: [],
    category: "Bottoms",
    categorySlug: "bottoms",
    tags: ["trousers", "wool", "wide-leg"],
    inventory: 10,
    isFeatured: true,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.isFeatured);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return PRODUCTS.filter((p) => p.categorySlug === categorySlug);
}

export const CATEGORIES = [
  { name: "Dresses", slug: "dresses" },
  { name: "Outerwear", slug: "outerwear" },
  { name: "Blazers", slug: "blazers" },
  { name: "Bottoms", slug: "bottoms" },
  { name: "Accessories", slug: "accessories" },
];
