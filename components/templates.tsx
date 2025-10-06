"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const templates = [
  {
    name: "Clássico",
    description: "Elegância atemporal para seu grande dia",
    image: "/classic-elegant-wedding-invitation-gold-details.jpg",
  },
  {
    name: "Minimalista",
    description: "Simplicidade sofisticada e moderna",
    image: "/minimalist-wedding-invitation-clean-design.jpg",
  },
  {
    name: "Boho",
    description: "Charme natural e romântico",
    image: "/boho-wedding-invitation-floral-natural.jpg",
  },
]

export function Templates() {
  return (
    <section className="py-24 bg-[#FAF3E0]">
      <div className="container mx-auto px-4">
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-center text-[#3E3E3E] mb-4">
          Modelos de Convite
        </h2>
        <p className="text-center text-[#6B6B6B] text-lg mb-16 max-w-2xl mx-auto">
          Escolha entre nossos templates cuidadosamente desenhados
        </p>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {templates.map((template, index) => (
            <Card
              key={index}
              className="overflow-hidden bg-white border-none shadow-lg hover:shadow-2xl transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={template.image || "/placeholder.svg"}
                  alt={template.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-2xl font-semibold text-[#3E3E3E] mb-2">{template.name}</h3>
                <p className="text-[#6B6B6B] mb-4 leading-relaxed">{template.description}</p>
                <Button
                  variant="outline"
                  className="w-full border-[#D4A373] text-[#D4A373] hover:bg-[#D4A373] hover:text-white transition-colors bg-transparent"
                >
                  Visualizar template
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
