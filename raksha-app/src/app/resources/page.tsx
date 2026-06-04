"use client";
import ResourceFinder from "@/components/ResourceFinder";
import { PackageSearch, Activity } from "lucide-react";

export default function ResourcesPage() {
  return (
    <div className="min-h-full p-4 md:p-8 relative">
      <div className="aurora-bg">
        <div className="aurora-2" />
      </div>
      
      <header className="mb-8 max-w-5xl mx-auto w-full relative z-10 pt-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-white flex items-center gap-3">
              <PackageSearch className="w-8 h-8 text-cyan-400" />
              Emergency Resources
            </h1>
            <p className="text-zinc-400 text-sm mt-2 max-w-xl">
              Locate verified water, food, medical supplies, and power stations near you. 
              Data is crowd-sourced and verified by local volunteers.
            </p>
          </div>
          <div className="glass-card px-4 py-2 rounded-xl flex items-center gap-3">
            <Activity className="w-4 h-4 text-green-400 animate-pulse" />
            <span className="text-xs font-mono text-zinc-300">Live Network Active</span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto w-full relative z-10">
        <ResourceFinder />
      </main>
    </div>
  );
}
