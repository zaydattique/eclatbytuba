/**
 * SEO + AEO content engine for Éclat by Tuba
 */

import { siteConfig } from "@eclat/config";

export type SeoProduct = {
  name: string;
  slug: string;
  description?: string | null;
  fullDescription?: string | null;
  price: number;
  compareAtPrice?: number | null;
  category?: { name: string; slug: string } | null;
  tags?: string[];
  inventory?: number;
  metadata?: {
    seoTitle?: string;
    seoDescription?: string;
    variants?: { code: string; name: string }[];
    shippingNote?: string;
  } | null;
};

export type FaqItem = { question: string; answer: string };

function priceLabel(n: number) {
  return `Rs ${Number(n).toLocaleString("en-PK")}`;
}

export function buildSeoTitle(p: SeoProduct): string {
  if (p.metadata?.seoTitle && p.metadata.seoTitle.length > 20) {
    return p.metadata.seoTitle.slice(0, 60);
  }
  const base = `${p.name} Pakistan | ${priceLabel(p.price)} | COD`;
  return base.length <= 60 ? base : `${p.name} Pakistan | COD`.slice(0, 60);
}

export function buildSeoDescription(p: SeoProduct): string {
  if (p.metadata?.seoDescription && p.metadata.seoDescription.length >= 120) {
    return p.metadata.seoDescription.slice(0, 160);
  }
  const cat = p.category?.name || "beauty";
  const hook =
    p.description?.replace(/\s+/g, " ").trim() ||
    `${p.name} for everyday soft-gloss looks.`;
  const core = `Buy ${p.name} in Pakistan at ${priceLabel(p.price)}. ${hook} Nationwide COD, flat shipping Rs 250. Shop ${cat} at ${siteConfig.name}.`;
  return core.slice(0, 160);
}

export function buildAnswerFirst(p: SeoProduct): string {
  const variants = p.metadata?.variants || [];
  const shadeBit =
    variants.length > 0
      ? ` Available in ${variants.length} shades including ${variants
          .slice(0, 3)
          .map((v) => v.name)
          .join(", ")}.`
      : "";
  return `${p.name} is available in Pakistan at ${priceLabel(p.price)} with cash on delivery and flat shipping of Rs 250 nationwide.${shadeBit} Order from ${siteConfig.name} for verified packing and easy 7-day returns on unused items.`.slice(
    0,
    320
  );
}

