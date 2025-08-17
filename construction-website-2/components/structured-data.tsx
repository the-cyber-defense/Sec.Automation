export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Solves All Engineering",
    "description": "Northern California's premier Class A General Engineering Contractor specializing in drainage solutions, earth retainment, and environmental remediation.",
    "url": "https://solvesall.org",
    "telephone": "(925) 899-8123",
    "email": "Matt@solvesall.org",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "552 S P St",
      "addressLocality": "Livermore",
      "addressRegion": "CA",
      "postalCode": "94550",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 37.6819,
      "longitude": -121.7680
    },
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 37.6819,
        "longitude": -121.7680
      },
      "geoRadius": "50000"
    },
    "areaServed": [
      "Livermore, CA",
      "Pleasanton, CA", 
      "Dublin, CA",
      "San Ramon, CA",
      "Danville, CA",
      "Tracy, CA",
      "Manteca, CA",
      "Northern California"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Engineering Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Drainage Solutions",
            "description": "Comprehensive drainage systems to prevent flooding and water damage"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Earth Retainment",
            "description": "Professional retaining wall construction and slope stabilization"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Environmental Remediation",
            "description": "Environmental remediation and site cleanup services"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Concrete & Masonry",
            "description": "Professional concrete and masonry construction services"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Landscaping",
            "description": "Complete landscaping design and construction services"
          }
        }
      ]
    },
    "openingHours": [
      "Mo-Fr 08:00-17:00",
      "Sa 09:00-14:00"
    ],
    "priceRange": "$$",
    "paymentAccepted": ["Cash", "Check", "Credit Card"],
    "currenciesAccepted": "USD",
    "foundingDate": "1979",
    "numberOfEmployees": "10-50",
    "award": [
      "Class A General Engineering Contractor",
      "Licensed and Bonded",
      "Warranty Protected Work"
    ],
    "sameAs": [
      "https://www.facebook.com/solvesallengineering",
      "https://www.linkedin.com/company/solves-all-engineering"
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
