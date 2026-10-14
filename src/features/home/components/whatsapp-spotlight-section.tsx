import Image from 'next/image'
import { Calendar, CheckCircle2, MessageCircle, type LucideIcon } from 'lucide-react'

import { HOME_ANCHORS } from '@/src/features/home/model/anchors'
import {
  HOME_WHATSAPP_SECTION,
  type HomeWhatsappBenefit,
} from '@/src/features/home/model/copy'
import { Button, Link } from '@/src/shared/ui'

const BENEFIT_ICONS: Record<HomeWhatsappBenefit['iconKey'], LucideIcon> = {
  'check-circle': CheckCircle2,
  calendar: Calendar,
  'message-circle': MessageCircle,
}

export function WhatsappSpotlightSection() {
  const templatesHref = `#${HOME_ANCHORS.templates}`

  return (
    <section
      className="bg-background px-4 py-16 sm:py-24"
      aria-labelledby="whatsapp-title"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="space-y-8">
          <div className="space-y-4">
            <div
              className="bg-primary/15 text-primary inline-flex size-14 items-center justify-center rounded-full"
              aria-hidden
            >
              <MessageCircle className="size-7" strokeWidth={1.5} />
            </div>
            <h2 id="whatsapp-title" className="h2">
              {HOME_WHATSAPP_SECTION.title}
            </h2>
            <p className="lead">{HOME_WHATSAPP_SECTION.subtitle}</p>
          </div>

          <div className="bg-card space-y-4 rounded-2xl border p-6 shadow-sm sm:p-8">
            <h3 className="font-serif text-xl font-semibold">
              {HOME_WHATSAPP_SECTION.painHeading}
            </h3>
            <p className="body text-muted-foreground">
              {HOME_WHATSAPP_SECTION.painBody}
            </p>
          </div>

          <ul
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-3"
            aria-label="Benefícios da confirmação via WhatsApp"
          >
            {HOME_WHATSAPP_SECTION.benefits.map((benefit) => {
              const Icon = BENEFIT_ICONS[benefit.iconKey]

              return (
                <li key={benefit.title}>
                  <article className="bg-card h-full rounded-xl border p-5 shadow-sm">
                    <div className="mb-3 flex items-center gap-2">
                      <Icon
                        className="text-primary size-5 shrink-0"
                        aria-hidden
                      />
                      <h4 className="font-serif text-base font-semibold">
                        {benefit.title}
                      </h4>
                    </div>
                    <p className="body-sm text-muted-foreground">
                      {benefit.description}
                    </p>
                  </article>
                </li>
              )
            })}
          </ul>

          <div className="space-y-4">
            <p className="body text-muted-foreground">
              {HOME_WHATSAPP_SECTION.footerNote}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href={templatesHref}>
                <Button size="lg">{HOME_WHATSAPP_SECTION.primaryCtaLabel}</Button>
              </Link>
              <Link href={templatesHref}>
                <Button size="lg" variant="outline">
                  {HOME_WHATSAPP_SECTION.secondaryCtaLabel}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <figure className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl shadow-lg ring-1 ring-border/40 lg:mx-0 lg:max-w-none">
          <Image
            src={HOME_WHATSAPP_SECTION.imagePath}
            alt={HOME_WHATSAPP_SECTION.imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 80vw, 480px"
          />
        </figure>
      </div>
    </section>
  )
}
