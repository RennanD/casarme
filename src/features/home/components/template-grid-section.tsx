import { HOME_ANCHORS } from '@/src/features/home/model/anchors'
import { HOME_CATALOG } from '@/src/features/home/model/catalog'

import { TemplateCard } from './template-card'

export function TemplateGridSection() {
  return (
    <section
      id={HOME_ANCHORS.templates}
      className="scroll-mt-20 bg-background px-6 py-12 lg:px-8 lg:py-14"
      aria-labelledby="templates-title"
    >
      <div className="mx-auto max-w-7xl space-y-5">
        <header className="space-y-2">
          <p className="text-xs font-semibold tracking-widest text-muted-foreground">ESCOLHA SEU ESTILO</p>
          <h2 id="templates-title" className="font-serif text-3xl leading-tight font-normal">
            Um convite com a cara de vocês.
          </h2>
          <p className="text-sm text-muted-foreground">
            Veja cada modelo por dentro. Todos incluem mapa do local e confirmação por WhatsApp.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4" role="list" aria-label="Modelos de convite">
          {HOME_CATALOG.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      </div>
    </section>
  )
}
