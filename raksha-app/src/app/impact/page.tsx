"use client";
import { Award, Heart, Shield, Users, Zap, Map } from "lucide-react";
import { motion } from "framer-motion";

export default function ImpactPage() {
  return (
    <div className="min-h-full p-4 md:p-8 bg-void relative">
      <div className="aurora-bg">
        <div className="aurora-1" style={{ background: "radial-gradient(circle, rgba(124, 77, 255, 0.2) 0%, transparent 60%)" }} />
      </div>

      <header className="mb-12 text-center relative z-10 pt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 font-bold mb-6">
            <Award className="w-5 h-5" />
            Hackathon Mission
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
            The Impact of <span className="gradient-text-cyan">Raksha AI</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            We built this platform to save lives. It&apos;s not just an AI dashboard; it&apos;s a unified ecosystem for disaster survival, coordination, and rapid response.
          </p>
        </motion.div>
      </header>

      <main className="max-w-6xl mx-auto w-full relative z-10 space-y-12 pb-20">
        
        {/* Core Value Props */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-8 rounded-3xl border-t-4 border-t-cyan-500">
            <Zap className="w-10 h-10 text-cyan-400 mb-6" />
            <h3 className="text-2xl font-bold text-white mb-4">Real-Time Intelligence</h3>
            <p className="text-zinc-400">Aggregating weather feeds, government alerts, and crowd-sourced data to provide immediate, actionable survival strategies.</p>
          </div>
          
          <div className="glass-card p-8 rounded-3xl border-t-4 border-t-purple-500">
            <Users className="w-10 h-10 text-purple-400 mb-6" />
            <h3 className="text-2xl font-bold text-white mb-4">Decentralized Rescue</h3>
            <p className="text-zinc-400">Bypassing jammed centralized emergency lines by connecting victims directly with nearby verified volunteers and NGOs.</p>
          </div>
          
          <div className="glass-card p-8 rounded-3xl border-t-4 border-t-red-500">
            <Shield className="w-10 h-10 text-red-400 mb-6" />
            <h3 className="text-2xl font-bold text-white mb-4">Offline First</h3>
            <p className="text-zinc-400">Critical survival manuals and emergency protocols are cached locally, ensuring they are accessible even when networks fail.</p>
          </div>
        </div>

        {/* Hypothetical Scale */}
        <div className="glass-card rounded-3xl p-8 md:p-12 border border-white/10 text-center">
          <h2 className="text-3xl font-display font-bold text-white mb-12">Designed for Massive Scale</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-cyan-400 mb-2">99.9%</div>
              <div className="text-zinc-400 font-mono text-sm uppercase">Uptime Reliability</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-purple-400 mb-2">&lt;50ms</div>
              <div className="text-zinc-400 font-mono text-sm uppercase">SOS Broadcast Latency</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-green-400 mb-2">12+</div>
              <div className="text-zinc-400 font-mono text-sm uppercase">Languages Supported</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-orange-400 mb-2">10km</div>
              <div className="text-zinc-400 font-mono text-sm uppercase">P2P Mesh Network</div>
            </div>
          </div>
        </div>

        {/* Future Roadmap */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-6">Future Roadmap</h2>
          <div className="inline-flex gap-4 p-2 glass-card rounded-2xl flex-wrap justify-center">
            <span className="px-4 py-2 bg-white/5 rounded-xl text-sm font-bold text-zinc-300">Satellite Imagery AI</span>
            <span className="px-4 py-2 bg-white/5 rounded-xl text-sm font-bold text-zinc-300">Drone Delivery Integration</span>
            <span className="px-4 py-2 bg-white/5 rounded-xl text-sm font-bold text-zinc-300">IoT Shelter Sensors</span>
            <span className="px-4 py-2 bg-white/5 rounded-xl text-sm font-bold text-zinc-300">Blockchain Resource Ledger</span>
          </div>
        </div>

      </main>
    </div>
  );
}
