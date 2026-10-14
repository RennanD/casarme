import { HomeImage } from '@/src/features/home/components/home-image'
import {
  BadgeCheck,
  BookOpen,
  Clock,
  ImageIcon,
  MapPin,
  MessageCircle,
  Music,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'

import { HomeIconBadge } from '@/src/features/home/components/home-icon-badge'
import {
  getTemplateCreateHref,
  getTemplateDemoHref,
  type CatalogTemplate,
} from '@/src/features/home/model/catalog'
import { Button, Card, CardFooter, CardHeader, CardTitle, Link } from '@/src/shared/ui'

type TemplateCardProps = {
  template: CatalogTemplate
}

function getFeatureIcon(feature: string): LucideIcon {
  const label = feature.toLowerCase()

  if (label.includes('música') || label.includes('youtube')) return Music
  if (label.includes('mapa')) return MapPin
  if (label.includes('whatsapp')) return MessageCircle
  if (label.includes('galeria') || label.includes('foto')) return ImageIcon
  if (label.includes('contagem')) return Clock
  if (label.includes('história') || label.includes('mensagem')) return BookOpen
  if (label.includes('design')) return Sparkles

  return BadgeCheck
}

export function TemplateCard({ template }: TemplateCardProps) {
  return (
    <article className="flex h-full min-h-[36rem] flex-1 flex-col lg:min-h-[28rem]">
      <Card className="shadow-elevated flex h-full flex-1 flex-col gap-4 overflow-hidden rounded-2xl border border-transparent bg-card p-5 sm:p-6 lg:gap-3 lg:p-4">
        <figure className="relative h-72 shrink-0 overflow-hidden rounded-xl bg-secondary/80 p-3 lg:h-48">
          <HomeImage
            src={template.imagePath}
            alt={`Prévia do convite ${template.name}`}
            fill
            className="image-outline object-contain"
            loading="lazy"
            sizes="(max-width: 1024px) 70vw, 480px"
          />
        </figure>

        <CardHeader className="gap-2 px-0 pt-0 pb-0">
          <CardTitle className="font-serif text-xl font-normal lg:text-lg">{template.name}</CardTitle>
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <p className="font-serif text-2xl font-normal tabular-nums tracking-tight text-foreground lg:text-xl">
              {template.displayPrice}
            </p>
            <span className="text-xs text-muted-foreground">pagamento único</span>
          </div>
        </CardHeader>

        <ul
          className="flex min-h-0 flex-1 flex-col gap-2.5 sm:grid sm:grid-cols-2 sm:gap-x-3 sm:gap-y-2.5"
          aria-label={`Recursos do convite ${template.name}`}
        >
          {template.features.map((feature) => {
            const Icon = getFeatureIcon(feature)

            return (
              <li
                key={feature}
                className="flex items-start gap-2.5 text-xs leading-relaxed text-muted-foreground"
              >
                <HomeIconBadge icon={Icon} className="mt-0.5" />
                <span className="pt-0.5">{feature}</span>
              </li>
            )
          })}
        </ul>

        <CardFooter className="mt-auto shrink-0 grid grid-cols-1 gap-2 px-0 pb-0 pt-2 sm:grid-cols-2">
          <Button variant="outline" asChild className="h-9 w-full rounded-full px-2 text-xs sm:w-auto">
            <Link
              href={getTemplateDemoHref(template.slug)}
              className="no-underline hover:no-underline"
              aria-label={`Ver demonstração do convite ${template.name}`}
            >
              Ver demonstração
            </Link>
          </Button>
          <Button asChild className="h-9 w-full rounded-full px-2 text-xs sm:w-auto">
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
