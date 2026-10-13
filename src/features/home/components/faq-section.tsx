import { ChevronDown } from 'lucide-react'

import { HOME_ANCHORS } from '@/src/features/home/model/anchors'
import { HOME_FAQ } from '@/src/features/home/model/copy'

export function FaqSection() {
  return (
    <section id={HOME_ANCHORS.faq} className="scroll-mt-20 bg-background px-6 py-12 lg:px-0 lg:py-[56px]" aria-labelledby="faq-title">
      <div className="mx-auto flex max-w-[1080px] flex-col gap-10 lg:h-[368px] lg:flex-row lg:gap-12">
        <header className="w-full space-y-3 lg:max-w-[330px]">
          <p className="text-[10px] font-semibold tracking-[1.2px] text-muted-foreground">ANTES DE DIZER SIM</p>
          <h2 id="faq-title" className="font-serif text-[32px] leading-tight font-normal">Ficou alguma dúvida?</h2>
          <p className="max-w-[300px] text-xs leading-[1.5] text-muted-foreground">O essencial para escolher e criar o convite com tranquilidade.</p>
        </header>
        <div className="w-full flex-1">
          {HOME_FAQ.map((item) => (
            <details key={item.question} className="group border-b border-border">
              <summary className="flex h-[52px] cursor-pointer list-none items-center justify-between gap-4 text-[13px] text-foreground marker:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring [&::-webkit-details-marker]:hidden">
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
