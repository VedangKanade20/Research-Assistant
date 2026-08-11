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
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Documents", href: "/documents", icon: FileText },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  const userName = user?.name || "Vedang Kanade";
  const userRole = user?.role || "Researcher";
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <aside className="w-64 bg-slate-900/90 border-r border-slate-800 flex flex-col justify-between shrink-0 select-none">
      {/* Brand Header */}
      <div>
        <div className="p-6 flex items-center gap-3 border-b border-slate-800/60">
          <Link href="/" className="flex items-center gap-3 group">
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
        </div>

        {/* Action Button */}
        <div className="p-4">
          <Link
            href="/documents"
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
    </aside>
  );
}
