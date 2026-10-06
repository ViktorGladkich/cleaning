"use client";

import React, { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SERVICES } from "@/data/services";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: SERVICES[0]?.title || "",
    address: "",
    comment: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Card className="p-8 sm:p-10 shadow-xl border-blue-500/20">
      {submitted ? (
        <div className="py-12 text-center space-y-4">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-950 text-brand-navy rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">
            Vielen Dank für Ihre Anfrage!
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-md mx-auto">
            Wir haben Ihre Daten erhalten, {formData.name || "Sehr geehrte(r) Kunde/in"}. Ein Mitarbeiter unseres Chemnitzer Büros meldet sich in Kürze unter {formData.phone || formData.email} bei Ihnen.
          </p>
          <Button
            onClick={() => setSubmitted(false)}
            variant="outline"
            size="sm"
            className="mt-4"
          >
            Weitere Anfrage stellen
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">
              Reinigungsangebot anfordern
            </h3>
            <p className="text-xs text-neutral-500 mt-1">
              Füllen Sie das Formular aus – wir erstellen Ihnen zeitnah ein Festpreisangebot
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1.5">
                Ihr Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Max Mustermann"
                className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-navy"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1.5">
                Telefonnummer *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="+49 (0) 371..."
                className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-navy"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1.5">
              Gewünschte Leistung
            </label>
            <select
              value={formData.service}
              onChange={(e) =>
                setFormData({ ...formData, service: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-navy"
            >
              {SERVICES.map((s) => (
                <option key={s.id} value={s.title}>
                  {s.title} (ab {s.priceFrom} €)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1.5">
              Standort / Stadtteil in Chemnitz & PLZ
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              placeholder="z. B. Chemnitz Kaßberg, 09112"
              className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-navy"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1.5">
              Angaben zum Objekt / Wünsche
            </label>
            <textarea
              rows={3}
              value={formData.comment}
              onChange={(e) =>
                setFormData({ ...formData, comment: e.target.value })
              }
              placeholder="Zimmeranzahl, Quadratmeter, gewünschter Wochentag oder Besonderheiten..."
              className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-navy"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            icon={<Send className="w-4 h-4" />}
          >
            Anfrage absenden
          </Button>

          <p className="text-[11px] text-neutral-400 text-center">
            Mit dem Absenden stimmen Sie unserer Datenschutzerklärung zu. Keine Werbeflut.
          </p>
        </form>
      )}
    </Card>
  );
}
