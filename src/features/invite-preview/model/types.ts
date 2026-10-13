export type PreviewImage = {
  filename: string
  type: string
}

export type InvitePreviewData = {
  template: string
  groomName: string
  brideName: string
  weddingDate: string
  weddingDateIso: string
  weddingTime: string
  venueName: string
  venueAddress: string
  welcomeMessage: string
  coupleStory?: string | null
  groomStory?: string | null
  brideStory?: string | null
  musicUrl?: string | null
  whatsapp?: string | null
  images: PreviewImage[]
}
