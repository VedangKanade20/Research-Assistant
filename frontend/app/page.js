"use client";

import Link from "next/link";
import { 
  BrainCircuit, 
  ArrowRight, 
  Sparkles, 
  FileText, 
  Search, 
  ShieldCheck, 
  Zap, 
  Layers, 
  MessageSquare, 
  CheckCircle2,
  Lock,
  Globe,
  Database
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col selection:bg-indigo-500/30 selection:text-indigo-300">
      {/* Background Radial Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Top Navbar */}
      <header className="h-20 border-b border-slate-800/80 bg-slate-950/60 backdrop-blur-md sticky top-0 z-50 px-6 md:px-12 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-blue-400 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
            <BrainCircuit className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-extrabold text-slate-100 text-lg tracking-tight leading-none flex items-center gap-1.5">
              ResearchAI
              <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-950/80 px-1.5 py-0.5 rounded border border-indigo-800/50">
                RAG
              </span>
            </h1>
            <p className="text-[11px] text-slate-400 mt-0.5">AI Research Assistant</p>
          </div>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-300">
          <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-indigo-400 transition-colors">How It Works</a>
          <a href="#architecture" className="hover:text-indigo-400 transition-colors">RAG Engine</a>
        </nav>

        {/* Right CTA buttons */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl transition-all"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all shadow-lg shadow-indigo-600/25 flex items-center gap-1.5"
          >
            <span>Try for Free</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-6 md:px-12 max-w-7xl mx-auto text-center relative">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/70 border border-indigo-800/50 text-indigo-300 text-xs font-medium mb-6 shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Next-Generation Vector RAG & Document Intelligence</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-100 max-w-4xl mx-auto leading-[1.15]">
          Accelerate Academic & Industrial Research with <span className="bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">AI Intelligence</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto mt-6 leading-relaxed">
          Upload PDFs, extract multi-page summaries, and ask complex technical questions with instant, verifiable page-level source citations.
        </p>

        {/* Hero CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/register"
            className="w-full sm:w-auto px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-xl shadow-indigo-600/30 active:scale-[0.99]"
          >
            <span>Start Free Trial</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-8 py-3.5 bg-slate-900/90 border border-slate-800 hover:bg-slate-800/80 text-slate-200 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all"
          >
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>Explore Demo Workspace</span>
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 flex items-center justify-center gap-6 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> No credit card required
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Private vector database
          </span>
        </div>

        {/* App Showcase Graphic Mockup */}
        <div className="mt-16 relative mx-auto max-w-5xl rounded-2xl border border-slate-800 bg-slate-900/80 p-3 shadow-2xl backdrop-blur-xl">
          <div className="rounded-xl overflow-hidden bg-[#090d16] border border-slate-800/80 p-6 text-left space-y-4">
            {/* Header bar */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-xs font-mono text-slate-500 ml-2">research-workspace / attention_is_all_you_need.pdf</span>
              </div>
              <span className="text-xs font-mono text-indigo-400 bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-800/40">
                RAG Confidence: 98.4%
              </span>
            </div>

            {/* Content Mock */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-5 bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-[10px] font-semibold uppercase text-purple-400 tracking-wider">AI Executive Summary</span>
                <h4 className="text-xs font-bold text-slate-200">Attention Mechanism Breakthrough</h4>
                <p className="text-[11px] text-slate-400 leading-normal">
                  Displaces recurrence and convolutions with Multi-Head Self-Attention, reducing training steps while achieving state-of-the-art translation BLEU scores.
                </p>
              </div>

              <div className="md:col-span-7 bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center text-[10px] font-bold text-white shrink-0">AI</div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
                    Positional encodings are added to embeddings to encode sequence order without increasing parameter dimensions.
                  </div>
                </div>
                <div className="flex gap-1.5 justify-end text-[10px] font-mono text-indigo-400">
                  <span>📍 Page 6, Section 3.5</span>
                  <span>📍 96% Match</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 md:px-12 border-t border-slate-800/60 bg-slate-950/40">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Built for Serious Researchers</span>
            <h2 className="text-3xl font-bold text-slate-100 tracking-tight">Everything You Need for Literature Review</h2>
            <p className="text-sm text-slate-400">Read faster, verify facts instantly, and build a unified research library.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900/70 border border-slate-800 p-6 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-950 border border-indigo-800/50 flex items-center justify-center text-indigo-400">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-200">PDF Ingestion & Chunking</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Automatically extracts text, cleans metadata, and divides dense papers into semantic vector chunks.
              </p>
            </div>

            <div className="bg-slate-900/70 border border-slate-800 p-6 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-950 border border-purple-800/50 flex items-center justify-center text-purple-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-200">Instant AI Summaries</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Synthesizes core innovations, methodologies, and findings into structured bullet points in seconds.
              </p>
            </div>

            <div className="bg-slate-900/70 border border-slate-800 p-6 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-800/50 flex items-center justify-center text-emerald-400">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-200">Verifiable Citations</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Every AI response links directly back to exact page numbers and vector similarity match percentages.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-6 md:px-12 max-w-7xl mx-auto w-full space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Simple 3-Step Workflow</span>
          <h2 className="text-3xl font-bold text-slate-100 tracking-tight">How ResearchAI Works</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="relative text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white font-extrabold text-lg flex items-center justify-center mx-auto shadow-lg shadow-indigo-600/30">
              1
            </div>
            <h3 className="text-base font-bold text-slate-200">Upload Documents</h3>
            <p className="text-xs text-slate-400">Drag and drop any research PDF, thesis, or technical report into your workspace.</p>
          </div>

          <div className="relative text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white font-extrabold text-lg flex items-center justify-center mx-auto shadow-lg shadow-indigo-600/30">
              2
            </div>
            <h3 className="text-base font-bold text-slate-200">Vector Indexing</h3>
            <p className="text-xs text-slate-400">Our RAG engine indexes embeddings into high-dimensional vector spaces for instant lookup.</p>
          </div>

          <div className="relative text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white font-extrabold text-lg flex items-center justify-center mx-auto shadow-lg shadow-indigo-600/30">
              3
            </div>
            <h3 className="text-base font-bold text-slate-200">Ask & Discover</h3>
            <p className="text-xs text-slate-400">Ask questions in plain English and receive accurate answers grounded strictly in source context.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-slate-950/80 py-8 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-4 h-4 text-indigo-400" />
            <span className="font-semibold text-slate-400">ResearchAI Platform</span>
            <span>© 2026. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/login" className="hover:text-slate-300 transition-colors">Sign In</Link>
            <Link href="/register" className="hover:text-slate-300 transition-colors">Register</Link>
            <Link href="/dashboard" className="hover:text-slate-300 transition-colors">Workspace</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
