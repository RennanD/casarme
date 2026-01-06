"use client"

import { Card } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import Link from "next/link"
import Image from "next/image"

const templates = [
  {
    id: "garden",
    name: "Verde Oliva",
    description: "Template de convite de casamento botânico com elegância natural e tons de verde oliva",
    variant: "garden" as const,
    plan: "Básico",
    price: "R$ 26,90",
    image: "/images/thumbs/garden/01.png",
  },
  {
    id: "romantic",
    name: "Romântico",
    description: "Modelo de convite romântico com flores, galeria de fotos e música de fundo",
    variant: "romantico" as const,
    plan: "Pro",
    price: "R$ 37,90",
    image: "/images/thumbs/romantico/01.png",
  },
  // Template moderno temporariamente oculto para MVP
  // {
  //   id: "modern",
  //   name: "Modern",
  //   description: "Sofisticação moderna com slideshow e design minimalista",
  //   variant: "modern" as const,
  //   plan: "Pro",
  //   price: "R$ 39,90",
  //   link: "/exemplo/modern",
  //   features: [
  //     "Design moderno e sofisticado",
  //     "Slideshow com múltiplas fotos",
  //     "Fotos individuais do casal",
  //     "Galeria com até 6 fotos",
  //     "História do casal",
  //     "Música de fundo (YouTube)",
  //     "Countdown até o casamento",
  //     "Localização no mapa",
  //     "Confirmação de presença",
  //   ],
  // },
]

export function Templates() {
  return (
    <section id="templates" className="pt-8 pb-16 sm:pt-12 sm:pb-24 bg-white" aria-labelledby="templates-title">
      <div className="container mx-auto px-4">
        <h2 id="templates-title" className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-center text-[#3E3E3E] mb-3 sm:mb-4">
          Modelos de Convite de Casamento Digital
        </h2>
        <p className="text-center text-[#6B6B6B] text-base sm:text-lg mb-12 sm:mb-16 max-w-2xl mx-auto leading-relaxed px-4">
          Escolha o modelo de convite digital perfeito para seu casamento. Modelos personalizáveis com recursos exclusivos para seu grande dia.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-5xl mx-auto" role="list" aria-label="Modelos de convite disponíveis">
          {templates.map((template, index) => (
            <article key={index} role="listitem">
              <Card
                className={`overflow-hidden bg-white border-none shadow-lg hover:shadow-2xl transition-all duration-300 animate-fade-in ${template.plan === "Pro" ? "ring-2 ring-[#D4A373]" : ""
                  }`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="p-2 sm:p-3 bg-gradient-to-b from-[#FAF3E0] to-white">
                  <figure className="aspect-[9/16] relative">
                    <Image
                      src={template.image}
                      alt={`Preview do modelo ${template.name}`}
                      fill
                      className="object-cover rounded"
                      loading="lazy"
                      quality={75}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </figure>
                </div>

                <div className="p-3 sm:p-4">
                  <header className="flex items-center justify-between mb-1.5">
                    <h3 className="font-serif text-base sm:text-lg font-semibold text-[#3E3E3E]">{template.name}</h3>
                    <div className="flex items-center gap-1.5">
                      {template.plan === "Pro" && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-gradient-to-r from-[#D4A373] to-[#C49363] text-white font-semibold">
                          Mais Escolhido
                        </span>
                      )}
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-full ${template.plan === "Pro" ? "bg-[#D4A373] text-white" : "bg-[#8B9D7F] text-white"
                          }`}
                      >
                        {template.plan}
                      </span>
                    </div>
                  </header>

                  <div className="mb-2">
                    <span className="text-xl sm:text-2xl font-bold text-[#D4A373]">{template.price}</span>
                  </div>

                  <p className="text-[#6B6B6B] text-xs sm:text-sm mb-4 leading-relaxed line-clamp-2">{template.description}</p>

                  <Link href={`/modelo/${template.id}`} aria-label={`Escolher modelo ${template.name}`} className="touch-target">
                    <Button
                      size="sm"
                      className={`w-full text-xs sm:text-sm py-2 transition-colors focus-visible:focus-visible ${template.plan === "Pro"
                        ? "bg-[#D4A373] text-white hover:bg-[#C49363]"
                        : "bg-[#8B9D7F] text-white hover:bg-[#7A8C70]"
                        }`}
                      type="button"
                    >
                      Escolher este modelo
                    </Button>
                  </Link>
                </div>
              </Card>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
