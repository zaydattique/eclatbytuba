import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@eclat/config";
import { CartProvider } from "@/context/CartContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AnalyticsBeacon } from "@/components/AnalyticsBeacon";
import { PixelScripts } from "@/components/PixelScripts";
import { PlayElement } from "@/components/PlayElement";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Soft Gloss Beauty Pakistan`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
  },
};

export const viewport: Viewport = {
  themeColor: "#C45C7A",
  width: "device-width",
  initialScale: 1,
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/og.png`,
  description: siteConfig.description,
  email: siteConfig.email || "hello@eclatbytuba.com",
  areaServed: {
    "@type": "Country",
    name: "Pakistan",
  },
  sameAs: [
    // Fill real profiles when live — empty sameAs hurts less than fake URLs
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-PK">
      <body
        className={`${plusJakarta.variable} font-sans antialiased`}
        style={{ background: "#FFF0F5", color: "#2D2A2B" }}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <PixelScripts />
        <CartProvider>
          <Header />
          {children}
          <Footer />
          <PlayElement />
          <Suspense fallback={null}>
            <AnalyticsBeacon />
          </Suspense>
        </CartProvider>
      </body>
    </html>
  );
}
