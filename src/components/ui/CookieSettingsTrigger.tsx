"use client";

import React from "react";
import { Cookie } from "lucide-react";

export function CookieSettingsTrigger() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("openCookieSettings"))}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-cream hover:bg-brand-lime/50 border border-brand-navy/15 text-xs font-medium text-brand-navy transition-colors cursor-pointer"
    >
      <Cookie className="w-3.5 h-3.5 text-brand-navy shrink-0" />
      <span>Cookie-Einstellungen öffnen &amp; anpassen</span>
    </button>
  );
}
