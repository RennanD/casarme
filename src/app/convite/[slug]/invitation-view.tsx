"use client"

import { GardenTemplate } from "@/src/components/templates/garden-template"
import { RomanticTemplate } from "@/src/components/templates/romantic-template"
import { ModernTemplate } from "@/src/components/templates/modern-template"
import { getImageUrl } from "@/src/lib/image-utils"
import Image from "next/image"

interface Invitation {
  id: string
  slug: string
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
  template: string
  email: string
  images: Array<{
    id: string
    filename: string
    originalName: string
    width: number
    height: number
    size: number
    type: string
  }>
}

interface InvitationViewProps {
  invitation: Invitation
}

export default function InvitationView({ invitation }: InvitationViewProps) {
  // Helper functions to get images
  const getHeroImage = () => {
    const image = invitation.images.find(img => img.type === 'hero' || img.type === 'hero_slideshow')
    return image ? getImageUrl(image.filename) : '/placeholder.svg?height=400&width=400'
  }

  const getHeroImages = () => {
    const images = invitation.images
      .filter(img => img.type === 'hero_slideshow')
      .map(img => getImageUrl(img.filename))
    return images.length > 0 ? images : ['/placeholder.svg?height=400&width=400']
  }

  const getGroomImage = () => {
    const image = invitation.images.find(img => img.type === 'groom')
    return image ? getImageUrl(image.filename) : '/placeholder.svg?height=400&width=400'
  }

  const getBrideImage = () => {
    const image = invitation.images.find(img => img.type === 'bride')
    return image ? getImageUrl(image.filename) : '/placeholder.svg?height=400&width=400'
  }

  const getGalleryImages = () => {
    const images = invitation.images
      .filter(img => img.type === 'gallery')
      .map(img => getImageUrl(img.filename))
    return images.length > 0 ? images : ['/placeholder.svg?height=400&width=400']
  }

  // Transform invitation data to match template props
  const templateData = {
    groomName: invitation.groomName,
    brideName: invitation.brideName,
    weddingDate: invitation.weddingDate.split('T')[0], // Extract YYYY-MM-DD from ISO string
    weddingTime: invitation.weddingTime,
    venueName: invitation.venueName,
    venueAddress: invitation.venueAddress,
    welcomeMessage: invitation.welcomeMessage,
    coupleStory: invitation.coupleStory,
    groomStory: invitation.groomStory,
    brideStory: invitation.brideStory,
    musicUrl: invitation.musicUrl
  }


  const renderTemplate = () => {
    switch (invitation.template) {
      case 'garden':
        return (
          <GardenTemplate
            data={templateData}
            heroPhoto={getHeroImage()}
          />
        )
      case 'romantic':
        return (
          <RomanticTemplate
            data={templateData}
            heroPhoto={getHeroImage()}
            groomPhoto={getGroomImage()}
            bridePhoto={getBrideImage()}
            galleryPhotos={getGalleryImages()}
          />
        )
      case 'modern':
        return (
          <ModernTemplate
            data={templateData}
            heroPhotos={getHeroImages()}
            groomPhoto={getGroomImage()}
            bridePhoto={getBrideImage()}
            galleryPhotos={getGalleryImages()}
          />
        )
      default:
        return (
          <GardenTemplate
            data={templateData}
            heroPhoto={getHeroImage()}
          />
        )
    }
  }

  return renderTemplate()
}