"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "elevated" | "emergency" | "amber";
  glow?: boolean;
  hover?: boolean;
  animate?: boolean;
  onClick?: () => void;
}

export default function GlassCard({
  children,
  className,
  variant = "default",
  glow = false,
  hover = false,
  animate = false,
  onClick,
}: GlassCardProps) {
  const baseClass = "rounded-2xl border transition-all duration-300";

  const variantClasses = {
    default: "bg-[#13131f] border-white/5",
    elevated: "bg-[#0f0f1a]/80 backdrop-blur-xl border-white/8",
    emergency: "bg-red-950/20 border-red-500/30 animate-border-emergency",
    amber: "bg-amber-950/10 border-amber-500/25",
  };

  const glowClasses = {
    default: glow ? "shadow-indigo-glow" : "",
    elevated: glow ? "shadow-indigo-glow" : "",
    emergency: glow ? "shadow-red-glow animate-glow-pulse" : "",
    amber: glow ? "shadow-amber-glow" : "",
  };

  const hoverClasses = hover
    ? "hover:bg-[#181828] hover:border-white/10 cursor-pointer hover:-translate-y-0.5"
    : "";

  const combinedClass = cn(
    baseClass,
    variantClasses[variant],
    glowClasses[variant],
    hoverClasses,
    className
  );

  if (animate) {
    return (
      <motion.div
        className={combinedClass}
        onClick={onClick}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={combinedClass} onClick={onClick}>
      {children}
    </div>
  );
}
