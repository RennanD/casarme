import { HOME_ANCHORS } from '@/src/features/home/model/anchors'
import { HOME_HOW_IT_WORKS_SECTION, HOME_HOW_IT_WORKS_STEPS } from '@/src/features/home/model/copy'

export function HowItWorksSection() {
  return (
    <section
      id={HOME_ANCHORS.howItWorks}
      className="scroll-mt-20 border-t border-border/60 bg-background py-12 lg:py-14"
      aria-labelledby="how-it-works-title"
    >
      <div className="home-shell space-y-10">
        <h2 id="how-it-works-title" className="font-serif text-3xl leading-tight font-normal text-foreground">
          {HOME_HOW_IT_WORKS_SECTION.title}
        </h2>

        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          {HOME_HOW_IT_WORKS_STEPS.map((step, index) => (
            <article key={step.title} className="space-y-3">
              <p className="font-serif text-3xl leading-none text-foreground/25">0{index + 1}</p>
              <h3 className="font-serif text-xl leading-snug font-normal text-foreground">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
