import type { CreateInviteTemplate } from './catalog'
import type { CreateInviteFormValues } from './schemas'

export const DEFAULT_WELCOME_MESSAGE =
  'É com imensa alegria que convidamos você para celebrar conosco o nosso casamento. Este é um momento muito especial em nossas vidas e não poderíamos imaginar compartilhá-lo sem a presença das pessoas que mais amamos. Sua presença será o maior presente que poderíamos receber! 💍✨'

export const ROMANTIC_GALLERY_MAX_PHOTOS = 6

const SITE_TEMPLATE_SLUGS = new Set(['garden', 'romantic'])

export const CREATE_INVITE_DEFAULT_VALUES: CreateInviteFormValues = {
  brideName: '',
  groomName: '',
  weddingDate: '',
  weddingTime: '',
  venueName: '',
  welcomeMessage: '',
  venueAddress: '',
  whatsapp: '',
  musicUrl: '',
  coupleStory: '',
  groomStory: '',
  brideStory: '',
  images: {
    gallery: [],
  },
  email: '',
  cpf: '',
  includePlanner: true,
}

export function getDefaultValuesForTemplate(
  template: Pick<CreateInviteTemplate, 'slug'>,
): CreateInviteFormValues {
  const base = { ...CREATE_INVITE_DEFAULT_VALUES }

  if (SITE_TEMPLATE_SLUGS.has(template.slug)) {
    return {
      ...base,
      welcomeMessage: DEFAULT_WELCOME_MESSAGE,
    }
  }

  return base
}
