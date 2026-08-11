"use client";

import Link from "next/link";
import { BrainCircuit, ArrowRight, Lock, Mail, Globe, KeyRound } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#090d16] flex items-center justify-center p-4">
      {/* Glow background accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-slate-900/80 border border-slate-800 rounded-2xl shadow-2xl p-8 backdrop-blur-xl relative z-10">
        {/* Brand Logo */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 mb-3">
            <BrainCircuit className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight">Welcome Back</h1>
          <p className="text-xs text-slate-400 mt-1">Sign in to your AI Research Assistant workspace</p>
        </div>

        {/* Login Form UI */}
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                placeholder="researcher@university.edu"
                className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-9 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                defaultValue="vedang@research.ai"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Password
              </label>
              <a href="#" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                placeholder="••••••••••••"
                className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-9 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                defaultValue="password123"
              />
            </div>
          </div>

          {/* Submit Button */}
          <Link
            href="/dashboard"
            className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/25 active:scale-[0.99] mt-2"
          >
            <span>Sign In to Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-800" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-slate-900 px-2 text-slate-500">Or continue with</span>
          </div>
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button className="py-2 px-3 bg-slate-950/60 border border-slate-800 hover:bg-slate-800/60 text-slate-300 rounded-lg text-xs font-medium flex items-center justify-center gap-2 transition-colors">
            <Globe className="w-4 h-4 text-indigo-400" />
            <span>GitHub</span>
          </button>
          <button className="py-2 px-3 bg-slate-950/60 border border-slate-800 hover:bg-slate-800/60 text-slate-300 rounded-lg text-xs font-medium flex items-center justify-center gap-2 transition-colors">
            <KeyRound className="w-4 h-4 text-indigo-400" />
            <span>SSO Login</span>
          </button>
        </div>

        {/* Register Prompt */}
        <p className="text-center text-xs text-slate-400 mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-indigo-400 font-semibold hover:text-indigo-300 transition-colors">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
