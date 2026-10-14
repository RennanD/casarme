import Image from 'next/image'
import { Check } from 'lucide-react'

import { HOME_ANCHORS } from '@/src/features/home/model/anchors'
import { Link } from '@/src/shared/ui'

const EXPERIENCE_POINTS = [
  'Cerimônia, recepção e horários',
  'Endereço com acesso ao mapa',
  'Confirmação pelo WhatsApp',
]

export function GuestExperienceSection() {
  return (
    <section id={HOME_ANCHORS.guestExperience} className="scroll-mt-20 bg-background px-6 py-12 lg:px-8 lg:py-10" aria-labelledby="guest-experience-title">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-10 lg:flex-row lg:gap-11">
        <figure className="relative aspect-[48/43] h-auto w-full max-w-lg shrink-0 overflow-hidden rounded-2xl shadow-lg lg:aspect-auto lg:h-96">
          <Image src="/images/home-redesigned/invitation-phone.png" alt="Convite digital aberto no celular" fill className="object-cover outline -outline-offset-1 outline-black/10 dark:outline-white/10" sizes="480px" />
          <figcaption className="absolute bottom-4 left-4 flex h-14 w-56 flex-col justify-center gap-0.5 rounded-xl bg-white/90 px-3 py-2 shadow-sm">
            <span className="text-xs font-semibold tracking-wide text-muted-foreground">SEM INSTALAR APLICATIVO</span>
            <span className="font-serif text-sm text-foreground">Um link, direto ao convite.</span>
          </figcaption>
        </figure>

        <div className="w-full max-w-md space-y-3">
          <p className="text-xs font-semibold tracking-widest text-muted-foreground">PENSADO PARA QUEM VAI RECEBER</p>
          <h2 id="guest-experience-title" className="font-serif text-3xl leading-tight font-normal">Abriu no celular. Já sabe tudo sobre o casamento.</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">O convite abre pelo link que vocês compartilham. Sem instalar aplicativo ou criar uma conta.</p>
          <ul className="space-y-3 pt-1 text-xs text-foreground">
            {EXPERIENCE_POINTS.map((point) => <li key={point} className="flex items-center gap-2"><Check className="size-3.5 shrink-0 text-primary" aria-hidden />{point}</li>)}
          </ul>
          <Link href="/exemplo/garden" variant="nav" className="inline-block pt-1 text-xs font-semibold">Conheça uma demonstração&nbsp; →</Link>
        </div>
      </div>
    </section>
  )
}
