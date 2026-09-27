/** @deprecated Prefer @/lib/data → @eclat/db. Kept for any residual imports. */
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

/** Catalog-aligned sample only — full list in docs/PRODUCTS_CATALOG.md */
export const ADMIN_PRODUCTS: AdminProduct[] = [
  { id: "1", name: "Éclat Everyday Glam Kit", slug: "eclat-everyday-glam-kit", price: 2250, compareAtPrice: 2999, inventory: 24, category: "Cosmetic Kits", isActive: true, isFeatured: true },
  { id: "2", name: "18-Color Mini Capsule Lipstick Pack", slug: "18-color-mini-capsule-lipstick-pack", price: 1299, compareAtPrice: 2000, inventory: 40, category: "Lipstick", isActive: true, isFeatured: true },
  { id: "3", name: "6-Shade Lipstick Set with Case", slug: "6-shade-lipstick-set-with-case", price: 999, compareAtPrice: 1499, inventory: 35, category: "Lip Gloss", isActive: true, isFeatured: true },
  { id: "4", name: "Deal of 4 Rhode Lip Peptide", slug: "4-rhode-lip-peptide", price: 1299, compareAtPrice: 1999, inventory: 8, category: "Lip Sets", isActive: true, isFeatured: true },
  { id: "5", name: "5-Shade Nude Nail Polish Set", slug: "5-shade-nude-nail-polish-set", price: 999, compareAtPrice: 1600, inventory: 22, category: "Nails", isActive: true, isFeatured: false },
  { id: "6", name: "3-Piece Lip Gloss, Liner & Oil Set", slug: "3-piece-lip-gloss-liner-oil-set", price: 799, compareAtPrice: 1200, inventory: 28, category: "Lip Gloss", isActive: true, isFeatured: false },
];

export const ADMIN_CATEGORIES = [
  { id: "1", name: "Cosmetic Kits", slug: "cosmetic-kits", productCount: 1 },
  { id: "2", name: "Lipstick", slug: "lipstick", productCount: 1 },
  { id: "3", name: "Lip Gloss", slug: "lip-gloss", productCount: 2 },
  { id: "4", name: "Lip Sets", slug: "lip-sets", productCount: 1 },
  { id: "5", name: "Nails", slug: "nails", productCount: 1 },
];
