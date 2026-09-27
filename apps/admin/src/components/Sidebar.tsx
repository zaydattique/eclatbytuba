"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ADMIN_NAV } from "@/lib/nav";

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/login") return null;

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-[#F0D6E0] bg-white">
      <div className="flex h-16 items-center border-b border-[#F0D6E0] px-6">
        <span className="text-lg font-semibold tracking-tight text-[#2D2A2B]">
          Éclat Admin
        </span>
      </div>
      <nav className="flex h-[calc(100vh-4rem)] flex-col justify-between p-4">
        <div className="space-y-1">
          {ADMIN_NAV.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`block rounded-[12px] px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-[#C45C7A] text-white"
                    : "text-[#2D2A2B] hover:bg-[#FFF0F5]"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
        <button
          onClick={handleLogout}
          className="rounded-[12px] px-3 py-2 text-left text-sm font-medium text-[#6B5E62] hover:bg-[#FFF0F5] hover:text-[#2D2A2B]"
        >
          Sign out
        </button>
      </nav>
    </aside>
  );
}
