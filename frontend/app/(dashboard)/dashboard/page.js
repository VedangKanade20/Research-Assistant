import MetricsGrid from "@/components/dashboard/MetricsGrid";
import RecentActivity from "@/components/dashboard/RecentActivity";
import { Sparkles, UploadCloud } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Welcome Hero Banner */}
      <div className="relative rounded-2xl bg-gradient-to-r from-indigo-950/80 via-slate-900 to-slate-900 border border-indigo-900/40 p-6 md:p-8 overflow-hidden shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-900/50 border border-indigo-700/40 text-indigo-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>AI Research Assistant Operational</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-100 tracking-tight">
              Research Workspace & Analytics
            </h1>
            <p className="text-sm text-slate-400 mt-2 max-w-2xl">
              Upload research documents, generate instant executive summaries, and query your knowledge base using RAG-powered vector search.
            </p>
          </div>

          <Link
            href="/documents"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-600/30 shrink-0"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Upload New PDF</span>
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div>
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
          System Performance & Metrics
        </h2>
        <MetricsGrid />
      </div>

      {/* Activity Feed */}
      <RecentActivity />
    </div>
  );
}
