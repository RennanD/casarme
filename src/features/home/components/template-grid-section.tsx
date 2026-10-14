import { HomeCheckList } from '@/src/features/home/components/home-check-list'
import { HOME_ANCHORS } from '@/src/features/home/model/anchors'
import { HOME_CATALOG } from '@/src/features/home/model/catalog'
import { HOME_INCLUDED_FEATURES, HOME_TEMPLATE_SECTION } from '@/src/features/home/model/copy'

import { TemplateCarousel } from './template-carousel'

export function TemplateGridSection() {
  return (
    <section
      id={HOME_ANCHORS.templates}
      className="scroll-mt-20 bg-background py-16 lg:py-24"
      aria-labelledby="templates-title"
    >
      <div className="home-shell space-y-8">
        <header className="mx-auto max-w-2xl space-y-3 text-center">
          <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">Escolha o que quer receber</p>
          <h2 id="templates-title" className="font-serif text-3xl leading-tight font-normal lg:text-4xl">
            {HOME_TEMPLATE_SECTION.title}
          </h2>
          <p className="text-sm text-muted-foreground">{HOME_TEMPLATE_SECTION.subtitle}</p>
        </header>

        <TemplateCarousel templates={HOME_CATALOG} />

        <div className="rounded-2xl bg-secondary/70 px-6 py-8 lg:px-8">
          <p className="mb-4 text-xs font-semibold tracking-wide text-muted-foreground uppercase">Incluído em todos os modelos</p>
          <HomeCheckList items={HOME_INCLUDED_FEATURES} className="sm:grid sm:grid-cols-3 sm:gap-x-6 sm:space-y-0" />
        </div>
      </div>
    </section>
  )
}
