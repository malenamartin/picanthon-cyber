import {
  APPLY_DEADLINE_ISO,
  APPLY_OPEN,
  APPLY_URL,
  CANONICAL_URL,
  PICANTE_EMAIL,
  CONTENT_UPDATED_ISO,
  EVENT_DESCRIPTION,
  EVENT_END_ISO,
  EVENT_KICKOFF_ISO,
  EVENT_NAME,
  ORGANIZERS,
  LOGO_URL,
  OG_IMAGE_URL,
  SEO_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  SOCIAL_PROFILES,
  TEAM_SIZE,
  VENUE,
  VENUE_COUNTRY,
  VENUE_LOCALITY,
  VENUE_POSTAL_CODE,
  VENUE_REGION,
} from "../event";
import { FAQS } from "../faqs";
import { TIERS } from "../sponsors";
import { PRESS } from "../press";

// Oferta del evento. Con las inscripciones cerradas no publicamos el link de
// postulación ni la ventana de fechas: la entrada sigue siendo gratis, pero
// ya no se puede reservar.
const offer = APPLY_OPEN
  ? {
      "@type": "Offer",
      url: APPLY_URL,
      price: "0",
      priceCurrency: "ARS",
      availability: "https://schema.org/LimitedAvailability",
      validThrough: APPLY_DEADLINE_ISO,
    }
  : {
      "@type": "Offer",
      url: CANONICAL_URL,
      price: "0",
      priceCurrency: "ARS",
      availability: "https://schema.org/SoldOut",
    };

const organizationId = `${SITE_URL}/#organization`;
const websiteId = `${SITE_URL}/#website`;
const webpageId = `${SITE_URL}/#webpage`;
const eventId = `${SITE_URL}/#event`;
const faqId = `${SITE_URL}/#faq`;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: SITE_NAME,
      url: SITE_URL,
      email: PICANTE_EMAIL,
      logo: {
        "@type": "ImageObject",
        url: LOGO_URL,
        width: 512,
        height: 512,
      },
      ...(SOCIAL_PROFILES.length > 0 ? { sameAs: SOCIAL_PROFILES } : {}),
      areaServed: {
        "@type": "Country",
        name: "Argentina",
      },
      // la prensa es sobre picathon (no solo la hackathon): cuelga de la organización
      subjectOf: PRESS.map((p) => ({
        "@type": "NewsArticle",
        headline: p.title,
        url: p.url,
        datePublished: p.date,
        image: `${SITE_URL}${p.image}`,
        publisher: { "@type": "Organization", name: p.outlet },
        ...(p.author ? { author: { "@type": "Person", name: p.author } } : {}),
      })),

      contactPoint: {
        "@type": "ContactPoint",
        email: PICANTE_EMAIL,
        contactType: "customer support",
        availableLanguage: ["es"],
      },
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      name: SITE_NAME,
      url: CANONICAL_URL,
      description: SEO_DESCRIPTION,
      inLanguage: "es-AR",
      publisher: { "@id": organizationId },
    },
    {
      "@type": "WebPage",
      "@id": webpageId,
      url: CANONICAL_URL,
      name: `${EVENT_NAME}, en Buenos Aires`,
      isPartOf: { "@id": websiteId },
      about: { "@id": eventId },
      primaryImageOfPage: OG_IMAGE_URL,
      inLanguage: "es-AR",
      dateModified: CONTENT_UPDATED_ISO,
    },
    {
      "@type": "Event",
      "@id": eventId,
      name: EVENT_NAME,
      alternateName: SITE_NAME,
      description: EVENT_DESCRIPTION,
      url: CANONICAL_URL,
      image: [OG_IMAGE_URL, LOGO_URL],
      startDate: EVENT_KICKOFF_ISO,
      endDate: EVENT_END_ISO,
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      inLanguage: "es-AR",
      keywords:
        "picathon, hackathon ciberseguridad, hackathon buenos aires, ciberseguridad, safe u",
      location: {
        "@type": "Place",
        name: VENUE,
        address: {
          "@type": "PostalAddress",
          addressLocality: VENUE_LOCALITY,
          addressRegion: VENUE_REGION,
          ...(VENUE_POSTAL_CODE ? { postalCode: VENUE_POSTAL_CODE } : {}),
          addressCountry: VENUE_COUNTRY,
        },
      },
      organizer: [
        { "@id": organizationId },
        ...ORGANIZERS.map((org) => ({
          "@type": "Organization",
          name: org.name,
          ...("url" in org && org.url ? { url: org.url } : {}),
        })),
      ],
      // sponsors confirmados. Si la lista está vacía, no se publica el campo.
      ...(() => {
        const sponsor = TIERS.flatMap((t) =>
          t.items.map((s) => ({
            "@type": "Organization",
            name: s.name,
            ...(s.url ? { url: s.url } : {}),
            ...(s.logo ? { logo: `${SITE_URL}${s.logo}` } : {}),
            description: t.label,
          })),
        );
        return sponsor.length ? { sponsor } : {};
      })(),
      offers: offer,
      audience: {
        "@type": "Audience",
        audienceType: `equipos de ${TEAM_SIZE} personas`,
      },
      isAccessibleForFree: true,
    },
    {
      "@type": "FAQPage",
      "@id": faqId,
      inLanguage: "es-AR",
      mainEntity: FAQS.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.aText,
        },
      })),
    },
  ],
};

export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
      }}
    />
  );
}
