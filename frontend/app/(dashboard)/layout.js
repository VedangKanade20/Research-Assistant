"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Sidebar from "@/components/navigation/Sidebar";
import Header from "@/components/navigation/Header";
import { Loader2, BrainCircuit } from "lucide-react";

export default function DashboardLayout({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [loading, isAuthenticated, router]);

  // Loading state overlay
  if (loading) {
    return (
      <div className="min-h-screen bg-[#090d16] flex flex-col items-center justify-center text-slate-100 space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 animate-pulse">
          <BrainCircuit className="w-6 h-6 text-white" />
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
          <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
          <span>Authenticating workspace session...</span>
        </div>
      </div>
    );
  }

  // If unauthenticated, prevent rendering protected layout
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#090d16] text-slate-100">
      {/* Shared Sidebar */}
      <Sidebar 
        isOpen={mobileSidebarOpen} 
        onClose={() => setMobileSidebarOpen(false)} 
      />

      {/* Main Content Viewport */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Shared Top Navigation Header */}
        <Header 
          onToggleSidebar={() => setMobileSidebarOpen((prev) => !prev)} 
        />

        {/* Dynamic Page Views */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
