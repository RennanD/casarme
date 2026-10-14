import { ChevronDown } from 'lucide-react'

import { HOME_ANCHORS } from '@/src/features/home/model/anchors'
import { HOME_FAQ } from '@/src/features/home/model/copy'

export function FaqSection() {
  return (
    <section id={HOME_ANCHORS.faq} className="scroll-mt-20 bg-background py-12 lg:py-14" aria-labelledby="faq-title">
      <div className="home-shell flex flex-col gap-10 lg:flex-row lg:gap-12">
        <header className="w-full space-y-3 lg:max-w-xs">
          <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">Antes de convidar todo mundo</p>
          <h2 id="faq-title" className="font-serif text-3xl leading-tight font-normal">Ficou alguma dúvida?</h2>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">Modelos, confirmação e prazo do seu convite.</p>
        </header>
        <div className="w-full min-w-0 flex-1">
          {HOME_FAQ.map((item) => (
            <details key={item.question} className="group border-b border-border">
              <summary className="flex h-14 cursor-pointer list-none items-center justify-between gap-4 text-sm text-foreground marker:hidden transition-colors duration-150 ease-out hover:bg-secondary/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring [&::-webkit-details-marker]:hidden">
                {item.question}
                <ChevronDown className="size-4 shrink-0 stroke-[1.75] text-muted-foreground transition-transform group-open:rotate-180 motion-reduce:transition-none" aria-hidden />
              </summary>
              <p className="pb-4 pr-8 text-xs leading-5 text-muted-foreground">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
