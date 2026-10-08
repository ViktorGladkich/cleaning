import React from "react";
import Link from "next/link";
import { ArrowLeft, Phone, Mail, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { COMPANY_INFO } from "@/lib/constants";

interface ComingSoonPlaceholderProps {
  title: string;
  subtitle?: string;
  showLegalAnchors?: boolean;
}

export function ComingSoonPlaceholder({
  title,
  subtitle = "Dieser Bereich wird aktuell mit allen Meisterdetails und Beispielen finalisiert. Nutzen Sie für dringende Anfragen gerne unseren direkten Kontakt oder kehren Sie zur Startseite zurück.",
  showLegalAnchors = false,
}: ComingSoonPlaceholderProps) {
  return (
    <div className="min-h-[75vh] flex flex-col justify-center pt-32 sm:pt-40 pb-16 sm:pb-24 bg-brand-cream/40">
      <Container>
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* Heading */}
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy tracking-tight leading-tight">
              {title}
            </h1>
            <p className="text-base sm:text-lg text-brand-navy/70 leading-relaxed font-light">
              {subtitle}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[8px] bg-brand-navy text-white text-sm font-semibold hover:bg-brand-navy/90 transition-all shadow-md active:scale-98"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Zurück zur Startseite</span>
            </Link>

            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[8px] bg-brand-lime text-brand-navy text-sm font-semibold hover:bg-brand-lime/90 transition-all shadow-sm active:scale-98"
            >
              <Phone className="w-4 h-4 text-brand-navy" />
              <span>{COMPANY_INFO.phone}</span>
            </a>
          </div>

          {/* Quick Contact Card */}
          <div className="pt-8 border-t border-brand-navy/10 mt-10">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              <div className="p-4 rounded-xl bg-white/70 border border-brand-navy/8 backdrop-blur-xs flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-navy/5 flex items-center justify-center shrink-0 mt-0.5 text-brand-navy">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[11px] font-mono uppercase text-brand-navy/50 block mb-0.5">
                    Telefon
                  </span>
                  <a
                    href={`tel:${COMPANY_INFO.phoneRaw}`}
                    className="text-xs font-semibold text-brand-navy hover:text-brand-lime transition-colors truncate block"
                  >
                    {COMPANY_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/70 border border-brand-navy/8 backdrop-blur-xs flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-navy/5 flex items-center justify-center shrink-0 mt-0.5 text-brand-navy">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[11px] font-mono uppercase text-brand-navy/50 block mb-0.5">
                    E-Mail
                  </span>
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="text-xs font-semibold text-brand-navy hover:text-brand-lime transition-colors truncate block"
                  >
                    {COMPANY_INFO.email}
                  </a>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/70 border border-brand-navy/8 backdrop-blur-xs flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-navy/5 flex items-center justify-center shrink-0 mt-0.5 text-brand-navy">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[11px] font-mono uppercase text-brand-navy/50 block mb-0.5">
                    Einsatzgebiet
                  </span>
                  <span className="text-xs font-semibold text-brand-navy truncate block">
                    {COMPANY_INFO.address}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Legal Sections Anchor targets if requested */}
          {showLegalAnchors && (
            <div className="pt-16 mt-12 border-t border-brand-navy/10 text-left space-y-12">
              <div id="impressum" className="scroll-mt-24 space-y-3">
                <h2 className="text-xl font-bold text-brand-navy">Impressum</h2>
                <div className="text-xs text-brand-navy/70 space-y-1 leading-relaxed">
                  <p className="font-semibold text-brand-navy">{COMPANY_INFO.name}</p>
                  <p>{COMPANY_INFO.address}</p>
                  <p>Telefon: {COMPANY_INFO.phone}</p>
                  <p>E-Mail: {COMPANY_INFO.email}</p>
                  <p className="pt-2 text-brand-navy/50">
                    Angaben gemäß § 5 TMG. Vertretungsberechtigt: Geschäftsführung Tadiks Cleaning &amp; Bau.
                  </p>
                </div>
              </div>

              <div id="datenschutz" className="scroll-mt-24 space-y-3">
                <h2 className="text-xl font-bold text-brand-navy">Datenschutz</h2>
                <p className="text-xs text-brand-navy/70 leading-relaxed">
                  Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Personenbezogene Daten, die Sie uns im Rahmen von Anfragen übermitteln, werden vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften (DSGVO) verarbeitet. Weitere Informationen erhalten Sie auf Anfrage unter {COMPANY_INFO.email}.
                </p>
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
