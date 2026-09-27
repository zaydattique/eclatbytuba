/** Site-wide business facts for SEO, checkout, footer */
export const siteConfig = {
  name: "Éclat by Tuba",
  description:
    "Soft gloss beauty for Pakistan — lip sets, Kiko, Rhode peptide & kits. Nationwide COD, shipping Rs 250.",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ogImage: "/og.png",
  shipping: {
    cod: true,
    nationwide: true,
    costPkr: 250,
    label: "All Pakistan · COD · Shipping Rs 250",
  },
  currency: "PKR",
};
