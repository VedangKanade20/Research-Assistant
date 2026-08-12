"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  FileText,
  Send,
  Sparkles,
  ArrowLeft,
  Loader2,
  Bot,
  User,
  Layers,
  BookOpen,
  Info
} from "lucide-react";

export default function DocumentDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { token } = useAuth();

  const [documentData, setDocumentData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState("");
  const [loadingDoc, setLoadingDoc] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sending]);

  useEffect(() => {
    if (!token || !id) return;

    async function loadData() {
      setLoadingDoc(true);
      setError("");

      try {
        const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:6968";

        // 1. Fetch Document Info
        const docRes = await fetch(`${API_BASE}/api/v1/documents/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const docJson = await docRes.json();
        if (!docRes.ok) throw new Error(docJson.message || "Failed to load document");
        setDocumentData(docJson.data);

        // 2. Fetch Chat History
        const chatRes = await fetch(`${API_BASE}/api/v1/documents/${id}/chat-history`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const chatJson = await chatRes.json();
        if (chatRes.ok && chatJson.data?.messages) {
          setMessages(chatJson.data.messages);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingDoc(false);
      }
    }

    loadData();
  }, [id, token]);

  const handleSendQuestion = async (e) => {
    e.preventDefault();
    if (!question.trim() || sending) return;

    const userPrompt = question.trim();
    setQuestion("");
    setSending(true);

    // Optimistically add user message to chat window
    const tempUserMsg = { id: `temp-${Date.now()}`, role: "user", content: userPrompt };
    setMessages((prev) => [...prev, tempUserMsg]);

    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:6968";
      const res = await fetch(`${API_BASE}/api/v1/documents/${id}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ question: userPrompt })
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error?.message || json.message || "Failed to generate answer");

      const assistantMsg = json.data.message;
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  };

  if (loadingDoc) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex items-center gap-3 text-slate-400 text-sm">
          <Loader2 className="w-5 h-5 animate-spin text-indigo-500" />
          <span>Loading RAG Workspace & Document...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-4 h-[calc(100vh-6.5rem)] flex flex-col">
      {/* Top Action Header */}
      <div className="flex items-center justify-between pb-2 shrink-0">
        <button
          onClick={() => router.push("/documents")}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 text-xs font-semibold transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Documents</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-indigo-950/60 border border-indigo-800/40 text-indigo-300 text-xs font-medium flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Gemini 3.6 Grounded RAG</span>
          </span>
        </div>
      </div>

      {/* Main Split-Screen Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0">
        {/* Left Side: Document Reader & Summary */}
        <div className="lg:col-span-5 bg-slate-900/70 border border-slate-800 rounded-2xl p-5 flex flex-col min-h-0 overflow-hidden shadow-xl">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-800 shrink-0">
            <div className="p-2 rounded-lg bg-indigo-950/80 border border-indigo-800/40 text-indigo-400">
              <FileText className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm font-bold text-slate-100 truncate">{documentData?.filename}</h2>
              <p className="text-[11px] text-slate-400 uppercase font-semibold">
                Type: {documentData?.fileType || "PDF"} • Size: {((documentData?.originalSize || 0) / 1024).toFixed(1)} KB
              </p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto space-y-4 pt-4 pr-1 scrollbar-thin">
            {/* Executive Summary Card */}
            {documentData?.summary && (
              <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-900/40 space-y-2">
                <div className="flex items-center gap-1.5 text-indigo-300 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Executive AI Summary</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "{documentData.summary}"
                </p>
              </div>
            )}

            {/* Extracted Text Viewer */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Extracted Document Content</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
                {documentData?.extractedText || "No readable text content extracted."}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive RAG Chat Panel */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl flex flex-col min-h-0 shadow-xl overflow-hidden">
          {/* Chat Header */}
          <div className="p-4 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <Bot className="w-5 h-5 text-indigo-400" />
              <div>
                <h3 className="text-sm font-bold text-slate-100">Document Chat Room</h3>
                <p className="text-[11px] text-slate-400">Grounded in vector chunks via PostgreSQL pgvector</p>
              </div>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
                <Bot className="w-10 h-10 mb-2 text-indigo-500/50 animate-bounce" />
                <p className="text-sm font-semibold text-slate-300">Ask a question about this document</p>
                <p className="text-xs max-w-xs mt-1">
                  Gemini 3.6 will search the vector chunks and generate a grounded, factual answer.
                </p>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 text-xs ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-7 h-7 rounded-lg bg-indigo-950 border border-indigo-800/50 flex items-center justify-center text-indigo-400 shrink-0 mt-0.5">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 space-y-1 ${
                      msg.role === "user"
                        ? "bg-indigo-600 text-white font-medium rounded-tr-none shadow-md shadow-indigo-600/20"
                        : "bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none leading-relaxed"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                    {msg.tokensUsed > 0 && (
                      <p className="text-[10px] opacity-60 text-right pt-1 font-mono">
                        Tokens: {msg.tokensUsed}
                      </p>
                    )}
                  </div>

                  {msg.role === "user" && (
                    <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0 mt-0.5">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))
            )}

            {sending && (
              <div className="flex gap-3 text-xs justify-start">
                <div className="w-7 h-7 rounded-lg bg-indigo-950 border border-indigo-800/50 flex items-center justify-center text-indigo-400 shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-slate-950 border border-slate-800 rounded-2xl rounded-tl-none p-3.5 flex items-center gap-2 text-indigo-400 font-medium">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Searching vectors & generating grounded answer...</span>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Input Bar */}
          <form onSubmit={handleSendQuestion} className="p-3 border-t border-slate-800 bg-slate-950/60 shrink-0">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask a question grounded in this document..."
                disabled={sending}
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!question.trim() || sending}
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition-all shadow-md shadow-indigo-600/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
