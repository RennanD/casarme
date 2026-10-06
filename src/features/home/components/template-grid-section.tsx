import { HOME_ANCHORS } from '@/src/features/home/model/anchors'
import {
  getCatalogByProductLine,
  PRODUCT_LINE_LABELS,
  type ProductLine,
} from '@/src/features/home/model/catalog'

import { TemplateCard } from './template-card'

const PRODUCT_LINES: ProductLine[] = ['interactive', 'site']

export function TemplateGridSection() {
  return (
    <section
      id={HOME_ANCHORS.templates}
      className="bg-background px-4 py-16 sm:py-24"
      aria-labelledby="templates-title"
    >
      <div className="mx-auto max-w-6xl space-y-16">
        <header className="mx-auto max-w-2xl space-y-4 text-center">
          <h2 id="templates-title" className="h2">
            Nossos Modelos de Convite
          </h2>
          <p className="lead">
            Modelos exclusivos criados para emocionar seus convidados desde o primeiro clique.
          </p>
        </header>

        {PRODUCT_LINES.map((productLine, index) => (
          <div key={productLine} className={index > 0 ? 'border-border border-t pt-16' : undefined}>
            <h3 className="h3 mb-8 text-center">{PRODUCT_LINE_LABELS[productLine]}</h3>
            <div
              className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
              role="list"
              aria-label={PRODUCT_LINE_LABELS[productLine]}
            >
              {getCatalogByProductLine(productLine).map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
