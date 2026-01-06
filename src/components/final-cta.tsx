"use client"

import { Button } from "@/src/components/ui/button"
import { Heart } from "lucide-react"
import Link from "next/link"

export function FinalCTA() {
  return (
    <section className="py-24 bg-[#D4A373] text-white" aria-labelledby="final-cta-title">
      <div className="container mx-auto px-4 text-center">
        <Heart className="w-16 h-16 mx-auto mb-6 animate-pulse" aria-hidden="true" />
        <h2 id="final-cta-title" className="font-serif text-3xl md:text-5xl font-bold mb-6 text-balance">
          🎉 Crie seu Convite Digital por Menos de R$ 30 - Comece Agora!
        </h2>
        <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-pretty opacity-95">
          ✅ Modelos profissionais ✅ Mapa interativo ✅ Confirmação WhatsApp ✅ Sem mensalidade. Mais de 500 casais já criaram seus convites conosco!
        </p>
        <Link href="/#templates" aria-label="Ver modelos de convite de casamento digital" className="touch-target">
          <Button
            size="lg"
            className="bg-white text-[#D4A373] hover:bg-[#FAF3E0] text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 focus-visible:focus-visible"
            type="button"
          >
            Criar Meu Convite
          </Button>
        </Link>
      </div>
    </section>
  )
}
