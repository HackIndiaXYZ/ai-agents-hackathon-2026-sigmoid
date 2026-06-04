"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, User, Cpu } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const AI_THINKING_STEPS = [
  "Acoustic Sentiment Analysis...",
  "Emergency Classification...",
  "Severity Assessment...",
  "Protocol Traversal...",
  "Generating Guidance..."
];

function TypingIndicator() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep(s => (s + 1) % AI_THINKING_STEPS.length);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      className="flex items-start gap-3"
    >
      {/* Avatar */}
      <div className="w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-indigo-600 to-indigo-800 shadow-[0_0_15px_rgba(99,102,241,0.5)]">
        <Shield className="w-4 h-4 text-white" />
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-mono text-[var(--text-muted)] px-1 flex items-center gap-2">
          Raksha AI 
          <span className="text-indigo-400 font-bold animate-pulse">PROCESSING</span>
        </span>
        <div className="bg-[#13131f] border border-indigo-500/30 rounded-2xl rounded-bl-sm p-4 flex items-center gap-4 shadow-[0_0_20px_rgba(99,102,241,0.15)]">
          {/* Animated dots */}
          <span className="flex gap-1.5 items-center">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce"
                style={{ animationDelay: `${i * 100}ms` }}
              />
            ))}
          </span>
          {/* Agent activity cycling */}
          <motion.span
            key={step}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-[10px] font-mono text-indigo-300 tracking-wide"
          >
            {AI_THINKING_STEPS[step]}
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}

function WelcomeState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center justify-center h-full gap-8 text-center px-6 relative"
    >
      {/* Background ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-96 h-96 rounded-full bg-indigo-500/10 blur-[80px]"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Animated Shield Orb */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative"
        >
          {/* Pulse rings */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border border-indigo-400"
              animate={{ scale: [1, 2.5], opacity: [0.4, 0] }}
              transition={{ duration: 3, delay: i * 1, repeat: Infinity, ease: "easeOut" }}
            />
          ))}
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center shadow-indigo-glow backdrop-blur-xl relative z-10 border border-white/10"
            style={{
              background: "linear-gradient(135deg, rgba(30,27,75,0.8) 0%, rgba(79,70,229,0.9) 100%)",
            }}
          >
            <Shield className="w-12 h-12 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
          </div>
        </motion.div>

        {/* Titles */}
        <div>
          <h2 className="font-display font-bold text-3xl text-[var(--text-primary)] tracking-tight">
            Raksha AI OS
          </h2>
          <p className="text-sm text-[var(--text-muted)] mt-2 font-mono">
            Intelligent Emergency Response Matrix
          </p>
        </div>

        {/* System Health Dashboard */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-2xl mt-4">
          {[
            { label: "SYSTEM", value: "NOMINAL", icon: <Cpu className="w-4 h-4 text-emerald-400" />, color: "border-emerald-500/30 bg-emerald-500/10" },
            { label: "AGENTS", value: "4 ONLINE", icon: <Shield className="w-4 h-4 text-indigo-400" />, color: "border-indigo-500/30 bg-indigo-500/10" },
            { label: "READINESS", value: "100%", icon: <Shield className="w-4 h-4 text-emerald-400" />, color: "border-emerald-500/30 bg-emerald-500/10" },
            { label: "LATENCY", value: "<15ms", icon: <Cpu className="w-4 h-4 text-indigo-400" />, color: "border-indigo-500/30 bg-indigo-500/10" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-2 p-3 rounded-2xl border border-white/5 bg-[#13131f]/50 backdrop-blur-md"
            >
              <div className={`p-2 rounded-xl border ${stat.color}`}>
                {stat.icon}
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[9px] font-mono text-[var(--text-muted)] tracking-widest">{stat.label}</span>
                <span className="text-[11px] font-mono font-bold text-white tracking-wide mt-0.5">{stat.value}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function ChatWindow({
  messages,
  isProcessing,
}: {
  messages: Message[];
  isProcessing: boolean;
}) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isProcessing]);

  return (
    <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4 space-y-5">
      {messages.length === 0 && !isProcessing ? (
        <WelcomeState />
      ) : (
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.35, ease: "backOut" }}
              className={`flex items-start gap-3 ${
                msg.role === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              {/* Avatar */}
              {msg.role === "assistant" ? (
                <div
                  className="w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center shadow-indigo-glow mt-4"
                  style={{
                    background: "linear-gradient(135deg, #1e1b4b, #6366f1)",
                  }}
                >
                  <Shield className="w-4 h-4 text-white" />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center bg-white/8 border border-white/10 mt-4">
                  <User className="w-4 h-4 text-[var(--text-secondary)]" />
                </div>
              )}

              <div
                className={`flex flex-col gap-1 max-w-[82%] ${
                  msg.role === "user" ? "items-end" : "items-start"
                }`}
              >
                {/* Sender + timestamp */}
                <div className="flex items-center gap-2 px-1">
                  <span className="text-[10px] font-mono text-[var(--text-muted)]">
                    {msg.role === "assistant" ? "Raksha AI" : "You"}
                  </span>
                  <span className="text-[10px] font-mono text-[var(--text-muted)] opacity-60">
                    {msg.timestamp}
                  </span>
                </div>

                {/* Bubble */}
                {msg.role === "user" ? (
                  <div
                    className="chat-user-bubble rounded-2xl rounded-tr-sm px-4 py-3 text-sm text-white leading-relaxed whitespace-pre-wrap"
                    style={{
                      background: "linear-gradient(135deg, #4f46e5, #6366f1)",
                      boxShadow: "0 4px 16px rgba(99,102,241,0.25), 0 2px 4px rgba(0,0,0,0.3)",
                    }}
                  >
                    {msg.content}
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="bg-[#13131f] border border-white/8 rounded-2xl rounded-bl-sm px-4 py-3 text-sm text-[var(--text-primary)] leading-relaxed whitespace-pre-wrap shadow-panel"
                    style={{
                      boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
                    }}
                  >
                    {msg.content}
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}

          {isProcessing && <TypingIndicator key="typing" />}
        </AnimatePresence>
      )}
      <div ref={endRef} />
    </div>
  );
}
