"use client";

import { UploadCloud, FileText, X, CheckCircle, AlertCircle } from "lucide-react";

export default function DocumentUploadModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-slate-100">Upload Research Document</h3>
            <p className="text-xs text-slate-400">PDF, TXT, or Markdown documents (max 25MB)</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drag & Drop Upload Zone */}
        <div className="my-6 border-2 border-dashed border-slate-700/80 hover:border-indigo-500/80 rounded-xl p-8 flex flex-col items-center justify-center text-center bg-slate-950/40 hover:bg-indigo-950/10 transition-all cursor-pointer group">
          <div className="w-14 h-14 rounded-2xl bg-indigo-950/60 border border-indigo-800/50 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <UploadCloud className="w-7 h-7 text-indigo-400" />
          </div>
          <h4 className="text-sm font-semibold text-slate-200">
            Drag and drop your PDF here, or <span className="text-indigo-400 underline">browse</span>
          </h4>
          <p className="text-xs text-slate-500 mt-1">
            Automatic chunking, vector embedding, and summary generation will be performed.
          </p>
        </div>

        {/* Mock File Status Preview */}
        <div className="p-3 bg-slate-950/60 border border-slate-800/80 rounded-lg flex items-center justify-between text-xs mb-6">
          <div className="flex items-center gap-3">
            <FileText className="w-4 h-4 text-indigo-400" />
            <div>
              <p className="font-semibold text-slate-200">sample_research_paper.pdf</p>
              <p className="text-[11px] text-slate-500">2.4 MB • Ready to process</p>
            </div>
          </div>
          <span className="text-emerald-400 font-medium bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40">
            Ready
          </span>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-all shadow-md shadow-indigo-600/20"
          >
            Start Ingestion & Embedding
          </button>
        </div>
      </div>
    </div>
  );
}
