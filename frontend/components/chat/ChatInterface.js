"use client";

import { useState } from "react";
import { Send, Sparkles, Bot, User, RefreshCw } from "lucide-react";

export default function ChatInterface() {
  const [messages, setMessages] = useState([
    {
      id: "1",
      sender: "ai",
      text: "dummy message",
      timestamp: "00",
    },
    {
      id: "2",
      sender: "user",
      text: "dummy message",
      timestamp: "00",
    },
    {
      id: "3",
      sender: "ai",
      text: "dummy message",
      timestamp: "00",
      citations: ["dummy data", "dummy data"],
    },
  ]);

  return (
    <div className="flex flex-col h-full bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
      {/* Workspace Bar Header */}
      <div className="p-4 bg-slate-950/70 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-950 border border-indigo-800/50 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-indigo-400" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-200">Interactive RAG Assistant</h3>
            <p className="text-[10px] text-slate-400">Model: dummy data</p>
          </div>
        </div>

        <button className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors">
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Message Stream Viewport */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
          >
            {/* Avatar */}
            <div
              className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center text-xs font-bold ${
                msg.sender === "user"
                  ? "bg-slate-800 border border-slate-700 text-slate-200"
                  : "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
              }`}
            >
              {msg.sender === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
            </div>

            {/* Bubble Container */}
            <div className="max-w-[85%] space-y-2">
              <div
                className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-indigo-600 text-white rounded-tr-none"
                    : "bg-slate-950/80 border border-slate-800 text-slate-200 rounded-tl-none whitespace-pre-line"
                }`}
              >
                {msg.text}
              </div>

              {/* Citations Preview Badge */}
              {msg.citations && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {msg.citations.map((cite, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono text-indigo-400 bg-indigo-950/80 border border-indigo-800/40 px-2 py-0.5 rounded"
                    >
                      📍 {cite}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Input Prompt Box */}
      <div className="p-3 bg-slate-950/80 border-t border-slate-800">
        <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Ask a question about this research document..."
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
          <button
            type="submit"
            className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md shadow-indigo-600/30 shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
