import { clsx } from "clsx";
import { type ButtonHTMLAttributes, type ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 cursor-pointer",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#09090b]",
        {
          "bg-gradient-to-r from-[#7c3aed] via-[#6366f1] to-[#06b6d4] text-white hover:opacity-90 focus:ring-[#7c3aed] shadow-lg shadow-purple-500/20":
            variant === "primary",
          "bg-[#18181b] text-[#fafafa] border border-[#27272a] hover:border-[#3f3f46] hover:bg-[#27272a] focus:ring-[#3f3f46]":
            variant === "secondary",
          "bg-transparent text-[#a1a1aa] hover:text-[#fafafa] hover:bg-[#18181b] focus:ring-[#3f3f46]":
            variant === "ghost",
        },
        {
          "px-3 py-1.5 text-sm": size === "sm",
          "px-5 py-2.5 text-sm": size === "md",
          "px-7 py-3.5 text-base": size === "lg",
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
