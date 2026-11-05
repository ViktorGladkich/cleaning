import React from "react";
import { COMPANY_INFO, SITE_URL } from "@/lib/constants";

export function JsonLdSchema() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "HomeAndConstructionBusiness", "ProfessionalService"],
        "@id": `${SITE_URL}/#organization`,
        name: COMPANY_INFO.name,
        alternateName: "Tadik's Cleaning Chemnitz — Inh. Michel Kislovskij",
        url: `${SITE_URL}`,
        logo: `${SITE_URL}/TADIKS_LOGO_COLOR.svg`,
        image: `${SITE_URL}/og-image.jpg`,
        description:
          "Professionelle Gebäudereinigung (Unterhalts-, Grund-, Glas-, Büro-, Praxis- & Bauendreinigung) sowie Bau-, Trockenbau- und Sanierungsarbeiten in Chemnitz, Sachsen und überregional.",
        founder: {
          "@type": "Person",
          name: COMPANY_INFO.owner,
          jobTitle: "Inhaber & Projektleitung",
        },
        telephone: COMPANY_INFO.phoneRaw,
        email: COMPANY_INFO.email,
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
                    url: `${SITE_URL}/services/unterhaltsreinigung`,
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Grundreinigung",
                    url: `${SITE_URL}/services/grundreinigung`,
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Bauendreinigung",
                    url: `${SITE_URL}/services/bauendreinigung`,
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Fenster- & Glasreinigung",
                    url: `${SITE_URL}/services/fensterreinigung`,
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Büro- & Praxisreinigung",
                    url: `${SITE_URL}/services/bueroreinigung`,
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Polster- & Teppichreinigung",
                    url: `${SITE_URL}/services/polsterreinigung`,
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Hotelreinigung",
                    url: `${SITE_URL}/services/hotelreinigung`,
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Treppenhausreinigung",
                    url: `${SITE_URL}/services/treppenhausreinigung`,
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Industrie- & Hallenreinigung",
                    url: `${SITE_URL}/services/industrie-und-hallenreinigung`,
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Entrümpelungen",
                    url: `${SITE_URL}/services/entruempelungen`,
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
                    url: `${SITE_URL}/bau/trockenbau-innenausbau`,
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Komplettsanierung & Renovierung",
                    url: `${SITE_URL}/bau/renovierung-sanierung`,
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Abbruch, Entkernung & Rückbau",
                    url: `${SITE_URL}/bau/abbruch-entkernung`,
                  },
                },
              ],
            },
          ],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}`,
        name: COMPANY_INFO.name,
        publisher: {
          "@id": `${SITE_URL}/#organization`,
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

