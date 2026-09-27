import * as React from "react";
import { cn } from "../lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "flex h-10 w-full rounded-[12px] border border-[#F0D6E0] bg-white px-3 py-2 text-sm text-[#2D2A2B] placeholder:text-[#6B5E62] focus:outline-none focus:ring-2 focus:ring-[#C45C7A]/40 focus:border-[#C45C7A] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}
