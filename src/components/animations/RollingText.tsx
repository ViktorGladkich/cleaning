"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

export interface RollingTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: string;
  className?: string;
  duplicateClassName?: string;
  duration?: number;
  isActive?: boolean;
}

/**
 * RollingText creates a silky-smooth GSAP vertical roll effect on hover.
 * Uses a single two-row vertical track inside an overflow-hidden mask.
 * Automatically triggers when hovering anywhere on the parent <Link> or <button>.
 * Zero clipping artifacts, zero text disappearance, perfect typography.
 */
export function RollingText({
  children,
  className,
  duplicateClassName,
  duration = 0.28,
  isActive = false,
  ...props
}: RollingTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const trackRef = useRef<HTMLSpanElement>(null);
  const layer1Ref = useRef<HTMLSpanElement>(null);
  const layer2Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    const track = trackRef.current;
    const layer1 = layer1Ref.current;
    const layer2 = layer2Ref.current;
    if (!el || !track) return;

    // Attach to the parent interactive element (<a> or <button>) if present, otherwise el
    const trigger = el.closest("a, button") || el;

    const onEnter = () => {
      gsap.to(track, {
        yPercent: -50,
        duration,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const onLeave = () => {
      gsap.to(track, {
        yPercent: 0,
        duration: duration * 0.9,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    trigger.addEventListener("mouseenter", onEnter);
    trigger.addEventListener("mouseleave", onLeave);

    return () => {
      trigger.removeEventListener("mouseenter", onEnter);
      trigger.removeEventListener("mouseleave", onLeave);
    };
  }, [duration]);

  return (
    <span
      ref={containerRef}
      className={cn(
        "relative inline-block h-[1.3em] overflow-hidden align-middle select-none",
        isActive && "text-[var(--color-brand-navy)] font-semibold",
        className
      )}
      {...props}
    >
      <span
        ref={trackRef}
        className="flex flex-col transform-gpu will-change-transform"
        style={{ transform: "translateY(0%)" }}
      >
        {/* Layer 1: Normal state */}
        <span
          ref={layer1Ref}
          className="inline-flex items-center h-[1.3em] leading-none whitespace-nowrap"
        >
          {children}
        </span>

        {/* Layer 2: Hover state (starts at opacity: 0 to prevent any sub-pixel bleed) */}
        <span
          ref={layer2Ref}
          aria-hidden="true"
          className={cn(
            "inline-flex items-center h-[1.3em] leading-none whitespace-nowrap",
            duplicateClassName || "text-[var(--color-brand-navy)]"
          )}
        >
          {children}
        </span>
      </span>
    </span>
  );
}
