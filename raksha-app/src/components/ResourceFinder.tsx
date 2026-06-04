"use client";
import { useEmergencyStore } from "@/store/useEmergencyStore";
import { Droplet, Cookie, Flame, Stethoscope, Search, MapPin, Zap, Wifi, Baby, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const CATEGORIES = [
  { id: 'ALL', icon: Search, label: 'All', color: 'cyan' },
  { id: 'WATER', icon: Droplet, label: 'Water', color: 'blue' },
  { id: 'FOOD', icon: Cookie, label: 'Food', color: 'orange' },
  { id: 'MEDICAL', icon: Stethoscope, label: 'Medical', color: 'red' },
  { id: 'POWER', icon: Zap, label: 'Power', color: 'yellow' },
  { id: 'INTERNET', icon: Wifi, label: 'Internet', color: 'cyan' },
  { id: 'BABY', icon: Baby, label: 'Baby', color: 'pink' },
  { id: 'FUEL', icon: Flame, label: 'Fuel', color: 'orange' },
];

export default function ResourceFinder() {
  const { resources } = useEmergencyStore();
  const [activeCategory, setActiveCategory] = useState('ALL');

  // Inject additional complex mock data for V2 based on the store's basic resources
  const enhancedResources = resources.map(r => ({
    ...r,
    crowdLevel: Math.random() > 0.6 ? 'High' : Math.random() > 0.3 ? 'Medium' : 'Low',
    stock: Math.random() > 0.7 ? 'Low' : Math.random() > 0.2 ? 'Adequate' : 'Plentiful',
    categoryColor: CATEGORIES.find(c => c.id === r.type)?.color || 'cyan',
    isOpen: Math.random() > 0.1,
  }));

  const filtered = activeCategory === 'ALL' 
    ? enhancedResources 
    : enhancedResources.filter(r => r.type === activeCategory);

  return (
    <div className="w-full">
      {/* Categories Horizontal Scroll */}
      <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
        {CATEGORIES.map(cat => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex-shrink-0 flex flex-col items-center gap-2 px-4 py-3 rounded-2xl border transition-all ${
                isActive 
                  ? 'bg-white/10 border-white/30 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]' 
                  : 'glass-card text-zinc-400 hover:text-white'
              }`}
            >
              <div className={`p-2 rounded-xl ${isActive ? `bg-${cat.color}-500/20 text-${cat.color}-400` : 'bg-white/5'}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold">{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Results List */}
      <div className="space-y-4 mt-4 pb-20 md:pb-0">
        <h3 className="text-sm font-mono text-zinc-400 mb-2 uppercase tracking-wider">
          Nearby Availability ({filtered.length})
        </h3>
        {filtered.map((item, i) => {
          const Icon = CATEGORIES.find(c => c.id === item.type)?.icon || Search;
          
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`glass-card p-4 rounded-2xl flex flex-col md:flex-row gap-4 md:items-center justify-between border-l-4 ${item.isOpen ? `border-l-${item.categoryColor}-500` : 'border-l-zinc-600 opacity-60'}`}
            >
              <div className="flex gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                  item.isOpen ? `bg-${item.categoryColor}-500/10 border border-${item.categoryColor}-500/30 text-${item.categoryColor}-400` : 'bg-white/5 text-zinc-500'
                }`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-white text-base md:text-lg">{item.name}</h4>
                    {!item.isOpen && <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-zinc-800 text-zinc-400">CLOSED</span>}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-zinc-400 font-mono">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {item.distance}</span>
                    <span>•</span>
                    <span className={item.stock === 'Low' ? 'text-red-400' : item.stock === 'Adequate' ? 'text-orange-400' : 'text-green-400'}>
                      Stock: {item.stock}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex md:flex-col items-center md:items-end justify-between gap-2 mt-2 md:mt-0 pt-2 md:pt-0 border-t border-white/5 md:border-none">
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-zinc-500 font-mono">Crowd:</span>
                  <span className={`px-2 py-1 rounded bg-white/5 font-bold ${
                    item.crowdLevel === 'High' ? 'text-red-400' : 
                    item.crowdLevel === 'Medium' ? 'text-orange-400' : 'text-green-400'
                  }`}>
                    {item.crowdLevel}
                  </span>
                </div>
                <button 
                  disabled={!item.isOpen}
                  className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-white transition-colors disabled:opacity-50 flex items-center justify-center"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
