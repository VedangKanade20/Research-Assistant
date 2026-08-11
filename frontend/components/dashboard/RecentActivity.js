"use client";

import Link from "next/link";
import { FileText, Sparkles, MessageSquare, ArrowRight, CheckCircle2, Clock } from "lucide-react";

export default function RecentActivity() {
  const activities = [
    {
      id: "1",
      title: "Attention Is All You Need (Transformer Paper)",
      type: "Document Summary Generated",
      time: "10 minutes ago",
      status: "Completed",
      icon: Sparkles,
      iconColor: "text-indigo-400 bg-indigo-950/60 border-indigo-800/40",
    },
    {
      id: "2",
      title: "DeepSeek-V3 Technical Report",
      type: "PDF Uploaded & Vector Indexed",
      time: "1 hour ago",
      status: "Completed",
      icon: FileText,
      iconColor: "text-emerald-400 bg-emerald-950/60 border-emerald-800/40",
    },
    {
      id: "3",
      title: "Q&A Session: Multi-Head Self Attention Query",
      type: "14 Questions Answered",
      time: "3 hours ago",
      status: "Completed",
      icon: MessageSquare,
      iconColor: "text-purple-400 bg-purple-950/60 border-purple-800/40",
    },
  ];

  return (
    <div className="bg-slate-900/70 border border-slate-800/90 rounded-xl p-6 shadow-lg shadow-black/20">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-bold text-slate-100">Recent Research Activity</h3>
          <p className="text-xs text-slate-400">Latest vector indexing and query interactions</p>
        </div>
        <Link
          href="/documents"
          className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors"
        >
          <span>View All Documents</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="space-y-4">
        {activities.map((act) => {
          const Icon = act.icon;
          return (
            <div
              key={act.id}
              className="flex items-center justify-between p-4 rounded-lg bg-slate-950/50 border border-slate-800/60 hover:border-slate-700/80 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className={`p-2.5 rounded-lg border ${act.iconColor}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-200">{act.title}</h4>
                  <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                    <span>{act.type}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      {act.time}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-800/40 text-emerald-400 text-xs font-medium shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{act.status}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
