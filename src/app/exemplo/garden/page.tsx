import { GardenTemplate } from "@/src/components/templates/garden-template"

export default function GardenExamplePage() {
  const sampleData = {
    groomName: "João Silva",
    brideName: "Maria Santos",
    weddingDate: "2025-12-20",
    weddingTime: "16:00",
    venueName: "Igreja Nossa Senhora",
    venueAddress: "Rua das Flores, 123 - Centro, São Paulo - SP",
    welcomeMessage:
      "Com imensa alegria, convidamos você para celebrar conosco o nosso casamento. Será uma honra compartilhar este momento especial ao seu lado!",
    coupleStory:
      "Nossa história começou em 2018, quando nos conhecemos em uma viagem. Desde então, construímos juntos momentos inesquecíveis e decidimos unir nossas vidas para sempre.",
  }

  return <GardenTemplate data={sampleData} />
}
