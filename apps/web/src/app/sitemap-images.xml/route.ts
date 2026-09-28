import { siteConfig } from "@eclat/config";
import { getAllProducts } from "@/lib/products";

export async function GET() {
  const base = siteConfig.url;
  let urls = "";
  try {
    const products = await getAllProducts();
    for (const p of products) {
      const imgs = p.images?.length ? p.images : [];
      for (const img of imgs) {
        urls += `
  <url>
    <loc>${base}/products/${p.slug}</loc>
    <image:image>
      <image:loc>${escapeXml(img)}</image:loc>
      <image:title>${escapeXml(p.name)} Pakistan</image:title>
      <image:caption>${escapeXml(p.name)} — COD, shipping Rs 250</image:caption>
    </image:image>
  </url>`;
      }
    }
  } catch {
    /* empty */
  }

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

function escapeXml(s: string) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
