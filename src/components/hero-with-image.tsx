import { Button } from "@/src/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export function HeroWithImage() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#FFF8F0]" role="banner" aria-labelledby="hero-title">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <Image
          src="/romantic-couple-wedding-natural-light-soft-focus.jpg"
          alt=""
          fill
          className="object-cover opacity-30"
          priority
          quality={75}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFF8F0]/80 via-[#FFF8F0]/60 to-[#FFF8F0]" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <article className="text-center lg:text-left animate-fade-in">
            <h1 id="hero-title" className="font-serif text-3xl md:text-5xl lg:text-5xl font-bold text-[#3E3E3E] mb-6 animate-slide-up text-balance">
              Convite de casamento digital interativo, rápido e sem dor de cabeça
            </h1>
            <p className="text-lg md:text-xl text-[#6B6B6B] mb-12 max-w-3xl mx-auto lg:mx-0 animate-slide-up [animation-delay:200ms] text-pretty">
              Crie seu convite em minutos e receba um link para enviar aos convidados. Simples, com confimação de presença elegante e sem depender de designer.
            </p>
            <div className="animate-slide-up [animation-delay:400ms]">
              <Link href="/#templates" aria-label="Ver modelos de convite de casamento digital" className="touch-target">
                <Button
                  size="lg"
                  className="bg-[#D4A373] hover:bg-[#C49363] text-white text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 focus-visible:focus-visible"
                  type="button"
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
                quality={85}
                sizes="(max-width: 768px) 100vw, 700px"
                loading="eager"
              />
            </figure>
          </aside>
        </div>
      </div>
    </section>
  )
}
