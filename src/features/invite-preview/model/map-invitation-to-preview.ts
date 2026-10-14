import type { InvitePreviewData, PreviewImage } from './types'

type InvitationSource = {
  template: string
  groomName: string
  brideName: string
  weddingDate: Date
  weddingTime: string
  venueName: string
  venueAddress: string
  welcomeMessage: string
  coupleStory: string | null
  groomStory: string | null
  brideStory: string | null
  musicUrl: string | null
  whatsapp: string | null
  images: PreviewImage[]
}

function formatWeddingDate(date: Date): string {
  return date.toISOString().slice(0, 10)
}

export function mapInvitationToPreview(invitation: InvitationSource): InvitePreviewData {
  return {
    template: invitation.template,
    groomName: invitation.groomName,
    brideName: invitation.brideName,
    weddingDate: formatWeddingDate(invitation.weddingDate),
    weddingDateIso: invitation.weddingDate.toISOString(),
    weddingTime: invitation.weddingTime,
    venueName: invitation.venueName,
    venueAddress: invitation.venueAddress,
    welcomeMessage: invitation.welcomeMessage,
    coupleStory: invitation.coupleStory,
    groomStory: invitation.groomStory,
    brideStory: invitation.brideStory,
    musicUrl: invitation.musicUrl,
    whatsapp: invitation.whatsapp,
    images: invitation.images,
  }
}

export function resolvePreviewImage(
  images: PreviewImage[],
  type: string,
): string | null {
  const match = images.find((image) => image.type === type)
  return match?.filename ?? null
}

export function resolveGalleryImages(images: PreviewImage[]): string[] {
  return images.filter((image) => image.type === 'gallery').map((image) => image.filename)
}
