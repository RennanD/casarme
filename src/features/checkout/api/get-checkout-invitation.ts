import { prisma } from '@/src/lib/prisma'

import type { CheckoutInvitationRecord } from '../model/types'

export type CheckoutInvitationImage = {
  filename: string
  type: string
}

export type FullCheckoutInvitation = CheckoutInvitationRecord & {
  weddingDate: Date
  weddingTime: string
  venueName: string
  venueAddress: string
  welcomeMessage: string
  coupleStory: string | null
  groomStory: string | null
  brideStory: string | null
  musicUrl: string | null
  images: CheckoutInvitationImage[]
}

export async function getCheckoutInvitation(
  id: string,
): Promise<FullCheckoutInvitation | null> {
  return prisma.invitation.findUnique({
    where: { id },
    select: {
      id: true,
      slug: true,
      template: true,
      includePlanner: true,
      transparentChargeId: true,
      paymentStatus: true,
      groomName: true,
      brideName: true,
      email: true,
      whatsapp: true,
      cpf: true,
      weddingDate: true,
      weddingTime: true,
      venueName: true,
      venueAddress: true,
      welcomeMessage: true,
      coupleStory: true,
      groomStory: true,
      brideStory: true,
      musicUrl: true,
      images: {
        select: {
          filename: true,
          type: true,
        },
      },
    },
  })
}
