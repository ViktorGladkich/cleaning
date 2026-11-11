"use client";

import React, { useEffect, useRef, useState } from "react";
import { Play, UserCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export function HeroVideoCard() {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // The card is hidden below md: without this, phones would still download the video.
  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const load = () => {
      const video = videoRef.current;
      if (!media.matches || !video || video.getAttribute("src")) return;
      video.src = "/videos/hero-video-card.mp4";
    };
    load();
    media.addEventListener("change", load);
    return () => media.removeEventListener("change", load);
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div
      className="hero-video-wrapper pointer-events-none absolute right-6 lg:right-14 bottom-8 lg:bottom-12 z-20 hidden md:flex flex-col w-70 lg:w-[320px]"
      style={{ transform: "translateY(420px)" }}
    >
      
      {/* Video Container with Glass Frame */}
      <div className="p-2 lg:p-2.5 rounded-[10px] bg-white/10 backdrop-blur-md [-webkit-backdrop-filter:blur(12px)] border border-white/20 shadow-2xl">
        <div className="relative rounded-[10px] overflow-hidden aspect-4/3 w-full bg-brand-navy/50 cursor-pointer group" onClick={togglePlay}>
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="object-cover w-full h-full scale-[1.02] transition-transform duration-700 group-hover:scale-100"
          />
          
          {/* Play/Pause Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors group-hover:bg-black/20">
            <div className={cn(
              "w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center transition-all duration-300 transform-gpu",
              isPlaying ? "opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100" : "opacity-100 scale-100"
            )}>
              <Play className="w-5 h-5 text-white ml-0.5" fill="currentColor" />
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badge Below */}
      <div className="mt-4 lg:mt-5 w-full flex items-center gap-3 p-1.5 pr-5 rounded-md bg-white/10 hover:bg-white/20 backdrop-blur-md [-webkit-backdrop-filter:blur(12px)] border border-white/25 hover:border-white/40 transition-colors duration-200 shadow-xs cursor-default">
        <div className="w-9 h-9 rounded bg-brand-lime flex items-center justify-center shrink-0">
          <UserCheck className="w-4 h-4 text-brand-navy" />
        </div>
        <div className="flex flex-col">
          <span className="text-[13.5px] font-medium text-white/90 leading-tight">
            Persönlicher Ansprechpartner
          </span>
          <span className="text-[11.5px] font-medium text-white/60 leading-tight">
            Inhaber Michel Kislovskij
          </span>
        </div>
      </div>

    </div>
  );
}
