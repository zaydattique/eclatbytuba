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
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-gray-200 bg-white">
      <div className="flex h-16 items-center border-b border-gray-200 px-6">
        <span className="text-lg font-semibold tracking-tight">Éclat Admin</span>
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
                className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-gray-900 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
        <button
          onClick={handleLogout}
          className="rounded-md px-3 py-2 text-left text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900"
        >
          Sign out
        </button>
      </nav>
    </aside>
  );
}
