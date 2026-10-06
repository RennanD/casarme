export const HOME_SECTION_ORDER = [
  'navbar',
  'hero',
  'category-nav',
  'templates',
  'objection-breaker',
  'how-it-works',
  'whatsapp-spotlight',
  'why-choose',
  'testimonials',
  'final-cta',
  'footer',
] as const

export type HomeSectionId = (typeof HOME_SECTION_ORDER)[number]
