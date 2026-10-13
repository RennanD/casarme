import { MapPin, MessageCircle, type LucideIcon } from 'lucide-react'

import { HOME_BENEFIT_STRIP } from '@/src/features/home/model/copy'

const BENEFIT_ICONS: Record<(typeof HOME_BENEFIT_STRIP)[number]['iconKey'], LucideIcon> = {
  'map-pin': MapPin,
  'message-circle': MessageCircle,
}

export function BenefitStripSection() {
  return (
    <section className="bg-card px-6 py-8 sm:px-10 lg:px-16" aria-label="Recursos incluídos">
      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 md:gap-10">
        {HOME_BENEFIT_STRIP.map((benefit) => {
          const Icon = BENEFIT_ICONS[benefit.iconKey]
          return (
            <div key={benefit.title} className="flex items-center gap-3">
              <Icon className="size-6 shrink-0 text-primary" aria-hidden />
              <p className="text-sm leading-6 sm:text-base">
                <span className="font-semibold">{benefit.title}</span>
                <span className="block text-muted-foreground">{benefit.description}</span>
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
