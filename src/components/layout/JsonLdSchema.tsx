import React from "react";
import { COMPANY_INFO } from "@/lib/constants";

export function JsonLdSchema() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "HomeAndConstructionBusiness", "ProfessionalService"],
        "@id": "https://tadiks-cleaning.de/#organization",
        name: COMPANY_INFO.name,
        alternateName: "Tadik's Cleaning Chemnitz — Inh. Michel Kislovskij",
        url: "https://tadiks-cleaning.de",
        logo: "https://tadiks-cleaning.de/TADIKS_LOGO_COLOR.svg",
        image: "https://tadiks-cleaning.de/images/hero_poster.jpg",
        description:
          "Professionelle Gebäudereinigung (Unterhalts-, Grund-, Glas-, Büro-, Praxis- & Bauendreinigung) sowie Bau-, Trockenbau-, Maler-, Bodenleger- und Sanierungsarbeiten in Chemnitz, Sachsen und überregional.",
        founder: {
          "@type": "Person",
          name: COMPANY_INFO.owner,
          jobTitle: "Inhaber & Projektleitung",
        },
        telephone: COMPANY_INFO.phoneRaw,
        email: COMPANY_INFO.email,
        priceRange: "€€",
        currenciesAccepted: "EUR",
        paymentAccepted: "Überweisung, Rechnung",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Lessingstraße 14",
          postalCode: "09130",
          addressLocality: "Chemnitz",
          addressRegion: "Sachsen",
          addressCountry: "DE",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 50.8357,
          longitude: 12.9394,
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: COMPANY_INFO.phoneRaw,
            contactType: "customer service",
            areaServed: "DE",
            availableLanguage: ["German", "Russian", "Ukrainian", "English"],
          },
          {
            "@type": "ContactPoint",
            telephone: COMPANY_INFO.mobileRaw,
            contactType: "sales",
            areaServed: "DE",
            availableLanguage: ["German", "Russian", "Ukrainian", "English"],
          },
        ],
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ],
            opens: "07:00",
            closes: "19:00",
          },
        ],
        areaServed: [
          { "@type": "City", name: "Chemnitz" },
          { "@type": "City", name: "Zwickau" },
          { "@type": "City", name: "Freiberg" },
          { "@type": "City", name: "Limbach-Oberfrohna" },
          { "@type": "City", name: "Mittweida" },
          { "@type": "City", name: "Stollberg" },
          { "@type": "City", name: "Annaberg-Buchholz" },
          { "@type": "City", name: "Dresden" },
          { "@type": "City", name: "Leipzig" },
          { "@type": "City", name: "Berlin" },
          { "@type": "City", name: "Magdeburg" },
          { "@type": "City", name: "Hannover" },
          { "@type": "City", name: "Erfurt" },
          { "@type": "AdministrativeArea", name: "Sachsen" },
        ],
        sameAs: [COMPANY_INFO.socials.whatsapp].filter(Boolean),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Leistungsverzeichnis Gebäudereinigung & Bau",
          itemListElement: [
            {
              "@type": "OfferCatalog",
              name: "Gebäudereinigung & Hygiene",
              itemListElement: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Unterhaltsreinigung",
                    url: "https://tadiks-cleaning.de/services/unterhaltsreinigung",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Grundreinigung",
                    url: "https://tadiks-cleaning.de/services/grundreinigung",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Bauendreinigung",
                    url: "https://tadiks-cleaning.de/services/bauendreinigung",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Fenster- & Glasreinigung",
                    url: "https://tadiks-cleaning.de/services/fensterreinigung",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Büro- & Praxisreinigung",
                    url: "https://tadiks-cleaning.de/services/bueroreinigung",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Polster- & Teppichreinigung",
                    url: "https://tadiks-cleaning.de/services/polsterreinigung",
                  },
                },
              ],
            },
            {
              "@type": "OfferCatalog",
              name: "Bau, Innenausbau & Sanierung",
              itemListElement: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Trockenbau & Innenausbau",
                    url: "https://tadiks-cleaning.de/bau/trockenbau-innenausbau",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Komplettsanierung & Renovierung",
                    url: "https://tadiks-cleaning.de/bau/renovierung-sanierung",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Maler- & Spachtelarbeiten (Q1–Q4)",
                    url: "https://tadiks-cleaning.de/bau/maler-spachtelarbeiten",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Bodenleger- & Fliesenarbeiten",
                    url: "https://tadiks-cleaning.de/bau/bodenleger-fliesenarbeiten",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Abbruch, Entkernung & Rückbau",
                    url: "https://tadiks-cleaning.de/bau/abbruch-entkernung",
                  },
                },
              ],
            },
          ],
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://tadiks-cleaning.de/#website",
        url: "https://tadiks-cleaning.de",
        name: COMPANY_INFO.name,
        publisher: {
          "@id": "https://tadiks-cleaning.de/#organization",
        },
        inLanguage: "de-DE",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}

