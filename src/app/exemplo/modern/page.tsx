import { ModernTemplate } from "@/src/components/templates/modern-template"
import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/src/components/ui/button"

export const metadata: Metadata = {
  title: "Exemplo de Convite Moderno - CasarMe",
  description: "Veja como fica um convite de casamento moderno criado com o CasarMe. Design contemporâneo e sofisticado para o seu grande dia.",
  openGraph: {
    title: "Exemplo de Convite Moderno - CasarMe",
    description: "Veja como fica um convite de casamento moderno criado com o CasarMe. Design contemporâneo e sofisticado para o seu grande dia.",
    type: "website",
  },
}

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
    <div className="relative">
      {/* Header Fixo */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-[#D4A373] hover:text-[#B8935F] font-medium">
            ← Voltar ao CasarMe
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Modelo Moderno</span>
            <Link href="/criar?template=modern">
              <Button className="bg-[#D4A373] hover:bg-[#B8935F] text-white">
                Criar Meu Convite
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Conteúdo com padding para o header fixo */}
      <div className="pt-16">
        <ModernTemplate
          data={sampleData}
          heroPhotos={heroPhotos}
          groomPhoto="/groom-portrait-smiling.jpg"
          bridePhoto="/bride-portrait-smiling.jpg"
        />
      </div>
    </div>
  )
}
