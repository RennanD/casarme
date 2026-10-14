'use client'

import { BlueTemplate } from './templates/blue-template'
import { GardenTemplate } from './templates/garden-template'
import { GoldenTemplate } from './templates/golden-template/golden-template'
import { ModernTemplate } from './templates/modern-template'
import { RomanticTemplate } from './templates/romantic-template'
import { LegacyFallback } from './legacy-fallback'
import {
  findGalleryImages,
  findHeroImage,
  findHeroImages,
  findImageByType,
} from '../model/image-helpers'
import { resolveTemplateBranch } from '../model/resolve-template-branch'
import type { InviteTemplateData } from '../model/types'

type InviteRendererProps = {
  data: InviteTemplateData
  variant?: 'default' | 'preview'
}

export function InviteRenderer({ data, variant = 'default' }: InviteRendererProps) {
  const branch = resolveTemplateBranch(data.template)
  const weddingDateTime = data.weddingDateIso
  const whatsappNumber = data.whatsapp ?? ''
  const templateData = {
    groomName: data.groomName,
    brideName: data.brideName,
    weddingDate: data.weddingDate,
    weddingTime: data.weddingTime,
    venueName: data.venueName,
    venueAddress: data.venueAddress,
    welcomeMessage: data.welcomeMessage,
    coupleStory: data.coupleStory ?? '',
    groomStory: data.groomStory ?? undefined,
    brideStory: data.brideStory ?? undefined,
    musicUrl: data.musicUrl ?? undefined,
    whatsapp: data.whatsapp ?? undefined,
  }

  switch (branch) {
    case 'golden':
      return (
        <div className="mx-auto overflow-hidden rounded-md border border-primary/90 bg-black lg:max-w-xl">
          <GoldenTemplate
            brideName={data.brideName}
            groomName={data.groomName}
            date={weddingDateTime}
            address={data.venueAddress}
            musicUrl={data.musicUrl ?? undefined}
            whatsappNumber={whatsappNumber}
          />
        </div>
      )
    case 'blue':
      return (
        <div className="mx-auto overflow-hidden lg:max-w-lg">
          <BlueTemplate
            brideName={data.brideName}
            groomName={data.groomName}
            date={weddingDateTime}
            address={data.venueAddress}
            musicUrl={data.musicUrl ?? undefined}
            whatsappNumber={whatsappNumber}
            thumbnail={findHeroImage(data)}
          />
        </div>
      )
    case 'garden':
      return (
        <GardenTemplate data={templateData} heroPhoto={findHeroImage(data)} />
      )
    case 'romantic':
      return (
        <RomanticTemplate
          data={templateData}
          heroPhoto={findHeroImage(data)}
          groomPhoto={findImageByType(data.images, 'groom')}
          bridePhoto={findImageByType(data.images, 'bride')}
          galleryPhotos={findGalleryImages(data)}
        />
      )
    case 'modern':
      return (
        <ModernTemplate
          data={templateData}
          heroPhotos={findHeroImages(data)}
          groomPhoto={findImageByType(data.images, 'groom')}
          bridePhoto={findImageByType(data.images, 'bride')}
          galleryPhotos={findGalleryImages(data)}
        />
      )
    default:
      if (variant === 'preview') {
        return (
          <div className="p-8 text-center text-sm text-muted-foreground">
            Modelo não suportado na prévia
          </div>
        )
      }

      return (
        <LegacyFallback groomName={data.groomName} brideName={data.brideName} />
      )
  }
}
