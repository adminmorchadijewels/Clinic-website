export default function StructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": "https://www.elavivephysio.com",
    "name": "Elavive Physio — Spine & Knee Clinic",
    "alternateName": "Elavivephysio",
    "description":
      "Jaipur's leading spine and knee physiotherapy clinic. Evidence-based treatment by Dr. Ajay Agarwal (MPT, COMT). 4,000+ patients treated.",
    "url": "https://www.elavivephysio.com",
    "telephone": "TODO_REPLACE_WITH_REAL_NUMBER",
    "medicalSpecialty": "Physiotherapy",
    "priceRange": "₹₹",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "TODO_REPLACE_WITH_REAL_STREET_ADDRESS",
      "addressLocality": "Jaipur",
      "addressRegion": "Rajasthan",
      "postalCode": "TODO_REPLACE_WITH_REAL_PINCODE",
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
        "closes": "19:00",
      },
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "TODO_REPLACE_WITH_REAL_REVIEW_COUNT",
      "bestRating": "5",
      "worstRating": "1",
    },
    "founder": {
      "@type": "Person",
      "name": "Dr. Ajay Agarwal",
      "jobTitle": "Founder & Director",
      "description":
        "Physiotherapist with BPT, MPT(Neurology), MHA and multiple international certifications including Johns Hopkins University and Imperial College London",
      "alumniOf": "JNU Institute of Medical Sciences and Research Center",
    },
    "hasMap": "TODO_REPLACE_WITH_GOOGLE_MAPS_URL",
    "sameAs": [],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
