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
    primary: "bg-[#1a1a1a] text-white hover:bg-[#333] focus-visible:ring-[#c9a86c]",
    secondary: "bg-[#c9a86c] text-[#1a1a1a] hover:bg-[#b8954f] focus-visible:ring-[#1a1a1a]",
    outline: "border border-[#1a1a1a] bg-transparent hover:bg-[#f5f3ef]",
    ghost: "hover:bg-[#f5f3ef]",
  };

  const sizes = {
    sm: "h-8 px-3 text-sm rounded-md",
    md: "h-10 px-5 text-sm rounded-md",
    lg: "h-12 px-8 text-base rounded-lg",
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
