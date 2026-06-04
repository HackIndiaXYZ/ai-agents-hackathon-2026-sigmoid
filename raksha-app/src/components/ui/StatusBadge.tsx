"use client";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  variant?: "active" | "warning" | "critical" | "idle" | "processing";
  children: React.ReactNode;
  pulse?: boolean;
  className?: string;
}

const variantConfig = {
  active: {
    dot: "bg-emerald-400",
    text: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
  },
  warning: {
    dot: "bg-amber-400",
    text: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/20",
  },
  critical: {
    dot: "bg-red-400",
    text: "text-red-400",
    bg: "bg-red-500/10 border-red-500/20",
  },
  idle: {
    dot: "bg-zinc-500",
    text: "text-zinc-500",
    bg: "bg-zinc-800/50 border-zinc-700/30",
  },
  processing: {
    dot: "bg-indigo-400",
    text: "text-indigo-400",
    bg: "bg-indigo-500/10 border-indigo-500/20",
  },
};

export default function StatusBadge({
  variant = "idle",
  children,
  pulse = false,
  className,
}: StatusBadgeProps) {
  const cfg = variantConfig[variant];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-mono font-semibold tracking-widest uppercase",
        cfg.bg,
        cfg.text,
        className
      )}
    >
      <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
        <span
          className={cn(
            "relative inline-flex rounded-full h-1.5 w-1.5",
            cfg.dot
          )}
        />
        {pulse && (
          <span
            className={cn(
              "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
              cfg.dot
            )}
          />
        )}
      </span>
      {children}
    </span>
  );
}
