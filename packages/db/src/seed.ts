/**
 * Seed Postgres from catalog-seed (67+ products + categories).
 * Usage: DATABASE_URL=... pnpm db:seed
 */
import { PrismaClient } from "@prisma/client";
import catalogSeed from "./catalog-seed";

const prisma = new PrismaClient();

async function main() {
  if (!process.env.DATABASE_URL?.trim()) {
    throw new Error("DATABASE_URL is required to seed");
  }

  const seed = catalogSeed as {
    categories: Array<{
      id: string;
      name: string;
      slug: string;
      sortOrder?: number;
      isActive?: boolean;
      description?: string;
      imageUrl?: string;
    }>;
    products: Array<{
      id: string;
      name: string;
      slug: string;
      description?: string;
      fullDescription?: string;
      price: number;
      compareAtPrice?: number | null;
      inventory?: number;
      categoryId?: string;
      isActive?: boolean;
      isFeatured?: boolean;
      tags?: string[];
      images?: string[];
      metadata?: object;
      sku?: string;
    }>;
  };

  console.log(`Seeding ${seed.categories.length} categories…`);
  for (const c of seed.categories) {
    await prisma.category.upsert({
      where: { slug: c.slug },
      create: {
        id: c.id,
        name: c.name,
        slug: c.slug,
        description: c.description,
        imageUrl: c.imageUrl,
        sortOrder: c.sortOrder ?? 0,
        isActive: c.isActive ?? true,
      },
      update: {
        name: c.name,
        description: c.description,
        imageUrl: c.imageUrl,
        sortOrder: c.sortOrder ?? 0,
        isActive: c.isActive ?? true,
      },
    });
  }

  console.log(`Seeding ${seed.products.length} products…`);
  for (const p of seed.products) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      create: {
        id: p.id,
        name: p.name,
        slug: p.slug,
        description: p.description,
        fullDescription: p.fullDescription,
        price: p.price,
        compareAtPrice: p.compareAtPrice ?? null,
        inventory: p.inventory ?? 0,
        categoryId: p.categoryId,
        isActive: p.isActive ?? true,
        isFeatured: p.isFeatured ?? false,
        tags: p.tags ?? [],
        images: p.images ?? [],
        metadata: p.metadata ?? undefined,
        sku: p.sku,
      },
      update: {
        name: p.name,
        description: p.description,
        fullDescription: p.fullDescription,
        price: p.price,
        compareAtPrice: p.compareAtPrice ?? null,
        inventory: p.inventory ?? 0,
        categoryId: p.categoryId,
        isActive: p.isActive ?? true,
        isFeatured: p.isFeatured ?? false,
        tags: p.tags ?? [],
        images: p.images ?? [],
        metadata: p.metadata ?? undefined,
      },
    });
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
