export const siteConfig = {
  name: "Éclat by Tuba",
  description: "Luxury fashion & lifestyle brand",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  adminUrl: process.env.NEXT_PUBLIC_ADMIN_URL || "http://localhost:3001",
  ogImage: "/og.jpg",
  links: {
    instagram: "https://instagram.com/eclatbytuba",
    facebook: "https://facebook.com/eclatbytuba",
  },
} as const;

export const brandColors = {
  primary: "#1a1a1a",
  secondary: "#c9a86c", // gold accent
  accent: "#8b7355",
  background: "#faf9f7",
  foreground: "#1a1a1a",
  muted: "#f5f3ef",
  border: "#e8e4dc",
} as const;
