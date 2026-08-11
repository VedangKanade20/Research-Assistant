"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { BrainCircuit, ArrowRight, Lock, Mail, Loader2, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setIsSubmitting(true);

    const res = await login(email, password);

    if (!res.success) {
      setErrorMsg(res.error || "Invalid email or password");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-[#090d16] flex items-center justify-center p-4">
      {/* Glow background accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-slate-900/80 border border-slate-800 rounded-2xl shadow-2xl p-8 backdrop-blur-xl relative z-10">
        {/* Brand Logo */}
        <div className="flex flex-col items-center text-center mb-8">
          <Link href="/" className="group flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 mb-3 group-hover:scale-105 transition-transform">
              <BrainCircuit className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-100 tracking-tight">Welcome Back</h1>
          </Link>
          <p className="text-xs text-slate-400 mt-1">Sign in to your AI Research Assistant workspace</p>
        </div>

        {/* Error Alert Banner */}
        {errorMsg && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-950/60 border border-red-800/60 text-red-300 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Login Form UI */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="researcher@university.edu"
                className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-9 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
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
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-9 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-70 text-white rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/25 active:scale-[0.99] mt-2 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

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
