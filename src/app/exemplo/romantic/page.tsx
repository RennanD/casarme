import { RomanticTemplate } from "@/src/components/templates/romantic-template"

export default function RomanticExamplePage() {
  const sampleData = {
    groomName: "Pedro Costa",
    brideName: "Ana Lima",
    weddingDate: "2025-11-15",
    weddingTime: "18:00",
    venueName: "Jardim das Rosas",
    venueAddress: "Avenida Primavera, 456 - Jardins, Rio de Janeiro - RJ",
    welcomeMessage:
      "Estamos muito felizes em compartilhar com você este momento único em nossas vidas. Sua presença tornará nosso dia ainda mais especial!",
    groomStory:
      "Pedro é arquiteto, apaixonado por design e natureza. Adora viajar e descobrir novos lugares ao lado de Ana.",
    brideStory:
      "Ana é fotógrafa, ama capturar momentos especiais. Conheceu Pedro em uma exposição de arte e desde então são inseparáveis.",
    coupleStory:
      "Nos conhecemos em 2019 e desde o primeiro encontro soubemos que éramos almas gêmeas. Construímos juntos uma história de amor, cumplicidade e muitas aventuras.",
    musicUrl: "https://www.youtube.com/watch?v=OPugs48z2GU&list=RDOPugs48z2GU&start_radio=1",
    whatsapp: "+5511999999999",
  }

  // Fotos de demonstração para o carousel
  const galleryPhotos = [
    "/romantic-couple-wedding-celebration.jpg",
    "/romantic-couple-wedding-natural-light-soft-focus.jpg",
    "/romantic-couple-wedding-photo-in-garden.jpg",
    "/smiling-couple-wedding-photo.jpg",
    "/happy-couple-wedding-portrait.jpg",
    "/modern-wedding-couple-photo.jpg",
  ]

  return (
    <RomanticTemplate
      data={sampleData}
      heroPhoto="/romantic-couple-wedding-celebration.jpg"
      groomPhoto="/groom-portrait-smiling.jpg"
      bridePhoto="/bride-portrait-smiling.jpg"
      galleryPhotos={galleryPhotos}
    />
  )
}
