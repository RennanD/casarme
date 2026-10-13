import { HOME_ANCHORS } from '@/src/features/home/model/anchors'
import { HOME_CATALOG } from '@/src/features/home/model/catalog'

import { TemplateCard } from './template-card'

export function TemplateGridSection() {
  return (
    <section
      id={HOME_ANCHORS.templates}
      className="scroll-mt-20 bg-background px-6 py-12 lg:h-[720px] lg:px-0 lg:pt-[50px] lg:pb-[56px]"
      aria-labelledby="templates-title"
    >
      <div className="mx-auto max-w-[1080px] space-y-5">
        <header className="space-y-2">
          <p className="text-[10px] font-semibold tracking-[1.5px] text-muted-foreground">ESCOLHA SEU ESTILO</p>
          <h2 id="templates-title" className="font-serif text-[34px] leading-tight font-normal">
            Um convite com a cara de vocês.
          </h2>
          <p className="text-[13px] text-muted-foreground">
            Veja cada modelo por dentro. Todos incluem mapa do local e confirmação por WhatsApp.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-[14px] sm:grid-cols-2 lg:grid-cols-4" role="list" aria-label="Modelos de convite">
          {HOME_CATALOG.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      </div>
    </section>
  )
}
