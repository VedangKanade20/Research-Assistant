"use client";

import Link from "next/link";
import { Sparkles, FileText } from "lucide-react";

export default function Header() {
  return (
    <header className="h-16 bg-slate-900/60 border-b border-slate-800/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Title / Status */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-800/40 text-emerald-400 text-xs font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>RAG Engine Ready</span>
        </div>
      </div>

      {/* Quick Action Button */}
      <div className="flex items-center gap-3">
        <Link
          href="/documents"
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all shadow-md shadow-indigo-600/20"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>My Documents</span>
        </Link>
      </div>
    </header>
  );
}
