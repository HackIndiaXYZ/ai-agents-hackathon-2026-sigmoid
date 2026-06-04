"use client";
import { useEmergencyStore } from "@/store/useEmergencyStore";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Navigation, ShieldCheck, Plus, Minus, Layers, Route, Activity } from "lucide-react";
import { useState } from "react";

export default function DisasterMap() {
  const { shelters } = useEmergencyStore();
  const [activeTab, setActiveTab] = useState<'ALL' | 'SHELTERS' | 'DANGER' | 'ROUTES'>('ALL');
  const [showRoute, setShowRoute] = useState(false);

  return (
    <div className="flex-1 relative bg-void overflow-hidden flex flex-col h-[calc(100vh-4rem)] md:h-screen">
      {/* Map Grid Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 229, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 229, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          backgroundPosition: "center"
        }}
      />
      
      {/* Map Controls */}
      <div className="absolute top-4 right-4 z-30 flex flex-col gap-2">
        <button className="w-12 h-12 glass-card rounded-xl flex items-center justify-center text-zinc-400 hover:text-white hover:border-cyan-500/50">
          <Layers className="w-5 h-5" />
        </button>
        <div className="glass-card rounded-xl flex flex-col overflow-hidden">
          <button className="w-12 h-12 flex items-center justify-center text-zinc-400 hover:text-white border-b border-white/5 hover:bg-white/5">
            <Plus className="w-5 h-5" />
          </button>
          <button className="w-12 h-12 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/5">
            <Minus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Heatmap Overlays */}
      <AnimatePresence>
        {(activeTab === 'ALL' || activeTab === 'DANGER') && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none z-10"
          >
            {/* Critical Danger */}
            <motion.div 
              animate={{ scale: [1, 1.05, 1], opacity: [0.15, 0.25, 0.15] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-red-500 rounded-full blur-[100px]"
            />
            {/* Moderate Risk */}
            <motion.div 
              animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-orange-500 rounded-full blur-[80px]"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Safe Route AI Overlay */}
      <AnimatePresence>
        {showRoute && (
          <motion.svg 
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ opacity: 1, pathLength: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 w-full h-full pointer-events-none z-15"
            style={{ filter: "drop-shadow(0 0 8px rgba(0,229,255,0.8))" }}
          >
            <motion.path
              d="M 50% 50% Q 45% 40% 60% 30% T 70% 20%"
              fill="transparent"
              stroke="#00E5FF"
              strokeWidth="4"
              strokeDasharray="8 8"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </motion.svg>
        )}
      </AnimatePresence>

      {/* Map Nodes */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        {/* User Location */}
        <div className="absolute flex flex-col items-center">
          <div className="w-5 h-5 bg-cyan-400 rounded-full border-2 border-void shadow-[0_0_20px_rgba(0,229,255,0.8)] relative z-20" />
          <div className="absolute w-16 h-16 bg-cyan-500/20 rounded-full animate-ping" />
          <span className="mt-3 text-[10px] font-bold bg-void/80 px-3 py-1 rounded-full text-white border border-cyan-500/30 backdrop-blur-md">You are here</span>
        </div>

        {/* Shelters */}
        {(activeTab === 'ALL' || activeTab === 'SHELTERS') && shelters.map((shelter, i) => {
          const topOffset = (i % 2 === 0 ? -1 : 1) * (80 + i * 40);
          const leftOffset = (i % 3 === 0 ? -1 : 1) * (120 + i * 50);
          
          return (
            <motion.div 
              key={shelter.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="absolute flex flex-col items-center group cursor-pointer"
              style={{ marginTop: topOffset, marginLeft: leftOffset }}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center z-10 shadow-lg backdrop-blur-md ${shelter.status === 'Open' ? 'bg-green-500/20 border border-green-500/50 shadow-[0_0_15px_rgba(0,230,118,0.3)]' : 'bg-orange-500/20 border border-orange-500/50'}`}>
                <ShieldCheck className={`w-5 h-5 ${shelter.status === 'Open' ? 'text-green-400' : 'text-orange-400'}`} />
              </div>
              
              <div className="absolute top-12 w-56 glass-card rounded-xl p-4 opacity-0 group-hover:opacity-100 transition-opacity z-30 pointer-events-none">
                <h4 className="font-bold text-sm text-white mb-2">{shelter.name}</h4>
                <div className="flex justify-between text-xs font-mono text-zinc-400 mb-2">
                  <span>Dist: {shelter.distance}</span>
                  <span className={shelter.status === 'Open' ? 'text-green-400' : 'text-orange-400'}>{shelter.status}</span>
                </div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                  <div className={`h-full ${shelter.status === 'Open' ? 'bg-green-500' : 'bg-orange-500'}`} style={{ width: `${(shelter.capacity / shelter.maxCapacity) * 100}%` }} />
                </div>
                <div className="mt-1 text-[9px] text-right text-zinc-500 font-mono">
                  {shelter.capacity} / {shelter.maxCapacity} people
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Control Panel */}
      <div className="absolute bottom-16 md:bottom-0 left-0 right-0 glass-nav p-4 md:p-6 z-30">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
            <div>
              <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
                <MapPin className="w-6 h-6 text-cyan-400" /> Smart Disaster Map
              </h2>
              <p className="text-xs text-zinc-400 font-mono mt-1 flex items-center gap-2">
                <Activity className="w-3 h-3 text-red-400 animate-pulse" /> Live Heatmap Active
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {['ALL', 'SHELTERS', 'DANGER'].map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-4 py-2 text-xs font-mono font-bold rounded-xl border transition-all ${activeTab === tab ? 'bg-white/10 border-white/30 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]' : 'border-white/5 text-zinc-500 hover:bg-white/5 hover:text-zinc-300'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button 
              onClick={() => setShowRoute(!showRoute)}
              className={`glass-card p-4 rounded-xl flex items-center justify-center gap-3 transition-colors ${showRoute ? 'border-cyan-500/50 bg-cyan-500/10 shadow-[0_0_20px_rgba(0,229,255,0.2)]' : 'hover:border-white/20'}`}
            >
              <Route className={`w-5 h-5 ${showRoute ? 'text-cyan-400' : 'text-zinc-400'}`} />
              <div className="text-left">
                <span className={`block text-sm font-bold ${showRoute ? 'text-cyan-400' : 'text-white'}`}>Safe Route AI</span>
                <span className="block text-xs text-zinc-500 font-mono">Calculate low-crowd evacuation path</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
