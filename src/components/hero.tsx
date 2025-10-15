"use client"

import { Button } from "@/src/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#FFF8F0]">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/romantic-couple-wedding-natural-light-soft-focus.jpg"
          alt="Romantic couple"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFF8F0]/80 via-[#FFF8F0]/60 to-[#FFF8F0]" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center animate-fade-in">
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-[#3E3E3E] mb-6 animate-slide-up text-balance">
          Convite de Casamento Digital Personalizado - Crie em Minutos
        </h1>
        <p className="text-xl md:text-2xl text-[#6B6B6B] mb-12 max-w-3xl mx-auto animate-slide-up [animation-delay:200ms] text-pretty">
          Crie convites de casamento online únicos com mapa interativo, contagem regressiva e confirmação de presença. Templates elegantes para seu grande dia.
        </p>
        <Link href="/criar">
          <Button
            size="lg"
            className="bg-[#D4A373] hover:bg-[#C49363] text-white text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-up [animation-delay:400ms]"
          >
            Criar meu convite
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </section>
  )
}
