import { HomeImage } from '@/src/features/home/components/home-image'

export function HomeHeroCollage() {
  return (
    <div
      className="home-enter home-enter-delay-4 relative aspect-[4/5] w-full max-w-sm shrink-0 sm:max-w-md"
      aria-label="Colagem com foto do casal e um modelo de convite"
      role="img"
    >
      <div className="absolute inset-[6%] rounded-full bg-surface-sage" />
      <p className="absolute bottom-[18%] left-[8%] z-0 max-w-[45%] font-serif text-sm italic text-foreground/35">
        o que é bom fica.
      </p>

      <figure className="shadow-polaroid absolute left-0 top-[8%] z-10 h-[58%] w-[52%] -rotate-2 overflow-hidden rounded-2xl">
        <div className="relative h-[calc(100%-2rem)] w-full">
          <HomeImage
            src="/images/home-redesigned/hero-wedding-garden.webp"
            alt="Casal de noivos com convite digital em um jardim"
            fill
            className="image-outline object-cover"
            sizes="(max-width: 768px) 45vw, 480px"
            priority
          />
        </div>
        <figcaption className="flex h-8 items-center justify-center bg-card/95 font-serif text-xs italic text-foreground backdrop-blur-sm">
          o nosso sim
        </figcaption>
      </figure>

      <figure className="shadow-polaroid absolute left-[44%] top-0 z-20 h-[65%] w-[48%] rotate-2 overflow-hidden rounded-2xl">
        <div className="relative h-[calc(100%-2rem)] w-full bg-secondary/60">
          <HomeImage
            src="/images/thumbs/blue/01.png"
            alt="Prévia do convite Azul"
            fill
            className="image-outline object-contain p-2"
            sizes="(max-width: 768px) 40vw, 440px"
          />
        </div>
        <figcaption className="flex h-8 items-center justify-center bg-card/95 font-serif text-xs italic text-foreground backdrop-blur-sm">
          convite Azul
        </figcaption>
      </figure>
    </div>
  )
}
