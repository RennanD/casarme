import type { InviteTemplateData } from '@/src/features/invite-templates'

type DbImage = {
  filename: string
  type: string
}

type DbInvitation = {
  template: string
  groomName: string
  brideName: string
  weddingDate: Date | string
  weddingTime: string
  venueName: string
  venueAddress: string
  welcomeMessage: string
  coupleStory: string | null
  groomStory?: string | null
  brideStory?: string | null
  musicUrl?: string | null
  whatsapp?: string | null
  images: DbImage[]
}

export function mapDbInvitationToRenderer(invitation: DbInvitation): InviteTemplateData {
  const weddingDateIso =
    invitation.weddingDate instanceof Date
      ? invitation.weddingDate.toISOString()
      : invitation.weddingDate

  const weddingDate =
    invitation.weddingDate instanceof Date
      ? invitation.weddingDate.toISOString().split('T')[0]
      : invitation.weddingDate.split('T')[0]

  return {
    template: invitation.template,
    groomName: invitation.groomName,
    brideName: invitation.brideName,
    weddingDate,
    weddingDateIso,
    weddingTime: invitation.weddingTime,
    venueName: invitation.venueName,
    venueAddress: invitation.venueAddress,
    welcomeMessage: invitation.welcomeMessage,
    coupleStory: invitation.coupleStory,
    groomStory: invitation.groomStory,
    brideStory: invitation.brideStory,
    musicUrl: invitation.musicUrl,
    whatsapp: invitation.whatsapp,
    images: invitation.images.map((image) => ({
      filename: image.filename,
      type: image.type,
    })),
  }
}
