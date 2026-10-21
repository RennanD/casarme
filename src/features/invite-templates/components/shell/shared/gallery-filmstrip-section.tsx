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

type GalleryFilmstripSectionProps = {
  galleryPhotos: (string | null)[]
  theme: ExtendedInviteTheme
  sectionLabel?: string
}

export function GalleryFilmstripSection({
  galleryPhotos,
  theme,
  sectionLabel = 'Galeria',
}: GalleryFilmstripSectionProps) {
  if (galleryPhotos.length === 0) return null

  return (
    <section
      className="flex flex-col items-center gap-4 px-0 pb-7 pt-8"
      style={{ backgroundColor: theme.surface }}
    >
      <SectionMarker theme={theme}>{sectionLabel}</SectionMarker>
      <Carousel className="w-full" opts={{ align: 'start', loop: true, containScroll: 'trimSnaps' }}>
        <CarouselContent className="-ml-2 px-4">
          {galleryPhotos.map((photo, index) => (
            <CarouselItem key={index} className="basis-[72%] pl-2 sm:basis-[60%]">
              <div className="relative h-[240px] w-full overflow-hidden rounded-xl">
                <Image
                  src={photo || '/placeholder.svg?height=480&width=640'}
                  alt={`Galeria ${index + 1}`}
                  fill
                  className="object-cover outline outline-1 -outline-offset-1 outline-black/10"
                />
                <div
                  className="absolute inset-x-0 bottom-0 px-3 py-2 text-[10px] text-white"
                  style={{
                    backgroundImage: 'linear-gradient(180deg, transparent, oklch(0 0 0 / 0.45))',
                    fontFamily: theme.fontSans,
                  }}
                >
                  {index + 1} / {galleryPhotos.length}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          className="left-3 border bg-white/90 hover:bg-white"
          style={{ color: theme.accent, borderColor: theme.accentLight }}
        />
        <CarouselNext
          className="right-3 border bg-white/90 hover:bg-white"
          style={{ color: theme.accent, borderColor: theme.accentLight }}
        />
      </Carousel>
    </section>
  )
}
