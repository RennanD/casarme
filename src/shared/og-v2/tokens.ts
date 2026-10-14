export const OG_SIZE = {
  width: 1200,
  height: 630,
} as const

export const OG_CONTENT_TYPE = 'image/png'

export const OG_SITE_URL = 'https://casarme.site'

export function resolveOgAssetBaseUrl(): string {
  return process.env.NEXT_PUBLIC_BASE_URL ?? OG_SITE_URL
}

export const OG_COLORS = {
  background: '#fffdfa',
  foreground: '#3e3e3e',
  mutedForeground: '#6b6b6b',
  primary: '#d4a373',
  primaryForeground: '#ffffff',
  secondary: '#f8f6f2',
  imageOutline: 'rgba(0, 0, 0, 0.1)',
  cardShadow: '0 12px 32px rgba(62, 62, 62, 0.09)',
  thumbShadow: '0 8px 22px rgba(62, 62, 62, 0.13)',
} as const

export const OG_FONTS = {
  serif: 'Playfair Display',
  sans: 'Inter',
} as const

export const OG_HOME_GARDEN_PHOTO = '/images/home-redesigned/hero-wedding-garden.png'

export const OG_WAX_SEAL_PATTERN = '/brand/pattern-wax-seal.png'
