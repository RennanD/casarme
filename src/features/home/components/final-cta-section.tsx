import { HomeImage } from '@/src/features/home/components/home-image'
import { HOME_ANCHORS } from '@/src/features/home/model/anchors'
import { HOME_FINAL_CTA } from '@/src/features/home/model/copy'
import { Button, Link } from '@/src/shared/ui'

export function FinalCtaSection() {
  return (
    <section className="bg-surface-sage py-12 lg:py-14" aria-labelledby="final-cta-title">
      <div className="home-shell flex flex-col items-center justify-between gap-10 md:flex-row">
        <div className="w-full max-w-lg space-y-4 text-center md:text-left">
          <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">Prepare o convite do seu casamento</p>
          <h2 id="final-cta-title" className="font-serif text-3xl leading-tight font-normal lg:text-4xl">{HOME_FINAL_CTA.title}</h2>
          <p className="text-sm text-muted-foreground">{HOME_FINAL_CTA.body}</p>
          <Button asChild className="h-auto rounded-full px-6 py-3.5 text-sm">
            <Link href={`#${HOME_ANCHORS.templates}`}>{HOME_FINAL_CTA.ctaLabel}</Link>
          </Button>
          <p className="text-xs text-muted-foreground">Personalize antes de pagar. Sem assinatura.</p>
        </div>

        <div className="relative h-52 w-full max-w-sm shrink-0">
          <figure className="shadow-polaroid absolute left-0 top-3 h-44 w-[46%] -rotate-2 overflow-hidden rounded-xl">
            <HomeImage
              src="/images/home-redesigned/cta-wedding-photo.webp"
              alt="Foto de casamento para inspirar o convite"
              fill
              className="image-outline object-cover"
              sizes="(max-width: 768px) 42vw, 280px"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/45 to-transparent px-3 pb-2 pt-6 font-serif text-xs italic text-white">
              o nosso sim
            </figcaption>
          </figure>
          <figure className="shadow-polaroid absolute right-0 top-0 h-48 w-[46%] rotate-2 overflow-hidden rounded-xl bg-secondary/50">
            <HomeImage
              src="/images/thumbs/golden/01.png"
              alt="Prévia do modelo Dourado"
              fill
              className="image-outline object-contain p-2"
              sizes="(max-width: 768px) 42vw, 280px"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/45 to-transparent px-3 pb-2 pt-6 font-serif text-xs italic text-white">
              convite Dourado
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
