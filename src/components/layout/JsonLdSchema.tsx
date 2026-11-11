import React from "react";
import { COMPANY_INFO, SITE_URL } from "@/lib/constants";
import { getServicePath, getServicesByCategory } from "@/data/serviceDetails";

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
          "Reinigung für Gewerbe und Privatkunden (Büro-, Hotel-, Glas-, Grund-, Bauend-, Treppenhaus-, Praxis-, Haushalts- sowie Fassaden- & Außenreinigung) und Bauleistungen (Trockenbau, Rückbau & Entkernung, Renovierung, Beräumung) in Chemnitz und Umgebung.",
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
          name: "Leistungen Reinigung & Bau",
          itemListElement: (["reinigung", "bau"] as const).map((category) => ({
            "@type": "OfferCatalog",
            name: category === "reinigung" ? "TADIK’S Cleaning – Reinigung" : "TADIK’S BAU – Bauleistungen",
            itemListElement: getServicesByCategory(category).map((service) => ({
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: service.title,
                description: service.subtitle,
                url: `${SITE_URL}${getServicePath(service)}`,
              },
            })),
          })),
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

