"use client";

import { 
  FileText, 
  Cpu, 
  Zap, 
  MessageSquare, 
  Sparkles, 
  Clock, 
  TrendingUp 
} from "lucide-react";

export default function MetricsGrid() {
  const metrics = [
    {
      title: "Total Documents",
      value: "42",
      change: "+12% this month",
      icon: FileText,
      color: "text-blue-400",
      bg: "bg-blue-950/40 border-blue-800/40",
    },
    {
      title: "AI Requests",
      value: "1,284",
      change: "+24% this week",
      icon: Cpu,
      color: "text-indigo-400",
      bg: "bg-indigo-950/40 border-indigo-800/40",
    },
    {
      title: "Tokens Used",
      value: "348.5K",
      change: "Standard plan tier",
      icon: Zap,
      color: "text-amber-400",
      bg: "bg-amber-950/40 border-amber-800/40",
    },
    {
      title: "Questions Asked",
      value: "892",
      change: "High engagement",
      icon: MessageSquare,
      color: "text-emerald-400",
      bg: "bg-emerald-950/40 border-emerald-800/40",
    },
    {
      title: "Summaries Generated",
      value: "156",
      change: "Auto-synthesized",
      icon: Sparkles,
      color: "text-purple-400",
      bg: "bg-purple-950/40 border-purple-800/40",
    },
    {
      title: "Avg Response Time",
      value: "1.2s",
      change: "Low latency RAG",
      icon: Clock,
      color: "text-cyan-400",
      bg: "bg-cyan-950/40 border-cyan-800/40",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {metrics.map((m) => {
        const Icon = m.icon;
        return (
          <div
            key={m.title}
            className="bg-slate-900/70 border border-slate-800/90 rounded-xl p-5 hover:border-slate-700 transition-all shadow-lg shadow-black/20"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {m.title}
              </span>
              <div className={`p-2 rounded-lg border ${m.bg}`}>
                <Icon className={`w-4 h-4 ${m.color}`} />
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <h2 className="text-2xl font-bold text-slate-100 tracking-tight">{m.value}</h2>
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-emerald-400" />
                {m.change}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
