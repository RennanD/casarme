import Image from 'next/image'

import { HOME_ANCHORS } from '@/src/features/home/model/anchors'

const COMPARISON_CARDS = [
  {
    eyebrow: 'ANTES DA COMEMORAÇÃO',
    title: 'Um convite com a cara de vocês.',
    description: 'Nomes, data, local e uma mensagem especial — tudo organizado em uma página bonita para compartilhar.',
    image: '/images/thumbs/golden/01.png',
    alt: 'Prévia do modelo Dourado',
    tone: 'bg-[#eef2ea]',
  },
  {
    eyebrow: 'NA HORA DE CELEBRAR',
    title: 'Escaneou. Confirmou. Já faz parte.',
    description: 'Os convidados abrem o convite pelo celular e confirmam presença direto pelo WhatsApp.',
    image: '/images/home-redesigned/celebration-guests.png',
    alt: 'Noivos e convidados durante a celebração',
    tone: 'bg-[#f3e8df]',
  },
]

export function BeforeCelebrationSection() {
  return (
    <section className="bg-background px-6 py-12 lg:h-[570px] lg:px-0 lg:py-[42px]" aria-labelledby="before-celebration-title">
      <div className="mx-auto max-w-[1080px] space-y-[22px]">
        <header className="space-y-2">
          <p className="text-[10px] font-semibold tracking-[1.4px] text-muted-foreground">DO PRIMEIRO OLHAR À CONFIRMAÇÃO</p>
          <h2 id="before-celebration-title" className="font-serif text-[32px] leading-tight font-normal text-foreground">Um convite que já explica como viver esse dia.</h2>
          <p className="text-[13px] text-muted-foreground">Seu modelo reúne as informações do casamento e deixa o próximo passo claro para cada convidado.</p>
        </header>
        <div className="grid gap-[18px] md:grid-cols-2">
          {COMPARISON_CARDS.map((card) => (
            <article key={card.eyebrow} className={`flex min-h-[390px] flex-col justify-between gap-3 rounded-[22px] p-[22px] ${card.tone}`}>
              <div className="space-y-2">
                <p className="text-[9px] font-semibold tracking-[1.1px] text-muted-foreground">{card.eyebrow}</p>
                <h3 className="font-serif text-[23px] leading-tight font-normal text-foreground">{card.title}</h3>
                <p className="text-xs leading-[1.5] text-muted-foreground">{card.description}</p>
              </div>
              <figure className={`relative overflow-hidden rounded-xl ${card.eyebrow.startsWith('ANTES') ? 'h-[190px] w-[210px] self-end' : 'h-[190px] w-full'}`}>
                <Image src={card.image} alt={card.alt} fill className={card.eyebrow.startsWith('ANTES') ? 'object-contain' : 'object-cover'} sizes="(max-width: 768px) 90vw, 500px" />
              </figure>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
