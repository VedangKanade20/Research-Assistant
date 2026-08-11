"use client";

import Link from "next/link";
import { 
  FileText, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  ChevronLeft, 
  ChevronRight,
  Sparkles
} from "lucide-react";

export default function DocumentTable() {
  const documents = [
    {
      id: "doc-1",
      title: "dummy file",
      fileName: "dummy_file.pdf",
      size: "00",
      date: "00",
      status: "Processed",
      chunks: "00",
      queries: "00",
    },
    {
      id: "doc-2",
      title: "dummy file",
      fileName: "dummy_file.pdf",
      size: "00",
      date: "00",
      status: "Processed",
      chunks: "00",
      queries: "00",
    },
    {
      id: "doc-3",
      title: "dummy file",
      fileName: "dummy_file.pdf",
      size: "00",
      date: "00",
      status: "Processed",
      chunks: "00",
      queries: "00",
    },
  ];

  return (
    <div className="bg-slate-900/70 border border-slate-800/90 rounded-xl overflow-hidden shadow-lg shadow-black/20">
      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-950/60 border-b border-slate-800 text-xs uppercase text-slate-400 font-semibold tracking-wider">
            <tr>
              <th className="px-6 py-4">Document Title</th>
              <th className="px-6 py-4">File Size</th>
              <th className="px-6 py-4">Chunks</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Uploaded</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {documents.map((doc) => (
              <tr key={doc.id} className="hover:bg-slate-800/40 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-indigo-950/60 border border-indigo-800/40 text-indigo-400 shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <Link
                        href={`/documents/${doc.id}`}
                        className="font-semibold text-slate-100 hover:text-indigo-400 transition-colors block"
                      >
                        {doc.title}
                      </Link>
                      <span className="text-xs text-slate-500 font-mono">{doc.fileName}</span>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 text-xs font-mono text-slate-400">{doc.size}</td>

                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 text-xs font-mono text-slate-300">
                    {doc.chunks} vectors
                  </span>
                </td>

                <td className="px-6 py-4">
                  {doc.status === "Processed" ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/50 border border-emerald-800/40 text-emerald-400 text-xs font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Indexed</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-950/50 border border-amber-800/40 text-amber-400 text-xs font-medium">
                      <Clock className="w-3.5 h-3.5 animate-spin" />
                      <span>Embedding...</span>
                    </span>
                  )}
                </td>

                <td className="px-6 py-4 text-xs text-slate-400">{doc.date}</td>

                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/documents/${doc.id}`}
                      className="p-1.5 rounded-lg text-indigo-400 hover:bg-indigo-950/60 border border-transparent hover:border-indigo-800/40 transition-colors"
                      title="Open Detail & AI Chat"
                    >
                      <Sparkles className="w-4 h-4" />
                    </Link>
                    <button
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-950/40 transition-colors"
                      title="Delete Document"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer UI */}
      <div className="px-6 py-4 bg-slate-950/60 border-t border-slate-800/80 flex items-center justify-between">
        <div className="text-xs text-slate-400">
          Showing <span className="font-semibold text-slate-200">00</span> to <span className="font-semibold text-slate-200">00</span> of <span className="font-semibold text-slate-200">00</span> documents
        </div>

        {/* Pagination Buttons */}
        <div className="flex items-center gap-2">
          <button
            disabled
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-600 disabled:opacity-50 cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-1 text-xs">
            <button className="px-3 py-1 rounded-lg bg-indigo-600 font-semibold text-white">00</button>
          </div>
          <button className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
