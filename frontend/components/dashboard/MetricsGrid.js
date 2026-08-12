"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { 
  FileText, 
  HardDrive, 
  Zap, 
  MessageSquare, 
  Loader2 
} from "lucide-react";

export default function MetricsGrid() {
  const { token } = useAuth();
  const [metricsData, setMetricsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    async function fetchMetrics() {
      try {
        const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:6968";
        const res = await fetch(`${API_BASE}/api/v1/dashboard/metrics`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const json = await res.json();
        if (res.ok && json.data) {
          setMetricsData(json.data);
        }
      } catch (err) {
        console.error("Failed to fetch dashboard metrics:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchMetrics();
  }, [token]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 flex items-center gap-3 animate-pulse">
            <div className="w-10 h-10 rounded-lg bg-slate-800 shrink-0" />
            <div className="space-y-2 flex-1">
              <div className="h-3 bg-slate-800 rounded w-1/2" />
              <div className="h-5 bg-slate-800 rounded w-3/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  const cards = [
    {
      title: "Total Documents",
      value: metricsData?.totalDocuments ?? 0,
      subtext: "Parsed research files",
      icon: FileText,
      color: "text-blue-400",
      bg: "bg-blue-950/40 border-blue-800/40",
    },
    {
      title: "Storage Footprint",
      value: metricsData?.totalStorageFormatted ?? "0 MB",
      subtext: "Raw file storage footprint",
      icon: HardDrive,
      color: "text-purple-400",
      bg: "bg-purple-950/40 border-purple-800/40",
    },
    {
      title: "Questions Asked",
      value: metricsData?.totalQuestionsAsked ?? 0,
      subtext: "Grounded RAG queries",
      icon: MessageSquare,
      color: "text-emerald-400",
      bg: "bg-emerald-950/40 border-emerald-800/40",
    },
    {
      title: "Gemini Tokens",
      value: (metricsData?.totalTokensConsumed ?? 0).toLocaleString(),
      subtext: "Cumulative LLM tokens",
      icon: Zap,
      color: "text-amber-400",
      bg: "bg-amber-950/40 border-amber-800/40",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className="bg-slate-900/70 border border-slate-800/90 rounded-xl p-4 sm:p-5 hover:border-slate-700 transition-all shadow-md flex items-center justify-between gap-3"
          >
            <div>
              <p className="text-xs font-medium text-slate-400 mb-1">{card.title}</p>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-100 tracking-tight">{card.value}</h3>
              <p className="text-[11px] text-slate-500 mt-1">{card.subtext}</p>
            </div>
            <div className={`p-2.5 sm:p-3 rounded-xl border ${card.bg} ${card.color} shrink-0`}>
              <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
