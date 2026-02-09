import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/src/lib/prisma'
import { generateUniqueSlug } from '@/src/lib/slug'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      groomName,
      brideName,
      weddingDate,
      weddingTime,
      venueName,
      venueAddress,
      welcomeMessage,
      coupleStory,
      groomStory,
      brideStory,
      musicUrl,
      whatsapp,
      template,
      email,
      images,
      cpf, // Adicionado CPF
      isActive = false // Convite inativo por padrão
    } = body

    // Generate unique slug
    const slug = await generateUniqueSlug(groomName, brideName, weddingDate, prisma)

    // Create invitation first
    const invitation = await prisma.invitation.create({
      data: {
        slug,
        groomName,
        brideName,
        weddingDate: new Date(weddingDate),
        weddingTime,
        venueName,
        venueAddress,
        welcomeMessage,
        coupleStory,
        groomStory,
        brideStory,
        musicUrl,
        whatsapp,
        template,
        email,
        cpf, // Salvar CPF no banco
        isActive,
        inviteType: template === 'golden' ? 'interactive' : 'site'
      }
    })

    // Create images one by one to handle unique constraints
    const createImage = async (img: any, type: string) => {
      return prisma.image.create({
        data: {
          filename: img.filename, // Use the same filename that was saved to disk
          originalName: img.originalName,
          width: img.width,
          height: img.height,
          size: img.size,
          type,
          invitationId: invitation.id
        }
      })
    }

    // Create images individually (only if images are provided)
    if (images) {
      if (images.hero) {
        await createImage(images.hero, 'hero')
      }

      if (images.groom) {
        await createImage(images.groom, 'groom')
      }

      if (images.bride) {
        await createImage(images.bride, 'bride')
      }

      if (images.heroSlideshow) {
        for (const img of images.heroSlideshow) {
          await createImage(img, 'hero_slideshow')
        }
      }

      if (images.gallery) {
        for (const img of images.gallery) {
          await createImage(img, 'gallery')
        }
      }
    }

    // Generate shareable invitation URL
    const invitationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/convite/${slug}`

    // Email será enviado apenas após confirmação de pagamento via webhook do Stripe
    // Removido envio de e-mail aqui para garantir que só seja enviado após pagamento bem-sucedido

    return NextResponse.json({
      success: true,
      invitationId: invitation.id,
      slug: invitation.slug,
      url: invitationUrl
    })

  } catch (error) {
    console.error('Error creating invitation:', error)
    return NextResponse.json(
      { error: 'Failed to create invitation' },
      { status: 500 }
    )
  }
}
