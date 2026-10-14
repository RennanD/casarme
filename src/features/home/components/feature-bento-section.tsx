import Image from 'next/image'
import { MapPin, MessageCircle } from 'lucide-react'

import { HOME_BENTO_SECTION } from '@/src/features/home/model/copy'

export function FeatureBentoSection() {
  return (
    <section className="bg-background px-6 py-12 lg:px-8 lg:py-12" aria-labelledby="bento-title">
      <div className="mx-auto max-w-7xl space-y-5">
        <header className="space-y-2">
          <p className="text-xs font-semibold tracking-widest text-muted-foreground">{HOME_BENTO_SECTION.eyebrow}</p>
          <h2 id="bento-title" className="font-serif text-3xl leading-tight font-normal">{HOME_BENTO_SECTION.title}</h2>
          <p className="text-sm text-muted-foreground">{HOME_BENTO_SECTION.subtitle}</p>
        </header>

        <div className="grid gap-3.5 lg:grid-cols-2">
          <article className="flex min-h-52 flex-col items-stretch justify-between gap-4 rounded-2xl bg-surface-sage p-4 lg:flex-row lg:items-center">
            <div className="max-w-sm space-y-2">
              <p className="text-xs font-semibold tracking-wide text-muted-foreground">LOCALIZAÇÃO</p>
              <h3 className="font-serif text-xl leading-tight">Todo mundo sabe como chegar.</h3>
              <p className="text-xs leading-snug text-muted-foreground">Endereço e acesso ao mapa no próprio convite.</p>
            </div>
            <div className="flex h-36 w-full shrink-0 flex-col items-center justify-center gap-2 rounded-xl bg-white p-3 text-center shadow-md lg:h-40 lg:w-48">
              <div className="grid size-9 place-items-center rounded-full bg-secondary text-primary"><MapPin className="size-5" aria-hidden /></div>
              <p className="font-serif text-xs">Casa das Oliveiras</p>
              <span className="text-xs text-muted-foreground">Abrir rota&nbsp; →</span>
            </div>
          </article>

          <article className="flex min-h-52 flex-col justify-between gap-2 rounded-2xl bg-surface-peach p-4">
            <MessageCircle className="size-6 text-foreground" aria-hidden />
            <h3 className="font-serif text-xl leading-tight">Confirme sem complicação.</h3>
            <p className="text-xs leading-snug text-muted-foreground">Quem recebe pode responder direto pelo WhatsApp, sem criar conta.</p>
            <span className="w-fit rounded-full bg-white px-3 py-2 text-xs">Confirmar presença&nbsp; →</span>
          </article>
        </div>

        <div className="grid gap-3.5 lg:grid-cols-2">
          <article className="flex min-h-52 items-center gap-3.5 rounded-2xl bg-surface-lilac p-3.5">
            <figure className="relative h-44 w-28 shrink-0 overflow-hidden rounded-lg lg:w-36">
              <Image src="/images/thumbs/romantico/01.png" alt="Prévia do modelo Romântico" fill className="object-contain outline -outline-offset-1 outline-black/10 dark:outline-white/10" sizes="140px" />
            </figure>
            <div className="space-y-2">
              <p className="text-xs font-semibold tracking-wide text-muted-foreground">NO MODELO ROMÂNTICO</p>
              <h3 className="font-serif text-xl leading-tight">Um pouco mais de vocês.</h3>
              <p className="text-xs leading-snug text-muted-foreground">Até 6 fotos, música do YouTube e contagem regressiva.</p>
            </div>
          </article>

          <article className="flex min-h-52 flex-col justify-center gap-2.5 rounded-2xl bg-white p-4 shadow-md">
            <p className="text-xs font-semibold tracking-wide text-muted-foreground">UM CONVITE CLARO E COMPLETO</p>
            <h3 className="font-serif text-xl leading-tight">Todo mundo sabe o que esperar.</h3>
            <p className="text-xs leading-snug text-muted-foreground">Data, horário, endereço, mapa e confirmação ficam juntos no mesmo link.</p>
          </article>
        </div>
      </div>
    </section>
  )
}
