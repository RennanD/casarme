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

type GalleryPolaroidSectionProps = {
  galleryPhotos: (string | null)[]
  theme: ExtendedInviteTheme
  sectionLabel?: string
}

const ROTATIONS = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2', '-rotate-3', 'rotate-3']

export function GalleryPolaroidSection({
  galleryPhotos,
  theme,
  sectionLabel = 'Galeria',
}: GalleryPolaroidSectionProps) {
  if (galleryPhotos.length === 0) return null

  return (
    <section
      className="flex flex-col items-center gap-4 px-4 pb-7 pt-8"
      style={{ backgroundColor: theme.bg }}
    >
      <SectionMarker theme={theme}>{sectionLabel}</SectionMarker>
      <Carousel className="w-full" opts={{ align: 'center', loop: true }}>
        <CarouselContent className="-ml-3">
          {galleryPhotos.map((photo, index) => (
            <CarouselItem key={index} className="basis-[78%] pl-3 sm:basis-[65%]">
              <div
                className={`mx-auto w-full max-w-[260px] bg-white p-3 pb-10 shadow-[0_8px_24px_oklch(0_0_0_/_0.08)] transition-[transform] duration-150 ease-out motion-reduce:transition-none ${ROTATIONS[index % ROTATIONS.length]}`}
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <Image
                    src={photo || '/placeholder.svg?height=500&width=400'}
                    alt={`Galeria ${index + 1}`}
                    fill
                    className="object-cover outline outline-1 -outline-offset-1 outline-black/10"
                  />
                </div>
                <p
                  className="mt-3 text-center text-[11px] tracking-[0.2px]"
                  style={{ color: theme.textMuted, fontFamily: theme.fontSerif }}
                >
                  {index + 1} / {galleryPhotos.length}
                </p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          className="left-1 border bg-white/90 hover:bg-white"
          style={{ color: theme.accent, borderColor: theme.accentLight }}
        />
        <CarouselNext
          className="right-1 border bg-white/90 hover:bg-white"
          style={{ color: theme.accent, borderColor: theme.accentLight }}
        />
      </Carousel>
    </section>
  )
}
