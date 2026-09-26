export default function AdminDashboard() {
  return (
    <div className="min-h-screen">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-gray-200 bg-white">
        <div className="flex h-16 items-center border-b border-gray-200 px-6">
          <span className="text-lg font-semibold tracking-tight">Éclat Admin</span>
        </div>
        <nav className="space-y-1 p-4">
          {["Dashboard", "Products", "Orders", "Customers", "Categories", "Settings"].map(
            (item) => (
              <a
                key={item}
                href="#"
                className="block rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                {item}
              </a>
            )
          )}
        </nav>
      </aside>

      {/* Main */}
      <main className="ml-64 p-8">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">Welcome back to Éclat by Tuba admin.</p>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Total Orders", value: "—" },
            { label: "Revenue", value: "—" },
            { label: "Products", value: "—" },
            { label: "Customers", value: "—" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
            >
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              <p className="mt-2 text-3xl font-semibold">{stat.value}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
