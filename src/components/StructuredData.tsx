import { CLINIC_CONFIG } from "@/lib/config";

export default function StructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": CLINIC_CONFIG.seo.siteUrl,
    "name": CLINIC_CONFIG.fullName,
    "alternateName": "Elavivephysio",
    "description":
      "Jaipur's leading spine and knee physiotherapy clinic. Evidence-based treatment by Dr. Ajay Agarwal (MPT, COMT). 4,000+ patients treated.",
    "url": CLINIC_CONFIG.seo.siteUrl,
    "telephone": CLINIC_CONFIG.contact.phone,
    "email": CLINIC_CONFIG.contact.email,
    "medicalSpecialty": "Physiotherapy",
    "priceRange": "₹₹",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": `${CLINIC_CONFIG.address.line1}, ${CLINIC_CONFIG.address.line2}, ${CLINIC_CONFIG.address.area}`,
      "addressLocality": CLINIC_CONFIG.address.city,
      "addressRegion": CLINIC_CONFIG.address.state,
      "postalCode": CLINIC_CONFIG.address.pinCode,
      "addressCountry": "IN",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "TODO_REPLACE_WITH_REAL_LAT",
      "longitude": "TODO_REPLACE_WITH_REAL_LNG",
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        "opens": "09:00",
        "closes": "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Sunday",
        "opens": "09:00",
        "closes": "20:00",
        "description": "By prior appointment only",
      },
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": CLINIC_CONFIG.stats.rating,
      "reviewCount": CLINIC_CONFIG.stats.ratingCount,
      "bestRating": "5",
      "worstRating": "1",
    },
    "founder": {
      "@type": "Person",
      "name": "Dr. Ajay Agarwal",
      "jobTitle": "Founder & Director",
      "description":
        "Physiotherapist with BPT, MPT (Neurology) from Janardan Rai Nagar Rajasthan Vidyapeeth (JRNRVU), Udaipur, an MBA in Hospital and Healthcare Management, and multiple international certifications including Johns Hopkins University and Imperial College London",
      "alumniOf": "Janardan Rai Nagar Rajasthan Vidyapeeth (JRNRVU), Udaipur",
    },
    "hasMap": CLINIC_CONFIG.address.googleMapsLink,
    "sameAs": [
      CLINIC_CONFIG.social.instagram,
      CLINIC_CONFIG.social.facebook,
      CLINIC_CONFIG.social.linkedin,
      CLINIC_CONFIG.social.youtube,
      CLINIC_CONFIG.social.whatsapp,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
