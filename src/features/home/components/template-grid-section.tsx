import { HOME_ANCHORS } from '@/src/features/home/model/anchors'
import { HOME_CATALOG } from '@/src/features/home/model/catalog'

import { TemplateCarousel } from './template-carousel'

export function TemplateGridSection() {
  return (
    <section
      id={HOME_ANCHORS.templates}
      className="scroll-mt-20 bg-background px-6 py-16 lg:px-8 lg:py-24"
      aria-labelledby="templates-title"
    >
      <div className="mx-auto max-w-7xl space-y-5">
        <header className="space-y-2">
          <p className="text-xs font-semibold tracking-widest text-muted-foreground">ESCOLHA SEU ESTILO</p>
          <h2 id="templates-title" className="font-serif text-3xl leading-tight font-normal">
            Um convite com a cara de vocês.
          </h2>
          <p className="text-sm text-muted-foreground">
            Compare os recursos de cada modelo antes de escolher. Todos incluem mapa do local e confirmação por WhatsApp.
          </p>
        </header>

        <TemplateCarousel templates={HOME_CATALOG} />
      </div>
    </section>
  )
}
