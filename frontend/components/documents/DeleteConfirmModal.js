"use client";

import { AlertTriangle, Loader2 } from "lucide-react";

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, docName, deleting }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <div className="flex items-center gap-3 text-amber-400 mb-3">
          <AlertTriangle className="w-6 h-6 shrink-0" />
          <h3 className="text-base sm:text-lg font-bold text-slate-100">Delete Document</h3>
        </div>

        <p className="text-xs text-slate-300 mb-6">
          Are you sure you want to delete <span className="font-semibold text-slate-100">{docName}</span>? This action will permanently remove the document and its parsed text content.
        </p>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <button
            onClick={onClose}
            disabled={deleting}
            className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={deleting}
            className="px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-500 rounded-lg transition-all shadow-md shadow-red-600/20 disabled:opacity-50 flex items-center gap-2"
          >
            {deleting ? (
              <>
                <Loader2 className="w-3 h-3 animate-spin" />
                <span>Deleting...</span>
              </>
            ) : (
              <span>Delete Permanently</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
