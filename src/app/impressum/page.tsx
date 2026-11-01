import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Mail, Phone, Smartphone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { COMPANY_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Impressum — Tadik's Cleaning Chemnitz",
  description:
    "Impressum und gesetzliche Pflichtangaben gemäß § 5 DDG und § 18 Abs. 2 MStV von Tadik's Cleaning (Inh. Michel Kislovskij) in Chemnitz.",
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
            Gesetzliche Anbieterkennzeichnung &bull; Stand: 01.11.2026
          </span>
          <h1 className="text-3xl sm:text-5xl font-normal tracking-tight text-brand-navy">
            Impressum
          </h1>
          <p className="mt-3 text-sm sm:text-base text-brand-navy/70 leading-relaxed font-light">
            Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG) sowie § 18 Abs. 2 Medienstaatsvertrag (MStV).
          </p>
        </div>

        {/* Card Content */}
        <div className="p-7 sm:p-10 rounded-3xl bg-white border border-brand-navy/10 shadow-xs space-y-8 text-sm text-brand-navy/85 leading-relaxed font-light">
          {/* Company & Owner */}
          <div className="space-y-1">
            <h2 className="text-xs font-mono uppercase tracking-wider text-brand-navy/60 mb-2">
              1. Diensteanbieter (§ 5 DDG)
            </h2>
            <p className="text-lg font-semibold text-brand-navy">
              {COMPANY_INFO.name}
            </p>
            <p className="font-medium text-brand-navy">
              Inh. {COMPANY_INFO.owner}
            </p>
            <p>Lessingstraße 14</p>
            <p>09130 Chemnitz</p>
            <p>Deutschland</p>
          </div>

          {/* Contact */}
          <div className="pt-6 border-t border-brand-navy/10 space-y-2">
            <h2 className="text-xs font-mono uppercase tracking-wider text-brand-navy/60 mb-3">
              2. Kontaktmöglichkeiten
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-brand-cream/50 border border-brand-navy/10 hover:border-brand-navy/30 transition-colors"
              >
                <Phone className="w-4 h-4 text-brand-navy shrink-0" />
                <div className="min-w-0">
                  <span className="text-[11px] text-brand-navy/50 block">
                    Telefon (Festnetz)
                  </span>
                  <span className="font-semibold text-brand-navy text-xs sm:text-sm block truncate">
                    {COMPANY_INFO.phone}
                  </span>
                </div>
              </a>

              <a
                href={`tel:${COMPANY_INFO.mobileRaw}`}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-brand-cream/50 border border-brand-navy/10 hover:border-brand-navy/30 transition-colors"
              >
                <Smartphone className="w-4 h-4 text-brand-navy shrink-0" />
                <div className="min-w-0">
                  <span className="text-[11px] text-brand-navy/50 block">
                    Mobil &amp; WhatsApp
                  </span>
                  <span className="font-semibold text-brand-navy text-xs sm:text-sm block truncate">
                    {COMPANY_INFO.mobile}
                  </span>
                </div>
              </a>

              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-brand-cream/50 border border-brand-navy/10 hover:border-brand-navy/30 transition-colors"
              >
                <Mail className="w-4 h-4 text-brand-navy shrink-0" />
                <div className="min-w-0">
                  <span className="text-[11px] text-brand-navy/50 block">
                    E-Mail
                  </span>
                  <span className="font-semibold text-brand-navy text-xs sm:text-sm block truncate">
                    {COMPANY_INFO.email}
                  </span>
                </div>
              </a>
            </div>
          </div>

          {/* Representation */}
          <div className="pt-6 border-t border-brand-navy/10 space-y-2">
            <h2 className="text-xs font-mono uppercase tracking-wider text-brand-navy/60 mb-2">
              3. Vertretung &amp; Redaktionelle Verantwortung
            </h2>
            <p>
              Inhaber und vertretungsberechtigt:{" "}
              <strong className="font-semibold text-brand-navy">
                {COMPANY_INFO.owner}
              </strong>
            </p>
            <p className="text-xs text-brand-navy/65">
              Inhaltlich Verantwortlicher gemäß § 18 Abs. 2 Medienstaatsvertrag (MStV): {COMPANY_INFO.owner}, Lessingstraße 14, 09130 Chemnitz.
            </p>
          </div>

          {/* Insurance */}
          <div className="pt-6 border-t border-brand-navy/10 space-y-2">
            <h2 className="text-xs font-mono uppercase tracking-wider text-brand-navy/60 mb-2">
              4. Betriebshaftpflichtversicherung
            </h2>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-brand-cream/40 border border-brand-navy/10">
              <ShieldCheck className="w-5 h-5 text-brand-navy shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-brand-navy/80">
                Es besteht eine gewerbliche Betriebshaftpflichtversicherung für Personen-, Sach- und Vermögensschäden. Räumlicher Geltungsbereich: Bundesrepublik Deutschland.
              </p>
            </div>
          </div>

          {/* Dispute resolution (Updated for 2026: ODR platform discontinued under Regulation (EU) 2024/3228) */}
          <div className="pt-6 border-t border-brand-navy/10 space-y-2">
            <h2 className="text-xs font-mono uppercase tracking-wider text-brand-navy/60 mb-1">
              5. Verbraucherstreitbeilegung (§ 36 VSBG)
            </h2>
            <p className="text-xs sm:text-sm text-brand-navy/75">
              Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle im Sinne des Verbraucherstreitbeilegungsgesetzes (§ 36 Abs. 1 Nr. 1 VSBG) teilzunehmen.
            </p>
          </div>

          {/* Liability & Copyright */}
          <div className="pt-6 border-t border-brand-navy/10 space-y-3 text-xs text-brand-navy/65">
            <h2 className="text-xs font-mono uppercase tracking-wider text-brand-navy/60 mb-1">
              6. Haftung für Inhalte, Links &amp; Urheberrecht
            </h2>
            <p>
              Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
            </p>
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
