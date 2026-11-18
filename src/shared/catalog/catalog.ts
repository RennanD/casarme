export type PlanTier = 'Premium' | 'Pro' | 'Básico'

export type ProductLine = 'interactive' | 'site'

export type CatalogCategory = 'extended' | 'cover-photo' | 'simple'

export type CatalogTheme = 'verde-oliva' | 'rosa' | 'azul' | 'dourado' | 'terracota'

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
  category: CatalogCategory
  theme: CatalogTheme
  styleLabel: string
}

export const EXTENDED_TEMPLATE_SLUGS = [
  'verde-oliva',
  'rosa',
  'azul',
  'dourado',
  'terracota',
] as const

export type ExtendedTemplateSlug = (typeof EXTENDED_TEMPLATE_SLUGS)[number]

export function isExtendedTemplateSlug(slug: string): slug is ExtendedTemplateSlug {
  return (EXTENDED_TEMPLATE_SLUGS as readonly string[]).includes(slug)
}

export const EXTENDED_TEMPLATE_FEATURES = [
  'Design romântico com flores',
  'Contagem regressiva',
  'Fotos individuais do casal',
  'Galeria com até 6 fotos',
  'Histórias personalizadas',
  'Música de fundo (YouTube)',
  'Mapa integrado',
  'Confirmação via WhatsApp',
] as const

export const CATEGORY_LABELS: Record<CatalogCategory, string> = {
  extended: 'Convite estendido',
  'cover-photo': 'Convite com foto de capa',
  simple: 'Convite simples',
}

export const THEME_LABELS: Record<CatalogTheme, string> = {
  'verde-oliva': 'Verde oliva',
  rosa: 'Rosa',
  azul: 'Azul',
  dourado: 'Dourado',
  terracota: 'Terracota',
}

export const PRODUCT_LINE_LABELS: Record<ProductLine, string> = {
  interactive: 'Convites Digitais Interativos',
  site: 'Convites no Modelo de Site',
}

export const HOME_CATALOG: CatalogTemplate[] = [
  {
    id: 'verde-oliva',
    name: 'Verde Oliva',
    description:
      'Convite estendido botânico com elegância natural e tons de verde oliva',
    plan: 'Pro',
    displayPrice: 'R$ 76,50',
    imagePath: '/images/thumbs/verde-oliva/01.png',
    productLine: 'site',
    slug: 'verde-oliva',
    features: EXTENDED_TEMPLATE_FEATURES,
    category: 'extended',
    theme: 'verde-oliva',
    styleLabel: 'CDI Minimalista',
  },
  {
    id: 'rosa',
    name: 'Rosa Florido',
    description:
      'Convite estendido editorial romântico com flores delicadas e tipografia clássica',
    plan: 'Pro',
    displayPrice: 'R$ 76,50',
    imagePath: '/images/thumbs/rosa/01.png',
    productLine: 'site',
    slug: 'rosa',
    features: EXTENDED_TEMPLATE_FEATURES,
    category: 'extended',
    theme: 'rosa',
    styleLabel: 'Editorial Romântico',
  },
  {
    id: 'azul',
    name: 'Azul',
    description:
      'Convite estendido elegante com moldura porcelain e ilustrações florais',
    plan: 'Pro',
    displayPrice: 'R$ 76,50',
    imagePath: '/images/thumbs/azul/01.png',
    productLine: 'site',
    slug: 'azul',
    features: EXTENDED_TEMPLATE_FEATURES,
    category: 'extended',
    theme: 'azul',
    styleLabel: 'Porcelain Framed',
  },
  {
    id: 'dourado',
    name: 'Dourado',
    description:
      'Convite estendido clássico com selo dourado e tipografia refinada',
    plan: 'Pro',
    displayPrice: 'R$ 76,50',
    imagePath: '/images/thumbs/dourado/01.png',
    productLine: 'site',
    slug: 'dourado',
    features: EXTENDED_TEMPLATE_FEATURES,
    category: 'extended',
    theme: 'dourado',
    styleLabel: 'Selo Clássico',
  },
  {
    id: 'terracota',
    name: 'Terracota',
    description:
      'Convite estendido boho botânico com tons terracota e elementos naturais',
    plan: 'Pro',
    displayPrice: 'R$ 76,50',
    imagePath: '/images/thumbs/terracota/01.png',
    productLine: 'site',
    slug: 'terracota',
    features: EXTENDED_TEMPLATE_FEATURES,
    category: 'extended',
    theme: 'terracota',
    styleLabel: 'Boho Botânico',
  },
]

const LEGACY_CATALOG: CatalogTemplate[] = [
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
    features: EXTENDED_TEMPLATE_FEATURES,
    category: 'extended',
    theme: 'rosa',
    styleLabel: 'Romântico com flores',
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
    category: 'extended',
    theme: 'verde-oliva',
    styleLabel: 'Botânico clássico',
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
    slug: 'blue',
    features: [
      'Design elegante com flores',
      'Foto de capa personalizada',
      'Data, horário e endereço',
      'Mapa integrado',
      'Confirmação via WhatsApp',
      'Música de fundo (YouTube)',
    ],
    category: 'simple',
    theme: 'azul',
    styleLabel: 'Interativo floral',
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
    slug: 'golden',
    features: [
      'Design minimalista com monograma',
      'Data, horário e endereço',
      'Mapa integrado',
      'Confirmação via WhatsApp',
      'Música de fundo (YouTube)',
    ],
    category: 'simple',
    theme: 'dourado',
    styleLabel: 'Minimalista interativo',
  },
]

const ALL_CATALOG: CatalogTemplate[] = [...HOME_CATALOG, ...LEGACY_CATALOG]

export function getCatalogByProductLine(productLine: ProductLine): CatalogTemplate[] {
  return HOME_CATALOG.filter((entry) => entry.productLine === productLine)
}

export function resolveCatalogBySlug(slug: string): CatalogTemplate | null {
  return (
    HOME_CATALOG.find((entry) => entry.slug === slug) ??
    LEGACY_CATALOG.find((entry) => entry.slug === slug) ??
    null
  )
}

export function resolveCatalogById(id: string): CatalogTemplate | null {
  return ALL_CATALOG.find((entry) => entry.id === id) ?? null
}

export function getTemplateDemoHref(slug: string): string {
  return `/demo/${slug}`
}

export function getTemplateCreateHref(slug: string): string {
  return `/criar/${slug}?step=1`
}
