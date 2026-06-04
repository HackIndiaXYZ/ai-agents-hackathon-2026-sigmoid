"use client";
import FamilyTracker from "@/components/FamilyTracker";
import SOSPanel from "@/components/SOSPanel";
import { ShieldAlert } from "lucide-react";

export default function FamilyPage() {
  return (
    <div className="min-h-full p-4 md:p-8 relative">
      <div className="aurora-bg">
        <div className="aurora-1" style={{ background: "radial-gradient(circle, rgba(255, 82, 82, 0.1) 0%, transparent 60%)" }} />
      </div>

      <header className="mb-8 max-w-5xl mx-auto w-full relative z-10 pt-4">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-white flex items-center gap-3">
          <ShieldAlert className="w-8 h-8 text-cyan-400" />
          Family & Safety Center
        </h1>
        <p className="text-zinc-400 text-sm mt-2 max-w-xl">
          Monitor the live safety status of your loved ones and trigger a massive emergency broadcast if you are in immediate danger.
        </p>
      </header>

      <div className="max-w-5xl mx-auto w-full relative z-10 pb-20 md:pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <h2 className="text-xl font-bold text-white mb-4">Family Network</h2>
            <FamilyTracker />
          </div>
          
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-white mb-4">Emergency Broadcast</h2>
            <SOSPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
