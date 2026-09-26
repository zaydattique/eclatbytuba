import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { MainContent } from "@/components/MainContent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Admin | Éclat by Tuba",
    template: "%s | Éclat Admin",
  },
  description: "Admin dashboard for Éclat by Tuba",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-gray-50 text-gray-900`}>
        <Sidebar />
        <MainContent>{children}</MainContent>
      </body>
    </html>
  );
}
