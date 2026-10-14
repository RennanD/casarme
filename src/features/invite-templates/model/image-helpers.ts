import { getImageUrl } from '@/src/shared/lib/image-url'

import type { InviteImage, InviteTemplateData } from './types'

export function findImageByType(
  images: InviteImage[],
  type: string,
): string | null {
  const match = images.find((image) => image.type === type)
  return match ? getImageUrl(match.filename) : null
}

export function findHeroImage(data: InviteTemplateData): string {
  const hero =
    data.images.find(
      (image) => image.type === 'hero' || image.type === 'hero_slideshow',
    ) ?? null

  return hero
    ? getImageUrl(hero.filename)
    : '/placeholder.svg?height=800&width=600'
}

export function findHeroImages(data: InviteTemplateData): string[] {
  const images = data.images
    .filter((image) => image.type === 'hero_slideshow')
    .map((image) => getImageUrl(image.filename))

  return images.length > 0 ? images : ['/placeholder.svg?height=400&width=400']
}

export function findGalleryImages(data: InviteTemplateData): string[] {
  const gallery = data.images
    .filter((image) => image.type === 'gallery')
    .map((image) => getImageUrl(image.filename))

  return gallery.length > 0 ? gallery : ['/placeholder.svg?height=400&width=400']
}
