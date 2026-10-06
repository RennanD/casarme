import { Check, X } from 'lucide-react'

import { HOME_ANCHORS } from '@/src/features/home/model/anchors'
import {
  HOME_OBJECTION_SECTION,
  HOME_OBJECTIONS,
} from '@/src/features/home/model/copy'
import { Button, Card, CardContent, Link } from '@/src/shared/ui'

export function ObjectionBreakerSection() {
  const templatesHref = `#${HOME_ANCHORS.templates}`

  return (
    <section
      className="bg-accent px-4 py-16 sm:py-24"
      aria-labelledby="objection-title"
    >
      <div className="mx-auto max-w-6xl space-y-16">
        <header className="mx-auto max-w-3xl text-center">
          <h2 id="objection-title" className="h2">
            {HOME_OBJECTION_SECTION.title}
          </h2>
        </header>

        <div
          className="grid grid-cols-1 gap-8 md:grid-cols-2"
          role="list"
          aria-label="Objeções comuns e soluções"
        >
          {HOME_OBJECTIONS.map((objection) => (
            <article key={objection.problem} role="listitem">
              <Card className="h-full gap-0 py-0 shadow-md">
                <CardContent className="space-y-6 p-6 sm:p-8">
                  <div className="flex items-start gap-4">
                    <div
                      className="bg-destructive/10 text-destructive flex size-12 shrink-0 items-center justify-center rounded-full"
                      aria-hidden
                    >
                      <X className="size-5" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="h3 text-lg">&ldquo;{objection.problem}&rdquo;</h3>
                      <p className="body-sm text-muted-foreground">
                        {objection.problemDescription}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div
                      className="bg-primary/10 text-primary flex size-12 shrink-0 items-center justify-center rounded-full"
                      aria-hidden
                    >
                      <Check className="size-5" />
                    </div>
                    <div className="space-y-2">
                      <p className="font-serif text-lg font-semibold">
                        Solução CasarMe:
                      </p>
                      <p className="body-sm text-muted-foreground">
                        {objection.solution}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </article>
          ))}
        </div>

        <div className="mx-auto max-w-2xl space-y-6 text-center">
          <p className="h3">{HOME_OBJECTION_SECTION.ctaHeading}</p>
          <Link href={templatesHref}>
            <Button size="lg">{HOME_OBJECTION_SECTION.ctaLabel}</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
