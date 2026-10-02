"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { Play, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { gsap } from "@/lib/gsap";

export function HeroVideoCard() {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

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
    <div className="hero-video-wrapper opacity-0 absolute right-6 lg:right-14 bottom-8 lg:bottom-12 z-20 hidden md:flex flex-col w-[280px] lg:w-[320px] transform-gpu">
      
      {/* Video Container with Glass Frame */}
      <div className="p-2 lg:p-2.5 rounded-[10px] bg-white/10 backdrop-blur-[12px] [-webkit-backdrop-filter:blur(12px)] border border-white/20 shadow-2xl">
        <div className="relative rounded-[10px] overflow-hidden aspect-[4/3] w-full bg-brand-navy/50 cursor-pointer group" onClick={togglePlay}>
          <video
            ref={videoRef}
            src="/videos/hero-video.mp4"
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
      <div className="mt-4 lg:mt-5 bg-white/95 backdrop-blur-sm rounded-[10px] p-2 pr-5 flex items-center gap-3 shadow-xl transform transition-transform duration-300 hover:scale-[1.02]">
        <div className="w-10 h-10 lg:w-11 lg:h-11 rounded-[6px] bg-brand-lime flex items-center justify-center shrink-0">
          <Star className="w-5 h-5 text-brand-navy" fill="currentColor" />
        </div>
        <div className="flex flex-col">
          <span className="text-[13.5px] lg:text-[14.5px] font-medium text-brand-navy leading-tight">
            Top Bewertungen
          </span>
          <span className="text-[11.5px] lg:text-[12.5px] font-medium text-brand-navy/60 leading-tight">
            94% Kundenzufriedenheit
          </span>
        </div>
      </div>

    </div>
  );
}
