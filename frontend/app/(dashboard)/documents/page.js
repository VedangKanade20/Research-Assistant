"use client";

import { useState } from "react";
import DocumentTable from "@/components/documents/DocumentTable";
import DocumentUploadModal from "@/components/documents/DocumentUploadModal";
import { UploadCloud, Search, Filter, RefreshCw } from "lucide-react";

export default function DocumentsPage() {
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header & Controls Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight">Research Documents</h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage your vector-indexed PDF papers and knowledge files.
          </p>
        </div>

        <button
          onClick={() => setIsUploadOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-md shadow-indigo-600/25 active:scale-[0.98]"
        >
          <UploadCloud className="w-4 h-4" />
          <span>Upload Document</span>
        </button>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter by title or filename..."
            className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <button className="px-3 py-2 bg-slate-950/60 border border-slate-800 hover:bg-slate-800 text-slate-300 rounded-lg text-xs font-medium flex items-center gap-2 transition-colors">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter Status</span>
          </button>

          <button className="p-2 bg-slate-950/60 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-slate-200 rounded-lg text-xs transition-colors">
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Document Table Component */}
      <DocumentTable />

      {/* Upload Drag & Drop Modal */}
      <DocumentUploadModal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} />
    </div>
  );
}
