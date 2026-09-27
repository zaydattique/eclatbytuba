import * as React from "react";
import { cn } from "../lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary:
      "bg-[#C45C7A] text-white hover:bg-[#A84A66] focus-visible:ring-[#C45C7A] shadow-[0_2px_8px_rgba(196,92,122,0.2)]",
    secondary:
      "bg-[#D4A574] text-[#2D2A2B] hover:bg-[#c49564] focus-visible:ring-[#D4A574]",
    outline:
      "border border-[#F0D6E0] bg-transparent text-[#2D2A2B] hover:bg-[#FFE8F0]",
    ghost: "hover:bg-[#FFE8F0] text-[#2D2A2B]",
  };

  const sizes = {
    sm: "h-8 px-3 text-sm rounded-[12px]",
    md: "h-10 px-5 text-sm rounded-[20px]",
    lg: "h-12 px-8 text-base rounded-[24px]",
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
