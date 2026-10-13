import { HOME_CATALOG } from '@/src/features/home/model/catalog'
import { HOME_HERO, HOME_HERO_COLLAGE } from '@/src/features/home/model/copy'

import { OG_HOME_GARDEN_PHOTO, OG_SITE_URL } from './tokens'

export type OgMetadataCopy = {
  title: string
  description: string
}

export type OgCollageVisual = {
  type: 'collage'
  gardenPhotoUrl: string
  templateThumbUrl: string
}

export type OgTemplateVisual = {
  type: 'template'
  thumbUrl: string
  badge: string
}

export type OgVisual = OgCollageVisual | OgTemplateVisual

export type OgImageCopy = {
  eyebrow: string
  headline: string
  description: string
  visual: OgVisual
  metadata: OgMetadataCopy
}

export function toAbsoluteAssetUrl(path: string, baseUrl = OG_SITE_URL): string {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return new URL(normalizedPath, baseUrl).toString()
}

export function resolveHomeOgCopy(baseUrl = OG_SITE_URL): OgImageCopy {
  const templateThumb = HOME_HERO_COLLAGE[1]?.src ?? HOME_CATALOG[0]?.imagePath ?? '/images/thumbs/blue/01.png'

  return {
    eyebrow: HOME_HERO.eyebrow,
    headline: HOME_HERO.headline,
    description: HOME_HERO.body,
    visual: {
      type: 'collage',
      gardenPhotoUrl: toAbsoluteAssetUrl(OG_HOME_GARDEN_PHOTO, baseUrl),
      templateThumbUrl: toAbsoluteAssetUrl(templateThumb, baseUrl),
    },
    metadata: resolveHomeMetadata(),
  }
}

export function resolveHomeMetadata(): OgMetadataCopy {
  return {
    title: `${HOME_HERO.headline} — CasarMe`,
    description: HOME_HERO.body,
  }
}

export function resolveCreateInviteOgCopy(
  slug: string,
  baseUrl = OG_SITE_URL,
): OgImageCopy | null {
  const catalogEntry = HOME_CATALOG.find((entry) => entry.slug === slug)
  if (!catalogEntry) {
    return null
  }

  return {
    eyebrow: 'CRIAR CONVITE DIGITAL',
    headline: `Crie seu convite ${catalogEntry.name}`,
    description: catalogEntry.description,
    visual: {
      type: 'template',
      thumbUrl: toAbsoluteAssetUrl(catalogEntry.imagePath, baseUrl),
      badge: catalogEntry.displayPrice,
    },
    metadata: resolveCreateInviteMetadata(catalogEntry.name, catalogEntry.description),
  }
}

export function resolveCreateInviteMetadata(
  templateName: string,
  description: string,
): OgMetadataCopy {
  return {
    title: `Criar convite ${templateName} — CasarMe`,
    description,
  }
}

export function resolveCreateInviteMetadataBySlug(slug: string): OgMetadataCopy | null {
  const catalogEntry = HOME_CATALOG.find((entry) => entry.slug === slug)
  if (!catalogEntry) {
    return null
  }

  return resolveCreateInviteMetadata(catalogEntry.name, catalogEntry.description)
}
