"use client";

import Link from "next/link";
import { BrainCircuit, ArrowRight, Lock, Mail, User, ShieldCheck } from "lucide-react";

export default function RegisterPage() {
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
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight">Create Workspace</h1>
          <p className="text-xs text-slate-400 mt-1">Start analyzing research papers with AI in seconds</p>
        </div>

        {/* Register Form UI */}
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
              Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Dr. Alexander Wright"
                className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-9 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
              Work Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                placeholder="alexander@institution.org"
                className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-9 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                placeholder="At least 8 characters"
                className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-9 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="terms"
              className="rounded bg-slate-950 border-slate-800 text-indigo-600 focus:ring-indigo-500"
              defaultChecked
            />
            <label htmlFor="terms" className="text-xs text-slate-400">
              I agree to the <a href="#" className="text-indigo-400 hover:underline">Terms of Service</a> & <a href="#" className="text-indigo-400 hover:underline">Privacy Policy</a>
            </label>
          </div>

          {/* Submit Button */}
          <Link
            href="/dashboard"
            className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/25 active:scale-[0.99] mt-2"
          >
            <span>Create Account</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </form>

        {/* Features Checklist */}
        <div className="mt-6 pt-6 border-t border-slate-800/80 space-y-2">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Secure vector storage & document privacy guaranteed</span>
          </div>
        </div>

        {/* Login Link */}
        <p className="text-center text-xs text-slate-400 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-indigo-400 font-semibold hover:text-indigo-300 transition-colors">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
