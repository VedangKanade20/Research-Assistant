"use client";

import Link from "next/link";
import { 
  FileText, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  Loader2
} from "lucide-react";

export default function DocumentTable({ documents = [], loading = false, onDelete }) {
  const formatBytes = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const formatDate = (isoString) => {
    if (!isoString) return "N/A";
    return new Date(isoString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  return (
    <div className="bg-slate-900/70 border border-slate-800/90 rounded-xl overflow-hidden shadow-lg shadow-black/20">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-950/60 border-b border-slate-800 text-xs uppercase text-slate-400 font-semibold tracking-wider">
            <tr>
              <th className="px-6 py-4">Document Title</th>
              <th className="px-6 py-4">File Type</th>
              <th className="px-6 py-4">File Size</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Uploaded</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {loading ? (
              <tr>
                <td colSpan="6" className="px-6 py-12 text-center text-slate-400">
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin text-indigo-500" />
                    <span>Loading research documents...</span>
                  </div>
                </td>
              </tr>
            ) : documents.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-12 text-center text-slate-400">
                  <p className="text-sm font-semibold text-slate-300">No documents found</p>
                  <p className="text-xs text-slate-500 mt-1">Upload a PDF or TXT file to begin research.</p>
                </td>
              </tr>
            ) : (
              documents.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-indigo-950/60 border border-indigo-800/40 text-indigo-400 shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-semibold text-slate-100 block truncate max-w-xs">
                          {doc.filename}
                        </span>
                        <span className="text-[11px] text-slate-500 font-mono">ID: {doc.id.substring(0, 8)}...</span>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="uppercase px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] font-bold tracking-wider text-indigo-300">
                      {doc.fileType || "pdf"}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-xs font-mono text-slate-400">
                    {formatBytes(doc.originalSize)}
                  </td>

                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/50 border border-emerald-800/40 text-emerald-400 text-xs font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Parsed</span>
                    </span>
                  </td>

                  <td className="px-6 py-4 text-xs text-slate-400">
                    {formatDate(doc.createdAt)}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onDelete(doc.id, doc.filename)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-950/40 transition-colors"
                        title="Delete Document"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
