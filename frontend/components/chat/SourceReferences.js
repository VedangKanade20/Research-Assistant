"use client";

import { FileSearch, Layers, Sparkles, Hash, ExternalLink } from "lucide-react";

export default function SourceReferences() {
  const sources = [
    {
      id: "chunk-102",
      page: 6,
      section: "Section 3.5 Positional Encoding",
      score: "96% Match",
      snippet:
        "Since our model contains no recurrence and no convolution, in order for the model to make use of the order of the sequence, we must inject some information about the relative or absolute position of the tokens.",
    },
    {
      id: "chunk-108",
      page: 8,
      section: "Section 4.1 Scaled Dot-Product Attention",
      score: "91% Match",
      snippet:
        "We compute the matrix of outputs as Softmax(QK^T / sqrt(d_k)) V. The scaling factor of 1/sqrt(d_k) prevents dot products from growing large in magnitude.",
    },
  ];

  return (
    <div className="h-full bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col space-y-4 shadow-xl">
      <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
        <FileSearch className="w-4 h-4 text-indigo-400" />
        <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
          RAG Vector Citations
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {sources.map((src) => (
          <div
            key={src.id}
            className="p-3 bg-slate-950/60 border border-slate-800/80 rounded-lg hover:border-slate-700 transition-colors space-y-2"
          >
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-semibold text-indigo-400 flex items-center gap-1">
                <Hash className="w-3 h-3" /> Page {src.page}
              </span>
              <span className="px-1.5 py-0.5 rounded bg-indigo-950/80 border border-indigo-800/40 text-indigo-300 font-mono text-[10px]">
                {src.score}
              </span>
            </div>

            <p className="text-[10px] font-semibold text-slate-300">{src.section}</p>

            <p className="text-[11px] text-slate-400 italic bg-slate-900/80 p-2 rounded border border-slate-800/60 leading-normal">
              &quot;{src.snippet}&quot;
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
