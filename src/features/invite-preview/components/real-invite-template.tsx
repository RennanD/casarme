'use client'

import { BlueTemplate } from '@/src/components/templates/blue-template'
import { GardenTemplate } from '@/src/components/templates/garden-template'
import { GoldenTemplate } from '@/src/components/templates/golden-template/golden-template'
import { RomanticTemplate } from '@/src/components/templates/romantic-template'
import { getImageUrl } from '@/src/lib/image-url'

import type { InvitePreviewData } from '../model/types'

type RealInviteTemplateProps = {
  data: InvitePreviewData
}

function findImage(data: InvitePreviewData, type: string): string | null {
  const match = data.images.find((image) => image.type === type)
  return match ? getImageUrl(match.filename) : null
}

function findHeroImage(data: InvitePreviewData): string {
  const hero =
    data.images.find((image) => image.type === 'hero' || image.type === 'hero_slideshow') ??
    null
  return hero ? getImageUrl(hero.filename) : '/placeholder.svg?height=800&width=600'
}

function findGalleryImages(data: InvitePreviewData): string[] {
  const gallery = data.images
    .filter((image) => image.type === 'gallery')
    .map((image) => getImageUrl(image.filename))

  return gallery.length > 0 ? gallery : ['/placeholder.svg?height=400&width=400']
}

export function RealInviteTemplate({ data }: RealInviteTemplateProps) {
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

  switch (data.template) {
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
          groomPhoto={findImage(data, 'groom')}
          bridePhoto={findImage(data, 'bride')}
          galleryPhotos={findGalleryImages(data)}
        />
      )
    default:
      return (
        <div className="p-8 text-center text-sm text-muted-foreground">
          Modelo não suportado na prévia
        </div>
      )
  }
}
