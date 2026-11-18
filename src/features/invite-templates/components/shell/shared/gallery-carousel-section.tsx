'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/src/components/ui/carousel'

import type { ExtendedInviteTheme } from '../../../model/themes/extended-invite-theme'
import { cn } from '@/src/shared/lib/cn'

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
    <section className="flex flex-col items-center gap-3 px-0 pb-7 pt-4">
      <p
        className="text-[12px] tracking-[0.2px]"
        style={{ color: theme.textMuted, fontFamily: theme.fontSans }}
      >
        {sectionLabel.toUpperCase()}
      </p>
      <Carousel
        className="w-full"
        setApi={setApi}
        opts={{ align: 'center', loop: galleryPhotos.length > 1, containScroll: 'trimSnaps' }}
        aria-roledescription="carousel"
        aria-label="Galeria de fotos do casal"
      >
        <CarouselContent className="-ml-2">
          {galleryPhotos.map((photo, index) => (
            <CarouselItem key={index} className="basis-[55%] pl-2 sm:basis-[50%]">
              <div
                className={cn(
                  'relative mx-auto overflow-hidden rounded-xl transition-[transform,opacity] duration-300 ease-out motion-reduce:transition-none',
                  selectedIndex === index ? 'h-[210px] w-full opacity-100' : 'mt-[22px] h-[170px] w-[85%] opacity-55',
                )}
              >
                <Image
                  src={photo || '/placeholder.svg?height=420&width=400'}
                  alt={`Galeria ${index + 1}`}
                  fill
                  className="object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex items-center gap-1.5" role="tablist" aria-label="Indicadores da galeria">
        {galleryPhotos.map((_, index) => (
          <button
            key={index}
            type="button"
            role="tab"
            aria-selected={selectedIndex === index}
            aria-label={`Foto ${index + 1}`}
            onClick={() => api?.goTo(index)}
            className={cn(
              'rounded-full transition-[width,height,background-color] duration-150 ease-out motion-reduce:transition-none',
              selectedIndex === index ? 'size-2' : 'size-1.5',
            )}
            style={{
              backgroundColor: selectedIndex === index ? theme.accent : `${theme.accent}33`,
            }}
          />
        ))}
      </div>
      <p
        className="text-[12px] italic"
        style={{ color: theme.textMuted, fontFamily: theme.fontSans }}
      >
        deslize para ver mais
      </p>
    </section>
  )
}
