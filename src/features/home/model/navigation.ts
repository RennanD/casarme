import { HOME_ANCHORS } from './anchors'

export type NavSectionLink = {
  label: string
  anchorId: (typeof HOME_ANCHORS)[keyof typeof HOME_ANCHORS]
}

export const NAV_SECTION_LINKS: NavSectionLink[] = [
  { label: 'Modelos', anchorId: HOME_ANCHORS.templates },
  { label: 'Como funciona', anchorId: HOME_ANCHORS.howItWorks },
  { label: 'Dúvidas', anchorId: HOME_ANCHORS.faq },
]

export const GODPARENT_INVITE_PATH = '/convite-padrinhos'

export const NAVBAR_CTA_LABEL = 'Criar meu convite'
