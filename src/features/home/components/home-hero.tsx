import { HOME_ANCHORS } from '@/src/features/home/model/anchors'
import { HOME_HERO } from '@/src/features/home/model/copy'
import { HomeHeroCollage } from '@/src/features/home/components/home-hero-collage'
import { getTemplateDemoHref } from '@/src/shared/catalog'
import { Button, Link } from '@/src/shared/ui'

export function HomeHero() {
  return (
    <section
      id={HOME_ANCHORS.home}
      aria-labelledby="hero-title"
      className="scroll-mt-20 bg-background py-14 lg:py-20"
    >
      <div className="home-shell flex flex-col items-center justify-between gap-10 lg:flex-row lg:items-center">
        <div className="w-full max-w-2xl space-y-5 text-center lg:text-left">
          <p className="home-enter home-enter-delay-0 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            {HOME_HERO.eyebrow}
          </p>
          <h1
            id="hero-title"
            className="home-enter home-enter-delay-1 font-serif text-5xl leading-[1.1] font-normal tracking-tight text-foreground sm:text-6xl lg:text-[4.5rem] lg:leading-[1.08]"
          >
            {HOME_HERO.headlineLine1}
            <br />
            <span className="text-primary">{HOME_HERO.headlineLine2}</span>
          </h1>
          <p className="home-enter home-enter-delay-2 mx-auto max-w-md text-base leading-relaxed text-muted-foreground lg:mx-0">
            {HOME_HERO.body}
          </p>
          <div className="home-enter home-enter-delay-3 flex flex-col items-center gap-3 sm:flex-row lg:items-start">
            <Button asChild className="h-auto w-full rounded-full px-6 py-3.5 text-sm sm:w-auto">
              <Link href={`#${HOME_ANCHORS.templates}`}>{HOME_HERO.ctaLabel}</Link>
            </Button>
          </div>
          <p className="home-enter home-enter-delay-3 text-xs text-muted-foreground">{HOME_HERO.note}</p>
        </div>

        <HomeHeroCollage />
      </div>
    </section>
  )
}
