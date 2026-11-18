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

import { ROMANTIC_THEME } from '../../../model/themes/romantic-theme'

type RomanticGallerySectionProps = {
  galleryPhotos: (string | null)[]
}

export function RomanticGallerySection({ galleryPhotos }: RomanticGallerySectionProps) {
  const autoplayPlugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true } as Parameters<typeof Autoplay>[0]),
  )

  if (galleryPhotos.length === 0) return null

  return (
    <section className="relative h-[60vh] overflow-hidden">
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
                  src={photo || '/placeholder.svg?height=800&width=1600&query=romantic couple wedding photo'}
                  alt={`Galeria ${index + 1}`}
                  width={1600}
                  height={800}
                  className="size-full object-cover"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t via-transparent to-transparent"
                  style={{
                    backgroundImage: `linear-gradient(to top, ${ROMANTIC_THEME.bg}, transparent, transparent)`,
                  }}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          className="left-4 border bg-white/80 hover:bg-white"
          style={{ color: ROMANTIC_THEME.accent, borderColor: ROMANTIC_THEME.accent }}
        />
        <CarouselNext
          className="right-4 border bg-white/80 hover:bg-white"
          style={{ color: ROMANTIC_THEME.accent, borderColor: ROMANTIC_THEME.accent }}
        />
      </Carousel>
    </section>
  )
}
