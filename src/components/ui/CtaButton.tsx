"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

export interface CtaButtonProps {
  href?: string;
  onClick?: () => void;
  children?: string;
  variant?: "primary" | "navy" | "cyan" | "dark" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  arrowClassName?: string;
  target?: string;
  rel?: string;
  iconOnly?: boolean;
  "aria-label"?: string;
}

/**
 * CtaButton — "Hyper-Speed Rail" button:
 * - Text block in signature electric blue (var(--color-brand-navy)) with normal weight and title casing.
 * - Text size text-[15.5px] font-medium matching navigation links.
 * - RollingText micro-roll on hover.
 * - Arrow block initially WHITE with BLUE arrow.
 * - On hover: Arrow block leaps all the way to the left, swapping to BLUE background with WHITE arrow.
 * - Exact tight gap on hover via GSAP runtime measurement (no empty hole/space).
 * - Double-arrow diagonal flight loop.
 * - Zero artificial glow/bloom, clean premium aesthetics with rounded-[6px].
 */
export function CtaButton({
  href,
  onClick,
  children = "",
  variant = "primary",
  size = "md",
  className,
  arrowClassName,
  target,
  rel,
  iconOnly = false,
  "aria-label": ariaLabel,
}: CtaButtonProps) {
  const textRef = useRef<HTMLSpanElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);

  const isIconOnly = iconOnly || !children;
  const labelText = typeof children === "string" ? children.trim() : children;

  const sizeConfig = {
    sm: {
      textBlock: "h-[38px] px-4 text-[15.5px] font-medium",
      arrowBlock: "w-[38px] h-[38px]",
      icon: "w-4 h-4",
      gap: 6,
      gapClass: "gap-1.5",
    },
    md: {
      textBlock: "h-[42px] px-5 text-[15.5px] font-medium",
      arrowBlock: "w-[42px] h-[42px]",
      icon: "w-4 h-4",
      gap: 8,
      gapClass: "gap-2",
    },
    lg: {
      textBlock: "h-[48px] px-6 text-[16px] font-medium",
      arrowBlock: "w-[48px] h-[48px]",
      icon: "w-4.5 h-4.5",
      gap: 8,
      gapClass: "gap-2",
    },
  };

  const currentSize = sizeConfig[size] || sizeConfig.md;

  // Real-time hover swap animation: arrow moves left by -(textW + gap), text moves right by +(arrowW + gap)
  // Distance between them is mathematically guaranteed to remain exactly currentSize.gap!
  const handleMouseEnter = () => {
    if (!textRef.current || !arrowRef.current) return;
    const textW = textRef.current.offsetWidth;
    const arrowW = arrowRef.current.offsetWidth;
    const gap = currentSize.gap;

    gsap.to(arrowRef.current, {
      x: -(textW + gap),
      rotation: -360,
      duration: 0.46,
      ease: "power2.out",
      overwrite: "auto",
    });

    gsap.to(textRef.current, {
      x: arrowW + gap,
      duration: 0.46,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleMouseLeave = () => {
    if (!textRef.current || !arrowRef.current) return;

    gsap.to(arrowRef.current, {
      x: 0,
      rotation: 0,
      duration: 0.42,
      ease: "power2.out",
      overwrite: "auto",
    });

    gsap.to(textRef.current, {
      x: 0,
      duration: 0.42,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  // Mobile or Icon-Only variant
  if (isIconOnly) {
    const singleContent = (
      <span
        className={cn(
          "group relative flex items-center justify-center shrink-0 overflow-hidden",
          "bg-brand-navy text-white border border-white/10 rounded-[6px] shadow-xs",
          "hover:bg-brand-lime hover:text-brand-navy hover:border-brand-lime",
          "transition-all duration-300 active:scale-[0.96]",
          currentSize.arrowBlock,
          className
        )}
      >
        <ArrowUpRight
          className={cn(
            currentSize.icon,
            "transform-gpu transition-all duration-300 ease-out",
            "group-hover:translate-x-4 group-hover:-translate-y-4 group-hover:opacity-0"
          )}
        />
        <ArrowUpRight
          aria-hidden="true"
          className={cn(
            currentSize.icon,
            "absolute transform-gpu transition-all duration-300 ease-out",
            "-translate-x-4 translate-y-4 opacity-0",
            "group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
          )}
        />
      </span>
    );

    if (href) {
      return (
        <Link
          href={href}
          onClick={onClick}
          target={target}
          rel={rel}
          aria-label={ariaLabel || "Aktion"}
          className="shrink-0 focus:outline-none"
        >
          {singleContent}
        </Link>
      );
    }

    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={ariaLabel || "Aktion"}
        className="shrink-0 focus:outline-none bg-transparent p-0 border-0"
      >
        {singleContent}
      </button>
    );
  }

  // Dual-block "Hyper-Speed Rail" button
  const content = (
    <span
      className={cn(
        "group relative inline-flex items-center cursor-pointer select-none",
        "active:scale-[0.98] transition-transform duration-150",
        currentSize.gapClass,
        className
      )}
    >
      {/* 1. Text Block: normal weight, text-[15.5px], title case, rolling text, shifts right on hover */}
      <span
        ref={textRef}
        className={cn(
          "inline-flex items-center justify-center font-medium text-brand-navy whitespace-nowrap",
          "bg-white border border-slate-200/80 rounded-[6px] shadow-xs",
          "group-hover:bg-slate-50 transition-colors duration-200",
          currentSize.textBlock
        )}
      >
        {labelText}
      </span>

      {/* 2. Arrow Block: initially LIME with NAVY arrow; on hover leaps left and swaps to NAVY with WHITE arrow + diagonal flight */}
      <span
        ref={arrowRef}
        className={cn(
          "relative z-10 inline-flex items-center justify-center shrink-0 overflow-hidden",
          "bg-brand-lime text-brand-navy border border-brand-lime rounded-[6px] shadow-xs",
          "group-hover:bg-brand-navy group-hover:text-white group-hover:border-brand-navy",
          "group-hover:shadow-[0_12px_28px_-3px_rgba(61,86,143,0.35)]",
          "transition-colors transition-shadow duration-200",
          currentSize.arrowBlock,
          arrowClassName
        )}
      >
        {/* Primary arrow - flies up-right */}
        <ArrowUpRight
          className={cn(
            currentSize.icon,
            "transform-gpu transition-all duration-300 ease-out",
            "group-hover:translate-x-4 group-hover:-translate-y-4 group-hover:opacity-0"
          )}
        />

        {/* Incoming clone arrow - swooshes in from bottom-left */}
        <ArrowUpRight
          aria-hidden="true"
          className={cn(
            currentSize.icon,
            "absolute transform-gpu transition-all duration-300 ease-out",
            "-translate-x-4 translate-y-4 opacity-0",
            "group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
          )}
        />
      </span>
    </span>
  );

  if (href) {
    return (
      <Link
        href={href}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        target={target}
        rel={rel}
        aria-label={ariaLabel || labelText}
        className="shrink-0 focus:outline-none inline-block"
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label={ariaLabel || labelText}
      className="shrink-0 focus:outline-none bg-transparent p-0 border-0 inline-block"
    >
      {content}
    </button>
  );
}
