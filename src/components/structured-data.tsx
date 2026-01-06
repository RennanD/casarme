export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "CasarMe",
    "description": "Crie seu convite de casamento digital personalizado em 3 cliques! Templates elegantes, mapa interativo, confirmação WhatsApp.",
    "url": "https://casarme.site",
    "applicationCategory": "WebApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "26.90",
      "priceCurrency": "BRL",
      "description": "Convite digital por menos de R$ 30"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "500"
    },
    "author": {
      "@type": "Organization",
      "name": "CasarMe"
    },
    "publisher": {
      "@type": "Organization",
      "name": "CasarMe",
      "url": "https://casarme.site"
    },
    "featureList": [
      "Templates elegantes",
      "Mapa interativo",
      "Confirmação WhatsApp",
      "Criação em 3 cliques",
      "Preço acessível"
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
