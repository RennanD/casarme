import { HOME_ANCHORS } from './anchors'

export type NavSectionLink = {
  label: string
  anchorId: (typeof HOME_ANCHORS)[keyof typeof HOME_ANCHORS]
}

export const NAV_SECTION_LINKS: NavSectionLink[] = [
  { label: 'Home', anchorId: HOME_ANCHORS.home },
  { label: 'Como Funciona', anchorId: HOME_ANCHORS.howItWorks },
  { label: 'Modelos', anchorId: HOME_ANCHORS.templates },
  { label: 'Por que escolher', anchorId: HOME_ANCHORS.whyChoose },
]

export const GODPARENT_INVITE_PATH = '/convite-padrinhos'

export const NAVBAR_CTA_LABEL = 'Criar Meu Convite'
