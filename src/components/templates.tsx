"use client"

import { Card } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import Link from "next/link"
import { TemplatePreview } from "./template-preview"
import { Check } from "lucide-react"
import Image from "next/image"

const templates = [
  {
    id: "garden",
    name: "Garden",
    description: "Elegância natural com tons de verde oliva e detalhes botânicos",
    variant: "garden" as const,
    plan: "Básico",
    price: "R$ 29,90",
    link: "/exemplo/garden",
    features: [
      "Design botânico elegante",
      "1 foto de capa",
      "Countdown até o casamento",
      "Localização no mapa",
      "Confirmação de presença",
      "Compartilhamento ilimitado",
    ],
  },
  {
    id: "romantic",
    name: "Romântico",
    description: "Delicadeza e charme com flores, galeria de fotos e música",
    variant: "romantico" as const,
    plan: "Pro",
    price: "R$ 49,90",
    link: "/exemplo/romantic",
    features: [
      "Design romântico com flores",
      "Fotos individuais do casal",
      "Galeria com até 6 fotos",
      "Histórias personalizadas",
      "Música de fundo (YouTube)",
      "Countdown até o casamento",
      "Localização no mapa",
      "Confirmação de presença",
    ],
  },
  {
    id: "modern",
    name: "Modern",
    description: "Sofisticação moderna com slideshow e design minimalista",
    variant: "modern" as const,
    plan: "Pro",
    price: "R$ 49,90",
    link: "/exemplo/modern",
    features: [
      "Design moderno e sofisticado",
      "Slideshow com múltiplas fotos",
      "Fotos individuais do casal",
      "Galeria com até 6 fotos",
      "Histórias personalizadas",
      "Música de fundo (YouTube)",
      "Countdown até o casamento",
      "Localização no mapa",
      "Confirmação de presença",
    ],
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
          Escolha o template perfeito para o seu casamento. Cada modelo inclui recursos exclusivos!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {templates.map((template, index) => (
            <Card
              key={index}
              className={`overflow-hidden bg-white border-none shadow-lg hover:shadow-2xl transition-all duration-300 animate-fade-in ${template.plan === "Pro" ? "ring-2 ring-[#D4A373]" : ""
                }`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="p-4 sm:p-6 bg-gradient-to-b from-[#FAF3E0] to-white">
                <div className="aspect-[3/4] relative">
                  <Image src={`${template.link}.png`} alt={template.name} fill className="object-cover" />
                </div>
              </div>

              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-serif text-lg sm:text-xl font-semibold text-[#3E3E3E]">{template.name}</h3>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${template.plan === "Pro" ? "bg-[#D4A373] text-white" : "bg-[#8B9D7F] text-white"
                      }`}
                  >
                    {template.plan}
                  </span>
                </div>

                <div className="mb-3">
                  <span className="text-2xl sm:text-3xl font-bold text-[#D4A373]">{template.price}</span>
                </div>

                <p className="text-[#6B6B6B] text-sm sm:text-base mb-4 leading-relaxed">{template.description}</p>

                <ul className="space-y-2 mb-6">
                  {template.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#6B6B6B]">
                      <Check className="w-4 h-4 text-[#D4A373] flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href={template.link}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-[#D4A373] text-[#D4A373] hover:bg-[#D4A373] hover:text-white transition-colors bg-transparent mb-2"
                  >
                    Ver exemplo interativo
                  </Button>
                </Link>

                <Link href={`/criar?template=${template.id}`}>
                  <Button
                    size="sm"
                    className={`w-full transition-colors ${template.plan === "Pro"
                      ? "bg-[#D4A373] text-white hover:bg-[#C49363]"
                      : "bg-[#8B9D7F] text-white hover:bg-[#7A8C70]"
                      }`}
                  >
                    Escolher este modelo
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
