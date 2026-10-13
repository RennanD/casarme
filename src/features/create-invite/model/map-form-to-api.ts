import type { CreateInviteTemplate } from './catalog'
import type { CreateInviteFormValues } from './schemas'

const SLUG_TO_TEMPLATE_ID: Record<string, string> = {
  azul: 'blue',
  dourado: 'golden',
  garden: 'garden',
  romantic: 'romantic',
}

const INTERACTIVE_DEFAULTS = {
  venueName: 'Local da Cerimônia',
  welcomeMessage: 'Você está convidado para o nosso casamento!',
} as const

export type CreateInvitationPayload = {
  groomName: string
  brideName: string
  weddingDate: string
  weddingTime: string
  venueName: string
  venueAddress: string
  welcomeMessage: string
  coupleStory?: string
  groomStory?: string
  brideStory?: string
  musicUrl?: string
  whatsapp: string
  template: string
  email: string
  cpf: string
  isActive: false
  images?: {
    hero?: CreateInviteFormValues['images']['hero']
    groom?: CreateInviteFormValues['images']['groom']
    bride?: CreateInviteFormValues['images']['bride']
    gallery?: CreateInviteFormValues['images']['gallery']
  }
}

function parseBrazilianDateToIso(date: string, time: string): string {
  const [day, month, year] = date.split('/')
  return `${year}-${month}-${day}T${time}:00`
}

function resolveTemplateId(template: CreateInviteTemplate): string {
  return SLUG_TO_TEMPLATE_ID[template.slug] ?? template.id
}

function buildImagesPayload(
  images: CreateInviteFormValues['images'],
): CreateInvitationPayload['images'] | undefined {
  const payload: NonNullable<CreateInvitationPayload['images']> = {}

  if (images.hero) payload.hero = images.hero
  if (images.groom) payload.groom = images.groom
  if (images.bride) payload.bride = images.bride
  if (images.gallery?.length) payload.gallery = images.gallery

  return Object.keys(payload).length > 0 ? payload : undefined
}

export function mapFormToApiPayload(
  values: CreateInviteFormValues,
  template: CreateInviteTemplate,
): CreateInvitationPayload {
  const isInteractive = template.productLine === 'interactive'

  return {
    groomName: values.groomName,
    brideName: values.brideName,
    weddingDate: parseBrazilianDateToIso(values.weddingDate, values.weddingTime),
    weddingTime: values.weddingTime,
    venueName: isInteractive
      ? values.venueName?.trim() || INTERACTIVE_DEFAULTS.venueName
      : values.venueName.trim(),
    venueAddress: values.venueAddress,
    welcomeMessage: isInteractive
      ? values.welcomeMessage?.trim() || INTERACTIVE_DEFAULTS.welcomeMessage
      : values.welcomeMessage.trim(),
    coupleStory: values.coupleStory?.trim() || undefined,
    groomStory: values.groomStory?.trim() || undefined,
    brideStory: values.brideStory?.trim() || undefined,
    musicUrl: values.musicUrl?.trim() || undefined,
    whatsapp: values.whatsapp,
    template: resolveTemplateId(template),
    email: values.email,
    cpf: values.cpf,
    isActive: false,
    images: buildImagesPayload(values.images),
  }
}
