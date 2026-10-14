import { DollarSign, Heart, MapPin, Sparkles, type LucideIcon } from 'lucide-react'

import { HOME_ANCHORS } from '@/src/features/home/model/anchors'
import {
  HOME_BENEFITS,
  HOME_WHY_CHOOSE_SECTION,
  type HomeBenefit,
} from '@/src/features/home/model/copy'

const BENEFIT_ICONS: Record<HomeBenefit['iconKey'], LucideIcon> = {
  sparkles: Sparkles,
  'dollar-sign': DollarSign,
  'map-pin': MapPin,
  heart: Heart,
}

export function WhyChooseSection() {
  return (
    <section
      id={HOME_ANCHORS.whyChoose}
      className="scroll-mt-20 bg-background px-4 py-16 sm:py-24"
      aria-labelledby="why-choose-title"
    >
      <div className="mx-auto max-w-6xl">
        <h2 id="why-choose-title" className="h2 mb-12 text-center md:mb-16">
          {HOME_WHY_CHOOSE_SECTION.title}
        </h2>

        <div
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          role="list"
          aria-label="Vantagens do CasarMe"
        >
          {HOME_BENEFITS.map((benefit) => {
            const Icon = BENEFIT_ICONS[benefit.iconKey]

            return (
              <article
                key={benefit.title}
                role="listitem"
                className="hover:bg-secondary/60 flex gap-5 rounded-2xl p-6 transition-colors motion-reduce:transition-none"
              >
                <div
                  className="bg-secondary text-primary flex size-14 shrink-0 items-center justify-center rounded-full"
                  aria-hidden
                >
                  <Icon className="size-7" strokeWidth={1.5} />
                </div>
                <div className="space-y-2">
                  <h3 className="font-serif text-xl font-semibold">
                    {benefit.title}
                  </h3>
                  <p className="body text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
