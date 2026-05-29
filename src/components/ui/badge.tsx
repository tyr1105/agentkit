import { clsx } from "clsx";
import { type ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "purple" | "blue" | "green" | "cyan";
}

export function Badge({ children, className, variant = "default" }: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border",
        {
          "bg-[#18181b] text-[#a1a1aa] border-[#27272a]": variant === "default",
          "bg-purple-500/10 text-purple-400 border-purple-500/20": variant === "purple",
          "bg-blue-500/10 text-blue-400 border-blue-500/20": variant === "blue",
          "bg-emerald-500/10 text-emerald-400 border-emerald-500/20": variant === "green",
          "bg-cyan-500/10 text-cyan-400 border-cyan-500/20": variant === "cyan",
        },
        className
      )}
    >
      {children}
    </span>
  );
}
