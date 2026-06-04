"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Map, Sparkles, Activity, Users, Home as HomeIcon } from 'lucide-react';
import Link from 'next/link';

function AnimatedCounter({ end, label, delay = 0 }: { end: number, label: string, delay?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const stepTime = Math.abs(Math.floor(duration / end));
    
    setTimeout(() => {
      const timer = setInterval(() => {
        start += Math.ceil(end / 20);
        if (start > end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, stepTime);
      return () => clearInterval(timer);
    }, delay);
  }, [end, delay]);

  return (
    <div className="glass-card p-4 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      <span className="text-3xl font-display font-bold text-white mb-1">
        {count.toLocaleString()}+
      </span>
      <span className="text-xs text-zinc-400 font-medium uppercase tracking-wider">{label}</span>
    </div>
  );
}

function DisasterGlobe() {
  return (
    <div className="relative w-64 h-64 md:w-96 md:h-96 mx-auto my-12">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full border border-white/10"
        style={{
          background: "radial-gradient(circle at 30% 30%, rgba(0, 229, 255, 0.15) 0%, transparent 60%)",
          boxShadow: "inset 0 0 40px rgba(0,0,0,0.8)"
        }}
      >
        {/* Connection lines / Nodes */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-cyan-400 shadow-cyan-glow"
            style={{
              top: `${20 + Math.random() * 60}%`,
              left: `${20 + Math.random() * 60}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </motion.div>
      <div className="absolute inset-0 rounded-full border border-cyan-500/20 shadow-cyan-glow animate-pulse" />
      
      {/* Decorative rings */}
      <div className="absolute -inset-4 rounded-full border border-white/5" style={{ transform: 'rotateX(60deg)' }} />
      <div className="absolute -inset-8 rounded-full border border-white/5" style={{ transform: 'rotateY(60deg)' }} />
    </div>
  );
}

function AIPlanDemo() {
  const [generating, setGenerating] = useState(false);
  const [planReady, setPlanReady] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setPlanReady(true);
    }, 2500);
  };

  return (
    <div className="w-full max-w-2xl mx-auto glass-card rounded-3xl p-1 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10" />
      
      <div className="bg-[#0b0e1a]/80 backdrop-blur-xl rounded-[22px] p-6 md:p-8 relative z-10 border border-white/5">
        {!planReady && !generating && (
          <div className="text-center py-8">
            <h3 className="text-xl font-display font-bold text-white mb-4">Analyze Current Situation</h3>
            <button
              onClick={handleGenerate}
              className="px-8 py-4 bg-white text-black font-bold rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 transition-transform flex items-center gap-2 mx-auto"
            >
              <Sparkles className="w-5 h-5" />
              Generate Survival Plan
            </button>
          </div>
        )}

        {generating && (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className="w-12 h-12 rounded-full border-2 border-cyan-500/30 border-t-cyan-400 animate-spin" />
            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-cyan-400 font-mono text-sm tracking-widest uppercase"
            >
              Calculating safe routes & shelters...
            </motion.p>
          </div>
        )}

        <AnimatePresence>
          {planReady && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="p-2 bg-red-500/20 rounded-lg text-red-400">
                  <Activity className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg">Flood Warning (Severe)</h4>
                  <p className="text-sm text-zinc-400">Sector 4, Downtown</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                  <h5 className="text-xs text-cyan-400 font-mono mb-2 uppercase">Next 30 Minutes</h5>
                  <ul className="text-sm text-zinc-300 space-y-2">
                    <li className="flex gap-2"><span className="text-cyan-400">→</span> Turn off main power</li>
                    <li className="flex gap-2"><span className="text-cyan-400">→</span> Grab emergency Go-Bag</li>
                    <li className="flex gap-2"><span className="text-cyan-400">→</span> Move to roof level</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                  <h5 className="text-xs text-purple-400 font-mono mb-2 uppercase">Recommended Shelter</h5>
                  <p className="text-sm text-white font-bold mb-1">Central High School</p>
                  <p className="text-xs text-zinc-400 mb-2">1.2 km away • 45% capacity</p>
                  <button className="w-full py-2 bg-cyan-500/20 text-cyan-400 text-xs font-bold rounded-lg border border-cyan-500/30">
                    View Safe Route
                  </button>
                </div>
              </div>
              
              <button onClick={() => setPlanReady(false)} className="text-xs text-zinc-500 hover:text-white mx-auto block">Reset Demo</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-full pb-20">
      
      {/* Hero Section */}
      <section className="relative px-6 pt-20 pb-16 md:pt-32 md:pb-24 flex flex-col items-center text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-bold mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            RAKSHA OS V2.0 ONLINE
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-tight mb-6 tracking-tight">
            AI Disaster <br />
            <span className="gradient-text-cyan">Survival Copilot</span>
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto font-light">
            Find shelter. Reach safety. Protect your family. Survive disasters.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-black font-bold flex items-center justify-center gap-2 hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              <ShieldAlert className="w-5 h-5" />
              Get Emergency Briefing
            </button>
            <Link href="/map" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-colors">
              <Map className="w-5 h-5" />
              View Disaster Map
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Live Intelligence Counters */}
      <section className="px-6 py-8 relative z-10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          <AnimatedCounter end={1420} label="Active Alerts" delay={0} />
          <AnimatedCounter end={85} label="Safe Shelters" delay={200} />
          <AnimatedCounter end={340} label="Connected Volunteers" delay={400} />
          <AnimatedCounter end={12500} label="Families Protected" delay={600} />
        </div>
      </section>

      {/* Interactive Globe */}
      <section className="relative z-10 overflow-hidden">
        <DisasterGlobe />
      </section>

      {/* AI Survival Plan Generator */}
      <section className="px-6 py-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Real-Time Survival Strategies</h2>
          <p className="text-zinc-400 max-w-xl mx-auto">Instant contextual analysis providing you with immediate action steps, safe routes, and required resources to survive the next 24 hours.</p>
        </div>
        
        <AIPlanDemo />
      </section>

    </div>
  );
}
