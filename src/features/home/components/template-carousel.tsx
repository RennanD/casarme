'use client'

import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Accessibility from 'embla-carousel-accessibility'
import type { EmblaCarouselType } from 'embla-carousel'
import { ArrowLeft, ArrowRight } from 'lucide-react'

import type { CatalogTemplate } from '@/src/features/home/model/catalog'
import { useTemplateCarouselAccessibility } from '@/src/features/home/hooks/use-template-carousel-accessibility'
import { cn } from '@/src/shared/lib/cn'

import { TemplateCard } from './template-card'

type TemplateCarouselProps = {
  templates: CatalogTemplate[]
}

function usePrevNextButtons(emblaApi: EmblaCarouselType | undefined) {
  const [prevDisabled, setPrevDisabled] = useState(true)
  const [nextDisabled, setNextDisabled] = useState(true)

  const onSelect = useCallback((api: EmblaCarouselType) => {
    setPrevDisabled(!api.canGoToPrev())
    setNextDisabled(!api.canGoToNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onSelect(emblaApi)
    emblaApi.on('reinit', onSelect).on('select', onSelect)

    return () => {
      emblaApi.off('reinit', onSelect).off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  return {
    prevDisabled,
    nextDisabled,
    onPrev: () => emblaApi?.goToPrev(),
    onNext: () => emblaApi?.goToNext(),
  }
}

function useDotButtons(emblaApi: EmblaCarouselType | undefined) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const onInit = useCallback((api: EmblaCarouselType) => {
    setScrollSnaps(api.snapList())
  }, [])

  const onSelect = useCallback((api: EmblaCarouselType) => {
    setSelectedIndex(api.selectedSnap())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onInit(emblaApi)
    onSelect(emblaApi)
    emblaApi.on('reinit', onInit).on('reinit', onSelect).on('select', onSelect)

    return () => {
      emblaApi.off('reinit', onInit).off('reinit', onSelect).off('select', onSelect)
    }
  }, [emblaApi, onInit, onSelect])

  return {
    selectedIndex,
    scrollSnaps,
    onDotClick: (index: number) => emblaApi?.goTo(index),
  }
}

const buttonPressClass =
  'transition-[transform,opacity] duration-150 ease-out motion-safe:enabled:active:scale-[0.96] [-webkit-tap-highlight-color:transparent]'

export function TemplateCarousel({ templates }: TemplateCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { align: 'start', containScroll: 'trimSnaps' },
    [
      Accessibility({
        announceChanges: true,
        rootNode: (emblaRoot) => emblaRoot.parentElement,
        carouselAriaLabel: 'Modelos de convite',
        previousButtonAriaLabel: 'Modelo anterior',
        nextButtonAriaLabel: 'Próximo modelo',
        slideAriaLabel: (_grouped, firstIndex, _lastIndex, total) =>
          `Modelo ${firstIndex + 1} de ${total}`,
        dotButtonAriaLabel: (_grouped, firstIndex, _lastIndex, total) =>
          `Ir para modelo ${firstIndex + 1} de ${total}`,
        liveRegionContent: (_grouped, firstIndex, _lastIndex, total) =>
          `Mostrando modelo ${firstIndex + 1} de ${total}`,
      }),
    ],
  )

  useTemplateCarouselAccessibility(emblaApi)

  const { prevDisabled, nextDisabled, onPrev, onNext } = usePrevNextButtons(emblaApi)
  const { selectedIndex, scrollSnaps, onDotClick } = useDotButtons(emblaApi)

  return (
    <div
      className={cn(
        'embla mx-auto w-full max-w-7xl py-6 lg:py-10',
        '[--slide-size:70%] [--slide-spacing:1rem]',
        'lg:[--slide-size:40%] lg:[--slide-spacing:1.5rem]',
      )}
    >
      <div className="overflow-hidden px-1 py-3 sm:px-2 sm:py-4 lg:px-3 lg:py-5" ref={emblaRef}>
        <div className="-ml-[var(--slide-spacing)] flex items-stretch touch-pan-y touch-pinch-zoom">
          {templates.map((template) => (
            <div
              key={template.id}
              className="flex min-w-0 flex-[0_0_var(--slide-size)] flex-col transform-gpu pl-[var(--slide-spacing)]"
            >
              <div className="flex h-full flex-1 flex-col px-1 py-1 sm:px-1.5 sm:py-1.5">
                <TemplateCard template={template} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-7 grid grid-cols-[auto_1fr] items-center gap-3">
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            className={cn(
              'embla__button embla__button--prev',
              'inline-flex size-9 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-sm',
              'disabled:cursor-not-allowed disabled:opacity-40',
              buttonPressClass,
            )}
            onClick={onPrev}
            disabled={prevDisabled}
          >
            <ArrowLeft className="size-4" aria-hidden />
          </button>
          <button
            type="button"
            className={cn(
              'embla__button embla__button--next',
              'inline-flex size-9 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-sm',
              'disabled:cursor-not-allowed disabled:opacity-40',
              buttonPressClass,
            )}
            onClick={onNext}
            disabled={nextDisabled}
          >
            <ArrowRight className="size-4" aria-hidden />
          </button>
        </div>

        <div className="embla__dots flex flex-wrap items-center justify-end gap-1">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              type="button"
              className={cn(
                'inline-flex size-7 items-center justify-center rounded-full',
                buttonPressClass,
              )}
              onClick={() => onDotClick(index)}
            >
              <span
                className={cn(
                  'size-2 rounded-full transition-[transform,opacity] duration-150 ease-out',
                  index === selectedIndex
                    ? 'scale-110 bg-foreground'
                    : 'bg-foreground/25',
                )}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="embla__live-region sr-only" aria-live="polite" aria-atomic="true" />
    </div>
  )
}
