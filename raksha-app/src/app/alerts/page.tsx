"use client";
import { useEmergencyStore } from "@/store/useEmergencyStore";
import { motion } from "framer-motion";
import { Bell, AlertTriangle, CloudRainWind, Info, ShieldAlert, WifiOff } from "lucide-react";
import { useState } from "react";

export default function AlertsPage() {
  const { alerts } = useEmergencyStore();
  const [filter, setFilter] = useState<'ALL' | 'CRITICAL' | 'WARNING' | 'INFO'>('ALL');

  const filteredAlerts = alerts.filter(a => {
    if (filter === 'ALL') return true;
    if (filter === 'CRITICAL' && a.severity === 'HIGH') return true;
    if (filter === 'WARNING' && a.severity === 'MEDIUM') return true;
    if (filter === 'INFO' && a.severity === 'LOW') return true;
    return false;
  });

  return (
    <div className="min-h-full p-4 md:p-8 bg-void relative">
      <div className="aurora-bg">
        <div className="aurora-1" />
      </div>

      <header className="mb-8 max-w-4xl mx-auto w-full relative z-10 pt-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-white flex items-center gap-3">
              <Bell className="w-8 h-8 text-cyan-400" />
              Live Disaster Intelligence
            </h1>
            <p className="text-zinc-400 text-sm mt-2 max-w-xl">
              Real-time weather alerts, government advisories, and emergency broadcasts. 
              Always cross-reference with local authorities.
            </p>
          </div>

          <div className="flex gap-2 bg-white/5 p-1 rounded-xl border border-white/10 backdrop-blur-md">
            {['ALL', 'CRITICAL', 'WARNING', 'INFO'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f as any)}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                  filter === f 
                    ? f === 'CRITICAL' ? 'bg-red-500/20 text-red-400 shadow-[0_0_15px_rgba(255,82,82,0.3)]' 
                      : f === 'WARNING' ? 'bg-orange-500/20 text-orange-400' 
                      : f === 'INFO' ? 'bg-cyan-500/20 text-cyan-400'
                      : 'bg-white/10 text-white'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto w-full space-y-4 relative z-10 pb-20 md:pb-0">
        {filteredAlerts.length === 0 ? (
          <div className="glass-card p-12 text-center rounded-2xl flex flex-col items-center justify-center">
            <ShieldAlert className="w-12 h-12 text-green-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No Active Alerts</h3>
            <p className="text-zinc-400">Everything is clear for this category.</p>
          </div>
        ) : (
          filteredAlerts.map((alert, i) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`glass-card p-6 rounded-2xl border-l-4 ${
                alert.severity === 'HIGH' ? 'border-l-red-500 shadow-[0_4px_30px_rgba(255,82,82,0.1)]' :
                alert.severity === 'MEDIUM' ? 'border-l-orange-500' :
                'border-l-cyan-500'
              }`}
            >
              <div className="flex gap-4 md:gap-6">
                <div className={`mt-1 hidden md:flex items-center justify-center w-12 h-12 rounded-xl border ${
                  alert.severity === 'HIGH' ? 'bg-red-500/10 border-red-500/30 text-red-400' :
                  alert.severity === 'MEDIUM' ? 'bg-orange-500/10 border-orange-500/30 text-orange-400' :
                  'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
                }`}>
                  {alert.type === 'WEATHER' ? <CloudRainWind className="w-6 h-6" /> : 
                   alert.type === 'GOVERNMENT' ? <AlertTriangle className="w-6 h-6" /> :
                   <Info className="w-6 h-6" />}
                </div>

                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold text-white">{alert.title}</h2>
                      {alert.severity === 'HIGH' && (
                        <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-[10px] font-bold uppercase rounded border border-red-500/30 animate-pulse">
                          Critical Action Required
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-mono text-zinc-500 flex items-center gap-1">
                      <WifiOff className="w-3 h-3" /> Offline Cached: {alert.time}
                    </span>
                  </div>
                  
                  <p className="text-sm text-zinc-300 leading-relaxed mb-4">
                    {alert.description}
                  </p>

                  {alert.severity === 'HIGH' && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
                      <div>
                        <h4 className="text-xs font-bold text-red-400 uppercase mb-1">Official Instruction</h4>
                        <p className="text-xs text-white">Evacuate immediately to higher ground. Do not attempt to drive through flooded areas. Follow emergency personnel instructions.</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
