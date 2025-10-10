import { ModernTemplate } from "@/src/components/templates/modern-template"

export default function ModernExamplePage() {
  const sampleData = {
    groomName: "Lucas Oliveira",
    brideName: "Beatriz Almeida",
    weddingDate: "2026-01-30",
    weddingTime: "19:30",
    ceremonyVenue: "Espaço Contemporâneo",
    ceremonyAddress: "Rua Moderna, 789 - Vila Nova, Belo Horizonte - MG",
    ceremonyCity: "Belo Horizonte",
    ceremonyState: "MG",
    welcomeMessage:
      "Celebre conosco o início de uma nova jornada. Sua presença é fundamental para tornar este momento inesquecível.",
    groomStory:
      "Lucas é engenheiro de software, apaixonado por tecnologia e inovação. Conheceu Beatriz em um evento de startups.",
    brideStory:
      "Beatriz é designer de produtos, ama criar experiências únicas. Se apaixonou por Lucas à primeira vista.",
    coupleStory:
      "Nossa história é moderna, intensa e cheia de cumplicidade. Decidimos unir nossas vidas e construir juntos um futuro brilhante.",
    mapLink: "https://maps.google.com/?q=Espaço+Contemporâneo+Belo+Horizonte",
    heroPhotos: [
      "/modern-wedding-couple-photo.jpg",
      "/romantic-couple-wedding-photo-in-garden.jpg",
      "/groom-portrait-smiling.jpg",
    ],
    groomPhoto: "/groom-portrait-smiling.jpg",
    bridePhoto: "/bride-portrait-smiling.jpg",
    musicUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  }

  return <ModernTemplate data={sampleData} />
}
