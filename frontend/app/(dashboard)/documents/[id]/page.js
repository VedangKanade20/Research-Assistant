"use client";

import Link from "next/link";
import ChatInterface from "@/components/chat/ChatInterface";
import SourceReferences from "@/components/chat/SourceReferences";
import { 
  ArrowLeft, 
  FileText, 
  Sparkles, 
  BookOpen, 
  Download, 
  Layers, 
  Tag 
} from "lucide-react";

export default function DocumentDetailPage({ params }) {
  return (
    <div className="h-[calc(100vh-6.5rem)] flex flex-col space-y-4">
      {/* Top Title Bar */}
      <div className="flex items-center justify-between bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-3 shrink-0">
        <div className="flex items-center gap-3">
          <Link
            href="/documents"
            className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>

          <div>
            <h1 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              Attention Is All You Need
              <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded">
                Indexed & Ready
              </span>
            </h1>
            <p className="text-[11px] text-slate-400">
              Vaswani et al. (2017) • 15 pages • 48 vector embeddings
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-slate-100 flex items-center gap-1.5 transition-colors">
            <Download className="w-3.5 h-3.5" />
            <span>PDF</span>
          </button>
        </div>
      </div>

      {/* Main 3-Pane Split Viewport */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-0">
        {/* Left Pane: Document Summary Card */}
        <div className="lg:col-span-4 bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col space-y-3 overflow-y-auto shadow-xl">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              AI Summary & Insights
            </h3>
          </div>

          <div className="space-y-3 text-xs leading-relaxed text-slate-300">
            <div className="p-3 rounded-lg bg-indigo-950/40 border border-indigo-800/40">
              <p className="font-semibold text-indigo-300 mb-1 text-[11px] uppercase tracking-wider">
                Core Innovation
              </p>
              <p>
                Introduces the **Transformer architecture** based entirely on self-attention mechanisms, dispensing with recurrent or convolutional neural networks.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-slate-200 mb-1 text-[11px] uppercase tracking-wider">
                Key Takeaways
              </h4>
              <ul className="list-disc list-inside space-y-1.5 text-slate-400 text-[11px]">
                <li>Significantly reduces training time compared to RNNs.</li>
                <li>Achieves 28.4 BLEU on English-to-German translation.</li>
                <li>Uses Multi-Head Attention to attend to info from different representation subspaces.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Center Pane: Interactive AI Chat */}
        <div className="lg:col-span-5 h-full">
          <ChatInterface />
        </div>

        {/* Right Pane: Source Context References */}
        <div className="lg:col-span-3 h-full">
          <SourceReferences />
        </div>
      </div>
    </div>
  );
}
