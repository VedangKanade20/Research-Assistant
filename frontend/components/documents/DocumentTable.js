"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  FileText, 
  Trash2, 
  CheckCircle2, 
  Sparkles,
  Loader2,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export default function DocumentTable({ documents = [], loading = false, onDelete }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(documents.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentDocuments = documents.slice(startIndex, startIndex + itemsPerPage);

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
      {/* Desktop & Tablet Table View */}
      <div className="hidden md:block overflow-x-auto">
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
            ) : currentDocuments.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-12 text-center text-slate-400">
                  <p className="text-sm font-semibold text-slate-300">No documents found</p>
                  <p className="text-xs text-slate-500 mt-1">Upload a PDF or TXT file to begin research.</p>
                </td>
              </tr>
            ) : (
              currentDocuments.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-indigo-950/60 border border-indigo-800/40 text-indigo-400 shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
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
                      <Link
                        href={`/documents/${doc.id}`}
                        className="p-1.5 rounded-lg text-indigo-400 hover:bg-indigo-950/60 border border-indigo-900/40 hover:border-indigo-700/60 transition-colors flex items-center gap-1 text-xs font-medium"
                        title="Open Interactive RAG Chat"
                      >
                        <Sparkles className="w-4 h-4" />
                        <span>Chat PDF</span>
                      </Link>
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

      {/* Mobile Cards View */}
      <div className="block md:hidden p-4 space-y-3">
        {loading ? (
          <div className="py-12 text-center text-slate-400 flex items-center justify-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin text-indigo-500" />
            <span className="text-xs">Loading research documents...</span>
          </div>
        ) : currentDocuments.length === 0 ? (
          <div className="py-12 text-center text-slate-400">
            <p className="text-sm font-semibold text-slate-300">No documents found</p>
            <p className="text-xs text-slate-500 mt-1">Upload a PDF or TXT file to begin research.</p>
          </div>
        ) : (
          currentDocuments.map((doc) => (
            <div key={doc.id} className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <div className="p-2 rounded-lg bg-indigo-950/60 border border-indigo-800/40 text-indigo-400 shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-slate-100 text-xs truncate">{doc.filename}</h4>
                    <p className="text-[10px] text-slate-500 font-mono">ID: {doc.id.substring(0, 8)}...</p>
                  </div>
                </div>
                <span className="uppercase px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] font-bold tracking-wider text-indigo-300 shrink-0">
                  {doc.fileType || "pdf"}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/60">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950/50 border border-emerald-800/40 text-emerald-400 text-[10px] font-medium">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Parsed</span>
                  </span>
                  <span className="font-mono text-[11px]">{formatBytes(doc.originalSize)}</span>
                </div>
                <span className="text-[11px]">{formatDate(doc.createdAt)}</span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800/40">
                <Link
                  href={`/documents/${doc.id}`}
                  className="flex-1 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-center text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/20"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Chat PDF</span>
                </Link>
                <button
                  onClick={() => onDelete(doc.id, doc.filename)}
                  className="p-2 rounded-lg text-slate-400 hover:text-red-400 bg-slate-900 border border-slate-800 hover:bg-red-950/40 transition-colors"
                  title="Delete Document"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination Footer */}
      {!loading && documents.length > 0 && (
        <div className="px-4 sm:px-6 py-3.5 bg-slate-950/60 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div>
            Showing <span className="font-semibold text-slate-200">{startIndex + 1}</span> to{" "}
            <span className="font-semibold text-slate-200">
              {Math.min(startIndex + itemsPerPage, documents.length)}
            </span>{" "}
            of <span className="font-semibold text-slate-200">{documents.length}</span> documents
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-medium text-slate-300">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
