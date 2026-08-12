"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  UploadCloud, 
  BrainCircuit, 
  LogOut,
  X
} from "lucide-react";

export default function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Documents", href: "/documents", icon: FileText },
  ];

  const userName = user?.name || "Vedang Kanade";
  const userRole = user?.role || "Researcher";
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  const sidebarContent = (
    <div className="flex flex-col justify-between h-full">
      {/* Brand Header */}
      <div>
        <div className="p-6 flex items-center justify-between border-b border-slate-800/60">
          <Link href="/" onClick={onClose} className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-blue-400 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <BrainCircuit className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-slate-100 text-base tracking-tight leading-none flex items-center gap-1.5">
                ResearchAI
                <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-950/80 px-1.5 py-0.5 rounded border border-indigo-800/50">
                  PRO
                </span>
              </h1>
              <p className="text-xs text-slate-400 mt-1">Intelligence Platform</p>
            </div>
          </Link>
          {/* Mobile Close Button */}
          {onClose && (
            <button
              onClick={onClose}
              className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
              aria-label="Close Sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Action Button */}
        <div className="p-4">
          <Link
            href="/documents"
            onClick={onClose}
            className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-indigo-600/20 active:scale-[0.98]"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Upload Document</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="px-3 py-2 space-y-1">
          <div className="px-3 pb-2 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Main Menu
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname?.startsWith(item.href));

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg font-medium text-sm transition-colors ${
                  isActive
                    ? "bg-indigo-600/15 text-indigo-400 border border-indigo-500/30"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-indigo-400" : "text-slate-400"}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Profile Box */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-950/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 font-semibold text-xs shrink-0">
              {initials}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-slate-200 truncate">{userName}</p>
              <p className="text-[11px] text-slate-400 truncate">{userRole}</p>
            </div>
          </div>
          <button 
            onClick={logout}
            className="text-slate-500 hover:text-red-400 p-1.5 rounded-md hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
            title="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Always visible on md screens and up) */}
      <aside className="hidden md:flex w-64 bg-slate-900/90 border-r border-slate-800 flex-col justify-between shrink-0 select-none">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar Overlay Drawer (Visible on < md screens when isOpen is true) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity" 
            onClick={onClose} 
          />
          {/* Drawer container */}
          <aside className="relative w-72 max-w-[80vw] bg-slate-900 border-r border-slate-800 z-10 flex flex-col justify-between select-none shadow-2xl">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}
