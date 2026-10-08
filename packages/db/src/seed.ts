/**
 * Prisma seed — categories + products from catalog-seed.
 * Requires DATABASE_URL pointing at a reachable Postgres.
 *
 * Usage: pnpm db:seed  (from root) or pnpm --filter @eclat/db db:seed
 */
import { PrismaClient } from "@prisma/client";
import catalogSeed from "./catalog-seed";

const prisma = new PrismaClient();

async function main() {
  const seed = catalogSeed as {
    categories: Array<{
      id: string;
      name: string;
      slug: string;
      description?: string | null;
      imageUrl?: string | null;
      sortOrder?: number;
      isActive?: boolean;
    }>;
    products: Array<{
      id: string;
      name: string;
      slug: string;
      description?: string | null;
      fullDescription?: string | null;
      price: number | string;
      compareAtPrice?: number | string | null;
      sku?: string | null;
      inventory?: number;
      trackInventory?: boolean;
      isActive?: boolean;
      isFeatured?: boolean;
      categoryId?: string | null;
      images?: string[];
      tags?: string[];
      metadata?: unknown;
    }>;
  };

  console.log(`Seeding ${seed.categories.length} categories...`);
  for (const c of seed.categories) {
    await prisma.category.upsert({
      where: { slug: c.slug },
      create: {
        id: c.id,
        name: c.name,
        slug: c.slug,
        description: c.description ?? null,
        imageUrl: c.imageUrl ?? null,
        sortOrder: c.sortOrder ?? 0,
        isActive: c.isActive ?? true,
      },
      update: {
        name: c.name,
        description: c.description ?? null,
        imageUrl: c.imageUrl ?? null,
        sortOrder: c.sortOrder ?? 0,
        isActive: c.isActive ?? true,
      },
    });
  }

  console.log(`Seeding ${seed.products.length} products...`);
  for (const p of seed.products) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      create: {
        id: p.id,
        name: p.name,
        slug: p.slug,
        description: p.description ?? null,
        fullDescription: p.fullDescription ?? null,
        price: p.price,
        compareAtPrice: p.compareAtPrice ?? null,
        sku: p.sku ?? null,
        inventory: p.inventory ?? 0,
        trackInventory: p.trackInventory ?? true,
        isActive: p.isActive ?? true,
        isFeatured: p.isFeatured ?? false,
        categoryId: p.categoryId ?? null,
        images: p.images ?? [],
        tags: p.tags ?? [],
        metadata: (p.metadata as object) ?? undefined,
      },
      update: {
        name: p.name,
        description: p.description ?? null,
        fullDescription: p.fullDescription ?? null,
        price: p.price,
        compareAtPrice: p.compareAtPrice ?? null,
        sku: p.sku ?? null,
        inventory: p.inventory ?? 0,
        isActive: p.isActive ?? true,
        isFeatured: p.isFeatured ?? false,
        categoryId: p.categoryId ?? null,
        images: p.images ?? [],
        tags: p.tags ?? [],
        metadata: (p.metadata as object) ?? undefined,
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
