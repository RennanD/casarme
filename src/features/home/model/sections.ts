export const HOME_SECTION_ORDER = [
  'navbar',
  'hero',
  'how-it-works',
  'templates',
  'before-celebration',
  'product-demo',
  'feature-bento',
  'guest-experience',
  'permanent-purchase',
  'faq',
  'final-cta',
  'footer',
] as const

export type HomeSectionId = (typeof HOME_SECTION_ORDER)[number]
