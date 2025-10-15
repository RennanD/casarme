import { ModernTemplate } from "@/src/components/templates/modern-template"

export default function ModernExamplePage() {
  const sampleData = {
    groomName: "Lucas Oliveira",
    brideName: "Beatriz Almeida",
    weddingDate: "2026-01-30",
    weddingTime: "19:30",
    venueName: "Espaço Contemporâneo",
    venueAddress: "Rua Moderna, 789 - Vila Nova, Belo Horizonte - MG",
    welcomeMessage:
      "Celebre conosco o início de uma nova jornada. Sua presença é fundamental para tornar este momento inesquecível.",
    groomStory:
      "Lucas é engenheiro de software, apaixonado por tecnologia e inovação. Conheceu Beatriz em um evento de startups.",
    brideStory:
      "Beatriz é designer de produtos, ama criar experiências únicas. Se apaixonou por Lucas à primeira vista.",
    coupleStory:
      "Nossa história é moderna, intensa e cheia de cumplicidade. Decidimos unir nossas vidas e construir juntos um futuro brilhante.",
    musicUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    whatsapp: "+5511999999999",
  }

  const heroPhotos = [
    "/modern-wedding-couple-photo.jpg",
    "/romantic-couple-wedding-photo-in-garden.jpg",
    "/groom-portrait-smiling.jpg",
  ]

  return (
    <ModernTemplate
      data={sampleData}
      heroPhotos={heroPhotos}
      groomPhoto="/groom-portrait-smiling.jpg"
      bridePhoto="/bride-portrait-smiling.jpg"
    />
  )
}
