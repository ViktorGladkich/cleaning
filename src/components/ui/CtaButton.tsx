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
  variant?: "primary" | "navy" | "dark" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  arrowClassName?: string;
  target?: string;
  rel?: string;
  iconOnly?: boolean;
  "aria-label"?: string;
}

/**
 * CtaButton — Integrated Pill Button:
 * - Button body: LIME (bg-brand-lime text-brand-navy).
 * - Arrow block: NAVY (bg-brand-navy text-white / text-brand-lime).
 * - Colors remain CONSTANT on hover (no color flickering, no invert, stays default as requested).
 * - NO 360 degree spin! On hover, the arrow block smoothly glides all the way to the other end (left end)
 *   of the button, and text glides all the way to the right end.
 */
export function CtaButton({
  href,
  onClick,
  children = "",
  size = "md",
  className,
  arrowClassName,
  target,
  rel,
  iconOnly = false,
  "aria-label": ariaLabel,
}: CtaButtonProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);

  const isIconOnly = iconOnly || !children;
  const labelText = typeof children === "string" ? children.trim() : children;

  const sizeConfig = {
    sm: {
      container: "h-[38px] pl-4 pr-1.5 text-[14.5px]",
      arrowBlock: "w-7 h-7 rounded-[6px]",
      icon: "w-3.5 h-3.5",
      gap: 10,
    },
    md: {
      container: "h-[42px] pl-5 pr-1.5 text-[15px]",
      arrowBlock: "w-8 h-8 rounded-[7px]",
      icon: "w-4 h-4",
      gap: 12,
    },
    lg: {
      container: "h-[48px] pl-6 pr-2 text-[16px]",
      arrowBlock: "w-9 h-9 rounded-[8px]",
      icon: "w-4.5 h-4.5",
      gap: 14,
    },
  };

  const currentSize = sizeConfig[size] || sizeConfig.md;

  // Real-time hover swap animation:
  // Arrow smoothly glides all the way to the left end of the button,
  // and text smoothly glides all the way to the right end!
  const handleMouseEnter = () => {
    if (!containerRef.current || !textRef.current || !arrowRef.current) return;
    const container = containerRef.current;
    const text = textRef.current;
    const arrow = arrowRef.current;

    const computed = window.getComputedStyle(container);
    const padL = parseFloat(computed.paddingLeft) || 16;
    const padR = parseFloat(computed.paddingRight) || 6;

    // In swapped state:
    // Arrow sits on the left with the snug margin (padR: 6px)
    const arrowTargetLeft = padR;
    const arrowDeltaX = arrowTargetLeft - arrow.offsetLeft;

    // Text sits on the right with full comfortable breathing room (padL: 20px)
    const textTargetLeft = container.clientWidth - padL - text.offsetWidth;
    const textDeltaX = textTargetLeft - text.offsetLeft;

    gsap.to(arrow, {
      x: arrowDeltaX,
      duration: 0.55,
      ease: "power3.out",
      overwrite: "auto",
    });

    gsap.to(text, {
      x: textDeltaX,
      duration: 0.55,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  const handleMouseLeave = () => {
    if (!textRef.current || !arrowRef.current) return;

    gsap.to(arrowRef.current, {
      x: 0,
      duration: 0.48,
      ease: "power3.out",
      overwrite: "auto",
    });

    gsap.to(textRef.current, {
      x: 0,
      duration: 0.48,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  // Mobile or Icon-Only variant
  if (isIconOnly) {
    const singleContent = (
      <span
        className={cn(
          "relative flex items-center justify-center shrink-0 overflow-hidden",
          "bg-brand-navy text-brand-lime border border-brand-navy/20 rounded-lg shadow-xs",
          "active:scale-[0.96] transition-transform duration-150",
          currentSize.arrowBlock,
          className
        )}
      >
        <ArrowUpRight className={cn(currentSize.icon, "text-brand-lime")} />
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

  const isFullWidth = className?.includes("w-full");
  const wrapperClasses = cn(
    "focus:outline-none select-none",
    isFullWidth ? "w-full block" : "shrink-0 inline-block"
  );

  // Single cohesive pill container:
  // Button background: LIME with NAVY text
  // Arrow block: NAVY with LIME / WHITE arrow
  const content = (
    <span
      ref={containerRef}
      className={cn(
        "group relative cursor-pointer select-none overflow-hidden",
        "inline-flex items-center justify-between",
        "bg-brand-lime text-brand-navy border border-brand-lime/80 rounded-lg sm:rounded-xl shadow-xs",
        "active:scale-[0.98] transition-transform duration-150",
        currentSize.container,
        className
      )}
      style={{ columnGap: currentSize.gap }}
    >
      {/* 1. Text: NAVY text, moves to the right end on hover */}
      <span
        ref={textRef}
        className="font-medium whitespace-nowrap will-change-transform tracking-tight text-brand-navy select-none"
      >
        {labelText}
      </span>

      {/* 2. Arrow Block: NAVY background with LIME arrow, moves to the left end on hover */}
      <span
        ref={arrowRef}
        className={cn(
          "relative z-10 inline-flex items-center justify-center shrink-0 overflow-hidden",
          "bg-brand-navy text-brand-lime shadow-xs will-change-transform select-none",
          currentSize.arrowBlock,
          arrowClassName
        )}
      >
        <ArrowUpRight className={cn(currentSize.icon, "transform-gpu")} />
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
        className={wrapperClasses}
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
      className={cn(wrapperClasses, "bg-transparent p-0 border-0")}
    >
      {content}
    </button>
  );
}
