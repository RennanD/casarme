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
    <section id={HOME_ANCHORS.guestExperience} className="scroll-mt-20 bg-background px-6 py-12 lg:px-0 lg:py-[42px]" aria-labelledby="guest-experience-title">
      <div className="mx-auto flex max-w-[1080px] flex-col items-center justify-between gap-10 lg:h-[456px] lg:flex-row lg:gap-11">
        <figure className="relative aspect-[48/43] h-auto w-full max-w-[480px] shrink-0 overflow-hidden rounded-[20px] shadow-[0_8px_22px_#3e3e3e18] lg:h-[430px] lg:aspect-auto">
          <Image src="/images/home-redesigned/invitation-phone.png" alt="Convite digital aberto no celular" fill className="object-cover" sizes="480px" />
          <figcaption className="absolute bottom-4 left-4 flex h-[58px] w-[230px] flex-col justify-center gap-[3px] rounded-xl bg-white/90 px-3 py-2 shadow-sm">
            <span className="text-[8px] font-semibold tracking-[0.7px] text-muted-foreground">SEM INSTALAR APLICATIVO</span>
            <span className="font-serif text-[13px] text-foreground">Um link, direto ao convite.</span>
          </figcaption>
        </figure>

        <div className="w-full max-w-[440px] space-y-[13px]">
          <p className="text-[10px] font-semibold tracking-[1.2px] text-muted-foreground">PENSADO PARA QUEM VAI RECEBER</p>
          <h2 id="guest-experience-title" className="font-serif text-[34px] leading-[1.1] font-normal">Abriu no celular. Já sabe tudo sobre o casamento.</h2>
          <p className="text-[13px] leading-[1.5] text-muted-foreground">O convite abre pelo link que vocês compartilham. Sem instalar aplicativo ou criar uma conta.</p>
          <ul className="space-y-3 pt-1 text-xs text-foreground">
            {EXPERIENCE_POINTS.map((point) => <li key={point} className="flex items-center gap-2"><Check className="size-3.5 shrink-0 text-primary" aria-hidden />{point}</li>)}
          </ul>
          <Link href="/exemplo/garden" variant="nav" className="inline-block pt-1 text-xs font-semibold">Conheça uma demonstração&nbsp; →</Link>
        </div>
      </div>
    </section>
  )
}
