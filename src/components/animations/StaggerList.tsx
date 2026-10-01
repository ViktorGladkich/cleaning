"use client";

import React, { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

interface StaggerListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  stagger?: number;
  duration?: number;
  selector?: string;
  className?: string;
}

export function StaggerList({
  children,
  stagger = 0.12,
  duration = 0.6,
  selector = ":scope > *",
  className,
  ...props
}: StaggerListProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const items =
        !selector || selector === "> *" || selector === ":scope > *"
          ? Array.from(container.children)
          : Array.from(
              container.querySelectorAll(
                selector.startsWith(">") ? `:scope ${selector}` : selector
              )
            );
      if (!items.length) return;

      gsap.fromTo(
        items,
        {
          opacity: 0,
          y: 25,
        },
        {
          opacity: 1,
          y: 0,
          duration,
          stagger,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={cn(className)} {...props}>
      {children}
    </div>
  );
}
