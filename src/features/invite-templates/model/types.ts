export type InviteImage = {
  filename: string
  type: string
}

export type InviteTemplateData = {
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
  images: InviteImage[]
}

export type TemplateBranch =
  | 'blue'
  | 'golden'
  | 'garden'
  | 'romantic'
  | 'modern'
  | 'fallback'
