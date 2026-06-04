"use client";
import { useEmergencyStore } from "@/store/useEmergencyStore";
import { CheckCircle2, Navigation, MapPin, Battery, WifiOff, Phone } from "lucide-react";
import { motion } from "framer-motion";

export default function FamilyTracker() {
  const { family } = useEmergencyStore();

  return (
    <div className="space-y-4">
      {family.map((member, i) => (
        <motion.div
          key={member.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className={`glass-card p-4 rounded-2xl border-l-4 ${
            member.status === 'Safe' ? 'border-l-green-500' :
            (member.status === 'Need Help' || member.status === 'SOS Triggered') ? 'border-l-red-500 shadow-[0_0_15px_rgba(255,82,82,0.2)]' :
            'border-l-orange-500'
          }`}
        >
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-bold text-white text-lg">{member.name}</h3>
              <p className="text-xs text-zinc-400 flex items-center gap-1 mt-1">
                <MapPin className="w-3 h-3" /> Last contact: {member.lastContact}
              </p>
            </div>
            <div className={`px-3 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider ${
              member.status === 'Safe' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
              (member.status === 'Need Help' || member.status === 'SOS Triggered') ? 'bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse' :
              'bg-orange-500/20 text-orange-400 border border-orange-500/30'
            }`}>
              {member.status}
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-white/5 text-xs font-mono">
            <div className="flex items-center gap-2 text-zinc-300">
              <Navigation className="w-4 h-4 text-cyan-400" />
              <span>{member.lastLocation}</span>
            </div>
            {member.status === 'Need Help' && (
              <div className="flex items-center gap-2 text-red-400">
                <WifiOff className="w-4 h-4" />
                <span>Poor Signal</span>
              </div>
            )}
          </div>

          <div className="flex gap-2 mt-4">
            <button className="flex-1 py-2 bg-white/5 hover:bg-white/10 text-white text-xs font-bold rounded-xl transition-colors border border-white/5 flex items-center justify-center gap-2">
              <Phone className="w-3 h-3" /> Call
            </button>
            <button className="flex-1 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 text-xs font-bold rounded-xl transition-colors border border-cyan-500/30 flex items-center justify-center gap-2">
              <MapPin className="w-3 h-3" /> View Map
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
