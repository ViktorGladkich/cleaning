import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Mail, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { COMPANY_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Impressum — Tadiks Cleaning & Bau Chemnitz",
  description:
    "Impressum und gesetzliche Pflichtangaben gemäß § 5 TMG von Tadiks Cleaning & Bau in Chemnitz.",
};

export default function ImpressumPage() {
  return (
    <div className="relative w-full min-h-screen bg-brand-cream text-brand-navy pt-28 sm:pt-36 pb-20 sm:pb-28">
      <Container className="relative z-10 max-w-4xl mx-auto">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-brand-navy/70 hover:text-brand-navy transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Zurück zur Startseite</span>
          </Link>
        </div>

        {/* Heading */}
        <div className="mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-brand-navy/60 block mb-2">
            Gesetzliche Anbieterkennzeichnung
          </span>
          <h1 className="text-3xl sm:text-5xl font-normal tracking-tight text-brand-navy">
            Impressum
          </h1>
          <p className="mt-3 text-sm sm:text-base text-brand-navy/70 leading-relaxed font-light">
            Angaben gemäß § 5 Telemediengesetz (TMG) und § 55 Abs. 2 RStV.
          </p>
        </div>

        {/* Card Content */}
        <div className="p-7 sm:p-10 rounded-3xl bg-white border border-brand-navy/10 shadow-xs space-y-8 text-sm text-brand-navy/85 leading-relaxed font-light">
          {/* Company */}
          <div className="space-y-1">
            <h2 className="text-base font-semibold text-brand-navy uppercase tracking-wider font-mono text-xs text-brand-navy/60 mb-2">
              Diensteanbieter
            </h2>
            <p className="text-lg font-bold text-brand-navy">{COMPANY_INFO.name}</p>
            <p>{COMPANY_INFO.address}</p>
            <p>Deutschland</p>
          </div>

          {/* Contact */}
          <div className="pt-6 border-t border-brand-navy/10 space-y-2">
            <h2 className="text-base font-semibold text-brand-navy uppercase tracking-wider font-mono text-xs text-brand-navy/60 mb-2">
              Kontakt
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-brand-cream/50 border border-brand-navy/10 hover:border-brand-navy/30 transition-colors"
              >
                <Phone className="w-4 h-4 text-brand-navy" />
                <div>
                  <span className="text-[11px] text-brand-navy/50 block">Telefon</span>
                  <span className="font-semibold text-brand-navy text-xs sm:text-sm">
                    {COMPANY_INFO.phone}
                  </span>
                </div>
              </a>

              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-brand-cream/50 border border-brand-navy/10 hover:border-brand-navy/30 transition-colors"
              >
                <Mail className="w-4 h-4 text-brand-navy" />
                <div>
                  <span className="text-[11px] text-brand-navy/50 block">E-Mail</span>
                  <span className="font-semibold text-brand-navy text-xs sm:text-sm truncate">
                    {COMPANY_INFO.email}
                  </span>
                </div>
              </a>
            </div>
          </div>

          {/* Representation */}
          <div className="pt-6 border-t border-brand-navy/10 space-y-2">
            <h2 className="text-base font-semibold text-brand-navy uppercase tracking-wider font-mono text-xs text-brand-navy/60 mb-2">
              Vertretung &amp; Redaktionelle Verantwortung
            </h2>
            <p>
              Vertretungsberechtigte Geschäftsführung:{" "}
              <strong className="font-semibold text-brand-navy">Tadiks Cleaning &amp; Bau</strong>
            </p>
            <p className="text-xs text-brand-navy/60">
              Inhaltlich Verantwortlicher gemäß § 18 Abs. 2 MStV / § 55 Abs. 2 RStV: Geschäftsführung Tadiks Cleaning &amp; Bau, Anschrift wie oben.
            </p>
          </div>

          {/* Insurance */}
          <div className="pt-6 border-t border-brand-navy/10 space-y-2">
            <h2 className="text-base font-semibold text-brand-navy uppercase tracking-wider font-mono text-xs text-brand-navy/60 mb-2">
              Betriebshaftpflichtversicherung
            </h2>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-brand-cream/40 border border-brand-navy/10">
              <ShieldCheck className="w-5 h-5 text-brand-navy shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-brand-navy/80">
                Gewerbliche Betriebshaftpflichtversicherung für Personen-, Sach- und Vermögensschäden bei einem führenden deutschen Versicherungskonzern. Geltungsbereich: Bundesrepublik Deutschland.
              </p>
            </div>
          </div>

          {/* Dispute resolution */}
          <div className="pt-6 border-t border-brand-navy/10 space-y-2 text-xs text-brand-navy/60">
            <h2 className="text-xs font-semibold uppercase tracking-wider font-mono text-brand-navy/60 mb-1">
              Streitschlichtung
            </h2>
            <p>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
              <a
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-brand-navy"
              >
                https://ec.europa.eu/consumers/odr
              </a>
              . Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
