"use client";
import { useEmergencyStore } from "@/store/useEmergencyStore";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, AlertTriangle, Radio } from "lucide-react";
import StatusBadge from "@/components/ui/StatusBadge";

function getSeverityColor(sev: number): string {
  if (sev >= 8) return "#ef4444";
  if (sev >= 6) return "#f97316";
  if (sev >= 4) return "#f59e0b";
  return "#6366f1";
}

function getSeverityBg(sev: number): string {
  if (sev >= 8) return "rgba(239,68,68,0.08)";
  if (sev >= 6) return "rgba(249,115,22,0.06)";
  if (sev >= 4) return "rgba(245,158,11,0.06)";
  return "transparent";
}

export default function EmergencyHeader() {
  const { severity, sosStatus, panicModeActive } = useEmergencyStore();
  const severityColor = getSeverityColor(severity);
  const isCritical = severity >= 8 || panicModeActive;

  return (
    <header
      className="sticky top-0 z-40 border-b transition-all duration-700"
      style={{
        background: `linear-gradient(to bottom, ${getSeverityBg(severity)}, rgba(5,5,8,0.95))`,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderColor: isCritical ? "rgba(239,68,68,0.25)" : "rgba(255,255,255,0.05)",
      }}
    >
      {/* Severity progress bar at very top */}
      <motion.div
        className="h-[2px] absolute top-0 left-0"
        animate={{ width: `${(severity / 10) * 100}%` }}
        transition={{ duration: 0.8, ease: "backOut" }}
        style={{ background: `linear-gradient(90deg, ${severityColor}88, ${severityColor})` }}
      />

      <div className="px-4 md:px-6 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <motion.div
            animate={
              isCritical
                ? { scale: [1, 1.1, 1], rotate: [0, -5, 5, 0] }
                : { scale: 1, rotate: 0 }
            }
            transition={
              isCritical
                ? { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                : { duration: 0.3 }
            }
            className="relative w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: isCritical
                ? "linear-gradient(135deg, #7f1d1d, #ef4444)"
                : "linear-gradient(135deg, #7f1d1d, #ef4444)", // Keeping it red/emergency themed
              boxShadow: `0 0 20px ${isCritical ? severityColor : '#ef4444'}40`,
            }}
          >
            <Shield className="w-5 h-5 text-white" />
            {isCritical && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-[#050508] animate-ping" />
            )}
          </motion.div>

          <div>
            <h1 className="font-display font-bold text-base leading-none tracking-tight">
              <span className="text-red-500">Raksha</span>
              <span className="text-[var(--text-primary)]"> AI</span>
            </h1>
            <p className="text-[10px] text-[var(--text-muted)] font-mono tracking-widest uppercase leading-none mt-0.5">
              Disaster Response
            </p>
          </div>
        </div>

        {/* Center — Status indicators (hidden on small mobile) */}
        <div className="hidden sm:flex items-center gap-2">
          <AnimatePresence>
            {sosStatus !== "IDLE" && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
              >
                <StatusBadge
                  variant={sosStatus === "TRIGGERED" ? "critical" : "warning"}
                  pulse={true}
                >
                  SOS {sosStatus}
                </StatusBadge>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right — Emergency level + controls */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <StatusBadge variant="active" pulse={true}>
            NETWORK ONLINE
          </StatusBadge>

          {severity >= 4 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-mono font-bold tracking-widest uppercase"
              style={{
                color: severityColor,
                borderColor: `${severityColor}40`,
                background: `${severityColor}10`,
              }}
            >
              <AlertTriangle className="w-3 h-3" />
              SEV {severity}
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
}
