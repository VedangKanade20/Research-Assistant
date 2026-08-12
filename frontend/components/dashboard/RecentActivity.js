"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { FileText, Sparkles, ArrowRight, CheckCircle2, Clock } from "lucide-react";

export default function RecentActivity() {
  const { token } = useAuth();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    async function fetchRecentDocs() {
      try {
        const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:6968";
        const res = await fetch(`${API_BASE}/api/v1/documents`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const json = await res.json();
        if (res.ok && Array.isArray(json.data)) {
          setDocuments(json.data.slice(0, 3));
        }
      } catch (err) {
        console.error("Failed to fetch recent activity:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchRecentDocs();
  }, [token]);

  const formatDate = (isoString) => {
    if (!isoString) return "Recently";
    return new Date(isoString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    });
  };

  return (
    <div className="bg-slate-900/70 border border-slate-800/90 rounded-xl p-6 shadow-lg shadow-black/20">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-bold text-slate-100">Recent Documents</h3>
          <p className="text-xs text-slate-400">Latest vector indexed files and summaries</p>
        </div>
        <Link
          href="/documents"
          className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors"
        >
          <span>View All Documents</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="space-y-3">
        {loading ? (
          <div className="p-4 text-center text-xs text-slate-500">Loading recent activity...</div>
        ) : documents.length === 0 ? (
          <div className="p-6 text-center text-slate-400 bg-slate-950/40 border border-slate-800/60 rounded-xl">
            <p className="text-xs font-medium text-slate-300">No documents uploaded yet</p>
            <p className="text-[11px] text-slate-500 mt-1">Upload a PDF or TXT file to start research.</p>
          </div>
        ) : (
          documents.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/50 border border-slate-800/60 hover:border-slate-700/80 transition-all"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="p-2.5 rounded-lg bg-indigo-950/60 border border-indigo-800/40 text-indigo-400 shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs font-bold text-slate-200 truncate">{doc.filename}</p>
                  <p className="text-[11px] text-slate-400 truncate mt-0.5">
                    {doc.summary ? `Summary: "${doc.summary.slice(0, 60)}..."` : "Vector Indexed & Ready"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 ml-4">
                <span className="text-[10px] text-slate-400 font-medium">
                  {formatDate(doc.createdAt)}
                </span>
                <Link
                  href={`/documents/${doc.id}`}
                  className="px-2.5 py-1 rounded-lg bg-indigo-950/80 border border-indigo-800/50 text-indigo-400 hover:text-indigo-300 text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Chat PDF</span>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
