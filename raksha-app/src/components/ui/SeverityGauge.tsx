"use client";
import { motion } from "framer-motion";

interface SeverityGaugeProps {
  severity: number; // 1-10
  size?: number;
  showLabel?: boolean;
}

function getSeverityConfig(sev: number) {
  if (sev >= 8) return { color: "#ef4444", glow: "rgba(239,68,68,0.5)", label: "CRITICAL", trackColor: "rgba(239,68,68,0.15)" };
  if (sev >= 6) return { color: "#f97316", glow: "rgba(249,115,22,0.4)", label: "HIGH", trackColor: "rgba(249,115,22,0.12)" };
  if (sev >= 4) return { color: "#f59e0b", glow: "rgba(245,158,11,0.4)", label: "MEDIUM", trackColor: "rgba(245,158,11,0.12)" };
  return { color: "#6366f1", glow: "rgba(99,102,241,0.4)", label: "LOW", trackColor: "rgba(99,102,241,0.12)" };
}

export default function SeverityGauge({ severity, size = 160, showLabel = true }: SeverityGaugeProps) {
  const cfg = getSeverityConfig(severity);
  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  // Use 270 degrees of arc (leaving 90 degree gap at bottom)
  const arcLength = circumference * 0.75;
  const fillLength = (severity / 10) * arcLength;
  const dashOffset = arcLength - fillLength;
  // Rotate so gap is at bottom
  const rotationOffset = 135;

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="rotate-0"
          style={{ transform: `rotate(${rotationOffset}deg)` }}
        >
          {/* Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={cfg.trackColor}
            strokeWidth={size > 100 ? 12 : 8}
            strokeLinecap="round"
            strokeDasharray={`${arcLength} ${circumference}`}
          />
          {/* Fill */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={cfg.color}
            strokeWidth={size > 100 ? 12 : 8}
            strokeLinecap="round"
            strokeDasharray={`${arcLength} ${circumference}`}
            initial={{ strokeDashoffset: arcLength }}
            animate={{ strokeDashoffset: dashOffset }}
            transition={{ duration: 0.8, ease: "backOut" }}
            style={{
              filter: `drop-shadow(0 0 8px ${cfg.glow})`,
            }}
          />
        </svg>
        {/* Center label */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ transform: "rotate(0deg)" }}
        >
          <motion.span
            key={severity}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: "backOut" }}
            className="font-display font-black leading-none tracking-tighter"
            style={{ fontSize: size * 0.35, color: cfg.color }}
          >
            {severity}
          </motion.span>
          <span
            className="text-[var(--text-muted)] font-mono font-bold leading-none mt-1"
            style={{ fontSize: size * 0.12 }}
          >
            /10
          </span>
        </div>
      </div>
      {showLabel && (
        <motion.span
          key={cfg.label}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs font-mono font-bold tracking-[0.2em] uppercase mt-2"
          style={{ color: cfg.color, textShadow: `0 0 10px ${cfg.glow}` }}
        >
          {cfg.label}
        </motion.span>
      )}
    </div>
  );
}
