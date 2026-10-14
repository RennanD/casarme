import Image from 'next/image'

import {
  getTemplateCreateHref,
  getTemplateDemoHref,
  type CatalogTemplate,
} from '@/src/features/home/model/catalog'
import { Button, Card, CardFooter, CardHeader, CardTitle, Link } from '@/src/shared/ui'

type TemplateCardProps = {
  template: CatalogTemplate
}

export function TemplateCard({ template }: TemplateCardProps) {
  return (
    <article role="listitem" className="h-full">
      <Card className="h-full min-h-96 gap-2 overflow-hidden rounded-2xl border-0 bg-card p-3 py-3 shadow-md">
        <figure className="relative h-60 shrink-0 overflow-hidden rounded-lg bg-card">
          <Image
            src={template.imagePath}
            alt={`Prévia do convite ${template.name}`}
            fill
            className="object-contain outline -outline-offset-1 outline-black/10 dark:outline-white/10"
            loading="lazy"
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
          />
        </figure>
        <CardHeader className="gap-1 px-1 pt-1 pb-0">
          <CardTitle className="font-serif text-xl font-normal">{template.name}</CardTitle>
          <p className="text-xs font-normal text-muted-foreground">
            {template.displayPrice} <span>· pagamento único</span>
          </p>
        </CardHeader>
        <CardFooter className="mt-auto grid grid-cols-2 gap-2 px-1 pb-1 pt-1">
          <Button variant="outline" asChild className="h-9 rounded-full px-2 text-xs">
            <Link
              href={getTemplateDemoHref(template.slug)}
              className="no-underline hover:no-underline"
              aria-label={`Ver demonstração do convite ${template.name}`}
            >
              Ver demonstração
            </Link>
          </Button>
          <Button asChild className="h-9 rounded-full px-2 text-xs">
            <Link
              href={getTemplateCreateHref(template.slug)}
              className="no-underline hover:no-underline"
              aria-label={`Criar convite ${template.name}`}
            >
              Criar convite <span aria-hidden>→</span>
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </article>
  )
}
