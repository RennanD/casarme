import { RomanticTemplate } from "@/components/templates/romantic-template"

export default function RomanticExamplePage() {
  const sampleData = {
    groomName: "Pedro Costa",
    brideName: "Ana Lima",
    weddingDate: "2025-11-15",
    weddingTime: "18:00",
    ceremonyVenue: "Jardim das Rosas",
    ceremonyAddress: "Avenida Primavera, 456 - Jardins, Rio de Janeiro - RJ",
    ceremonyCity: "Rio de Janeiro",
    ceremonyState: "RJ",
    welcomeMessage:
      "Estamos muito felizes em compartilhar com você este momento único em nossas vidas. Sua presença tornará nosso dia ainda mais especial!",
    groomStory:
      "Pedro é arquiteto, apaixonado por design e natureza. Adora viajar e descobrir novos lugares ao lado de Ana.",
    brideStory:
      "Ana é fotógrafa, ama capturar momentos especiais. Conheceu Pedro em uma exposição de arte e desde então são inseparáveis.",
    coupleStory:
      "Nos conhecemos em 2019 e desde o primeiro encontro soubemos que éramos almas gêmeas. Construímos juntos uma história de amor, cumplicidade e muitas aventuras.",
    mapLink: "https://maps.google.com/?q=Jardim+das+Rosas+Rio+de+Janeiro",
    couplePhoto: "/romantic-couple-wedding-photo-in-garden.jpg",
    groomPhoto: "/groom-portrait-smiling.jpg",
    bridePhoto: "/bride-portrait-smiling.jpg",
    galleryPhotos: [
      "/romantic-couple-wedding-photo-in-garden.jpg",
      "/groom-portrait-smiling.jpg",
      "/bride-portrait-smiling.jpg",
    ],
    musicUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  }

  return <RomanticTemplate data={sampleData} />
}
