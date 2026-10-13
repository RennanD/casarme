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
      className="bg-secondary px-4 py-16 sm:py-24"
      aria-labelledby="objection-title"
    >
      <div className="mx-auto max-w-6xl space-y-10">
        <h2 id="objection-title" className="h2 text-center">
          {HOME_OBJECTION_SECTION.title}
        </h2>

        <div
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0"
          role="list"
          aria-label="Objeções comuns e soluções"
        >
          {HOME_OBJECTIONS.map((objection) => (
            <article
              key={objection.problem}
              role="listitem"
              className="w-[85vw] shrink-0 snap-start sm:w-[320px] lg:w-auto"
            >
              <Card className="h-full border-none bg-card py-0 shadow-md transition-shadow hover:shadow-lg motion-reduce:transition-none">
                <CardContent className="space-y-4 p-5">
                  <div className="space-y-2">
                    <p className="body-sm text-destructive font-medium">
                      &ldquo;{objection.problem}&rdquo;
                    </p>
                    <p className="muted">{objection.problemDescription}</p>
                  </div>

                  <div className="border-border space-y-2 border-t pt-4">
                    <p className="body-sm text-primary font-semibold">
                      {HOME_OBJECTION_SECTION.solutionLabel}
                    </p>
                    <p className="body-sm">{objection.solution}</p>
                  </div>
                </CardContent>
              </Card>
            </article>
          ))}
        </div>

        <div className="space-y-6 text-center">
          <p className="font-serif text-2xl font-bold">
            {HOME_OBJECTION_SECTION.ctaHeading}
          </p>
          <Link href={templatesHref}>
            <Button size="lg">{HOME_OBJECTION_SECTION.ctaLabel}</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
