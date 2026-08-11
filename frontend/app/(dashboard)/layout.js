import Sidebar from "@/components/navigation/Sidebar";
import Header from "@/components/navigation/Header";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#090d16] text-slate-100">
      {/* Shared Sidebar */}
      <Sidebar />

      {/* Main Content Viewport */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Shared Top Navigation Header */}
        <Header />

        {/* Dynamic Page Views */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
