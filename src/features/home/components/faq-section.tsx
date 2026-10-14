import { ChevronDown } from 'lucide-react'

import { HOME_ANCHORS } from '@/src/features/home/model/anchors'
import { HOME_FAQ } from '@/src/features/home/model/copy'

export function FaqSection() {
  return (
    <section id={HOME_ANCHORS.faq} className="scroll-mt-20 bg-background px-6 py-12 lg:px-8 lg:py-14" aria-labelledby="faq-title">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 lg:flex-row lg:gap-12">
        <header className="w-full space-y-3 lg:max-w-xs">
          <p className="text-xs font-semibold tracking-widest text-muted-foreground">ANTES DE DIZER SIM</p>
          <h2 id="faq-title" className="font-serif text-3xl leading-tight font-normal">Ficou alguma dúvida?</h2>
          <p className="max-w-xs text-xs leading-relaxed text-muted-foreground">O essencial para escolher e criar o convite com tranquilidade.</p>
        </header>
        <div className="w-full flex-1">
          {HOME_FAQ.map((item) => (
            <details key={item.question} className="group border-b border-border">
              <summary className="flex h-14 cursor-pointer list-none items-center justify-between gap-4 text-sm text-foreground marker:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring [&::-webkit-details-marker]:hidden">
                {item.question}
                <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180 motion-reduce:transition-none" aria-hidden />
              </summary>
              <p className="pb-4 pr-8 text-xs leading-5 text-muted-foreground">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
