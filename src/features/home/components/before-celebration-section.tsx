import { HomeImage } from '@/src/features/home/components/home-image'
import { HOME_BEFORE_CELEBRATION } from '@/src/features/home/model/copy'
import { cn } from '@/src/shared/lib/cn'
import { Link } from '@/src/shared/ui'

export function BeforeCelebrationSection() {
  return (
    <section className="bg-background py-12 lg:py-16" aria-labelledby="before-celebration-title">
      <div className="home-shell space-y-12">
        <header className="mx-auto max-w-2xl space-y-3 text-center">
          <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">{HOME_BEFORE_CELEBRATION.eyebrow}</p>
          <h2 id="before-celebration-title" className="font-serif text-3xl leading-tight font-normal text-foreground lg:text-4xl">
            {HOME_BEFORE_CELEBRATION.title}
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">{HOME_BEFORE_CELEBRATION.subtitle}</p>
        </header>

        <div className="space-y-16 lg:space-y-20">
          {HOME_BEFORE_CELEBRATION.phases.map((phase, index) => {
            const imageFirst = index % 2 === 0

            return (
              <article
                key={phase.eyebrow}
                className={cn(
                  'flex flex-col items-center gap-8 lg:gap-12',
                  imageFirst ? 'lg:flex-row' : 'lg:flex-row-reverse',
                )}
              >
                <div className="w-full min-w-0 shrink-0 space-y-4 lg:w-1/2">
                  <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">{phase.eyebrow}</p>
                  <h3 className="font-serif text-2xl leading-tight font-normal text-foreground lg:text-3xl">{phase.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{phase.description}</p>
                  {phase.eyebrow.startsWith('Antes') && (
                    <div className="shadow-elevated max-w-xs rounded-2xl border border-transparent bg-card p-4">
                      <p className="text-xs font-semibold tracking-wide text-muted-foreground">CASAMENTO DE ANA E PEDRO</p>
                      <p className="mt-1 font-serif text-sm text-foreground">Todos os detalhes, num convite só.</p>
                      <Link href="#templates" className="mt-3 text-xs text-primary">Experimente um modelo</Link>
                    </div>
                  )}
                </div>

                <figure className="relative aspect-[4/3] w-full min-w-0 shrink-0 overflow-hidden rounded-2xl lg:w-1/2">
                  <HomeImage
                    src={phase.image}
                    alt={phase.alt}
                    fill
                    className={cn('image-outline', phase.imageContain ? 'object-contain bg-secondary/40 p-4' : 'object-cover')}
                    sizes="(max-width: 1024px) 100vw, 560px"
                  />
                  {phase.caption && (
                    <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent px-4 pb-4 pt-10">
                      <span className="font-serif text-sm italic text-white">{phase.caption}</span>
                    </figcaption>
                  )}
                </figure>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
