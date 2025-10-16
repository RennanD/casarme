"use client"

import { Card } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Plano Simples",
    price: "R$ 16,50",
    features: [
      "1 template elegante",
      "Personalização básica",
      "Upload de 1 foto",
      "Botão de localização no mapa",
      "Confirmação de presença",
      "Compartilhamento ilimitado",
    ],
    highlighted: false,
  },
  {
    name: "Plano Pro",
    price: "R$ 26,90",
    features: [
      "Todos os templates exclusivos",
      "Personalização completa",
      "Upload de múltiplas fotos",
      "Countdown até o casamento",
      "Botão de localização no mapa",
      "Confirmação de presença",
      "Link personalizado",
      "Suporte prioritário",
    ],
    highlighted: true,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-[#FAF3E0]">
      <div className="container mx-auto px-4">
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-center text-[#3E3E3E] mb-4">Planos</h2>
        <p className="text-center text-[#6B6B6B] text-lg mb-16 max-w-2xl mx-auto">
          Escolha o plano perfeito para o seu casamento
        </p>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`p-8 ${plan.highlighted
                ? "bg-[#D4A373] text-white border-[#D4A373] shadow-2xl scale-105"
                : "bg-white border-[#EDE0D4]"
                } transition-all duration-300 animate-fade-in`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <h3
                className={`font-serif text-3xl font-bold mb-2 ${plan.highlighted ? "text-white" : "text-[#3E3E3E]"}`}
              >
                {plan.name}
              </h3>
              <div className="mb-6">
                <span className={`text-5xl font-bold ${plan.highlighted ? "text-white" : "text-[#D4A373]"}`}>
                  {plan.price}
                </span>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check
                      className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.highlighted ? "text-white" : "text-[#D4A373]"}`}
                    />
                    <span className={`leading-relaxed ${plan.highlighted ? "text-white" : "text-[#6B6B6B]"}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <Button
                className={`w-full ${plan.highlighted
                  ? "bg-white text-[#D4A373] hover:bg-[#FAF3E0]"
                  : "bg-[#D4A373] text-white hover:bg-[#C49363]"
                  } transition-colors`}
                size="lg"
              >
                Escolher plano
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
