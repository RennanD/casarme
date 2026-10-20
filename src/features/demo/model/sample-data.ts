import { HOME_CATALOG } from '@/src/shared/catalog'

export type DemoInviteData = {
  template: string
  groomName: string
  brideName: string
  weddingDate: string
  weddingDateIso: string
  weddingTime: string
  venueName: string
  venueAddress: string
  welcomeMessage: string
  coupleStory: string
  groomStory: string
  brideStory: string
  musicUrl: string
  whatsapp: string
  images: Array<{ filename: string; type: string }>
}

const BASE_SAMPLE = {
  groomName: 'João Silva',
  brideName: 'Maria Santos',
  weddingDate: '2025-12-20',
  weddingDateIso: '2025-12-20T16:00:00-03:00',
  weddingTime: '16:00',
  venueName: 'Igreja Nossa Senhora',
  venueAddress: 'Rua das Flores, 123 - Centro, São Paulo - SP',
  welcomeMessage:
    'Com imensa alegria, convidamos você para celebrar conosco o nosso casamento. Será uma honra compartilhar este momento especial ao seu lado!',
  coupleStory:
    'Nossa história começou em 2018, quando nos conhecemos em uma viagem. Desde então, construímos juntos momentos inesquecíveis e decidimos unir nossas vidas para sempre.',
  groomStory: 'João é engenheiro e apaixonado por viagens.',
  brideStory: 'Maria é arquiteta e adora cozinhar para a família.',
  musicUrl: 'https://www.youtube.com/watch?v=OPugs48z2GU',
  whatsapp: '5511999999999',
  images: [] as DemoInviteData['images'],
}

const EXTENDED_SAMPLE_IMAGES: DemoInviteData['images'] = [
  { filename: '/placeholder.svg?height=800&width=600', type: 'hero' },
  { filename: '/placeholder.svg?height=400&width=400', type: 'groom' },
  { filename: '/placeholder.svg?height=400&width=400', type: 'bride' },
  { filename: '/placeholder.svg?height=400&width=400', type: 'gallery' },
]

const SAMPLE_BY_SLUG: Record<string, DemoInviteData> = {
  'verde-oliva': {
    ...BASE_SAMPLE,
    template: 'verde-oliva',
    images: EXTENDED_SAMPLE_IMAGES,
  },
  rosa: {
    ...BASE_SAMPLE,
    template: 'rosa',
    images: EXTENDED_SAMPLE_IMAGES,
  },
  azul: {
    ...BASE_SAMPLE,
    template: 'azul',
    groomName: 'Fernando',
    brideName: 'Marina',
    weddingDateIso: '2026-02-12T12:00:00-03:00',
    images: EXTENDED_SAMPLE_IMAGES,
  },
  dourado: {
    ...BASE_SAMPLE,
    template: 'dourado',
    groomName: 'Rennan',
    brideName: 'Bárbara',
    weddingDateIso: '2026-02-12T12:00:00-03:00',
    images: EXTENDED_SAMPLE_IMAGES,
  },
  terracota: {
    ...BASE_SAMPLE,
    template: 'terracota',
    images: EXTENDED_SAMPLE_IMAGES,
  },
  garden: {
    ...BASE_SAMPLE,
    template: 'garden',
  },
  romantic: {
    ...BASE_SAMPLE,
    template: 'romantic',
    images: EXTENDED_SAMPLE_IMAGES,
  },
}

export function getSampleDataBySlug(slug: string): DemoInviteData | null {
  const inHomeCatalog = HOME_CATALOG.some((entry) => entry.slug === slug)
  const hasLegacySample = slug in SAMPLE_BY_SLUG

  if (!inHomeCatalog && !hasLegacySample) {
    return null
  }

  return SAMPLE_BY_SLUG[slug] ?? null
}
