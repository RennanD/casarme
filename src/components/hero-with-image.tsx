"use client"

import { Button } from "@/src/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export function HeroWithImage() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#FFF8F0]" role="banner" aria-labelledby="hero-title">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <img
          src="/romantic-couple-wedding-natural-light-soft-focus.jpg"
          alt="Casal romântico em casamento"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFF8F0]/80 via-[#FFF8F0]/60 to-[#FFF8F0]" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <article className="text-center lg:text-left animate-fade-in">
            <h1 id="hero-title" className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold text-[#3E3E3E] mb-6 animate-slide-up text-balance">
              Crie seu convite de casamento de forma simples
            </h1>
            <p className="text-xl md:text-2xl text-[#6B6B6B] mb-12 max-w-3xl mx-auto lg:mx-0 animate-slide-up [animation-delay:200ms] text-pretty">
              Crie seu convite personalizado de casamento em 3 cliques. Templates elegantes, mapa interativo e confirmação via WhatsApp incluídos.
            </p>
            <div className="animate-slide-up [animation-delay:400ms]">
              <Link href="/criar" aria-label="Criar meu convite de casamento digital">
                <Button
                  size="lg"
                  className="bg-[#D4A373] hover:bg-[#C49363] text-white text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Criar Meu Convite
                </Button>
              </Link>
            </div>
          </article>

          {/* Image Content */}
          <aside className="flex justify-center rounded-lg lg:justify-end animate-fade-in [animation-delay:200ms]" aria-label="Preview dos convites digitais">
            <figure className="relative rounded-lg overflow-hidden">
              <Image
                src="/mockups.webp"
                alt="Preview de convites de casamento digitais em diferentes modelos"
                width={700}
                height={700}
                priority
              />
            </figure>
          </aside>
        </div>
      </div>
    </section>
  )
}
