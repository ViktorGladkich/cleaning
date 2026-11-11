import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ShieldCheck,
  Server,
  FileText,
  Mail,
  MessageCircle,
  Cookie,
  Type,
  Scale,
  Lock,
  UserCheck,
  AlertTriangle,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { COMPANY_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Datenschutzerklärung — Tadik's Cleaning Chemnitz",
  description:
    "Datenschutzerklärung gemäß DSGVO, BDSG und TDDDG (Stand: November 2026) von Tadik's Cleaning, Inh. Michel Kislovskij, Lessingstraße 14, 09130 Chemnitz.",
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
            Informationen zur Verarbeitung Ihrer personenbezogenen Daten gemäß Art. 13, 14 und 21 der Datenschutz-Grundverordnung (DSGVO), dem Bundesdatenschutzgesetz (BDSG) sowie dem Telekommunikation-Digitale-Dienste-Datenschutz-Gesetz (TDDDG). Stand: November 2026.
          </p>
        </div>

        {/* Card Content */}
        <div className="p-7 sm:p-10 rounded-3xl bg-white border border-brand-navy/10 shadow-xs space-y-8 text-sm text-brand-navy/85 leading-relaxed font-light">
          {/* 1. Verantwortlicher */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-brand-navy/60">
              <UserCheck className="w-4 h-4 text-brand-navy shrink-0" />
              <span>1. Verantwortlicher</span>
            </div>
            <h2 className="text-xl font-medium text-brand-navy">
              Verantwortlich für die Datenverarbeitung auf dieser Website ist:
            </h2>
            <div className="p-4 sm:p-5 rounded-2xl bg-brand-cream/50 border border-brand-navy/10 space-y-1 text-xs sm:text-sm">
              <p className="font-semibold text-brand-navy text-base">
                {COMPANY_INFO.name}
              </p>
              <p className="font-medium text-brand-navy">
                Inh. {COMPANY_INFO.owner}
              </p>
              <p>Lessingstraße 14</p>
              <p>09130 Chemnitz</p>
              <p>Deutschland</p>
              <div className="pt-2 space-y-0.5">
                <p>
                  Telefon:{" "}
                  <a
                    href={`tel:${COMPANY_INFO.phoneRaw}`}
                    className="font-medium text-brand-navy hover:underline"
                  >
                    {COMPANY_INFO.phone}
                  </a>
                </p>
                <p>
                  Mobil:{" "}
                  <a
                    href={`tel:${COMPANY_INFO.mobileRaw}`}
                    className="font-medium text-brand-navy hover:underline"
                  >
                    {COMPANY_INFO.mobile}
                  </a>
                </p>
                <p>
                  E-Mail:{" "}
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="font-medium text-brand-navy hover:underline"
                  >
                    {COMPANY_INFO.email}
                  </a>
                </p>
              </div>
            </div>
            <p className="text-xs text-brand-navy/65">
              Verantwortliche Stelle im Sinne des Art. 4 Nr. 7 DSGVO ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten entscheidet. Da in unserem Betrieb weniger als 20 Personen ständig mit der automatisierten Verarbeitung personenbezogener Daten beschäftigt sind, ist die Benennung eines externen Datenschutzbeauftragten gemäß Art. 37 DSGVO i. V. m. § 38 Abs. 1 BDSG gesetzlich nicht erforderlich. Bei allen Fragen zum Datenschutz wenden Sie sich bitte direkt an den oben genannten Inhaber.
            </p>
          </div>

          {/* 2. Allgemeine Hinweise & Pflichtinformationen nach Art. 13 DSGVO */}
          <div className="pt-6 border-t border-brand-navy/10 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-brand-navy/60">
              <ShieldCheck className="w-4 h-4 text-brand-navy shrink-0" />
              <span>2. Allgemeine Hinweise zur Datenverarbeitung</span>
            </div>
            <h2 className="text-xl font-medium text-brand-navy">
              Grundsätze, Rechtsgrundlagen &amp; Speicherdauer
            </h2>
            <p>
              Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften (insbesondere DSGVO, BDSG und TDDDG) sowie dieser Datenschutzerklärung.
            </p>
            <p>
              Die Nutzung unserer Website ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift, Telefonnummer oder E-Mail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche Zustimmung oder eine gesetzliche Grundlage nicht an unbefugte Dritte weitergegeben.
            </p>
            <p>
              <strong>Übersicht der Rechtsgrundlagen (Art. 13 Abs. 1 lit. c DSGVO):</strong> Sofern Sie in die Datenverarbeitung eingewilligt haben, verarbeiten wir Ihre personenbezogenen Daten auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO. Sind Ihre Daten zur Vertragserfüllung oder zur Durchführung vorvertraglicher Maßnahmen (z. B. Erstellung eines Festpreisangebots auf Ihre Anfrage hin) erforderlich, erfolgt die Verarbeitung auf Grundlage des Art. 6 Abs. 1 lit. b DSGVO. Weiterhin verarbeiten wir Ihre Daten auf Grundlage von Art. 6 Abs. 1 lit. c DSGVO, sofern dies zur Erfüllung einer rechtlichen Verpflichtung (z. B. handels- und steuerrechtliche Aufbewahrungspflichten) erforderlich ist, sowie auf Grundlage unseres berechtigten Interesses nach Art. 6 Abs. 1 lit. f DSGVO (z. B. sicherer Betrieb der Website, Abwehr von Spam-Angriffen, zügige Beantwortung von Geschäftsanfragen).
            </p>
            <p>
              <strong>Speicherdauer (Art. 13 Abs. 2 lit. a DSGVO):</strong> Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung Ihrer personenbezogenen Daten haben (z. B. steuer- und handelsrechtliche Aufbewahrungsfristen nach § 147 AO und § 257 HGB: 6 Jahre für Handels- und Geschäftsbriefe, 8 Jahre für Buchungsbelege, 10 Jahre für Bücher und Jahresabschlüsse); im letztgenannten Fall erfolgt die Löschung nach Fortfall dieser Gründe.
            </p>
            <p>
              <strong>Hinweis zur Bereitstellungspflicht und Profiling (Art. 13 Abs. 2 lit. e &amp; f DSGVO):</strong> Die Bereitstellung personenbezogener Daten beim bloßen Besuch unserer Website ist weder gesetzlich noch vertraglich vorgeschrieben. Im Rahmen einer Angebotsanfrage sind Ihr Name und mindestens eine Kontaktmöglichkeit (Telefon oder E-Mail) erforderlich, um Ihre Anfrage bearbeiten und ein vorvertragliches Angebot erstellen zu können. Eine automatisierte Entscheidungsfindung einschließlich Profiling gemäß Art. 22 Abs. 1 und 4 DSGVO findet auf unserer Website nicht statt.
            </p>
          </div>

          {/* 3. Hosting */}
          <div className="pt-6 border-t border-brand-navy/10 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-brand-navy/60">
              <Server className="w-4 h-4 text-brand-navy shrink-0" />
              <span>3. Hosting &amp; Content Delivery</span>
            </div>
            <h2 className="text-xl font-medium text-brand-navy">
              Bereitstellung über Vercel Inc.
            </h2>
            <p>
              Diese Website wird bei <strong>Vercel Inc.</strong>, 440 N Barranca Ave #4133, Covina, CA 91723, USA, gehostet. Beim Aufruf der Website verarbeitet Vercel technisch notwendige Verbindungsdaten, insbesondere IP-Adressen, Server-Logdaten, HTTP-Header, Meta- und Kommunikationsdaten sowie Zeitstempel zum Websitezugriff, um die Website sicher, stabil und zuverlässig auszuliefern.
            </p>
            <p>
              Der Einsatz des Hosters erfolgt im Interesse einer sicheren, schnellen und effizienten Bereitstellung unseres Online-Angebots durch einen professionellen Anbieter sowie zum Schutz vor DDoS- und Cyberangriffen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.
            </p>
            <p>
              Vercel kann Daten auch in den USA und weiteren Drittländern verarbeiten. Vercel Inc. ist aktiv unter dem <strong>EU-US Data Privacy Framework (DPF)</strong> zertifiziert, sodass für Datenübermittlungen in die USA ein gültiger Angemessenheitsbeschluss der Europäischen Kommission gemäß Art. 45 DSGVO vorliegt. Ergänzend erfolgt die Verarbeitung auf Grundlage geeigneter Garantien nach Art. 46 Abs. 2 lit. c DSGVO (EU-Standardvertragsklauseln / SCC) sowie eines Auftragsverarbeitungsvertrags (Data Processing Addendum, DPA) gemäß Art. 28 DSGVO.
            </p>
            <div className="p-3.5 rounded-xl bg-brand-cream/40 border border-brand-navy/10 text-xs space-y-1">
              <p className="font-medium text-brand-navy">Weitere Informationen zum Datenschutz bei Vercel:</p>
              <p>
                Datenschutzerklärung:{" "}
                <a
                  href="https://vercel.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-brand-navy break-all"
                >
                  https://vercel.com/legal/privacy-policy
                </a>
              </p>
              <p>
                Data Processing Addendum (DPA):{" "}
                <a
                  href="https://vercel.com/legal/dpa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-brand-navy break-all"
                >
                  https://vercel.com/legal/dpa
                </a>
              </p>
            </div>
          </div>

          {/* 4. Server-Log-Files */}
          <div className="pt-6 border-t border-brand-navy/10 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-brand-navy/60">
              <FileText className="w-4 h-4 text-brand-navy shrink-0" />
              <span>4. Server-Log-Files</span>
            </div>
            <h2 className="text-xl font-medium text-brand-navy">
              Automatisch erfasste Zugriffsdaten
            </h2>
            <p>
              Der Provider der Seiten erhebt und speichert automatisch Informationen in sogenannten Server-Log-Files, die Ihr Browser automatisch an uns übermittelt. Dies sind:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-brand-navy/80">
              <li>Browsertyp und Browserversion</li>
              <li>Verwendetes Betriebssystem</li>
              <li>Referrer URL (zuvor besuchte Seite)</li>
              <li>Hostname des zugreifenden Rechners</li>
              <li>Uhrzeit der Serveranfrage</li>
              <li>IP-Adresse</li>
            </ul>
            <p>
              Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Grundlage für die Datenverarbeitung ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der technisch fehlerfreien Darstellung, Betriebssicherheit, Fehleranalyse und Angriffsabwehr unserer Website).
            </p>
            <p>
              Die Log-Daten werden von Vercel nur begrenzte Zeit vorgehalten und anschließend automatisch gelöscht. Die Dauer richtet sich nach den Vorgaben von Vercel und dem gebuchten Tarif und beträgt für Laufzeit-Protokolle nach Angaben des Anbieters zwischen einer Stunde und 30 Tagen. Eine längere Speicherung erfolgt nur, soweit gesetzliche Aufbewahrungspflichten oder dokumentierte Sicherheitsvorfälle dies erfordern.
            </p>
          </div>

          {/* 5. Kontaktformular, E-Mail- & Telefonkontakt */}
          <div className="pt-6 border-t border-brand-navy/10 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-brand-navy/60">
              <Mail className="w-4 h-4 text-brand-navy shrink-0" />
              <span>5. Kontaktformular, E-Mail- &amp; Telefonkontakt</span>
            </div>
            <h2 className="text-xl font-medium text-brand-navy">
              Bearbeitung von Kunden- und Angebotsanfragen
            </h2>
            <p>
              Wenn Sie unser Online-Kontaktformular nutzen, werden die von Ihnen eingegebenen Daten (gewählter Bereich, konkrete Leistung, Name, Telefonnummer und/oder E-Mail-Adresse sowie optional Ort/Postleitzahl, Fläche/Umfang, gewünschter Zeitpunkt bzw. Zeitraum und Ihre Nachricht; bei dringenden Reinigungsanfragen ist die Telefonnummer erforderlich) verschlüsselt an unsere Server-Schnittstelle übertragen und von dort als E-Mail an unser Postfach zugestellt. Alternativ können Sie uns jederzeit direkt per E-Mail (an{" "}
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="underline hover:text-brand-navy"
              >
                {COMPANY_INFO.email}
              </a>
              , wobei sich Ihr lokales E-Mail-Programm öffnet) oder telefonisch kontaktieren.
            </p>
            <p>
              Zum Schutz unseres Online-Kontaktformulars vor automatisiertem Missbrauch (Spam-Bots und Brute-Force-Angriffen) setzen wir ausschließlich eigene, datenschutzfreundliche Sicherheitsprüfungen ohne Einbindung externer Drittanbieter-Captchas ein: unsichtbare Honeypot-Felder, eine Prüfung der Ausfülldauer sowie eine kurzzeitige Ratenbegrenzung (Rate-Limiting) gemäß Art. 6 Abs. 1 lit. f DSGVO. Dafür wird Ihre IP-Adresse flüchtig im Arbeitsspeicher der Serverinstanz gehalten. Sie wird nach Ablauf von 10 Minuten bei der nächsten Anfrage an diese Instanz, spätestens beim Beenden der Instanz, gelöscht.
            </p>
            <p>
              Unser E-Mail-Postfach wird bei dem Anbieter <strong>Titan Email</strong> gehostet (Titan Solution Ltd SEZC, c/o CO Services Cayman Limited, P.O. Box 10008, Willow House, Cricket Square, Grand Cayman, KY1-1001, Kaimaninseln). Anfragen aus dem Formular und E-Mails, die Sie uns senden, werden dort gespeichert. Für die Kaimaninseln besteht kein Angemessenheitsbeschluss der Europäischen Kommission. Nach Angaben des Anbieters werden Drittlandübermittlungen durch verbindliche vertragliche Vereinbarungen abgesichert (Art. 46 DSGVO). Rechtsgrundlage ist Art. 6 Abs. 1 lit. b und lit. f DSGVO (berechtigtes Interesse an einer zuverlässigen E-Mail-Kommunikation). Weitere Informationen finden Sie in der{" "}
              <a
                href="https://titan.email/privacy-policy/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-brand-navy font-medium"
              >
                Datenschutzerklärung von Titan
              </a>
              .
            </p>
            <p>
              Die Verarbeitung Ihrer Kontaktdaten erfolgt auf Grundlage von <strong>Art. 6 Abs. 1 lit. b DSGVO</strong>, sofern Ihre Anfrage mit der Anbahnung oder Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen (z. B. Erstellung eines Angebots, Terminvereinbarung zur Besichtigung) erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (<strong>Art. 6 Abs. 1 lit. f DSGVO</strong>).
            </p>
            <p>
              Anfragen, aus denen kein Vertrag entsteht, löschen wir spätestens <strong>12 Monate</strong> nach Abschluss der Bearbeitung oder früher, wenn Sie uns dazu auffordern und keine Aufbewahrungspflichten entgegenstehen. Führt Ihre Anfrage zu einem Vertrag, gelten die gesetzlichen handels- und steuerrechtlichen Aufbewahrungsfristen.
            </p>
          </div>

          {/* 5a. Bewerbungen über das Online-Formular */}
          <div id="bewerbung" className="pt-6 border-t border-brand-navy/10 space-y-3 scroll-mt-32">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-brand-navy/60">
              <Mail className="w-4 h-4 text-brand-navy shrink-0" />
              <span>5a. Bewerbungen</span>
            </div>
            <h2 className="text-xl font-medium text-brand-navy">
              Datenverarbeitung im Bewerbungsverfahren
            </h2>
            <p>
              Wenn Sie sich über unser Online-Bewerbungsformular auf der Karriereseite bewerben, verarbeiten wir die von Ihnen angegebenen Daten: Vor- und Nachname, Telefonnummer, optional E-Mail-Adresse, Wohnort, gewünschter Bereich (Cleaning/BAU), gewünschte Beschäftigungsart, frühestmöglicher Arbeitsbeginn, Angaben zu Führerschein und eigenem Auto, Sprachkenntnisse, bisherige Erfahrung, Ihre Nachricht sowie – freiwillig – einen hochgeladenen Lebenslauf. Bitte übermitteln Sie uns keine besonderen Kategorien personenbezogener Daten (z. B. Angaben zu Gesundheit, Religion oder ethnischer Herkunft), die für die Bewerbung nicht erforderlich sind.
            </p>
            <p>
              Die Angaben werden verschlüsselt an unsere Server-Schnittstelle übertragen und von dort ohne weitere Speicherung auf dem Webserver als E-Mail (mit dem Lebenslauf als Anhang) an unser Postfach bei Titan Email zugestellt (siehe Abschnitt 5). Für den Schutz des Formulars gelten dieselben Sicherheitsprüfungen wie beim Kontaktformular (Honeypot-Felder, Prüfung der Ausfülldauer, kurzzeitige Ratenbegrenzung über die IP-Adresse; Löschung nach 10 Minuten). Hochgeladene Dateien werden auf zulässige Dateiformate geprüft.
            </p>
            <p>
              Zweck der Verarbeitung ist die Durchführung des Bewerbungsverfahrens und die Entscheidung über die Begründung eines Beschäftigungsverhältnisses. Rechtsgrundlage ist <strong>Art. 6 Abs. 1 lit. b DSGVO</strong> (Anbahnung eines Beschäftigungsverhältnisses) in Verbindung mit <strong>§ 26 Abs. 1 BDSG</strong>. Zugriff auf Ihre Bewerbung hat ausschließlich der Inhaber bzw. die für die Personalauswahl zuständigen Personen.
            </p>
            <p>
              Kommt kein Beschäftigungsverhältnis zustande, löschen wir Ihre Bewerbungsunterlagen spätestens <strong>6 Monate</strong> nach Abschluss des Bewerbungsverfahrens, soweit keine längere Aufbewahrung zur Verteidigung gegen Rechtsansprüche (z. B. nach dem Allgemeinen Gleichbehandlungsgesetz) erforderlich ist. Eine längere Speicherung für künftige Stellen erfolgt nur mit Ihrer ausdrücklichen Einwilligung. Wird ein Beschäftigungsverhältnis begründet, werden die erforderlichen Daten in die Personalakte übernommen. Die Bereitstellung der Daten ist freiwillig; ohne Name und Telefonnummer können wir Ihre Bewerbung jedoch nicht bearbeiten.
            </p>
          </div>

          {/* 6. Kontaktaufnahme über WhatsApp */}
          <div className="pt-6 border-t border-brand-navy/10 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-brand-navy/60">
              <MessageCircle className="w-4 h-4 text-brand-navy shrink-0" />
              <span>6. Kontaktaufnahme über WhatsApp</span>
            </div>
            <h2 className="text-xl font-medium text-brand-navy">
              Kommunikation via WhatsApp Messenger
            </h2>
            <p>
              Für die schnelle und unkomplizierte Kontaktaufnahme bieten wir auch den Messenger-Dienst WhatsApp an. Anbieter für Nutzer im Europäischen Wirtschaftsraum ist die <strong>WhatsApp Ireland Limited</strong>, Merrion Road, Dublin 4, D04 X2K5, Irland. Wenn Sie uns aktiv über unsere Mobilfunknummer ({COMPANY_INFO.mobile}) per WhatsApp kontaktieren, werden Ihre Telefonnummer, Ihr öffentlicher Profilname sowie die von Ihnen übermittelten Nachrichteninhalte (Texte, ggf. Fotos zur Schadens- oder Objektbegutachtung) verarbeitet, um Ihr Anliegen zu bearbeiten.
            </p>
            <p>
              Dabei kann eine Übermittlung von Verbindungs- und Metadaten an WhatsApp bzw. den Mutterkonzern Meta Platforms Inc. in die USA erfolgen. Meta Platforms Inc. ist unter dem <strong>EU-US Data Privacy Framework (Art. 45 DSGVO)</strong> zertifiziert; zudem stützt sich die Datenübermittlung auf die <strong>EU-Standardvertragsklauseln (Art. 46 DSGVO)</strong>. Rechtsgrundlage für die Verarbeitung ist Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung und Kundenbetreuung) beziehungsweise Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer schnellen, zeitgemäßen Kommunikationsmöglichkeit). Weitere Informationen finden Sie in der{" "}
              <a
                href="https://www.whatsapp.com/legal/privacy-policy-eea"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-brand-navy font-medium"
              >
                Datenschutzrichtlinie von WhatsApp für den EWR
              </a>
              .
            </p>
          </div>

          {/* 7. Cookies & Endgerätespeicherung */}
          <div className="pt-6 border-t border-brand-navy/10 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-brand-navy/60">
              <Cookie className="w-4 h-4 text-brand-navy shrink-0" />
              <span>7. Cookies &amp; Endgerätespeicherung (§ 25 TDDDG)</span>
            </div>
            <h2 className="text-xl font-medium text-brand-navy">
              Keine Cookies, kein Tracking
            </h2>
            <p>
              Diese Website setzt <strong>keine Cookies</strong> und verwendet <strong>keine Tracking-, Analyse- oder Marketing-Dienste</strong>. Informationen werden auf Ihrem Endgerät nur gespeichert oder von dort abgerufen, soweit dies für die Bereitstellung der von Ihnen aufgerufenen Seiten unbedingt erforderlich ist (<strong>§ 25 Abs. 2 Nr. 2 TDDDG</strong>). Eine Einwilligung ist dafür nicht erforderlich, weshalb wir auch kein Einwilligungsbanner anzeigen.
            </p>
          </div>

          {/* 8. Externe Inhalte / Lokale Webfonts */}
          <div className="pt-6 border-t border-brand-navy/10 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-brand-navy/60">
              <Type className="w-4 h-4 text-brand-navy shrink-0" />
              <span>8. Webfonts</span>
            </div>
            <h2 className="text-xl font-medium text-brand-navy">
              Lokal eingebundene Schriftarten
            </h2>
            <p>
              Diese Website nutzt die Webfonts <em>Satoshi</em> und <em>General Sans</em>. Die Schriftdateien werden zusammen mit der Website über unseren Hoster (siehe Abschnitt 3) ausgeliefert. Eine Verbindung zu Servern von Google oder anderen externen Schriftanbietern findet beim Aufruf unserer Website <strong>nicht</strong> statt.
            </p>
          </div>

          {/* 9. Ihre Rechte */}
          <div className="pt-6 border-t border-brand-navy/10 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-brand-navy/60">
              <Scale className="w-4 h-4 text-brand-navy shrink-0" />
              <span>9. Ihre Rechte als betroffene Person</span>
            </div>
            <h2 className="text-xl font-medium text-brand-navy">
              Betroffenenrechte nach Art. 15 bis 20 DSGVO &amp; Aufsichtsbehörde
            </h2>
            <p>Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht:</p>
            <ul className="list-disc pl-5 space-y-1 text-brand-navy/80">
              <li>
                <strong>Auskunft</strong> über Ihre bei uns gespeicherten personenbezogenen Daten, deren Herkunft, Empfänger und den Zweck der Datenverarbeitung zu erhalten (Art. 15 DSGVO)
              </li>
              <li>
                <strong>Berichtigung</strong> unrichtiger oder Vervollständigung unvollständiger personenbezogener Daten zu verlangen (Art. 16 DSGVO)
              </li>
              <li>
                <strong>Löschung</strong> Ihrer bei uns gespeicherten Daten („Recht auf Vergessenwerden“) zu verlangen, sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen (Art. 17 DSGVO)
              </li>
              <li>
                <strong>Einschränkung der Verarbeitung</strong> Ihrer personenbezogenen Daten zu verlangen (Art. 18 DSGVO)
              </li>
              <li>
                <strong>Datenübertragbarkeit</strong> der von Ihnen bereitgestellten Daten in einem strukturierten, gängigen und maschinenlesbaren Format zu verlangen (Art. 20 DSGVO)
              </li>
              <li>
                Eine einmal erteilte <strong>Einwilligung jederzeit mit Wirkung für die Zukunft zu widerrufen</strong>, ohne dass die Rechtmäßigkeit der aufgrund der Einwilligung bis zum Widerruf erfolgten Verarbeitung berührt wird (Art. 7 Abs. 3 DSGVO)
              </li>
            </ul>
            <p>
              Darüber hinaus steht Ihnen gemäß <strong>Art. 77 DSGVO</strong> unbeschadet eines anderweitigen verwaltungsrechtlichen oder gerichtlichen Rechtsbehelfs das Recht auf Beschwerde bei einer Datenschutz-Aufsichtsbehörde zu, insbesondere in dem Mitgliedstaat Ihres gewöhnlichen Aufenthaltsorts, Ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes.
            </p>
            <div className="p-4 rounded-2xl bg-brand-cream/50 border border-brand-navy/10 space-y-1 text-xs sm:text-sm">
              <p className="font-semibold text-brand-navy">
                Die für unseren Unternehmenssitz zuständige Aufsichtsbehörde ist:
              </p>
              <p>Sächsische Datenschutz- und Transparenzbeauftragte</p>
              <p>Maternistraße 17, 01067 Dresden</p>
              <p>Postanschrift: Postfach 11 01 32, 01330 Dresden</p>
              <p>
                Website:{" "}
                <a
                  href="https://www.datenschutz.sachsen.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-brand-navy font-medium"
                >
                  www.datenschutz.sachsen.de
                </a>
              </p>
            </div>
          </div>

          {/* 10. Hervorgehobener Hinweis auf das Widerspruchsrecht nach Art. 21 DSGVO (Pflichthervorhebung gem. Art. 21 Abs. 4 DSGVO) */}
          <div className="pt-6 border-t border-brand-navy/10 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-brand-navy/60">
              <AlertTriangle className="w-4 h-4 text-brand-navy shrink-0" />
              <span>10. Widerspruchsrecht gemäß Art. 21 DSGVO</span>
            </div>
            <div className="p-5 sm:p-6 rounded-2xl bg-brand-cream/70 border-2 border-brand-navy/20 space-y-3 text-xs sm:text-sm text-brand-navy">
              <h2 className="text-base sm:text-lg font-semibold text-brand-navy">
                Besonderer Hinweis auf Ihr Widerspruchsrecht nach Art. 21 Abs. 1 und Abs. 2 DSGVO
              </h2>
              <p className="font-normal leading-relaxed">
                <strong>
                  Wenn die Datenverarbeitung auf Grundlage von Art. 6 Abs. 1 lit. e oder lit. f DSGVO erfolgt (Wahrnehmung berechtigter Interessen), haben Sie jederzeit das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, gegen die Verarbeitung Ihrer personenbezogenen Daten Widerspruch einzulegen; dies gilt auch für ein auf diese Bestimmungen gestütztes Profiling.
                </strong>
              </p>
              <p className="font-normal leading-relaxed">
                Legen Sie Widerspruch ein, werden wir Ihre betroffenen personenbezogenen Daten nicht mehr verarbeiten, es sei denn, wir können zwingende schutzwürdige Gründe für die Verarbeitung nachweisen, die Ihre Interessen, Rechte und Freiheiten überwiegen, oder die Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen (Widerspruch nach Art. 21 Abs. 1 DSGVO).
              </p>
              <p className="font-normal leading-relaxed">
                Werden Ihre personenbezogenen Daten verarbeitet, um Direktwerbung zu betreiben, so haben Sie das Recht, jederzeit Widerspruch gegen die Verarbeitung Sie betreffender personenbezogener Daten zum Zwecke derartiger Werbung einzulegen (Widerspruch nach Art. 21 Abs. 2 DSGVO). Für die Ausübung Ihres Widerspruchsrechts genügt eine formlose Mitteilung per E-Mail an{" "}
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="underline font-semibold"
                >
                  {COMPANY_INFO.email}
                </a>
                .
              </p>
            </div>
          </div>

          {/* 11. SSL- bzw. TLS-Verschlüsselung & Widerspruch gegen Werbe-E-Mails */}
          <div className="pt-6 border-t border-brand-navy/10 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-brand-navy/60">
              <Lock className="w-4 h-4 text-brand-navy shrink-0" />
              <span>11. SSL-/TLS-Verschlüsselung &amp; Schutz vor Werbe-Spam</span>
            </div>
            <h2 className="text-xl font-medium text-brand-navy">
              Verschlüsselte Datenübertragung &amp; Widerspruch gegen Werbe-Mails
            </h2>
            <p>
              Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie zum Beispiel der Anfragen, die Sie an uns als Seitenbetreiber senden, eine moderne SSL- bzw. TLS-Verschlüsselung (HTTPS). Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://“ auf „https://“ wechselt und an dem Schloss-Symbol in Ihrer Browserzeile. Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie an uns übermitteln, nicht von Dritten mitgelesen werden.
            </p>
            <p>
              <strong>Widerspruch gegen unverlangte Werbe-E-Mails:</strong> Der Nutzung von im Rahmen der Impressumspflicht und dieser Datenschutzerklärung veröffentlichten Kontaktdaten zur Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit ausdrücklich widersprochen. Der Betreiber der Seiten behält sich ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung von Werbeinformationen, etwa durch Spam-E-Mails, vor.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
