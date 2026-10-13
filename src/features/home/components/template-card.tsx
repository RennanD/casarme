import Image from 'next/image'

import type { CatalogTemplate } from '@/src/features/home/model/catalog'
import { Button, Card, CardFooter, CardHeader, CardTitle, Link } from '@/src/shared/ui'

type TemplateCardProps = {
  template: CatalogTemplate
}

export function TemplateCard({ template }: TemplateCardProps) {
  return (
    <article role="listitem" className="h-full">
      <Card className="h-[420px] gap-2 overflow-hidden rounded-[21px] border-0 bg-card p-3 py-3 shadow-[0_4px_16px_#3e3e3e12]">
        <figure className="relative h-[250px] shrink-0 overflow-hidden rounded-[9px] bg-card">
          <Image
            src={template.imagePath}
            alt={`Prévia do convite ${template.name}`}
            fill
            className="object-contain"
            loading="lazy"
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
          />
        </figure>
        <CardHeader className="gap-1 px-1 pt-1 pb-0">
          <CardTitle className="font-serif text-xl font-normal">{template.name}</CardTitle>
          <p className="text-[11px] font-normal text-muted-foreground">
            {template.displayPrice} <span>· pagamento único</span>
          </p>
        </CardHeader>
        <CardFooter className="mt-auto grid grid-cols-2 gap-2 px-1 pb-1 pt-1">
          <Button variant="outline" asChild className="h-9 rounded-full px-2 text-[10px]">
            <Link href={`/exemplo/${template.slug}`} aria-label={`Ver demonstração do convite ${template.name}`}>
              Ver demonstração
            </Link>
          </Button>
          <Button asChild className="h-9 rounded-full px-2 text-[10px]">
            <Link href={`/modelo/${template.slug}`} aria-label={`Criar convite ${template.name}`}>
              Criar convite <span aria-hidden>→</span>
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </article>
  )
}
