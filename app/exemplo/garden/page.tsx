import { GardenTemplate } from "@/components/templates/garden-template"

export default function GardenExamplePage() {
  const sampleData = {
    groomName: "João Silva",
    brideName: "Maria Santos",
    weddingDate: "2025-12-20",
    weddingTime: "16:00",
    ceremonyVenue: "Igreja Nossa Senhora",
    ceremonyAddress: "Rua das Flores, 123 - Centro, São Paulo - SP",
    ceremonyCity: "São Paulo",
    ceremonyState: "SP",
    welcomeMessage:
      "Com imensa alegria, convidamos você para celebrar conosco o nosso casamento. Será uma honra compartilhar este momento especial ao seu lado!",
    coupleStory:
      "Nossa história começou em 2018, quando nos conhecemos em uma viagem. Desde então, construímos juntos momentos inesquecíveis e decidimos unir nossas vidas para sempre.",
    mapLink: "https://maps.google.com/?q=Igreja+Nossa+Senhora+São+Paulo",
    couplePhoto: "/romantic-couple-wedding-photo-in-garden.jpg",
  }

  return <GardenTemplate data={sampleData} />
}
