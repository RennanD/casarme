import { FilePenLine, PanelsTopLeft, Send, type LucideIcon } from 'lucide-react'

import { HOME_ANCHORS } from '@/src/features/home/model/anchors'
import { HOME_HOW_IT_WORKS_STEPS } from '@/src/features/home/model/copy'

const STEP_ICONS: LucideIcon[] = [PanelsTopLeft, FilePenLine, Send]

export function HowItWorksSection() {
  return (
    <section
      id={HOME_ANCHORS.howItWorks}
      className="scroll-mt-20 bg-background px-6 py-8 lg:px-8 lg:py-7"
      aria-labelledby="how-it-works-title"
    >
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3 md:gap-9">
        <h2 id="how-it-works-title" className="sr-only">Como criar seu convite</h2>
        {HOME_HOW_IT_WORKS_STEPS.map((step, index) => {
          const Icon = STEP_ICONS[index]
          return (
            <article key={step.title} className="space-y-2">
              <div className="flex items-center gap-3">
                <Icon className="size-5 text-foreground" aria-hidden />
                <span className="text-xs font-semibold tracking-wide text-muted-foreground">0{index + 1}</span>
              </div>
              <h3 className="font-serif text-lg font-normal text-foreground">{step.title}</h3>
              <p className="text-xs leading-snug text-muted-foreground">{step.description}</p>
            </article>
          )
        })}
      </div>
    </section>
  )
}
