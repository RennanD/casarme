export const HOME_ANCHORS = {
  navigation: 'navigation',
  mainContent: 'main-content',
  home: 'home',
  templates: 'templates',
  howItWorks: 'como-funciona',
  demo: 'demonstracao',
  guestExperience: 'experiencia-convidados',
  faq: 'duvidas',
  whyChoose: 'por-que-escolher',
} as const

export type HomeAnchor = (typeof HOME_ANCHORS)[keyof typeof HOME_ANCHORS]

export const NAVBAR_ANCHOR_TARGETS = {
  home: HOME_ANCHORS.home,
  howItWorks: HOME_ANCHORS.howItWorks,
  templates: HOME_ANCHORS.templates,
  demo: HOME_ANCHORS.demo,
  faq: HOME_ANCHORS.faq,
  navigation: HOME_ANCHORS.navigation,
  mainContent: HOME_ANCHORS.mainContent,
} as const
