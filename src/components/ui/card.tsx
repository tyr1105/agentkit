import { clsx } from "clsx";
import { type ReactNode } from "react";

interface CardProps {
  className?: string;
  children: ReactNode;
  hover?: boolean;
  glow?: boolean;
}

export function Card({ className, children, hover = false, glow = false }: CardProps) {
  return (
    <div
      className={clsx(
        "rounded-xl border border-[#27272a] bg-[#18181b]/60 backdrop-blur-sm p-6",
        hover && "transition-all duration-300 hover:border-[#3f3f46] hover:bg-[#18181b]",
        glow &&
          "border-transparent bg-clip-padding",
        glow &&
          "shadow-[0_0_60px_-12px_rgba(168,85,247,0.15)]",
        className
      )}
    >
      {children}
    </div>
  );
}
