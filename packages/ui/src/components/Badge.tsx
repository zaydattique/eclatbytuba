import * as React from "react";
import { cn } from "../lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "outline" | "success" | "warning" | "danger";
}

export function Badge({ className, variant = "default", children, ...props }: BadgeProps) {
  const variants = {
    default: "bg-[#C45C7A] text-white",
    secondary: "bg-[#FFE8F0] text-[#C45C7A]",
    outline: "border border-[#F0D6E0] text-[#2D2A2B]",
    success: "bg-[#4A7C59]/15 text-[#4A7C59]",
    warning: "bg-[#C49A3C]/15 text-[#C49A3C]",
    danger: "bg-[#C45C5C]/15 text-[#C45C5C]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
