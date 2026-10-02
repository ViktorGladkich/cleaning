"use client";

import React, { useState } from "react";
import { Phone, Mail, Clock, MapPin, CheckCircle2, Send } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { COMPANY_INFO } from "@/lib/constants";
import { SERVICES } from "@/data/services";

export default function ContactsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: SERVICES[0].title,
    address: "",
    comment: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-12 sm:py-16">
      <Container>
        <SectionHeading
          badge="Kontakt & Anfahrt"
          title="Wir sind für Sie da in Chemnitz"
          subtitle="Fordern Sie unverbindlich Ihr persönliches Angebot an oder rufen Sie uns direkt an"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12 items-start">
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">
                Persönliche Beratung vor Ort
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Unser Chemnitzer Kundenservice berät Sie gern unverbindlich. Gerne vereinbaren wir eine kostenlose Besichtigung bei Ihnen vor Ort für ein maßgeschneidertes Festpreisangebot.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800">
                <div className="p-2.5 rounded-xl bg-blue-100 text-[var(--color-brand-navy)] dark:bg-blue-950 dark:text-sky-400">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-neutral-500 block">Telefon Chemnitz</span>
                  <a
                    href={`tel:${COMPANY_INFO.phoneRaw}`}
                    className="font-semibold text-base text-neutral-900 dark:text-white hover:text-[var(--color-brand-navy)] transition"
                  >
                    {COMPANY_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800">
                <div className="p-2.5 rounded-xl bg-blue-100 text-[var(--color-brand-navy)] dark:bg-blue-950 dark:text-sky-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-neutral-500 block">E-Mail</span>
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="font-semibold text-base text-neutral-900 dark:text-white hover:text-[var(--color-brand-navy)] transition"
                  >
                    {COMPANY_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800">
                <div className="p-2.5 rounded-xl bg-blue-100 text-[var(--color-brand-navy)] dark:bg-blue-950 dark:text-sky-400">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-neutral-500 block">Öffnungszeiten</span>
                  <span className="font-semibold text-sm text-neutral-900 dark:text-white">
                    {COMPANY_INFO.workingHours}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800">
                <div className="p-2.5 rounded-xl bg-blue-100 text-[var(--color-brand-navy)] dark:bg-blue-950 dark:text-sky-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-neutral-500 block">Büro Chemnitz</span>
                  <span className="font-semibold text-sm text-neutral-900 dark:text-white">
                    {COMPANY_INFO.address}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <Card className="p-8 sm:p-10 shadow-xl border-blue-500/20">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-950 text-[var(--color-brand-navy)] rounded-full flex items-center justify-center mx-auto">
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
                        className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-navy)]"
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
                        className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-navy)]"
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
                      className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-navy)]"
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
                      className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-navy)]"
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
                      className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-navy)]"
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
          </div>
        </div>
      </Container>
    </div>
  );
}
