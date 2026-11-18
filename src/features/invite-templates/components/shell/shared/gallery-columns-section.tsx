'use client'

import Image from 'next/image'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/src/components/ui/carousel'

import type { ExtendedInviteTheme } from '../../../model/themes/extended-invite-theme'
import { SectionMarker } from './section-marker'

type GalleryColumnsSectionProps = {
  galleryPhotos: (string | null)[]
  theme: ExtendedInviteTheme
  sectionLabel?: string
}

function chunkPairs(photos: (string | null)[]): (string | null)[][] {
  const pairs: (string | null)[][] = []
  for (let index = 0; index < photos.length; index += 4) {
    pairs.push(photos.slice(index, index + 4))
  }
  return pairs.length > 0 ? pairs : [photos]
}

export function GalleryColumnsSection({
  galleryPhotos,
  theme,
  sectionLabel = '08 · Galeria',
}: GalleryColumnsSectionProps) {
  if (galleryPhotos.length === 0) return null

  const pages = chunkPairs(galleryPhotos)

  return (
    <section
      className="flex flex-col items-center gap-4 px-4 pb-7 pt-8"
      style={{ backgroundColor: theme.surface }}
    >
      <SectionMarker theme={theme}>{sectionLabel}</SectionMarker>
      <Carousel
        className="w-full"
        opts={{ align: 'start', loop: false }}
        aria-roledescription="carousel"
        aria-label="Galeria de fotos do casal"
      >
        <CarouselContent className="-ml-2">
          {pages.map((pagePhotos, pageIndex) => {
            const leftColumnPhotos = pagePhotos.filter((_, index) => index % 2 === 0)
            const rightColumnPhotos = pagePhotos.filter((_, index) => index % 2 === 1)

            return (
              <CarouselItem key={pageIndex} className="basis-full pl-2">
                <div className="flex w-full justify-center gap-2.5">
                  <div className="flex w-[175px] flex-col gap-2.5">
                    {leftColumnPhotos.map((photo, index) => (
                      <div
                        key={`left-${pageIndex}-${index}`}
                        className="relative h-[280px] w-full overflow-hidden rounded-xl"
                      >
                        <Image
                          src={photo || '/placeholder.svg?height=560&width=350'}
                          alt={`Galeria ${pageIndex * 4 + index * 2 + 1}`}
                          fill
                          className="object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex w-[175px] flex-col gap-2.5 pt-14">
                    {rightColumnPhotos.map((photo, index) => (
                      <div
                        key={`right-${pageIndex}-${index}`}
                        className="relative h-[280px] w-full overflow-hidden rounded-xl"
                      >
                        <Image
                          src={photo || '/placeholder.svg?height=560&width=350'}
                          alt={`Galeria ${pageIndex * 4 + index * 2 + 2}`}
                          fill
                          className="object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>
        {pages.length > 1 && (
          <>
            <CarouselPrevious
              className="left-1 border border-transparent bg-white/90 shadow-[0_0_0_1px_oklch(0_0_0_/_0.06)] hover:bg-white"
              style={{ color: theme.accent }}
            />
            <CarouselNext
              className="right-1 border border-transparent bg-white/90 shadow-[0_0_0_1px_oklch(0_0_0_/_0.06)] hover:bg-white"
              style={{ color: theme.accent }}
            />
          </>
        )}
      </Carousel>
    </section>
  )
}
