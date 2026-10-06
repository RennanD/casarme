import { HOME_ANCHORS } from '@/src/features/home/model/anchors'
import {
  HOME_OBJECTION_SECTION,
  HOME_OBJECTIONS,
} from '@/src/features/home/model/copy'
import { Button, Link } from '@/src/shared/ui'

export function ObjectionBreakerSection() {
  const templatesHref = `#${HOME_ANCHORS.templates}`

  return (
    <section
      className="bg-secondary px-4 py-16 sm:py-24"
      aria-labelledby="objection-title"
    >
      <div className="mx-auto max-w-6xl">
        <h2 id="objection-title" className="h2 mb-12 text-center md:mb-16">
          {HOME_OBJECTION_SECTION.title}
        </h2>

        <div
          className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12"
          role="list"
          aria-label="Objeções comuns e soluções"
        >
          {HOME_OBJECTIONS.map((objection) => (
            <article
              key={objection.problem}
              role="listitem"
              className="bg-card rounded-2xl p-6 shadow-lg sm:p-8"
            >
              <div className="mb-6 flex items-start gap-4">
                <div
                  className="flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100"
                  aria-hidden
                >
                  <span className="text-2xl leading-none">❌</span>
                </div>
                <div>
                  <h3 className="mb-2 font-serif text-xl font-bold">
                    &ldquo;{objection.problem}&rdquo;
                  </h3>
                  <p className="body-sm text-muted-foreground">
                    {objection.problemDescription}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div
                  className="flex size-12 shrink-0 items-center justify-center rounded-full bg-green-100"
                  aria-hidden
                >
                  <span className="text-2xl leading-none">✅</span>
                </div>
                <div>
                  <p className="mb-2 font-serif text-lg font-bold">
                    {HOME_OBJECTION_SECTION.solutionLabel}
                  </p>
                  <p className="body-sm text-muted-foreground">
                    {objection.solution}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 space-y-6 text-center md:mt-16">
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
