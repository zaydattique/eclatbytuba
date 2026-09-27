export * from "./rate-limit";
export * from "./security";
export * from "./queue";
export * from "./search";
export * from "./analytics";

export const siteConfig = {
  name: "Éclat by Tuba",
  description: "Soft gloss beauty — treat yourself. Soft Gloss Pastel, Plus Jakarta Sans only.",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ogImage: "/og.png",
};
