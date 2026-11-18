export type InviteShellData = {
  groomName: string
  brideName: string
  weddingDate: string
  weddingTime: string
  venueName: string
  venueAddress: string
  welcomeMessage: string
  coupleStory: string
  groomStory?: string
  brideStory?: string
  musicUrl?: string
  whatsapp?: string
}

export type InviteShellPhotos = {
  heroPhoto?: string | null
  groomPhoto?: string | null
  bridePhoto?: string | null
  galleryPhotos?: (string | null)[]
}
