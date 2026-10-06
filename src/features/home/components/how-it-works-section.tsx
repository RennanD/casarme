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
      <div className="mx-auto max-w-6xl space-y-16">
        <header className="mx-auto max-w-3xl text-center">
          <h2 id="how-it-works-title" className="h2">
            {HOME_HOW_IT_WORKS_SECTION.title}
          </h2>
        </header>

        <ol
          className="mx-auto grid max-w-5xl grid-cols-1 gap-12 md:grid-cols-3"
          aria-label="Passos para criar convite digital"
        >
          {HOME_HOW_IT_WORKS_STEPS.map((step, index) => {
            const Icon = STEP_ICONS[step.iconKey]

            return (
              <li key={step.title} className="text-center">
                <article className="space-y-4">
                  <div
                    className="bg-background text-primary mx-auto inline-flex size-20 items-center justify-center rounded-full"
                    aria-hidden
                  >
                    <Icon className="size-10" />
                  </div>
                  <h3 className="h3">
                    <span className="sr-only">Passo {index + 1}: </span>
                    {step.title}
                  </h3>
                  <p className="body text-muted-foreground">{step.description}</p>
                </article>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