export function buildLongDescription(p: SeoProduct): string {
  const cat = p.category?.name || "beauty";
  const tags = (p.tags || []).join(", ");
  const existing = (p.fullDescription || p.description || "").trim();
  const variants = p.metadata?.variants || [];
  const shadeBlock =
    variants.length > 0
      ? `\n\n### Shades & options\n${variants
          .map((v) => `- **${v.code}** — ${v.name}`)
          .join("\n")}\n\nPick the shade that matches your undertone; clear and pearly pinks suit daily wear, deeper reds and mauves suit evening looks.`
      : "";

  const save =
    p.compareAtPrice && p.compareAtPrice > p.price
      ? ` Listed against ${priceLabel(p.compareAtPrice)} so you see the deal clearly.`
      : "";

  return `
## ${p.name} in Pakistan

${buildAnswerFirst(p)}

### Quick definition
**${p.name}** is a ${cat.toLowerCase()} product sold with nationwide Pakistan COD and transparent PKR pricing at ${siteConfig.name}.

${existing ? `### Product overview\n${existing}` : ""}

### Who it is for
${p.name} suits anyone building a soft-gloss routine in Pakistan — students, professionals, and gifting. Category: **${cat}**.${tags ? ` Related keywords: ${tags}.` : ""}

### Price, COD & shipping
You pay **${priceLabel(p.price)}**${save} Cash on delivery is available across Pakistan. Standard shipping is a flat **Rs 250**. Express options may appear at checkout when available.

### How to use
1. Start with clean, dry lips or skin as relevant.
2. Apply a thin first layer; build for more colour or shine.
3. For kits, follow base → colour → gloss or topper.
4. Reapply as needed through the day.

### Why order from ${siteConfig.name}
We focus on soft-gloss beauty for Pakistani customers: clear pricing in PKR, COD, and verified buyer reviews only (you need a real order to review). Packaging is checked before dispatch.
${shadeBlock}

### Care & storage
Store away from direct heat. Close caps tightly. Discontinue if irritation occurs. For imported lines, batch and seal checks are part of our intake process — ask support if you need shade confirmation before ordering.

### Returns
Unused items in original condition can be returned within 7 days as per our returns policy. COD orders are confirmed by phone/WhatsApp when required to reduce failed deliveries.
`.trim();
}

export function buildProductFaqs(p: SeoProduct): FaqItem[] {
  const faqs: FaqItem[] = [];
  const cat = (p.category?.slug || "").toLowerCase();
  const name = p.name;
  const price = priceLabel(p.price);
  const variants = p.metadata?.variants || [];
  const slug = p.slug.toLowerCase();

  faqs.push({
    question: `How much does ${name} cost in Pakistan?`,
    answer: `${name} is priced at ${price} at ${siteConfig.name}. Final total at checkout includes flat shipping of Rs 250 unless a free-shipping promo is active.`,
  });

  faqs.push({
    question: `Is COD available for ${name}?`,
    answer: `Yes. Cash on delivery is available for ${name} across Pakistan. You can also choose bank transfer, JazzCash, or EasyPaisa when those methods are enabled in checkout.`,
  });

  if (variants.length > 0) {
    faqs.push({
      question: `Which shades of ${name} do you stock?`,
      answer: `We list ${variants.length} options: ${variants
        .map((v) => `${v.code} ${v.name}`)
        .join(", ")}. Availability can change; low-stock shades are marked on the product page.`,
    });
  } else if (cat.includes("lip") || slug.includes("lip")) {
    faqs.push({
      question: `Is ${name} sticky or comfortable for daily wear?`,
      answer: `${name} is positioned for everyday soft-gloss comfort. Apply a thin layer first; reapply as needed. Pair with liner for sharper definition.`,
    });
  }

  if (slug.includes("rhode") || (p.tags || []).some((t) => /rhode/i.test(t))) {
    faqs.push({
      question: `Is the Rhode lip peptide set original?`,
      answer: `We sell the Rhode lip peptide deal as an imported set with intake checks before listing. If you need batch or packaging photos, contact support before ordering. Price is ${price} with COD and Rs 250 shipping.`,
    });
  }

  if (slug.includes("kiko") || (p.tags || []).some((t) => /kiko/i.test(t))) {
    faqs.push({
      question: `Is Kiko 3D Hydra Lipgloss available in Pakistan with COD?`,
      answer: `Yes. Kiko 3D Hydra Lipgloss is listed at ${price} with nationwide COD and Rs 250 shipping. Six shades are offered including Clear, Pearly Pink, Golden Red, and Brun Rose.`,
    });
  }

  if (cat.includes("kit") || slug.includes("kit") || slug.includes("bundle")) {
    faqs.push({
      question: `What is inside this kit or bundle?`,
      answer: `${p.description || name} Check the product overview above for piece count and finishes. Kits are built for complete looks so you need fewer separate purchases.`,
    });
  }

  if (cat.includes("nail")) {
    faqs.push({
      question: `How long do press-ons or nail sets last?`,
      answer: `With clean nails and proper adhesive, press-on styles typically last several days of careful wear. Avoid prolonged water soaking right after application.`,
    });
  }

  faqs.push({
    question: `How long does delivery take in Pakistan?`,
    answer: `Standard delivery is typically 3–5 working days depending on your city. Express options may be offered at checkout. Shipping is a flat Rs 250 nationwide.`,
  });

  faqs.push({
    question: `Can I return ${name}?`,
    answer: `Yes, unused ${name} in original condition can be returned within 7 days under our returns policy. Opened cosmetics may be limited for hygiene — contact support if you received a damaged item.`,
  });

  faqs.push({
    question: `Are reviews on ${name} verified?`,
    answer: `Yes. Only customers with a delivered or eligible order containing this product can submit a review. Fake or incentivised reviews are not published.`,
  });

  return faqs.slice(0, 8);
}

/** HowTo schema steps for lip products */
export function buildHowToSchema(p: SeoProduct) {
  return {
    "@type": "HowTo",
    name: `How to apply ${p.name}`,
    description: `Simple steps to wear ${p.name} for a soft-gloss look.`,
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Prep",
        text: "Start with clean, dry lips.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Apply",
        text: `Apply a thin layer of ${p.name}; build if you want more colour or shine.`,
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Finish",
        text: "Optional: pair with liner for definition. Reapply as needed.",
      },
    ],
  };
}

export function productCanonical(slug: string) {
  return `${siteConfig.url}/products/${slug}`;
}

export function collectionCanonical(slug: string) {
  return `${siteConfig.url}/collections/${slug}`;
}

export function collectionIntro(name: string, count: number): string {
  return `Shop ${name} in Pakistan at ${siteConfig.name}. ${count} product${
    count !== 1 ? "s" : ""
  } with clear PKR prices, nationwide cash on delivery, and flat shipping of Rs 250. Every product page includes an answer-first summary, FAQs, and verified-buyer reviews only. Use filters on the main shop or open a product for shades, kits contents, and delivery details.`;
}
