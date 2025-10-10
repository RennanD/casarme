import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/src/lib/prisma'
import { generateUniqueSlug } from '@/src/lib/slug'
import { resend } from '@/src/lib/resend'
import { EmailTemplate } from '@/src/lib/email-template'

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
      template,
      email,
      images
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
        template,
        email
      }
    })

    // Create images one by one to handle unique constraints
    const createImage = async (img: any, type: string) => {
      // Generate unique filename for database
      const timestamp = Date.now()
      const randomString = Math.random().toString(36).substring(2, 15)
      const extension = img.filename.split('.').pop()
      const uniqueFilename = `${type}_${timestamp}_${randomString}.${extension}`

      return prisma.image.create({
        data: {
          filename: uniqueFilename,
          originalName: img.originalName,
          width: img.width,
          height: img.height,
          size: img.size,
          type,
          invitationId: invitation.id
        }
      })
    }

    // Create images individually
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

    // Generate invitation URL
    const invitationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/convite/${slug}`

    // Send email
    await resend.emails.send({
      from: 'no-reply@resend.dev',
      to: [email],
      subject: `🎉 Seu convite interativo está pronto! - ${groomName} & ${brideName}`,
      react: EmailTemplate({
        groomName,
        brideName,
        invitationUrl
      })
    })

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
