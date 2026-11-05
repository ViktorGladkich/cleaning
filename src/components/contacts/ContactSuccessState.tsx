"use client";

import React, { useRef, useEffect } from "react";
import { CheckCircle2, X, ShieldCheck, Clock, Phone } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { COMPANY_INFO } from "@/lib/constants";

interface ContactToastProps {
  referenceId: string;
  name: string;
  onClose: () => void;
}

export function ContactToast({
  referenceId,
  name,
  onClose,
}: ContactToastProps) {
  const toastRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!toastRef.current) return;

    gsap.fromTo(
      toastRef.current,
      { opacity: 0, y: -24, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "back.out(1.6)" }
    );

    const timer = setTimeout(() => {
      if (toastRef.current) {
        gsap.to(toastRef.current, {
          opacity: 0,
          y: -16,
          duration: 0.3,
          ease: "power2.in",
          onComplete: onClose,
        });
      } else {
        onClose();
      }
    }, 7500);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      ref={toastRef}
      role="status"
      aria-live="polite"
      className="fixed top-22 sm:top-26 inset-x-3 sm:inset-x-auto sm:right-6 lg:right-10 z-60 sm:w-full sm:max-w-md pointer-events-auto"
    >
      <div className="bg-brand-navy text-white rounded-2xl p-4 sm:p-5 border border-brand-lime/35 shadow-[0_20px_50px_rgba(15,24,43,0.35)] flex items-start gap-3.5">
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-brand-lime text-brand-navy flex items-center justify-center shrink-0 mt-0.5">
          <CheckCircle2 className="w-5 h-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-brand-lime">
              Anfrage übermittelt #{referenceId}
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Benachrichtigung schließen"
              className="text-white/60 hover:text-white transition-colors p-0.5 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-sm sm:text-[15px] font-medium text-white mt-0.5 leading-snug">
            Vielen Dank, {name}! Ihre Nachricht ist bei uns eingegangen.
          </p>
          <p className="text-xs text-white/75 font-light mt-1 leading-relaxed">
            Unser Chemnitzer Büro meldet sich innerhalb von 24 Stunden bei Ihnen.
          </p>
        </div>
      </div>
    </div>
  );
}

interface ContactSuccessCardProps {
  referenceId: string;
  selectedService: string;
  name: string;
  phone: string;
  email: string;
  onReset: () => void;
}

export function ContactSuccessCard({
  referenceId,
  selectedService,
  name,
  phone,
  email,
  onReset,
}: ContactSuccessCardProps) {
  const successCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (successCardRef.current) {
      gsap.fromTo(
        successCardRef.current,
        { opacity: 0, y: 18, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: "power3.out" }
      );
    }
    ScrollTrigger.refresh();
  }, []);

  return (
    <div
      ref={successCardRef}
      role="region"
      aria-label="Sendebestätigung"
      className="py-4 sm:py-6 space-y-6 sm:space-y-7"
    >
      {/* Top Badge + Check Icon */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-brand-navy/10">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-brand-lime text-brand-navy flex items-center justify-center shrink-0 shadow-xs">
            <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>
          <div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-widest text-brand-navy/60 block">
              Eingangsbestätigung #{referenceId}
            </span>
            <h3 className="text-xl xs:text-2xl sm:text-3xl font-normal tracking-tight text-brand-navy leading-tight mt-0.5">
              Anfrage{" "}
              <span className="inline-block bg-brand-lime rounded-lg text-brand-navy font-normal ml-0">
                erfolgreich gesendet.
              </span>
            </h3>
          </div>
        </div>

        <span className="self-start sm:self-center inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-cream border border-brand-navy/10 text-xs font-medium text-brand-navy shrink-0">
          <ShieldCheck className="w-3.5 h-3.5 text-brand-navy" />
          SSL-verschlüsselt
        </span>
      </div>

      {/* Confirmation Message */}
      <p className="text-sm sm:text-base text-brand-navy/75 leading-relaxed font-light">
        Vielen Dank,{" "}
        <span className="font-medium text-brand-navy">{name}</span>. Wir haben Ihre Anfrage erhalten und melden uns bei Ihnen.
      </p>

      {/* Responsive Summary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-brand-cream/80 border border-brand-navy/10">
        <div className="space-y-0.5 min-w-0">
          <span className="text-[11px] font-mono uppercase tracking-wider text-brand-navy/50 block">
            Gewählte Leistung
          </span>
          <span className="text-sm sm:text-[15px] font-medium text-brand-navy block truncate">
            {selectedService}
          </span>
        </div>

        {phone && (
          <div className="space-y-0.5 min-w-0">
            <span className="text-[11px] font-mono uppercase tracking-wider text-brand-navy/50 block">
              Rückrufnummer
            </span>
            <span className="text-sm sm:text-[15px] font-medium text-brand-navy block truncate">
              {phone}
            </span>
          </div>
        )}

        {email && (
          <div className="space-y-0.5 min-w-0">
            <span className="text-[11px] font-mono uppercase tracking-wider text-brand-navy/50 block">
              Ihre E-Mail
            </span>
            <span className="text-sm sm:text-[15px] font-medium text-brand-navy block truncate">
              {email}
            </span>
          </div>
        )}

        <div className="space-y-0.5 min-w-0">
          <span className="text-[11px] font-mono uppercase tracking-wider text-brand-navy/50 block">
            Rückmeldung
          </span>
          <span className="text-sm sm:text-[15px] font-medium text-brand-navy flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-brand-navy shrink-0" />
            <span>Innerhalb von 24 Stunden</span>
          </span>
        </div>
      </div>

      {/* Responsive Action Bar */}
      <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <button
          type="button"
          onClick={onReset}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-brand-navy hover:bg-brand-navy/90 text-brand-lime text-xs sm:text-sm font-medium transition-colors cursor-pointer text-center"
        >
          Weitere Anfrage senden
        </button>

        <a
          href={`tel:${COMPANY_INFO.phoneRaw}`}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-brand-navy/15 hover:border-brand-navy/35 text-xs sm:text-sm font-medium text-brand-navy transition-colors text-center"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Direkt anrufen: {COMPANY_INFO.phone}</span>
        </a>
      </div>
    </div>
  );
}

