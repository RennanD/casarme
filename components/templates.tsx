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
    plan: "Básico",
    link: "/exemplo/garden",
  },
  {
    name: "Romântico",
    description: "Delicadeza e charme com flores, galeria de fotos e música",
    variant: "romantico" as const,
    plan: "Pro",
    link: "/exemplo/romantic",
  },
  {
    name: "Modern",
    description: "Sofisticação moderna com slideshow e design minimalista",
    variant: "modern" as const,
    plan: "Pro",
    link: "/exemplo/modern",
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {templates.map((template, index) => (
            <Card
              key={index}
              className="overflow-hidden bg-white border-none shadow-lg hover:shadow-2xl transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="p-4 sm:p-6 bg-gradient-to-b from-[#FAF3E0] to-white">
                <div className="aspect-[3/4]">
                  <TemplatePreview variant={template.variant} />
                </div>
              </div>

              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-serif text-lg sm:text-xl font-semibold text-[#3E3E3E]">{template.name}</h3>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      template.plan === "Pro" ? "bg-[#D4A373] text-white" : "bg-[#8B9D7F] text-white"
                    }`}
                  >
                    {template.plan}
                  </span>
                </div>
                <p className="text-[#6B6B6B] text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed">
                  {template.description}
                </p>
                <Link href={template.link}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-[#D4A373] text-[#D4A373] hover:bg-[#D4A373] hover:text-white transition-colors bg-transparent"
                  >
                    Ver exemplo interativo
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
