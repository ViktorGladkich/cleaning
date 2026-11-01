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
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { COMPANY_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Datenschutzerklärung — Tadik's Cleaning Chemnitz",
  description:
    "Datenschutzerklärung gemäß DSGVO und TDDDG (Stand: 01. November 2026) von Tadik's Cleaning, Inh. Michel Kislovskij, Lessingstraße 14, 09130 Chemnitz.",
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
            Datenschutz &amp; Privatsphäre &bull; Stand: 01. November 2026
          </span>
          <h1 className="text-3xl sm:text-5xl font-normal tracking-tight text-brand-navy">
            Datenschutzerklärung
          </h1>
          <p className="mt-3 text-sm sm:text-base text-brand-navy/70 leading-relaxed font-light">
            Informationen zur Verarbeitung Ihrer personenbezogenen Daten gemäß der Datenschutz-Grundverordnung (DSGVO), dem Bundesdatenschutzgesetz (BDSG) und dem Telekommunikation-Digitale-Dienste-Datenschutz-Gesetz (TDDDG).
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
              Verantwortliche Stelle im Sinne des Art. 4 Nr. 7 DSGVO ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten entscheidet.
            </p>
          </div>

          {/* 2. Allgemeine Hinweise zur Datenverarbeitung */}
          <div className="pt-6 border-t border-brand-navy/10 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-brand-navy/60">
              <ShieldCheck className="w-4 h-4 text-brand-navy shrink-0" />
              <span>2. Allgemeine Hinweise zur Datenverarbeitung</span>
            </div>
            <h2 className="text-xl font-medium text-brand-navy">
              Grundsätze des Datenschutzes
            </h2>
            <p>
              Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften (insbesondere DSGVO, BDSG und TDDDG) sowie dieser Datenschutzerklärung.
            </p>
            <p>
              Die Nutzung unserer Website ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift, Telefonnummer oder E-Mail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche Zustimmung nicht an unbefugte Dritte weitergegeben.
            </p>
          </div>

          {/* 3. Hosting */}
          <div className="pt-6 border-t border-brand-navy/10 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-brand-navy/60">
              <Server className="w-4 h-4 text-brand-navy shrink-0" />
              <span>3. Hosting</span>
            </div>
            <h2 className="text-xl font-medium text-brand-navy">
              Bereitstellung über Vercel Inc.
            </h2>
            <p>
              Diese Website wird bei <strong>Vercel Inc.</strong>, 440 N Barranca Ave #4133, Covina, CA 91723, USA, gehostet. Beim Aufruf der Website verarbeitet Vercel technisch notwendige Daten, insbesondere IP-Adressen, Server-Logdaten, Meta- und Kommunikationsdaten sowie Daten zum Websitezugriff, um die Website sicher, stabil und zuverlässig bereitzustellen.
            </p>
            <p>
              Der Einsatz des Hosters erfolgt im Interesse einer sicheren, schnellen und effizienten Bereitstellung unseres Online-Angebots durch einen professionellen Anbieter. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.
            </p>
            <p>
              Vercel kann Daten auch in den USA und weiteren Drittländern verarbeiten. Vercel Inc. ist nach dem <strong>EU-US Data Privacy Framework (DPF)</strong> zertifiziert, sodass für Datenübermittlungen in die USA ein Angemessenheitsbeschluss der Europäischen Kommission gemäß Art. 45 DSGVO vorliegt. Ergänzend erfolgt die Verarbeitung auf Grundlage geeigneter Garantien nach Art. 46 Abs. 2 lit. c DSGVO (EU-Standardvertragsklauseln) sowie eines Auftragsverarbeitungsvertrags (DPA) gemäß Art. 28 DSGVO.
            </p>
            <div className="p-3.5 rounded-xl bg-brand-cream/40 border border-brand-navy/10 text-xs space-y-1">
              <p className="font-medium text-brand-navy">Weitere Informationen von Vercel:</p>
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
              Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Grundlage für die Datenverarbeitung ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der technisch fehlerfreien Darstellung, Angriffsabwehr und Optimierung der Website).
            </p>
            <p>
              Die Server-Log-Files werden für die Dauer von <strong>7 Tagen</strong> gespeichert und anschließend automatisch gelöscht, soweit keine gesetzlichen Aufbewahrungspflichten oder sicherheitsrelevanten Vorfälle entgegenstehen.
            </p>
          </div>

          {/* 5. Kontaktformular & E-Mail-Kontakt */}
          <div className="pt-6 border-t border-brand-navy/10 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-brand-navy/60">
              <Mail className="w-4 h-4 text-brand-navy shrink-0" />
              <span>5. Kontaktformular, E-Mail- &amp; Telefonkontakt</span>
            </div>
            <h2 className="text-xl font-medium text-brand-navy">
              Bearbeitung von Kunden- und Angebotsanfragen
            </h2>
            <p>
              Wenn Sie uns über unser Online-Kontaktformular, per E-Mail (an{" "}
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="underline hover:text-brand-navy"
              >
                {COMPANY_INFO.email}
              </a>
              ) oder telefonisch kontaktieren, werden Ihre Angaben aus der Anfrage inklusive der von Ihnen dort angegebenen Kontaktdaten (z. B. Name, Telefonnummer, E-Mail-Adresse, Ort/PLZ, Objektgröße, gewähltes Gewerk und Projektbeschreibung) zwecks Bearbeitung der Anfrage, Erstellung eines Festpreisangebots und für den Fall von Anschlussfragen bei uns verarbeitet.
            </p>
            <p>
              Zum Schutz unseres Online-Kontaktformulars vor automatisiertem Missbrauch (Spam-Bots und Brute-Force-Anfragen) setzen wir lokale, datenschutzfreundliche Sicherheitsprüfungen auf unserem Server ein (Honeypot-Felder, Zeitprüfung sowie kurzzeitige IP-basierte Ratenbegrenzung im Arbeitsspeicher ohne Weitergabe an externe Captcha-Dienste).
            </p>
            <p>
              Die Verarbeitung dieser Daten erfolgt auf Grundlage von <strong>Art. 6 Abs. 1 lit. b DSGVO</strong>, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen (z. B. Angebotserstellung, Terminvereinbarung zur Besichtigung) erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf Ihrer ausdrücklichen Einwilligung (<strong>Art. 6 Abs. 1 lit. a DSGVO</strong>) und/oder auf unserem berechtigten Interesse an der effektiven und sicheren Bearbeitung der an uns gerichteten Anfragen (<strong>Art. 6 Abs. 1 lit. f DSGVO</strong>).
            </p>
            <p>
              Die von Ihnen übermittelten Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt (z. B. nach abgeschlossener Bearbeitung Ihrer Anfrage). Zwingende gesetzliche Bestimmungen – insbesondere handels- und steuerrechtliche Aufbewahrungsfristen nach HGB und AO – bleiben unberührt.
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
              Für die schnelle Kontaktaufnahme bieten wir auch den Messenger WhatsApp an. Anbieter in der Europäischen Union ist die <strong>WhatsApp Ireland Limited</strong>, Merrion Road, Dublin 4, D04 X2K5, Irland (vormals 4 Grand Canal Square, Dublin 2, Irland). Wenn Sie uns aktiv über WhatsApp kontaktieren, werden Ihre Mobilfunknummer, Ihr Profilname sowie die übermittelten Nachrichteninhalte verarbeitet, um Ihre Anfrage zu bearbeiten.
            </p>
            <p>
              Dabei kann eine Übermittlung von Metadaten an die Muttergesellschaft Meta Platforms Inc. in die USA erfolgen. Diese Übermittlung stützt sich auf die Zertifizierung nach dem <strong>EU-US Data Privacy Framework (Art. 45 DSGVO)</strong> sowie auf die <strong>EU-Standardvertragsklauseln (Art. 46 DSGVO)</strong>. Rechtsgrundlage für die Verarbeitung ist Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen) beziehungsweise Art. 6 Abs. 1 lit. f DSGVO (schnelle Kundenkommunikation). Weitere Informationen finden Sie in der{" "}
              <a
                href="https://www.whatsapp.com/legal/privacy-policy-eea"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-brand-navy font-medium"
              >
                Datenschutzrichtlinie von WhatsApp
              </a>
              .
            </p>
          </div>

          {/* 7. Cookies */}
          <div className="pt-6 border-t border-brand-navy/10 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-brand-navy/60">
              <Cookie className="w-4 h-4 text-brand-navy shrink-0" />
              <span>7. Cookies &amp; Endgerätespeicherung</span>
            </div>
            <h2 className="text-xl font-medium text-brand-navy">
              Technisch notwendige Cookies (§ 25 Abs. 2 TDDDG)
            </h2>
            <p>
              Diese Website verwendet <strong>keine Tracking-Cookies, keine Werbe-Cookies und keine externen Analyse-Tools</strong>. Es werden lediglich technisch notwendige Cookies bzw. lokale Speicherwerte eingesetzt, die für den sicheren Betrieb der Website und die Speicherung Ihrer Datenschutzauswahl unbedingt erforderlich sind.
            </p>
            <p>
              Rechtsgrundlage für den Einsatz technisch notwendiger Cookies und Speicherzugriffe ist <strong>§ 25 Abs. 2 Nr. 2 TDDDG</strong> (Telekommunikation-Digitale-Dienste-Datenschutz-Gesetz) in Verbindung mit unserem berechtigten Interesse am technisch fehlerfreien und sicheren Betrieb der Website gemäß <strong>Art. 6 Abs. 1 lit. f DSGVO</strong>.
            </p>
          </div>

          {/* 8. Externe Inhalte / Google Fonts */}
          <div className="pt-6 border-t border-brand-navy/10 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-brand-navy/60">
              <Type className="w-4 h-4 text-brand-navy shrink-0" />
              <span>8. Externe Inhalte &amp; Webfonts</span>
            </div>
            <h2 className="text-xl font-medium text-brand-navy">
              Google Fonts (Lokales Hosting)
            </h2>
            <p>
              Diese Website nutzt zur einheitlichen und ansprechenden Darstellung von Schriftarten sogenannte Webfonts (Google Fonts). Die Schriftarten sind vollständig <strong>lokal auf unserem Webserver eingebunden</strong>. Eine Verbindung zu Servern von Google (Google Ireland Limited / Google LLC) findet beim Aufruf unserer Seiten <strong>nicht</strong> statt; es werden hierbei keinerlei IP-Adressen an Google übertragen.
            </p>
          </div>

          {/* 9. Ihre Rechte */}
          <div className="pt-6 border-t border-brand-navy/10 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-brand-navy/60">
              <Scale className="w-4 h-4 text-brand-navy shrink-0" />
              <span>9. Ihre Rechte</span>
            </div>
            <h2 className="text-xl font-medium text-brand-navy">
              Betroffenenrechte nach der DSGVO &amp; Aufsichtsbehörde
            </h2>
            <p>Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht:</p>
            <ul className="list-disc pl-5 space-y-1 text-brand-navy/80">
              <li>
                <strong>Auskunft</strong> über Ihre bei uns gespeicherten personenbezogenen Daten zu erhalten (Art. 15 DSGVO)
              </li>
              <li>
                <strong>Berichtigung</strong> unrichtiger oder Vervollständigung unvollständiger Daten zu verlangen (Art. 16 DSGVO)
              </li>
              <li>
                <strong>Löschung</strong> Ihrer bei uns gespeicherten Daten zu verlangen (Art. 17 DSGVO)
              </li>
              <li>
                <strong>Einschränkung der Verarbeitung</strong> Ihrer Daten zu verlangen (Art. 18 DSGVO)
              </li>
              <li>
                <strong>Datenübertragbarkeit</strong> in einem strukturierten, gängigen und maschinenlesbaren Format zu verlangen (Art. 20 DSGVO)
              </li>
              <li>
                <strong>Widerspruch</strong> gegen die Verarbeitung Ihrer Daten einzulegen (Art. 21 DSGVO)
              </li>
              <li>
                Eine erteilte <strong>Einwilligung jederzeit mit Wirkung für die Zukunft zu widerrufen</strong> (Art. 7 Abs. 3 DSGVO)
              </li>
            </ul>
            <p>
              Darüber hinaus steht Ihnen gemäß <strong>Art. 77 DSGVO</strong> ein Beschwerderecht bei der zuständigen Datenschutz-Aufsichtsbehörde zu.
            </p>
            <div className="p-4 rounded-2xl bg-brand-cream/50 border border-brand-navy/10 space-y-1 text-xs sm:text-sm">
              <p className="font-semibold text-brand-navy">
                Zuständige Aufsichtsbehörde im Freistaat Sachsen:
              </p>
              <p>Sächsische Datenschutz- und Transparenzbeauftragte</p>
              <p>Devrientstraße 5, 01067 Dresden</p>
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

          {/* 10. SSL- bzw. TLS-Verschlüsselung */}
          <div className="pt-6 border-t border-brand-navy/10 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-brand-navy/60">
              <Lock className="w-4 h-4 text-brand-navy shrink-0" />
              <span>10. SSL- bzw. TLS-Verschlüsselung</span>
            </div>
            <h2 className="text-xl font-medium text-brand-navy">
              Verschlüsselte Datenübertragung
            </h2>
            <p>
              Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie zum Beispiel der Anfragen, die Sie an uns als Seitenbetreiber senden, eine moderne SSL- bzw. TLS-Verschlüsselung (HTTPS). Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://“ auf „https://“ wechselt und an dem Schloss-Symbol in Ihrer Browserzeile. Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie an uns übermitteln, nicht von Dritten mitgelesen werden.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
