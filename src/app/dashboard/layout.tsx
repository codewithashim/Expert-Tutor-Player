import { Sidebar } from "@/features/Dashboard/@component/DashboardSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900" suppressHydrationWarning>
      <div
        className="lg:w-64 h-full bg-white"
        style={{ width: "16rem", height: "100%" }}
      >
        <Sidebar />
      </div>

      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
}
