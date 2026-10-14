import Image from 'next/image'

import { HOME_ANCHORS } from '@/src/features/home/model/anchors'
import { Button, Link } from '@/src/shared/ui'

export function FinalCtaSection() {
  return (
    <section className="bg-surface-sage px-6 py-8 lg:px-8 lg:py-8" aria-labelledby="final-cta-title">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">
        <div className="w-full max-w-lg space-y-3 text-center md:text-left">
          <p className="text-xs font-semibold tracking-widest text-muted-foreground">PARA O SEU GRANDE DIA</p>
          <h2 id="final-cta-title" className="font-serif text-3xl leading-tight font-normal">O próximo passo é escolher o modelo.</h2>
          <p className="text-xs text-muted-foreground">Personalize primeiro. Pague uma única vez depois.</p>
          <Button asChild className="h-auto rounded-full px-5 py-3 text-xs">
            <Link href={`#${HOME_ANCHORS.templates}`}>Escolher meu convite&nbsp; →</Link>
          </Button>
        </div>
        <div className="relative h-48 w-80 shrink-0">
          <figure className="absolute left-3.5 top-4 h-40 w-36 -rotate-2 overflow-hidden rounded-md shadow-md">
            <Image src="/images/home-redesigned/cta-wedding-photo.png" alt="Foto de casamento para inspirar o convite" fill className="object-cover outline -outline-offset-1 outline-black/10 dark:outline-white/10" sizes="150px" />
          </figure>
          <figure className="absolute left-40 top-2 h-44 w-36 rotate-2 overflow-hidden rounded-md shadow-md">
            <Image src="/images/thumbs/golden/01.png" alt="Prévia do modelo Dourado" fill className="object-contain outline -outline-offset-1 outline-black/10 dark:outline-white/10" sizes="145px" />
          </figure>
        </div>
      </div>
    </section>
  )
}
