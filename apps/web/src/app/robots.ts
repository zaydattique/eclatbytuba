import { MetadataRoute } from "next";
import { siteConfig } from "@eclat/config";

export default function robots(): MetadataRoute.Robots {
  const base = siteConfig.url;
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/cart", "/checkout", "/login", "/account"],
      },
    ],
    sitemap: [`${base}/sitemap.xml`, `${base}/sitemap-images.xml`],
  };
}
