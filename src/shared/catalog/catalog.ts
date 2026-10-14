export type PlanTier = 'Premium' | 'Pro' | 'Básico'

export type ProductLine = 'interactive' | 'site'

export type CatalogTemplate = {
  id: string
  name: string
  description: string
  plan: PlanTier
  displayPrice: string
  imagePath: string
  productLine: ProductLine
  slug: string
  features: readonly string[]
}

export const PRODUCT_LINE_LABELS: Record<ProductLine, string> = {
  interactive: 'Convites Digitais Interativos',
  site: 'Convites no Modelo de Site',
}

export const HOME_CATALOG: CatalogTemplate[] = [
  {
    id: 'romantic',
    name: 'Romântico',
    description:
      'Modelo de convite romântico com flores, galeria de fotos e música de fundo',
    plan: 'Pro',
    displayPrice: 'R$ 76,50',
    imagePath: '/images/thumbs/romantico/01.png',
    productLine: 'site',
    slug: 'romantic',
    features: [
      'Design romântico com flores',
      'Contagem regressiva',
      'Fotos individuais do casal',
      'Galeria com até 6 fotos',
      'Histórias personalizadas',
      'Música de fundo (YouTube)',
      'Mapa integrado',
      'Confirmação via WhatsApp',
    ],
  },
  {
    id: 'garden',
    name: 'Verde Oliva',
    description:
      'Template de convite de casamento botânico com elegância natural e tons de verde oliva',
    plan: 'Básico',
    displayPrice: 'R$ 58,90',
    imagePath: '/images/thumbs/garden/01.png',
    productLine: 'site',
    slug: 'garden',
    features: [
      'Design botânico elegante',
      'Contagem regressiva',
      'Foto de capa personalizada',
      'Mensagem de boas-vindas',
      'História do casal',
      'Mapa integrado',
      'Confirmação via WhatsApp',
    ],
  },
  {
    id: 'blue',
    name: 'Azul',
    description:
      'Modelo de convite interativo e elegante com base no tom azul e ilustrações florais.',
    plan: 'Premium',
    displayPrice: 'R$ 30,90',
    imagePath: '/images/thumbs/blue/01.png',
    productLine: 'interactive',
    slug: 'azul',
    features: [
      'Design elegante com flores',
      'Foto de capa personalizada',
      'Data, horário e endereço',
      'Mapa integrado',
      'Confirmação via WhatsApp',
      'Música de fundo (YouTube)',
    ],
  },
  {
    id: 'golden',
    name: 'Dourado',
    description:
      'Modelo de convite interativo com design minimalista e foco na usabilidade mobile.',
    plan: 'Premium',
    displayPrice: 'R$ 25,90',
    imagePath: '/images/thumbs/golden/01.png',
    productLine: 'interactive',
    slug: 'dourado',
    features: [
      'Design minimalista com monograma',
      'Data, horário e endereço',
      'Mapa integrado',
      'Confirmação via WhatsApp',
      'Música de fundo (YouTube)',
    ],
  },
]

export function getCatalogByProductLine(productLine: ProductLine): CatalogTemplate[] {
  return HOME_CATALOG.filter((entry) => entry.productLine === productLine)
}

export function resolveCatalogBySlug(slug: string): CatalogTemplate | null {
  return HOME_CATALOG.find((entry) => entry.slug === slug) ?? null
}

export function resolveCatalogById(id: string): CatalogTemplate | null {
  return HOME_CATALOG.find((entry) => entry.id === id) ?? null
}

export function getTemplateDemoHref(slug: string): string {
  return `/demo/${slug}`
}

export function getTemplateCreateHref(slug: string): string {
  return `/criar/${slug}?step=1`
}
