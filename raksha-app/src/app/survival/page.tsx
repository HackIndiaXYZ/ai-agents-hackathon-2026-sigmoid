"use client";
import { BookOpen, Droplet, Flame, ShieldAlert, HeartPulse, Download, CloudOff, ChevronRight } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GUIDES = [
  { id: 'flood', title: "Flood Evacuation", icon: Droplet, color: "cyan" },
  { id: 'fire', title: "House Fire", icon: Flame, color: "orange" },
  { id: 'earthquake', title: "Earthquake Drop & Cover", icon: ShieldAlert, color: "red" },
  { id: 'cpr', title: "Hands-Only CPR", icon: HeartPulse, color: "purple" },
];

export default function SurvivalPage() {
  const [downloading, setDownloading] = useState(false);
  const [offlineReady, setOfflineReady] = useState(true);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setOfflineReady(true);
    }, 2000);
  };

  return (
    <div className="min-h-full p-4 md:p-8 bg-void relative">
      <div className="aurora-bg">
        <div className="aurora-2" style={{ opacity: 0.4 }} />
      </div>

      <header className="mb-8 max-w-3xl mx-auto w-full relative z-10 pt-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-white flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-cyan-400" />
              Offline Survival Guide
            </h1>
            <p className="text-zinc-400 text-sm mt-2 max-w-xl">
              Critical step-by-step instructions cached locally. Available even when internet and cell towers are down.
            </p>
          </div>
          
          <div className={`glass-card px-4 py-2 rounded-xl flex items-center gap-3 border ${offlineReady ? 'border-green-500/30' : 'border-orange-500/30'}`}>
            <CloudOff className={`w-4 h-4 ${offlineReady ? 'text-green-400' : 'text-orange-400'}`} />
            <div className="flex flex-col">
              <span className={`text-xs font-bold ${offlineReady ? 'text-green-400' : 'text-orange-400'}`}>
                {offlineReady ? 'Offline Ready' : 'Sync Required'}
              </span>
              <span className="text-[10px] text-zinc-500">Cached: 2 hours ago</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto w-full relative z-10 pb-20 md:pb-0">
        {!offlineReady && (
          <div className="mb-8 p-6 glass-card rounded-2xl border-orange-500/30 flex flex-col items-center justify-center text-center">
            <h3 className="text-xl font-bold text-white mb-2">Sync Latest Guidelines</h3>
            <p className="text-zinc-400 text-sm mb-4">Your cached survival data is out of date. Download the latest 12MB packet.</p>
            <button 
              onClick={handleDownload}
              disabled={downloading}
              className="px-6 py-3 bg-white text-black font-bold rounded-xl flex items-center gap-2 hover:scale-105 transition-transform disabled:opacity-50"
            >
              {downloading ? (
                <>
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  Downloading...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  Download Update
                </>
              )}
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {GUIDES.map((guide, i) => {
            const Icon = guide.icon;
            return (
              <motion.div
                key={guide.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-4 rounded-2xl flex items-center justify-between group cursor-pointer hover:border-cyan-500/50"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${guide.color}-500/10 border border-${guide.color}-500/30`}>
                    <Icon className={`w-6 h-6 text-${guide.color}-400`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white group-hover:text-cyan-400 transition-colors">{guide.title}</h3>
                    <p className="text-xs text-zinc-500 font-mono flex items-center gap-1 mt-1">
                      <CloudOff className="w-3 h-3" /> Available offline
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-zinc-500 group-hover:text-cyan-400 transition-colors" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
