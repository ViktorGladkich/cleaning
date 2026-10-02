import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonBaseProps {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

type ButtonAsButton = ButtonBaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = ButtonBaseProps & {
  href: string;
  target?: string;
  rel?: string;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({
  variant = "primary",
  size = "md",
  children,
  className,
  icon,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2";

  const variantStyles = {
    primary:
      "bg-(--color-brand-navy) text-white hover:bg-(--color-brand-navy)/90 shadow-sm hover:shadow-md shadow-brand-navy/20 focus-visible:outline-(--color-brand-navy)",
    secondary:
      "bg-brand-lime text-brand-navy hover:bg-brand-lime/80 shadow-xs focus-visible:outline-(--color-brand-navy)",
    outline:
      "border border-slate-300 dark:border-neutral-700 bg-transparent text-brand-navy dark:text-neutral-200 hover:bg-slate-100 dark:hover:bg-neutral-800",
    ghost:
      "text-brand-navy/80 hover:text-brand-navy hover:bg-slate-100 dark:hover:bg-neutral-800/60",
  };

  const sizeStyles = {
    sm: "text-xs px-3.5 py-1.5 gap-1.5",
    md: "text-sm px-5 py-2.5 gap-2",
    lg: "text-base px-6 py-3.5 gap-2.5",
  };

  const combinedClasses = cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  if ("href" in props && props.href) {
    const { href, target, rel } = props as ButtonAsLink;
    return (
      <Link href={href} target={target} rel={rel} className={combinedClasses}>
        {children}
        {icon && <span className="shrink-0">{icon}</span>}
      </Link>
    );
  }

  const buttonProps = props as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={combinedClasses} {...buttonProps}>
      {children}
      {icon && <span className="shrink-0">{icon}</span>}
    </button>
  );
}
