"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Navigation, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';
import { useEmergencyStore } from '@/store/useEmergencyStore';

export default function AIEmergencyBriefing() {
  const { emergencyType, location, severity } = useEmergencyStore();
  const [isGenerating, setIsGenerating] = useState(false);
  const [briefing, setBriefing] = useState<any>(null);

  const generateBriefing = () => {
    setIsGenerating(true);
    // Simulate AI generation delay
    setTimeout(() => {
      setBriefing({
        summary: "Severe flooding detected in your sector. Water levels are rising at 10cm/hr. Immediate evacuation is recommended.",
        safePlace: "Central High School Evacuation Center (1.2 km North)",
        route: "Take Highway 4 North. Avoid River Road due to severe waterlogging.",
        checklist: [
          "Grab your emergency Go-Bag.",
          "Turn off main electrical switch.",
          "Move to the roof if evacuation is impossible."
        ]
      });
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mt-20 -mr-20 pointer-events-none" />
      
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h2 className="font-display font-bold text-lg text-white">AI Emergency Briefing</h2>
          <p className="text-xs text-indigo-300/70 font-mono">Context-aware survival analysis</p>
        </div>
      </div>

      {!briefing && !isGenerating && (
        <button
          onClick={generateBriefing}
          className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)]"
        >
          <Sparkles className="w-4 h-4" />
          Generate Instant Briefing
        </button>
      )}

      {isGenerating && (
        <div className="flex flex-col items-center justify-center py-8 space-y-4">
          <div className="flex gap-2">
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                className="w-2 h-2 rounded-full bg-indigo-400"
              />
            ))}
          </div>
          <p className="text-xs text-indigo-300 font-mono animate-pulse">Analyzing satellite data & threat vectors...</p>
        </div>
      )}

      {briefing && !isGenerating && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="p-3 bg-black/40 rounded-xl border border-white/5">
            <h3 className="text-xs text-white/50 uppercase tracking-wider mb-1 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Risk Summary
            </h3>
            <p className="text-sm text-red-200 leading-relaxed">{briefing.summary}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3 bg-black/40 rounded-xl border border-white/5">
              <h3 className="text-xs text-white/50 uppercase tracking-wider mb-1 flex items-center gap-1">
                <Navigation className="w-3 h-3" /> Nearest Safe Place
              </h3>
              <p className="text-sm text-green-300">{briefing.safePlace}</p>
            </div>
            <div className="p-3 bg-black/40 rounded-xl border border-white/5">
              <h3 className="text-xs text-white/50 uppercase tracking-wider mb-1 flex items-center gap-1">
                <Navigation className="w-3 h-3" /> Safest Route
              </h3>
              <p className="text-sm text-blue-300">{briefing.route}</p>
            </div>
          </div>

          <div className="p-3 bg-black/40 rounded-xl border border-white/5">
            <h3 className="text-xs text-white/50 uppercase tracking-wider mb-2 flex items-center gap-1">
              <FileText className="w-3 h-3" /> Survival Checklist
            </h3>
            <ul className="space-y-2">
              {briefing.checklist.map((item: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-white/90">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </div>
  );
}
