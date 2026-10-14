import Image from 'next/image'

import { HOME_ANCHORS } from '@/src/features/home/model/anchors'

const COMPARISON_CARDS = [
  {
    eyebrow: 'ANTES DA COMEMORAÇÃO',
    title: 'Um convite com a cara de vocês.',
    description: 'Nomes, data, local e uma mensagem especial — tudo organizado em uma página bonita para compartilhar.',
    image: '/images/thumbs/golden/01.png',
    alt: 'Prévia do modelo Dourado',
    tone: 'bg-surface-sage',
  },
  {
    eyebrow: 'NA HORA DE CELEBRAR',
    title: 'Escaneou. Confirmou. Já faz parte.',
    description: 'Os convidados abrem o convite pelo celular e confirmam presença direto pelo WhatsApp.',
    image: '/images/home-redesigned/celebration-guests.png',
    alt: 'Noivos e convidados durante a celebração',
    tone: 'bg-surface-peach',
  },
]

export function BeforeCelebrationSection() {
  return (
    <section className="bg-background px-6 py-12 lg:px-8 lg:py-10" aria-labelledby="before-celebration-title">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="space-y-2">
          <p className="text-xs font-semibold tracking-widest text-muted-foreground">DO PRIMEIRO OLHAR À CONFIRMAÇÃO</p>
          <h2 id="before-celebration-title" className="font-serif text-3xl leading-tight font-normal text-foreground">Um convite que já explica como viver esse dia.</h2>
          <p className="text-sm text-muted-foreground">Seu modelo reúne as informações do casamento e deixa o próximo passo claro para cada convidado.</p>
        </header>
        <div className="grid gap-4 md:grid-cols-2">
          {COMPARISON_CARDS.map((card) => (
            <article key={card.eyebrow} className={`flex min-h-96 flex-col justify-between gap-3 rounded-2xl p-6 ${card.tone}`}>
              <div className="space-y-2">
                <p className="text-xs font-semibold tracking-wide text-muted-foreground">{card.eyebrow}</p>
                <h3 className="font-serif text-xl leading-tight font-normal text-foreground">{card.title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">{card.description}</p>
              </div>
              <figure className={`relative overflow-hidden rounded-xl ${card.eyebrow.startsWith('ANTES') ? 'h-48 w-52 self-end' : 'h-48 w-full'}`}>
                <Image src={card.image} alt={card.alt} fill className={`${card.eyebrow.startsWith('ANTES') ? 'object-contain' : 'object-cover'} outline -outline-offset-1 outline-black/10 dark:outline-white/10`} sizes="(max-width: 768px) 90vw, 500px" />
              </figure>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
