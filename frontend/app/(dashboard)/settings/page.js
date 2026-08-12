"use client";

import { User, Key, Shield, HardDrive, Cpu, Save } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-100 tracking-tight">Account & Model Settings</h1>
        <p className="text-xs text-slate-400 mt-1">
          Manage your research profile, RAG model configurations, and API keys.
        </p>
      </div>

      {/* User Profile Card */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 sm:p-6 shadow-lg shadow-black/20">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-800 mb-6">
          <User className="w-5 h-5 text-indigo-400" />
          <h2 className="text-base font-bold text-slate-100">User Profile</h2>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-4 max-w-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                First Name
              </label>
              <input
                type="text"
                defaultValue="Vedang"
                className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                Last Name
              </label>
              <input
                type="text"
                defaultValue="Kanade"
                className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              defaultValue="vedang@research.ai"
              className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors shadow-md shadow-indigo-600/20">
            <Save className="w-3.5 h-3.5" />
            <span>Save Profile</span>
          </button>
        </form>
      </div>

      {/* Model & Vector Settings */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-6 shadow-lg shadow-black/20">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-800 mb-6">
          <Cpu className="w-5 h-5 text-indigo-400" />
          <h2 className="text-base font-bold text-slate-100">RAG Engine & Vector DB Configuration</h2>
        </div>

        <div className="space-y-4 max-w-xl text-xs">
          <div>
            <label className="block font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              Embedding Model
            </label>
            <select className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500">
              <option>text-embedding-3-small (OpenAI)</option>
              <option>nomic-embed-text (Ollama Local)</option>
              <option>BAAI/bge-large-en-v1.5</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              Top-K Context Chunks
            </label>
            <input
              type="number"
              defaultValue={5}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
