import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export function Card({
  children,
  className,
  hoverEffect = true,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900",
        hoverEffect &&
          "transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-emerald-500/30",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
