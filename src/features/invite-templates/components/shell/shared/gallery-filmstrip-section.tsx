'use client'

import Image from 'next/image'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/src/components/ui/carousel'

import type { ExtendedInviteTheme } from '../../../model/themes/extended-invite-theme'

type GalleryFilmstripSectionProps = {
  galleryPhotos: (string | null)[]
  theme: ExtendedInviteTheme
}

export function GalleryFilmstripSection({
  galleryPhotos,
  theme,
}: GalleryFilmstripSectionProps) {
  if (galleryPhotos.length === 0) return null

  return (
    <section className="flex flex-col gap-2.5 bg-white pb-7 pt-6">
      <p
        className="text-center text-[23px]"
        style={{ color: theme.accent, fontFamily: theme.fontSerif }}
      >
        Galeria · filmstrip
      </p>
      <div className="relative h-[180px] w-full overflow-hidden">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12"
          style={{
            backgroundImage: `linear-gradient(90deg, ${theme.surface} 0%, transparent 100%)`,
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12"
          style={{
            backgroundImage: `linear-gradient(270deg, #FFFFFF 0%, transparent 100%)`,
          }}
          aria-hidden
        />
        <Carousel
          className="size-full"
          opts={{ align: 'start', loop: true, dragFree: true }}
          aria-roledescription="carousel"
          aria-label="Galeria filmstrip do casal"
        >
          <CarouselContent className="-ml-3 px-3">
            {galleryPhotos.map((photo, index) => (
              <CarouselItem key={index} className="basis-[38%] pl-3 sm:basis-[34%]">
                <div className="relative h-[160px] w-full overflow-hidden rounded-[10px]">
                  <Image
                    src={photo || '/placeholder.svg?height=320&width=272'}
                    alt={`Galeria ${index + 1}`}
                    fill
                    className="object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  )
}
