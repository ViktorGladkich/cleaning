import React from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Wrench } from "lucide-react";

const MORE_SERVICES = [
  {
    title: "Bodenverlegung",
    text: "Laminat, Vinyl, PVC und Teppichböden",
  },
  {
    title: "Montage genormter Bauelemente",
    text: "Innentüren, Türzargen und genormte Fertigbauteile",
  },
  {
    title: "Weitere Bau- und Renovierungsarbeiten",
    text: "auf individuelle Anfrage",
  },
];

function RequestLink({ href, children, dark = false }: { href: string; children: string; dark?: boolean }) {
  return (
    <Link
      href={href}
      className={
        dark
          ? "mt-7 inline-flex items-center gap-2 rounded-lg bg-brand-lime px-4 py-2.5 text-sm font-medium text-brand-navy transition-colors hover:bg-white"
          : "mt-7 inline-flex items-center gap-2 rounded-lg bg-brand-navy px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-navy/90"
      }
    >
      {children}
      <ArrowUpRight className="h-4 w-4" />
    </Link>
  );
}

/**
 * Smaller services, cooperation with construction companies and equipment.
 * Flooring and assembly stay in this closing block on purpose (no own subpages).
 */
export function BauExtrasSection() {
  return (
    <section
      id="weitere-bauleistungen"
      aria-label="Weitere Bauleistungen und Zusammenarbeit"
      className="relative z-10 w-full bg-brand-cream text-brand-navy pb-16 sm:pb-24"
    >
      <div className="max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
        {/* Weitere Bau- und Montageleistungen */}
        <div className="rounded-2xl sm:rounded-3xl border border-brand-navy/15 bg-white p-6 sm:p-9">
          <span className="text-xs font-mono uppercase tracking-wider text-brand-navy/60">
            Weitere Bau- und Montageleistungen
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl font-medium tracking-tight leading-tight">
            Auch kleinere Arbeiten übernehmen wir gerne im Rahmen unserer Möglichkeiten.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-brand-navy/75 leading-relaxed">
            Ergänzend zu unseren Hauptleistungen können Sie uns auch für folgende Arbeiten
            anfragen:
          </p>
          <ul className="mt-5 divide-y divide-brand-navy/10 border-y border-brand-navy/10">
            {MORE_SERVICES.map((item) => (
              <li key={item.title} className="flex items-start gap-3 py-3.5">
                <Check className="mt-1 h-4 w-4 shrink-0 text-brand-navy" />
                <span className="text-sm sm:text-base leading-snug">
                  <span className="font-medium">{item.title}:</span>{" "}
                  <span className="text-brand-navy/75">{item.text}</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm sm:text-base text-brand-navy/75 leading-relaxed">
            Sie haben ein anderes Bauvorhaben? Sprechen Sie uns an. Wir prüfen, ob eine Umsetzung
            mit unserem Team oder geeigneten Partnerunternehmen möglich ist.
          </p>
          <RequestLink href="/contacts?service=weitere-bauleistungen#anfrage">
            Weitere Bauleistungen anfragen
          </RequestLink>
        </div>

        {/* Zusammenarbeit mit Bauunternehmen & Auftraggebern */}
        <div className="rounded-2xl sm:rounded-3xl bg-brand-navy p-6 sm:p-9 text-white flex flex-col">
          <span className="text-xs font-mono uppercase tracking-wider text-brand-lime">
            Zusammenarbeit mit Bauunternehmen &amp; Auftraggebern
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl font-medium tracking-tight leading-tight">
            Unterstützung für Bauunternehmen, Generalunternehmer und Immobilienprojekte.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-white/85 leading-relaxed">
            TADIK’S BAU steht auch für projektbezogene Zusammenarbeit bei Trockenbau, Rückbau,
            Entkernung und vorbereitenden Bauarbeiten zur Verfügung. Wir besprechen
            Leistungsumfang, Personalbedarf und Einsatzmöglichkeiten individuell.
          </p>
          <div className="mt-auto">
            <RequestLink href="/contacts?service=zusammenarbeit#anfrage" dark>
              Zusammenarbeit anfragen
            </RequestLink>
          </div>
        </div>

        {/* Werkzeuge & Ausstattung */}
        <div className="lg:col-span-2 rounded-2xl sm:rounded-3xl border border-brand-navy/15 bg-white p-6 sm:p-9 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start">
          <div className="md:col-span-5 flex items-start gap-3">
            <Wrench className="mt-1 h-5 w-5 shrink-0 text-brand-navy" />
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-brand-navy/60">
                Werkzeuge &amp; Ausstattung
              </span>
              <h2 className="mt-2 text-xl sm:text-2xl font-medium tracking-tight leading-tight">
                Geeignete Ausstattung für unterschiedliche Bauvorhaben.
              </h2>
            </div>
          </div>
          <p className="md:col-span-7 text-sm sm:text-base text-brand-navy/75 leading-relaxed">
            Für unsere Arbeiten nutzen wir passende Werkzeuge und Maschinen entsprechend den
            Anforderungen des jeweiligen Projekts. Wir legen Wert auf eine sorgfältige Arbeitsweise
            und eine klare Abstimmung der vereinbarten Leistungen.
          </p>
        </div>
      </div>
    </section>
  );
}
