"use client";
import { motion } from "framer-motion";
import { Users, UserPlus, PhoneCall, Stethoscope, Car, HandHeart, Shield, Crosshair } from "lucide-react";
import { useState } from "react";

const HELPERS = [
  { id: 1, name: "Dr. Ananya Sharma", role: "Medical Professional", skills: ["First Aid", "Trauma Care"], distance: "0.8 km", status: "AVAILABLE", type: "MEDICAL" },
  { id: 2, name: "Rahul Verma", role: "Volunteer Rescue", skills: ["Off-road Vehicle", "Heavy Lifting"], distance: "1.2 km", status: "BUSY", type: "TRANSPORT" },
  { id: 3, name: "Team Red Cross", role: "NGO Unit", skills: ["Food Dist", "Medical Supplies"], distance: "2.5 km", status: "AVAILABLE", type: "NGO" },
  { id: 4, name: "Priya Patel", role: "Community Organizer", skills: ["Shelter Management"], distance: "0.3 km", status: "AVAILABLE", type: "VOLUNTEER" },
  { id: 5, name: "Capt. Singh (Retd)", role: "Ex-Military", skills: ["Search & Rescue", "Comms"], distance: "1.5 km", status: "AVAILABLE", type: "RESCUE" },
];

export default function CommunityPage() {
  const [filter, setFilter] = useState('ALL');

  return (
    <div className="min-h-full p-4 md:p-8 relative">
      <div className="aurora-bg">
        <div className="aurora-1" style={{ opacity: 0.5 }} />
      </div>

      <header className="mb-8 max-w-4xl mx-auto w-full relative z-10 pt-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-white flex items-center gap-3">
              <Crosshair className="w-8 h-8 text-cyan-400" />
              Nearby Helpers Network
            </h1>
            <p className="text-zinc-400 text-sm mt-2 max-w-xl">
              Connect directly with verified medical professionals, rescue volunteers, and NGOs within a 5km radius.
            </p>
          </div>
          <button className="px-6 py-3 bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-cyan-500/30 transition-colors shadow-cyan-glow">
            <UserPlus className="w-5 h-5" />
            Register as Helper
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto w-full relative z-10 pb-20 md:pb-0">
        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 mb-4">
          {['ALL', 'MEDICAL', 'RESCUE', 'TRANSPORT', 'NGO', 'VOLUNTEER'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-shrink-0 px-4 py-2 text-xs font-mono font-bold rounded-lg border transition-all ${
                filter === f 
                  ? 'bg-white/10 border-white/30 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]' 
                  : 'glass-card border-white/5 text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {HELPERS.filter(h => filter === 'ALL' || h.type === filter).map((helper, i) => {
            const Icon = helper.type === 'MEDICAL' ? Stethoscope : 
                         helper.type === 'TRANSPORT' ? Car : 
                         helper.type === 'NGO' ? Shield : HandHeart;

            return (
              <motion.div
                key={helper.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-5 rounded-2xl flex flex-col justify-between border border-white/10"
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-white/5`}>
                        <Icon className="w-5 h-5 text-cyan-400" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white">{helper.name}</h3>
                        <p className="text-xs text-zinc-400">{helper.role}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-[10px] font-bold rounded ${
                      helper.status === 'AVAILABLE' ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'
                    }`}>
                      {helper.status}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {helper.skills.map(skill => (
                      <span key={skill} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] text-zinc-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                  <span className="text-xs font-mono text-zinc-400 flex items-center gap-1">
                    <Crosshair className="w-3 h-3 text-cyan-400" /> {helper.distance} away
                  </span>
                  <button 
                    disabled={helper.status !== 'AVAILABLE'}
                    className="flex items-center gap-2 px-3 py-1.5 bg-white text-black font-bold text-xs rounded-lg disabled:opacity-50 hover:scale-105 transition-transform"
                  >
                    <PhoneCall className="w-3 h-3" />
                    Contact
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
