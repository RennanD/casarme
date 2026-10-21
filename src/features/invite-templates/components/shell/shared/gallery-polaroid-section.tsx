'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/src/components/ui/carousel'

import type { ExtendedInviteTheme } from '../../../model/themes/extended-invite-theme'

type GalleryPolaroidSectionProps = {
  galleryPhotos: (string | null)[]
  theme: ExtendedInviteTheme
  sectionLabel?: string
}

const STACK_ROTATIONS = ['rotate-[8deg]', '-rotate-[4deg]', 'rotate-[3deg]']
const STACK_OFFSETS = [
  'left-[5%] top-[15%] z-0',
  'left-[28%] top-[8%] z-10',
  'left-[50%] top-[21%] z-20',
]

export function GalleryPolaroidSection({
  galleryPhotos,
  theme,
  sectionLabel = 'Galeria',
}: GalleryPolaroidSectionProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [selectedIndex, setSelectedIndex] = useState(0)

  const onSelect = useCallback(() => {
    if (!api) return
    setSelectedIndex(api.selectedSnap)
  }, [api])

  useEffect(() => {
    if (!api) return
    onSelect()
    api.on('select', onSelect)
    return () => {
      api.off('select', onSelect)
    }
  }, [api, onSelect])

  if (galleryPhotos.length === 0) return null

  return (
    <section
      className="flex flex-col items-center gap-4 px-5 pb-7 pt-7"
      style={{ backgroundColor: theme.surface }}
    >
      <p
        className="text-[12px] tracking-[0.18px]"
        style={{ color: theme.textMuted, fontFamily: theme.fontSans }}
      >
        GALERIA · POLAROIDS
      </p>

      <Carousel
        className="w-full"
        setApi={setApi}
        opts={{ loop: true }}
        aria-roledescription="carousel"
        aria-label="Galeria polaroid do casal"
      >
        <CarouselContent>
          {galleryPhotos.map((photo, index) => (
            <CarouselItem key={index}>
              <div className="relative mx-auto h-[260px] w-full max-w-[320px]">
                {STACK_OFFSETS.map((offset, stackIndex) => {
                  const photoIndex = (index + stackIndex) % galleryPhotos.length
                  const stackPhoto = galleryPhotos[photoIndex]
                  return (
                    <div
                      key={stackIndex}
                      className={`absolute w-[140px] bg-white p-2 pb-4 shadow-[0_8px_24px_oklch(0_0_0_/_0.08)] transition-[transform,opacity] duration-300 ease-out motion-reduce:transition-none ${offset} ${STACK_ROTATIONS[stackIndex]}`}
                    >
                      <div className="relative aspect-[124/130] w-full overflow-hidden">
                        <Image
                          src={stackPhoto || '/placeholder.svg?height=260&width=248'}
                          alt={`Galeria ${photoIndex + 1}`}
                          fill
                          className="object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
                        />
                      </div>
                      {stackIndex === 2 && (
                        <p
                          className="mt-2 text-center text-[14px]"
                          style={{ color: theme.textMuted, fontFamily: theme.fontSerif }}
                        >
                          {photoIndex + 1} / {galleryPhotos.length}
                        </p>
                      )}
                    </div>
                  )
                })}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => api?.goToPrev()}
          aria-label="Foto anterior"
          className="transition-opacity duration-150 ease-out hover:opacity-80 motion-reduce:transition-none"
          style={{ color: theme.accent }}
        >
          <ChevronLeft className="size-4" strokeWidth={1.75} />
        </button>
        <span
          className="text-[15px]"
          style={{ color: theme.textMuted, fontFamily: theme.fontSans }}
          aria-live="polite"
        >
          {selectedIndex + 1} / {galleryPhotos.length}
        </span>
        <button
          type="button"
          onClick={() => api?.goToNext()}
          aria-label="Próxima foto"
          className="transition-opacity duration-150 ease-out hover:opacity-80 motion-reduce:transition-none"
          style={{ color: theme.accent }}
        >
          <ChevronRight className="size-4" strokeWidth={1.75} />
        </button>
      </div>
    </section>
  )
}
