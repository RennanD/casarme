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

type GalleryMosaicSectionProps = {
  galleryPhotos: (string | null)[]
  theme: ExtendedInviteTheme
}

function chunkMosaic(photos: (string | null)[]): (string | null)[][] {
  const groups: (string | null)[][] = []
  for (let index = 0; index < photos.length; index += 6) {
    groups.push(photos.slice(index, index + 6))
  }
  return groups.length > 0 ? groups : [photos]
}

export function GalleryMosaicSection({ galleryPhotos, theme }: GalleryMosaicSectionProps) {
  if (galleryPhotos.length === 0) return null

  const groups = chunkMosaic(galleryPhotos)

  return (
    <section
      className="flex flex-col gap-2.5 px-3.5 py-6"
      style={{ backgroundColor: theme.surface }}
    >
      <p
        className="w-full text-center text-[8px] tracking-[0.18px]"
        style={{ color: theme.textMuted, fontFamily: theme.fontSans }}
      >
        GALERIA · BENTO
      </p>
      <Carousel
        className="w-full"
        opts={{ loop: groups.length > 1 }}
        aria-roledescription="carousel"
        aria-label="Galeria mosaico do casal"
      >
        <CarouselContent>
          {groups.map((group, groupIndex) => (
            <CarouselItem key={groupIndex}>
              <div className="flex flex-col gap-2">
                {group[0] && (
                  <div className="relative h-[110px] w-full overflow-hidden">
                    <Image
                      src={group[0]}
                      alt={`Galeria ${groupIndex * 6 + 1}`}
                      fill
                      className="object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
                    />
                  </div>
                )}
                <div className="flex gap-2">
                  {group.slice(1, 3).map((photo, index) => (
                    <div key={index} className="relative h-[120px] flex-1 overflow-hidden">
                      <Image
                        src={photo || '/placeholder.svg?height=240&width=320'}
                        alt={`Galeria ${groupIndex * 6 + index + 2}`}
                        fill
                        className="object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex gap-1.5">
                  {group.slice(3, 6).map((photo, index) => (
                    <div key={index} className="relative h-[88px] flex-1 overflow-hidden">
                      <Image
                        src={photo || '/placeholder.svg?height=176&width=230'}
                        alt={`Galeria ${groupIndex * 6 + index + 4}`}
                        fill
                        className="object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {groups.length > 1 && (
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
