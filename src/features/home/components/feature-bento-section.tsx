import Image from 'next/image'
import { MapPin, MessageCircle } from 'lucide-react'

import { HOME_BENTO_SECTION } from '@/src/features/home/model/copy'

export function FeatureBentoSection() {
  return (
    <section className="bg-background px-6 py-12 lg:h-[680px] lg:px-0 lg:py-[50px]" aria-labelledby="bento-title">
      <div className="mx-auto max-w-[1080px] space-y-5">
        <header className="space-y-2">
          <p className="text-[10px] font-semibold tracking-[1.4px] text-muted-foreground">{HOME_BENTO_SECTION.eyebrow}</p>
          <h2 id="bento-title" className="font-serif text-[34px] leading-tight font-normal">{HOME_BENTO_SECTION.title}</h2>
          <p className="text-[13px] text-muted-foreground">{HOME_BENTO_SECTION.subtitle}</p>
        </header>

        <div className="grid gap-[14px] lg:grid-cols-[620fr_446fr]">
          <article className="flex min-h-[210px] flex-col items-stretch justify-between gap-4 rounded-[20px] bg-[#eef2ea] p-[18px] lg:flex-row lg:items-center">
            <div className="max-w-[340px] space-y-2">
              <p className="text-[9px] font-semibold tracking-[0.9px] text-muted-foreground">LOCALIZAÇÃO</p>
              <h3 className="font-serif text-[21px] leading-tight">Todo mundo sabe como chegar.</h3>
              <p className="text-xs leading-[1.45] text-muted-foreground">Endereço e acesso ao mapa no próprio convite.</p>
            </div>
            <div className="flex h-[136px] w-full shrink-0 flex-col items-center justify-center gap-2 rounded-[14px] bg-white p-3 text-center shadow-[0_4px_12px_#3e3e3e12] lg:h-[164px] lg:w-[190px]">
              <div className="grid size-9 place-items-center rounded-full bg-[#f8f6f2] text-primary"><MapPin className="size-5" aria-hidden /></div>
              <p className="font-serif text-xs">Casa das Oliveiras</p>
              <span className="text-[10px] text-muted-foreground">Abrir rota&nbsp; →</span>
            </div>
          </article>

          <article className="flex min-h-[210px] flex-col justify-between gap-2 rounded-[20px] bg-[#f3e8df] p-[18px]">
            <MessageCircle className="size-6 text-foreground" aria-hidden />
            <h3 className="font-serif text-[21px] leading-tight">Confirme sem complicação.</h3>
            <p className="text-xs leading-[1.4] text-muted-foreground">Quem recebe pode responder direto pelo WhatsApp, sem criar conta.</p>
            <span className="w-fit rounded-full bg-white px-3 py-[9px] text-[10px]">Confirmar presença&nbsp; →</span>
          </article>
        </div>

        <div className="grid gap-[14px] lg:grid-cols-[520fr_546fr]">
          <article className="flex min-h-[210px] items-center gap-[14px] rounded-[20px] bg-[#efeaf2] p-[14px]">
            <figure className="relative h-[180px] w-[120px] shrink-0 overflow-hidden rounded-[9px] lg:w-[140px]">
              <Image src="/images/thumbs/romantico/01.png" alt="Prévia do modelo Romântico" fill className="object-contain" sizes="140px" />
            </figure>
            <div className="space-y-[7px]">
              <p className="text-[9px] font-semibold tracking-[0.9px] text-muted-foreground">NO MODELO ROMÂNTICO</p>
              <h3 className="font-serif text-[21px] leading-tight">Um pouco mais de vocês.</h3>
              <p className="text-xs leading-[1.45] text-muted-foreground">Até 6 fotos, música do YouTube e contagem regressiva.</p>
            </div>
          </article>

          <article className="flex min-h-[210px] flex-col justify-center gap-[10px] rounded-[20px] bg-white p-[18px] shadow-[0_3px_14px_#3e3e3e10]">
            <p className="text-[9px] font-semibold tracking-[0.9px] text-muted-foreground">UM CONVITE CLARO E COMPLETO</p>
            <h3 className="font-serif text-[21px] leading-tight">Todo mundo sabe o que esperar.</h3>
            <p className="text-xs leading-[1.45] text-muted-foreground">Data, horário, endereço, mapa e confirmação ficam juntos no mesmo link.</p>
          </article>
        </div>
      </div>
    </section>
  )
}
