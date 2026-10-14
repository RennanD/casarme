'use client'

import { useEffect } from 'react'
import type { EmblaCarouselType } from 'embla-carousel'

export function useTemplateCarouselAccessibility(
  emblaApi: EmblaCarouselType | undefined,
): void {
  useEffect(() => {
    if (!emblaApi) return

    const setupAccessibility = (api: EmblaCarouselType) => {
      const accessibility = api.plugins().accessibility
      if (!accessibility) return

      accessibility.setupLiveRegion('.embla__live-region')
      accessibility.setupDotButtons('.embla__dots')
      accessibility.setupPrevAndNextButtons(
        '.embla__button--prev',
        '.embla__button--next',
      )
    }

    setupAccessibility(emblaApi)
    emblaApi.on('reinit', setupAccessibility)

    return () => {
      emblaApi.off('reinit', setupAccessibility)
    }
  }, [emblaApi])
}
