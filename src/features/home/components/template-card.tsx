import Image from 'next/image'

import { HOME_ANCHORS } from '@/src/features/home/model/anchors'
import type { CatalogTemplate } from '@/src/features/home/model/catalog'
import { Badge, Button, Card, CardContent, CardFooter, CardHeader, CardTitle, Link } from '@/src/shared/ui'

type TemplateCardProps = {
  template: CatalogTemplate
}

export function TemplateCard({ template }: TemplateCardProps) {
  return (
    <article role="listitem">
      <Card className="overflow-hidden py-0 transition-shadow hover:shadow-md">
        <div className="bg-secondary/40 p-3">
          <figure className="relative aspect-square overflow-hidden rounded-lg">
            <Image
              src={template.imagePath}
              alt={`Preview do modelo ${template.name}`}
              fill
              className="object-cover"
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </figure>
        </div>

        <CardHeader className="gap-3 px-4 pt-4 pb-0">
          <div className="flex items-start justify-between gap-3">
            <CardTitle className="h3">{template.name}</CardTitle>
            <Badge variant={template.plan === 'Básico' ? 'secondary' : 'default'}>
              {template.plan}
            </Badge>
          </div>
          <p className="text-primary text-2xl font-bold">{template.displayPrice}</p>
        </CardHeader>

        <CardContent className="px-4">
          <p className="body-sm text-muted-foreground line-clamp-2">{template.description}</p>
        </CardContent>

        <CardFooter className="px-4 pb-6">
          <Link
            href={`#${HOME_ANCHORS.templates}`}
            aria-label={`Escolher modelo ${template.name}`}
            className="w-full"
          >
            <Button className="w-full rounded-full" type="button">
              Escolher este modelo
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </article>
  )
}
