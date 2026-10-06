import Image from 'next/image'

import { HOME_ANCHORS } from '@/src/features/home/model/anchors'
import { HOME_HERO, HOME_HERO_COLLAGE } from '@/src/features/home/model/copy'
import { cn } from '@/src/shared/lib/cn'
import { Button, Link } from '@/src/shared/ui'

const COLLAGE_LAYOUT = [
  'relative z-10 aspect-[4/5] w-[58%] -rotate-3',
  'absolute top-6 left-[22%] z-20 aspect-[4/5] w-[52%] rotate-6',
  'absolute top-12 right-0 z-30 aspect-[4/5] w-[56%] -rotate-2',
] as const

export function HomeHero() {
  return (
    <section
      id={HOME_ANCHORS.home}
      aria-labelledby="hero-title"
      className="bg-background px-4 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="space-y-6 text-center lg:text-left">
          <h1 id="hero-title" className="space-y-1">
            <span className="display block">{HOME_HERO.headlineLead}</span>
            <span className="script text-primary block">
              {HOME_HERO.scriptAccent}
            </span>
            <span className="display block">{HOME_HERO.headlineTail}</span>
          </h1>
          <p className="lead mx-auto max-w-xl lg:mx-0">{HOME_HERO.subcopy}</p>
          <Link href={`#${HOME_ANCHORS.templates}`}>
            <Button size="lg">{HOME_HERO.ctaLabel}</Button>
          </Link>
        </div>

        <div
          className="relative mx-auto h-[22rem] w-full max-w-md sm:h-[26rem] lg:mx-0 lg:h-[30rem] lg:max-w-none"
          aria-label="Galeria de convites e casais"
        >
          {HOME_HERO_COLLAGE.map((image, index) => (
            <figure
              key={image.src}
              className={cn(
                'overflow-hidden rounded-xl shadow-lg ring-1 ring-border/40',
                COLLAGE_LAYOUT[index],
              )}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                priority={index === 0}
                sizes="(max-width: 768px) 60vw, 320px"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
