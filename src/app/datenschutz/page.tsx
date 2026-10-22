import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Lock, Eye, FileText } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { COMPANY_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Datenschutzerklärung — Tadiks Cleaning & Bau Chemnitz",
  description:
    "Datenschutzerklärung und Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO durch Tadiks Cleaning & Bau.",
};

export default function DatenschutzPage() {
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
            Datenschutz &amp; Privatsphäre
          </span>
          <h1 className="text-3xl sm:text-5xl font-normal tracking-tight text-brand-navy">
            Datenschutzerklärung
          </h1>
          <p className="mt-3 text-sm sm:text-base text-brand-navy/70 leading-relaxed font-light">
            Informationen über die Art, den Umfang und Zweck der Verarbeitung personenbezogener Daten nach der Datenschutz-Grundverordnung (DSGVO).
          </p>
        </div>

        {/* Card Content */}
        <div className="p-7 sm:p-10 rounded-3xl bg-white border border-brand-navy/10 shadow-xs space-y-8 text-sm text-brand-navy/85 leading-relaxed font-light">
          {/* Section 1 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-brand-navy/60">
              <ShieldCheck className="w-4 h-4 text-brand-navy" />
              <span>1. Datenschutz auf einen Blick</span>
            </div>
            <h2 className="text-xl font-medium text-brand-navy">
              Allgemeine Hinweise
            </h2>
            <p>
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie unsere Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
            </p>
          </div>

          {/* Section 2 */}
          <div className="pt-6 border-t border-brand-navy/10 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-brand-navy/60">
              <Lock className="w-4 h-4 text-brand-navy" />
              <span>2. Verantwortliche Stelle</span>
            </div>
            <h2 className="text-xl font-medium text-brand-navy">
              Wer ist verantwortlich für die Datenerfassung auf dieser Website?
            </h2>
            <div className="p-4 rounded-xl bg-brand-cream/40 border border-brand-navy/10 space-y-1 text-xs sm:text-sm">
              <p className="font-semibold text-brand-navy">{COMPANY_INFO.name}</p>
              <p>{COMPANY_INFO.address}</p>
              <p>Telefon: {COMPANY_INFO.phone}</p>
              <p>E-Mail: {COMPANY_INFO.email}</p>
            </div>
            <p className="text-xs text-brand-navy/70 pt-1">
              Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z. B. Namen, E-Mail-Adressen o. Ä.) entscheidet.
            </p>
          </div>

          {/* Section 3 */}
          <div className="pt-6 border-t border-brand-navy/10 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-brand-navy/60">
              <Eye className="w-4 h-4 text-brand-navy" />
              <span>3. Wie erfassen wir Ihre Daten?</span>
            </div>
            <h2 className="text-xl font-medium text-brand-navy">
              Datenerfassung auf unserer Website
            </h2>
            <p>
              Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben oder uns per E-Mail / Telefon übermitteln (Name, Telefonnummer, E-Mail-Adresse, Objektadresse, Angaben zu gewünschten Leistungen).
            </p>
            <p>
              Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.
            </p>
          </div>

          {/* Section 4 */}
          <div className="pt-6 border-t border-brand-navy/10 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-brand-navy/60">
              <FileText className="w-4 h-4 text-brand-navy" />
              <span>4. Wofür nutzen wir Ihre Daten?</span>
            </div>
            <h2 className="text-xl font-medium text-brand-navy">
              Zweck der Datenverarbeitung
            </h2>
            <p>
              Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten werden zur Bearbeitung Ihrer Kontaktanfragen, zur Terminvereinbarung für Vor-Ort-Besichtigungen und zur Erstellung Ihres individuellen, verbindlichen Festpreisangebots für Reinigungs- oder Bauleistungen genutzt.
            </p>
          </div>

          {/* Section 5 */}
          <div className="pt-6 border-t border-brand-navy/10 space-y-3">
            <h2 className="text-xl font-medium text-brand-navy">
              5. Welche Rechte haben Sie bezüglich Ihrer Daten?
            </h2>
            <p>
              Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Zudem steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
            </p>
            <p className="text-xs text-brand-navy/70">
              Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit an uns unter {COMPANY_INFO.email} wenden.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
