/** Image paths exported from mockup.pen frames (wyhur, TIq1g, M8JZEQ, BmNOt, adw9H). */
const SHARED_GALLERY = [
  '/images/demo/shared/gallery-01.jpg',
  '/images/demo/shared/gallery-02.jpg',
  '/images/demo/shared/gallery-03.jpg',
  '/images/demo/shared/gallery-04.jpg',
  '/images/demo/shared/gallery-05.jpg',
  '/images/demo/shared/gallery-06.jpg',
] as const

export type PencilDemoImageSet = {
  hero: string
  groom: string
  bride: string
  gallery: readonly string[]
}

export const PENCIL_DEMO_IMAGES: Record<string, PencilDemoImageSet> = {
  'verde-oliva': {
    hero: '/images/demo/verde-oliva/hero.jpg',
    groom: '/images/demo/shared/gallery-03.jpg',
    bride: '/images/demo/shared/gallery-05.jpg',
    gallery: SHARED_GALLERY,
  },
  rosa: {
    hero: '/images/demo/rosa/hero.jpg',
    groom: '/images/demo/shared/gallery-05.jpg',
    bride: '/images/demo/shared/gallery-01.jpg',
    gallery: SHARED_GALLERY,
  },
  azul: {
    hero: '/images/demo/azul/hero.jpg',
    groom: '/images/demo/shared/gallery-02.jpg',
    bride: '/images/demo/shared/gallery-05.jpg',
    gallery: SHARED_GALLERY,
  },
  dourado: {
    hero: '/images/demo/dourado/hero.jpg',
    groom: '/images/demo/shared/gallery-02.jpg',
    bride: '/images/demo/shared/gallery-05.jpg',
    gallery: SHARED_GALLERY,
  },
  terracota: {
    hero: '/images/demo/terracota/hero.jpg',
    groom: '/images/demo/shared/gallery-03.jpg',
    bride: '/images/demo/shared/gallery-01.jpg',
    gallery: SHARED_GALLERY,
  },
}

export function buildDemoImagesFromPencil(slug: string) {
  const set = PENCIL_DEMO_IMAGES[slug]
  if (!set) return []

  return [
    { filename: set.hero, type: 'hero' },
    { filename: set.groom, type: 'groom' },
    { filename: set.bride, type: 'bride' },
    ...set.gallery.map((filename) => ({ filename, type: 'gallery' as const })),
  ]
}
