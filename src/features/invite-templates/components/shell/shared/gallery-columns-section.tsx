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

export function GalleryColumnsSection({
  galleryPhotos,
  theme,
  sectionLabel = 'Galeria',
}: GalleryColumnsSectionProps) {
  if (galleryPhotos.length === 0) return null

  const leftColumnPhotos = galleryPhotos.filter((_, index) => index % 2 === 0)
  const rightColumnPhotos = galleryPhotos.filter((_, index) => index % 2 === 1)

  return (
    <section
      className="flex flex-col items-center gap-4 px-4 pb-7 pt-8"
      style={{ backgroundColor: theme.surface }}
    >
      <SectionMarker theme={theme}>{sectionLabel}</SectionMarker>
      <Carousel className="w-full" opts={{ align: 'start', loop: false }}>
        <CarouselContent className="-ml-2">
          <CarouselItem className="basis-full pl-2">
            <div className="flex w-full justify-center gap-2.5">
              <div className="flex w-[175px] flex-col gap-2.5">
                {leftColumnPhotos.map((photo, index) => (
                  <div
                    key={`left-${index}`}
                    className="relative h-[280px] w-full overflow-hidden rounded-xl border-2 bg-white p-1.5"
                    style={{ borderColor: theme.accentLight }}
                  >
                    <div className="relative size-full overflow-hidden rounded-lg">
                      <Image
                        src={photo || '/placeholder.svg?height=560&width=350'}
                        alt={`Galeria ${index * 2 + 1}`}
                        fill
                        className="object-cover outline outline-1 -outline-offset-1 outline-black/10"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex w-[175px] flex-col gap-2.5 pt-14">
                {rightColumnPhotos.map((photo, index) => (
                  <div
                    key={`right-${index}`}
                    className="relative h-[280px] w-full overflow-hidden rounded-xl border-2 bg-white p-1.5"
                    style={{ borderColor: theme.accentLight }}
                  >
                    <div className="relative size-full overflow-hidden rounded-lg">
                      <Image
                        src={photo || '/placeholder.svg?height=560&width=350'}
                        alt={`Galeria ${index * 2 + 2}`}
                        fill
                        className="object-cover outline outline-1 -outline-offset-1 outline-black/10"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
        {galleryPhotos.length > 2 && (
          <>
            <CarouselPrevious
              className="left-1 border bg-white/90 hover:bg-white"
              style={{ color: theme.accent, borderColor: theme.accentLight }}
            />
            <CarouselNext
              className="right-1 border bg-white/90 hover:bg-white"
              style={{ color: theme.accent, borderColor: theme.accentLight }}
            />
          </>
        )}
      </Carousel>
    </section>
  )
}
