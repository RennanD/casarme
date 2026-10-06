import Image from 'next/image'
import { FileText, Palette, Sparkles, type LucideIcon } from 'lucide-react'

import { HOME_ANCHORS } from '@/src/features/home/model/anchors'
import {
  HOME_HOW_IT_WORKS_SECTION,
  HOME_HOW_IT_WORKS_STEPS,
  type HomeHowItWorksStep,
} from '@/src/features/home/model/copy'

const STEP_ICONS: Record<HomeHowItWorksStep['iconKey'], LucideIcon> = {
  palette: Palette,
  'file-text': FileText,
  sparkles: Sparkles,
}

export function HowItWorksSection() {
  return (
    <section
      id={HOME_ANCHORS.howItWorks}
      className="bg-secondary px-4 py-16 sm:py-24"
      aria-labelledby="how-it-works-title"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="space-y-10">
          <h2 id="how-it-works-title" className="h2">
            {HOME_HOW_IT_WORKS_SECTION.title}
          </h2>

          <ol
            className="space-y-8"
            aria-label="Passos para criar convite digital"
          >
            {HOME_HOW_IT_WORKS_STEPS.map((step, index) => {
              const Icon = STEP_ICONS[step.iconKey]

              return (
                <li key={step.title}>
                  <article className="flex gap-5">
                    <div
                      className="bg-background text-primary flex size-16 shrink-0 items-center justify-center rounded-full"
                      aria-hidden
                    >
                      <Icon className="size-8" strokeWidth={1.5} />
                    </div>
                    <div className="space-y-2 pt-1">
                      <h3 className="font-serif text-xl font-semibold">
                        <span className="sr-only">Passo {index + 1}: </span>
                        {step.title}
                      </h3>
                      <p className="body text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </article>
                </li>
              )
            })}
          </ol>
        </div>

        <figure className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl shadow-lg ring-1 ring-border/40 lg:mx-0 lg:max-w-none">
          <Image
            src={HOME_HOW_IT_WORKS_SECTION.imagePath}
            alt={HOME_HOW_IT_WORKS_SECTION.imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 80vw, 480px"
          />
        </figure>
      </div>
    </section>
  )
}
