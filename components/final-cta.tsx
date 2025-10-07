"use client"

import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import Link from "next/link"

export function FinalCTA() {
  return (
    <section className="py-24 bg-[#D4A373] text-white">
      <div className="container mx-auto px-4 text-center">
        <Heart className="w-16 h-16 mx-auto mb-6 animate-pulse" />
        <h2 className="font-serif text-4xl md:text-6xl font-bold mb-6 text-balance">
          Seu convite merece ser inesquecível
        </h2>
        <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-pretty opacity-95">
          Crie agora seu convite digital interativo e encante seus convidados
        </p>
        <Link href="/criar">
          <Button
            size="lg"
            className="bg-white text-[#D4A373] hover:bg-[#FAF3E0] text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Criar meu convite
          </Button>
        </Link>
      </div>
    </section>
  )
}
