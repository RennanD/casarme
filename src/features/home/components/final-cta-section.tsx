import Image from 'next/image'

import { HOME_ANCHORS } from '@/src/features/home/model/anchors'
import { Button, Link } from '@/src/shared/ui'

export function FinalCtaSection() {
  return (
    <section className="bg-[#eef2ea] px-6 py-8 lg:h-[270px] lg:px-0 lg:py-[30px]" aria-labelledby="final-cta-title">
      <div className="mx-auto flex max-w-[1080px] flex-col items-center justify-between gap-8 md:flex-row lg:h-full">
        <div className="w-full max-w-[500px] space-y-[11px] text-center md:text-left">
          <p className="text-[9px] font-semibold tracking-[1.2px] text-muted-foreground">PARA O SEU GRANDE DIA</p>
          <h2 id="final-cta-title" className="font-serif text-[31px] leading-[1.08] font-normal">O próximo passo é escolher o modelo.</h2>
          <p className="text-xs text-muted-foreground">Personalize primeiro. Pague uma única vez depois.</p>
          <Button asChild className="h-auto rounded-full px-[18px] py-3 text-xs">
            <Link href={`#${HOME_ANCHORS.templates}`}>Escolher meu convite&nbsp; →</Link>
          </Button>
        </div>
        <div className="relative h-[200px] w-[320px] shrink-0">
          <figure className="absolute left-[14px] top-[18px] h-[168px] w-[150px] -rotate-2 overflow-hidden rounded-md shadow-[0_5px_14px_#3e3e3e20]">
            <Image src="/images/home-redesigned/cta-wedding-photo.png" alt="Foto de casamento para inspirar o convite" fill className="object-cover" sizes="150px" />
          </figure>
          <figure className="absolute left-[160px] top-[7px] h-[180px] w-[145px] rotate-2 overflow-hidden rounded-md shadow-[0_5px_14px_#3e3e3e20]">
            <Image src="/images/thumbs/golden/01.png" alt="Prévia do modelo Dourado" fill className="object-contain" sizes="145px" />
          </figure>
        </div>
      </div>
    </section>
  )
}
