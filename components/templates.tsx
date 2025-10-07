"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { TemplatePreview } from "./template-preview"

const templates = [
  {
    name: "Garden",
    description: "Elegância natural com tons de verde oliva e detalhes botânicos",
    variant: "garden" as const,
  },
  {
    name: "Romântico",
    description: "Delicadeza e charme com flores e tons suaves",
    variant: "romantic" as const,
  },
  {
    name: "Black Tie",
    description: "Sofisticação e elegância com fundo escuro e detalhes dourados",
    variant: "blacktie" as const,
  },
  {
    name: "Minimalista",
    description: "Simplicidade moderna e clean",
    variant: "minimalist" as const,
  },
]

export function Templates() {
  return (
    <section className="py-16 sm:py-24 bg-[#FAF3E0]">
      <div className="container mx-auto px-4">
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-center text-[#3E3E3E] mb-3 sm:mb-4">
          Modelos de Convite
        </h2>
        <p className="text-center text-[#6B6B6B] text-base sm:text-lg mb-12 sm:mb-16 max-w-2xl mx-auto leading-relaxed px-4">
          Escolha entre nossos templates cuidadosamente desenhados. O preview mostra exatamente como seu convite ficará!
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto">
          {templates.map((template, index) => (
            <Card
              key={index}
              className="overflow-hidden bg-white border-none shadow-lg hover:shadow-2xl transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="p-3 sm:p-4 bg-gradient-to-b from-[#FAF3E0] to-white">
                <div className="aspect-[3/4]">
                  <TemplatePreview variant={template.variant} />
                </div>
              </div>

              <div className="p-3 sm:p-4">
                <h3 className="font-serif text-base sm:text-lg font-semibold text-[#3E3E3E] mb-1 sm:mb-2">
                  {template.name}
                </h3>
                <p className="text-[#6B6B6B] text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">{template.description}</p>
                <Link href="/convite/exemplo">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-[#D4A373] text-[#D4A373] hover:bg-[#D4A373] hover:text-white transition-colors bg-transparent text-xs sm:text-sm"
                  >
                    Ver exemplo
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
