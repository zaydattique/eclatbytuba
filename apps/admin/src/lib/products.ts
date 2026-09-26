export interface AdminProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice?: number | null;
  inventory: number;
  category: string;
  isActive: boolean;
  isFeatured: boolean;
}

export const ADMIN_PRODUCTS: AdminProduct[] = [
  { id: "1", name: "Silk Evening Gown", slug: "silk-evening-gown", price: 28500, compareAtPrice: 32000, inventory: 12, category: "Dresses", isActive: true, isFeatured: true },
  { id: "2", name: "Cashmere Wrap Coat", slug: "cashmere-wrap-coat", price: 42000, compareAtPrice: null, inventory: 8, category: "Outerwear", isActive: true, isFeatured: true },
  { id: "3", name: "Tailored Linen Blazer", slug: "tailored-linen-blazer", price: 18500, compareAtPrice: 21000, inventory: 20, category: "Blazers", isActive: true, isFeatured: true },
  { id: "4", name: "Pleated Midi Skirt", slug: "pleated-midi-skirt", price: 12500, compareAtPrice: null, inventory: 15, category: "Bottoms", isActive: true, isFeatured: false },
  { id: "5", name: "Embroidered Silk Scarf", slug: "embroidered-silk-scarf", price: 6500, compareAtPrice: 7500, inventory: 30, category: "Accessories", isActive: true, isFeatured: false },
  { id: "6", name: "Wide-Leg Wool Trousers", slug: "wide-leg-wool-trousers", price: 16800, compareAtPrice: null, inventory: 10, category: "Bottoms", isActive: true, isFeatured: true },
];

export const ADMIN_CATEGORIES = [
  { id: "1", name: "Dresses", slug: "dresses", productCount: 1 },
  { id: "2", name: "Outerwear", slug: "outerwear", productCount: 1 },
  { id: "3", name: "Blazers", slug: "blazers", productCount: 1 },
  { id: "4", name: "Bottoms", slug: "bottoms", productCount: 2 },
  { id: "5", name: "Accessories", slug: "accessories", productCount: 1 },
];
