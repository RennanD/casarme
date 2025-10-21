import { GardenTemplate } from "@/src/components/templates/garden-template"
import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/src/components/ui/button"

export const metadata: Metadata = {
  title: "Exemplo de Convite Garden - CasarMe",
  description: "Veja como fica um convite de casamento garden criado com o CasarMe. Design clássico e elegante para o seu grande dia.",
  openGraph: {
    title: "Exemplo de Convite Garden - CasarMe",
    description: "Veja como fica um convite de casamento garden criado com o CasarMe. Design clássico e elegante para o seu grande dia.",
    type: "website",
  },
}

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

  return (
    <div className="relative">
      {/* Header Fixo */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-[#8B9D7F] hover:text-[#6B7A5F] font-medium touch-target focus-visible:focus-visible" aria-label="Voltar para página inicial do CasarMe">
            ← Voltar ao CasarMe
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Modelo Garden</span>
            <Link href="/criar?template=garden" aria-label="Criar convite com modelo Garden" className="touch-target">
              <Button className="bg-[#8B9D7F] hover:bg-[#6B7A5F] text-white focus-visible:focus-visible" type="button">
                Criar Meu Convite
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Conteúdo com padding para o header fixo */}
      <main className="pt-16">
        <GardenTemplate data={sampleData} />
      </main>
    </div>
  )
}
