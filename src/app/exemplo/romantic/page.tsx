import { RomanticTemplate } from "@/src/components/templates/romantic-template"
import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/src/components/ui/button"

export const metadata: Metadata = {
  title: "Exemplo de Convite Romântico - CasarMe",
  description: "Veja como fica um convite de casamento romântico criado com o CasarMe. Design elegante e personalizado para o seu grande dia.",
  openGraph: {
    title: "Exemplo de Convite Romântico - CasarMe",
    description: "Veja como fica um convite de casamento romântico criado com o CasarMe. Design elegante e personalizado para o seu grande dia.",
    type: "website",
  },
}

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
    <div className="relative">
      {/* Header Fixo */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-[#E8B4B8] hover:text-[#D4A373] font-medium" aria-label="Voltar para página inicial do CasarMe">
            ← Voltar ao CasarMe
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Modelo Romântico</span>
            <Link href="/criar?template=romantic" aria-label="Criar convite com modelo Romântico">
              <Button className="bg-[#E8B4B8] hover:bg-[#D4A373] text-white">
                Criar Meu Convite
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Conteúdo com padding para o header fixo */}
      <main className="pt-16">
        <RomanticTemplate
          data={sampleData}
          heroPhoto="/romantic-couple-wedding-celebration.jpg"
          groomPhoto="/groom-portrait-smiling.jpg"
          bridePhoto="/bride-portrait-smiling.jpg"
          galleryPhotos={galleryPhotos}
        />
      </main>
    </div>
  )
}
