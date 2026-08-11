"use client";

import { Search, Bell, Activity, Sparkles, Command } from "lucide-react";

export default function Header() {
  return (
    <header className="h-16 bg-slate-900/60 border-b border-slate-800/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Search Input UI bar */}
      <div className="relative w-72 md:w-96">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search research documents, summaries..."
          className="w-full bg-slate-950/60 border border-slate-800 rounded-lg pl-9 pr-12 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/60 transition-colors"
          readOnly
        />
        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 text-[10px] text-slate-500 bg-slate-800/60 px-1.5 py-0.5 rounded border border-slate-700/50">
          <Command className="w-2.5 h-2.5" />
          <span>K</span>
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-4">
        {/* Status Indicator */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-800/40 text-emerald-400 text-xs font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>RAG Engine: Ready</span>
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500"></span>
        </button>

        {/* AI Quick Prompt trigger */}
        <button className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-950/60 border border-indigo-800/50 text-indigo-300 hover:bg-indigo-900/60 text-xs font-medium transition-colors">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Ask Assistant</span>
        </button>
      </div>
    </header>
  );
}
