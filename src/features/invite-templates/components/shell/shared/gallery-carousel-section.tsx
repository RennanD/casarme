'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Autoplay from 'embla-carousel-autoplay'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/src/components/ui/carousel'

import type { ExtendedInviteTheme } from '../../../model/themes/extended-invite-theme'
import { SectionMarker } from './section-marker'

type GalleryCarouselSectionProps = {
  galleryPhotos: (string | null)[]
  theme: ExtendedInviteTheme
  sectionLabel?: string
}

export function GalleryCarouselSection({
  galleryPhotos,
  theme,
  sectionLabel = 'Galeria',
}: GalleryCarouselSectionProps) {
  const autoplayPlugin = useRef(
    Autoplay({ delay: 3500, stopOnInteraction: true } as Parameters<typeof Autoplay>[0]),
  )

  if (galleryPhotos.length === 0) return null

  return (
    <section
      className="flex flex-col items-center gap-4 px-4 pb-7 pt-8"
      style={{ backgroundColor: theme.surface }}
    >
      <SectionMarker theme={theme}>{sectionLabel}</SectionMarker>
      <div className="relative h-[420px] w-full overflow-hidden rounded-2xl">
        <Carousel
          className="size-full"
          plugins={[autoplayPlugin.current]}
          opts={{ loop: true }}
          onMouseEnter={autoplayPlugin.current.stop}
          onMouseLeave={autoplayPlugin.current.reset}
        >
          <CarouselContent className="h-full">
            {galleryPhotos.map((photo, index) => (
              <CarouselItem key={index} className="h-full">
                <div className="relative size-full">
                  <Image
                    src={photo || '/placeholder.svg?height=840&width=780'}
                    alt={`Galeria ${index + 1}`}
                    fill
                    className="object-cover outline outline-1 -outline-offset-1 outline-black/10"
                  />
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
      </div>
    </section>
  )
}
