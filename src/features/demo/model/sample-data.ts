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

const SAMPLE_BY_SLUG: Record<string, DemoInviteData> = {
  azul: {
    ...BASE_SAMPLE,
    template: 'blue',
    groomName: 'Fernando',
    brideName: 'Marina',
    weddingDateIso: '2026-02-12T12:00:00-03:00',
    images: [
      {
        filename:
          'https://www.guiadecasamento.com.br/blog/wp-content/uploads/2014/01/noivos-roupa-festa-casamento.jpg',
        type: 'hero',
      },
    ],
  },
  dourado: {
    ...BASE_SAMPLE,
    template: 'golden',
    groomName: 'Rennan',
    brideName: 'Bárbara',
    weddingDateIso: '2026-02-12T12:00:00-03:00',
  },
  garden: {
    ...BASE_SAMPLE,
    template: 'garden',
  },
  romantic: {
    ...BASE_SAMPLE,
    template: 'romantic',
    images: [
      { filename: '/placeholder.svg?height=800&width=600', type: 'hero' },
      { filename: '/placeholder.svg?height=400&width=400', type: 'groom' },
      { filename: '/placeholder.svg?height=400&width=400', type: 'bride' },
      { filename: '/placeholder.svg?height=400&width=400', type: 'gallery' },
    ],
  },
}

export function getSampleDataBySlug(slug: string): DemoInviteData | null {
  if (!HOME_CATALOG.some((entry) => entry.slug === slug)) {
    return null
  }

  return SAMPLE_BY_SLUG[slug] ?? null
}
