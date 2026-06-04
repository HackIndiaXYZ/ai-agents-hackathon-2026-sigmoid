"use client";
import { useEmergencyStore } from "@/store/useEmergencyStore";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Radio, Send, Users, ShieldAlert, CheckCircle2, PhoneCall } from "lucide-react";

export default function SOSPanel() {
  const { sosStatus, triggerSOS } = useEmergencyStore();
  const sosActive = sosStatus === 'TRIGGERED';

  return (
    <div className="glass-card rounded-3xl overflow-hidden relative isolate">
      {/* Background glow when active */}
      <AnimatePresence>
        {sosActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-red-500/10 pointer-events-none"
          >
            <div className="absolute inset-0 animate-glow-pulse" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="p-6 md:p-8 relative z-10 text-center">
        {!sosActive ? (
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-4 border border-red-500/30">
              <ShieldAlert className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-2xl font-display font-bold text-white mb-2">Emergency SOS</h2>
            <p className="text-zinc-400 text-sm mb-8 max-w-sm">
              Activating SOS will immediately broadcast your live location to local authorities, nearby volunteers, and your family network.
            </p>

            {/* Hold to Trigger Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={triggerSOS}
              className="relative w-48 h-48 rounded-full flex items-center justify-center group"
            >
              <div className="absolute inset-0 bg-red-500 rounded-full blur-[40px] opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="absolute inset-2 border-2 border-red-500/50 rounded-full group-hover:border-red-500 transition-colors" />
              <div className="absolute inset-6 bg-red-500 rounded-full shadow-[0_0_40px_rgba(255,82,82,0.6)] flex items-center justify-center">
                <span className="font-display font-bold text-3xl tracking-widest text-white drop-shadow-md">SOS</span>
              </div>
            </motion.button>
            <p className="text-xs font-mono text-zinc-500 mt-6 uppercase tracking-widest animate-pulse">Tap to Activate</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="relative mb-8 mt-4">
              <div className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center relative z-10 shadow-[0_0_40px_rgba(255,82,82,0.8)]">
                <Radio className="w-10 h-10 text-white animate-pulse" />
              </div>
              <motion.div 
                className="absolute inset-0 border-2 border-red-500 rounded-full"
                animate={{ scale: [1, 2, 3], opacity: [1, 0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              />
              <motion.div 
                className="absolute inset-0 border-2 border-red-500 rounded-full"
                animate={{ scale: [1, 2, 3], opacity: [1, 0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 1 }}
              />
            </div>

            <h2 className="text-3xl font-display font-bold text-red-500 mb-2 animate-pulse">SOS ACTIVE</h2>
            <p className="text-white text-lg mb-6">Broadcasting location...</p>

            <div className="w-full bg-black/50 border border-red-500/30 rounded-2xl p-4 text-left space-y-4 max-w-sm mx-auto">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="text-sm text-zinc-300">Location broadcasted</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="text-sm text-zinc-300">Family notified</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
                <span className="text-sm text-cyan-400 font-bold">Awaiting responder...</span>
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <button className="flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-xl hover:scale-105 transition-transform">
                <PhoneCall className="w-5 h-5" /> Call 911
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
