"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import {
  CategoryType,
  CATEGORY_OPTIONS,
  SERVICES_BY_CAT,
} from "./contactHubData";

interface ContactServiceSelectsProps {
  category: CategoryType;
  selectedService: string;
  onCategoryChange: (cat: CategoryType) => void;
  onServiceChange: (service: string) => void;
}

export function ContactServiceSelects({
  category,
  selectedService,
  onCategoryChange,
  onServiceChange,
}: ContactServiceSelectsProps) {
  const dropdownWrapRef = useRef<HTMLDivElement>(null);
  const [openDropdown, setOpenDropdown] = useState<
    "category" | "service" | null
  >(null);

  // Close custom select dropdowns on outside click or Escape key
  useEffect(() => {
    if (!openDropdown) return;

    const handlePointerDown = (e: MouseEvent) => {
      if (
        dropdownWrapRef.current &&
        !dropdownWrapRef.current.contains(e.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openDropdown]);

  const activeCategoryMeta =
    CATEGORY_OPTIONS.find((opt) => opt.id === category) || CATEGORY_OPTIONS[0];
  const ActiveCategoryIcon = activeCategoryMeta.Icon;

  return (
    <div ref={dropdownWrapRef} className="space-y-5">
      {/* 1. Bereich wählen * */}
      <div className="relative">
        <label
          id="label-category-select"
          className="block text-xs font-mono font-normal uppercase tracking-wider text-brand-navy/70 mb-1.5"
        >
          1. Bereich wählen *
        </label>
        <button
          type="button"
          aria-labelledby="label-category-select"
          aria-haspopup="listbox"
          aria-expanded={openDropdown === "category"}
          onClick={() =>
            setOpenDropdown((prev) =>
              prev === "category" ? null : "category"
            )
          }
          className={`w-full px-3.5 py-3 rounded-xl border text-left flex items-center justify-between gap-2.5 transition-colors cursor-pointer ${
            openDropdown === "category"
              ? "bg-white border-brand-navy shadow-xs"
              : "bg-brand-cream/30 border-brand-navy/15 hover:border-brand-navy/35 hover:bg-brand-cream/50"
          }`}
        >
          <span className="flex items-center gap-2.5 min-w-0">
            <ActiveCategoryIcon className="w-4 h-4 text-brand-navy/75 shrink-0" />
            <span className="text-sm font-normal text-brand-navy truncate">
              {activeCategoryMeta.label}
            </span>
          </span>
          <ChevronDown
            className={`w-4 h-4 text-brand-navy/60 shrink-0 transition-transform duration-200 ${
              openDropdown === "category" ? "rotate-180 text-brand-navy" : ""
            }`}
          />
        </button>

        {openDropdown === "category" && (
          <div
            role="listbox"
            aria-labelledby="label-category-select"
            className="absolute left-0 right-0 top-[calc(100%+6px)] z-30 bg-white rounded-xl border border-brand-navy/15 shadow-xl shadow-brand-navy/10 p-1.5 space-y-1"
          >
            {CATEGORY_OPTIONS.map((opt) => {
              const IconComp = opt.Icon;
              const isSelected = category === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onCategoryChange(opt.id);
                    setOpenDropdown(null);
                  }}
                  className={`w-full px-3 py-2.5 rounded-lg text-left flex items-center justify-between gap-3 transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-brand-navy text-white"
                      : "text-brand-navy hover:bg-brand-cream/70"
                  }`}
                >
                  <span className="flex items-center gap-2.5 min-w-0">
                    <IconComp
                      className={`w-4 h-4 shrink-0 ${
                        isSelected ? "text-brand-lime" : "text-brand-navy/70"
                      }`}
                    />
                    <span className="min-w-0 block">
                      <span className="text-xs sm:text-sm font-normal block truncate">
                        {opt.label}
                      </span>
                      <span
                        className={`text-[11px] font-light block truncate ${
                          isSelected ? "text-white/70" : "text-brand-navy/55"
                        }`}
                      >
                        {opt.subtitle}
                      </span>
                    </span>
                  </span>

                  {isSelected && (
                    <Check className="w-4 h-4 text-brand-lime shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 2. Konkrete Leistung * */}
      <div className="relative">
        <label
          id="label-service-select"
          className="block text-xs font-mono font-normal uppercase tracking-wider text-brand-navy/70 mb-1.5"
        >
          2. Konkrete Leistung *
        </label>
        <button
          type="button"
          aria-labelledby="label-service-select"
          aria-haspopup="listbox"
          aria-expanded={openDropdown === "service"}
          onClick={() =>
            setOpenDropdown((prev) =>
              prev === "service" ? null : "service"
            )
          }
          className={`w-full px-3.5 py-3 rounded-xl border text-left flex items-center justify-between gap-2.5 transition-colors cursor-pointer ${
            openDropdown === "service"
              ? "bg-white border-brand-navy shadow-xs"
              : "bg-brand-cream/30 border-brand-navy/15 hover:border-brand-navy/35 hover:bg-brand-cream/50"
          }`}
        >
          <span className="text-sm font-normal text-brand-navy truncate">
            {selectedService}
          </span>
          <ChevronDown
            className={`w-4 h-4 text-brand-navy/60 shrink-0 transition-transform duration-200 ${
              openDropdown === "service" ? "rotate-180 text-brand-navy" : ""
            }`}
          />
        </button>

        {openDropdown === "service" && (
          <div
            role="listbox"
            aria-labelledby="label-service-select"
            className="absolute left-0 right-0 top-[calc(100%+6px)] z-30 bg-white rounded-xl border border-brand-navy/15 shadow-xl shadow-brand-navy/10 p-1.5 space-y-1 max-h-64 overflow-y-auto"
          >
            {SERVICES_BY_CAT[category].map((item) => {
              const isSelected = selectedService === item;
              return (
                <button
                  key={item}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onServiceChange(item);
                    setOpenDropdown(null);
                  }}
                  className={`w-full px-3 py-2.5 rounded-lg text-left flex items-center justify-between gap-2.5 text-xs sm:text-sm font-normal transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-brand-navy text-white"
                      : "text-brand-navy/85 hover:bg-brand-cream/70"
                  }`}
                >
                  <span className="truncate">{item}</span>
                  {isSelected && (
                    <Check className="w-4 h-4 text-brand-lime shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
