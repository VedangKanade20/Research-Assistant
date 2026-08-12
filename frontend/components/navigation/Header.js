"use client";

import Link from "next/link";
import { FileText, Menu } from "lucide-react";

export default function Header({ onToggleSidebar }) {
  return (
    <header className="h-16 bg-slate-900/60 border-b border-slate-800/80 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Mobile Menu Button + Status */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800/80 transition-colors"
          aria-label="Open Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-800/40 text-emerald-400 text-xs font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
          <span className="truncate">RAG Engine Ready</span>
        </div>
      </div>

      {/* Quick Action Button */}
      <div className="flex items-center gap-3">
        <Link
          href="/documents"
          className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all shadow-md shadow-indigo-600/20"
        >
          <FileText className="w-3.5 h-3.5 shrink-0" />
          <span className="hidden sm:inline">My Documents</span>
          <span className="sm:hidden">Docs</span>
        </Link>
      </div>
    </header>
  );
}
