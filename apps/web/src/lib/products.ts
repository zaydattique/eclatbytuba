import {
  getProducts as dbGetProducts,
  getProductBySlug as dbGetProductBySlug,
  getCategories as dbGetCategories,
} from "@eclat/db";

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  fullDescription?: string | null;
  price: number | any;
  compareAtPrice?: number | any | null;
  images: string[];
  category?: { name: string; slug: string } | null;
  categoryId?: string | null;
  tags: string[];
  inventory: number;
  isFeatured: boolean;
  isActive?: boolean;
}

export async function getAllProducts(categorySlug?: string): Promise<Product[]> {
  const products = await dbGetProducts({ categorySlug });
  return products.map(normalize);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await dbGetProducts({ featured: true });
  return products.map(normalize);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const product = await dbGetProductBySlug(slug);
  return product ? normalize(product) : null;
}

export async function getCategories() {
  return dbGetCategories();
}

function normalize(p: any): Product {
  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    description: p.description,
    fullDescription: p.fullDescription,
    price: Number(p.price),
    compareAtPrice: p.compareAtPrice != null ? Number(p.compareAtPrice) : null,
    images: p.images || [],
    category: p.category
      ? { name: p.category.name, slug: p.category.slug }
      : null,
    categoryId: p.categoryId,
    tags: p.tags || [],
    inventory: p.inventory ?? 0,
    isFeatured: p.isFeatured ?? false,
    isActive: p.isActive ?? true,
  };
}
