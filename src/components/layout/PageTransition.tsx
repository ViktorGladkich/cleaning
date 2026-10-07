"use client";

import React, { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "@/lib/gsap";

interface PageTransitionProps {
  children: React.ReactNode;
}

/**
 * 5-Column Staircase Curtain Page Transition
 * Matches the cinematic 5-column stepped reveal from the Hero section:
 * 1. On page entry / load: 5 columns smoothly wipe up like a staircase (scaleY: 0, origin-top).
 * 2. On internal link navigation: 5 columns smoothly wipe down like a staircase (scaleY: 1, origin-bottom),
 *    the route changes, and they wipe up on arrival to reveal the new page.
 */
export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const router = useRouter();
  const overlayRef = useRef<HTMLDivElement>(null);
  const colsRef = useRef<(HTMLDivElement | null)[]>([]);
  const isNavigatingRef = useRef(false);

  // 1. Entrance animation on mount and on route change
  useEffect(() => {
    const cols = colsRef.current.filter(Boolean);
    const overlay = overlayRef.current;
    if (cols.length === 0 || !overlay) return;

    // Reset navigating flag
    isNavigatingRef.current = false;

    // Reveal animation (columns scale up and disappear)
    gsap.fromTo(
      cols,
      { scaleY: 1, transformOrigin: "top" },
      {
        scaleY: 0,
        duration: 0.8,
        stagger: 0.07,
        ease: "power3.inOut",
        onComplete: () => {
          if (overlay) {
            overlay.style.pointerEvents = "none";
          }
        },
      }
    );
  }, [pathname]);

  // 2. Intercept internal link clicks to trigger exit animation
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      // Find closest anchor tag
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href) return;

      // Ignore external links, mailto, tel, target="_blank", or modifier keys
      if (
        href.startsWith("http") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        target.target === "_blank" ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }

      // Ignore pure hash links on current page
      if (href.startsWith("#") || href === pathname) {
        return;
      }

      // If already navigating, prevent double trigger
      if (isNavigatingRef.current) {
        e.preventDefault();
        return;
      }

      // Parse relative or same-origin path
      const url = new URL(href, window.location.origin);
      if (url.origin !== window.location.origin) return;

      // Same pathname + hash only -> let browser handle hash jump
      if (url.pathname === pathname && url.hash) return;

      e.preventDefault();
      isNavigatingRef.current = true;

      const cols = colsRef.current.filter(Boolean);
      const overlay = overlayRef.current;
      if (overlay) {
        overlay.style.pointerEvents = "auto";
      }

      // Exit animation: 5-column staircase curtain wipe downwards
      gsap.fromTo(
        cols,
        { scaleY: 0, transformOrigin: "bottom" },
        {
          scaleY: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: "power3.inOut",
          onComplete: () => {
            router.push(href);
          },
        }
      );

      // Failsafe timeout in case route change hangs
      setTimeout(() => {
        isNavigatingRef.current = false;
        if (overlay) overlay.style.pointerEvents = "none";
      }, 1500);
    };

    document.addEventListener("click", handleDocumentClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleDocumentClick, { capture: true });
    };
  }, [pathname, router]);

  return (
    <>
      {/* 5-Column Staircase Curtain Overlay */}
      <div
        ref={overlayRef}
        aria-hidden="true"
        className="fixed inset-0 z-[9999] pointer-events-none grid grid-cols-5 h-screen w-screen overflow-hidden select-none"
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            ref={(el) => {
              colsRef.current[i] = el;
            }}
            className="h-full w-[calc(100%+1px)] bg-[#FAFAFA] transform-gpu origin-top"
            style={{ transform: "scaleY(1)" }}
          />
        ))}
      </div>

      {children}
    </>
  );
}
