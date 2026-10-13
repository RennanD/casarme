import Image from 'next/image'

import { HOME_ANCHORS } from '@/src/features/home/model/anchors'
import { HOME_HERO } from '@/src/features/home/model/copy'
import { Button, Link } from '@/src/shared/ui'

export function HomeHero() {
  return (
    <section
      id={HOME_ANCHORS.home}
      aria-labelledby="hero-title"
      className="scroll-mt-20 bg-background px-6 lg:h-[580px] lg:px-0"
    >
      <div className="mx-auto flex max-w-[1080px] flex-col items-center justify-between gap-10 py-14 lg:h-full lg:flex-row lg:py-0">
        <div className="w-full max-w-[480px] space-y-[18px] text-center lg:text-left">
          <p className="text-[10px] font-semibold tracking-[1.5px] text-muted-foreground">
            {HOME_HERO.eyebrow}
          </p>
          <h1 id="hero-title" className="font-serif text-[40px] leading-[1.05] font-normal tracking-tight text-foreground sm:text-[48px] lg:text-[52px]">
            {HOME_HERO.headline}
          </h1>
          <p className="mx-auto max-w-[460px] text-[15px] leading-[1.55] text-muted-foreground lg:mx-0">
            {HOME_HERO.body}
          </p>
          <Button asChild className="h-auto rounded-full px-[22px] py-[14px] text-[13px]">
            <Link href={`#${HOME_ANCHORS.templates}`}>{HOME_HERO.ctaLabel}</Link>
          </Button>
          <p className="text-[11px] text-muted-foreground">{HOME_HERO.note}</p>
        </div>

        <div className="relative aspect-[45/43] w-full max-w-[450px] shrink-0" aria-label="Colagem com foto do casal e um modelo de convite" role="img">
          <div className="absolute left-[12%] top-[13.5%] h-[66.5%] w-[75.5%] rounded-full bg-[#eef2ea]" />
          <figure className="absolute left-[4.9%] top-[20.5%] z-10 flex h-[58.1%] w-[46.7%] -rotate-5 flex-col gap-[6px] bg-white p-[10px] shadow-[0_8px_20px_#3e3e3e1f]">
            <div className="relative h-[84.3%] w-full overflow-hidden rounded-[3px]">
              <Image src="/images/home-redesigned/hero-wedding-garden.png" alt="Celebração de um casamento em um jardim" fill className="object-cover" sizes="210px" priority />
            </div>
            <figcaption className="text-center font-serif text-xs italic text-foreground">o nosso sim</figcaption>
          </figure>
          <figure className="absolute left-[50.2%] top-[10.2%] z-20 flex h-[72.1%] w-[42.2%] rotate-5 flex-col gap-[6px] bg-white p-[10px] shadow-[0_8px_20px_#3e3e3e1f]">
            <div className="relative h-[86.2%] w-full overflow-hidden rounded-[3px]">
              <Image src="/images/thumbs/blue/01.png" alt="Prévia do convite Azul" fill className="object-contain" sizes="190px" />
            </div>
            <figcaption className="text-center font-serif text-xs italic text-foreground">convite Azul</figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
