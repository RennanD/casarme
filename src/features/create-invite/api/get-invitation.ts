import { prisma } from '@/src/lib/prisma'

export type CheckoutInvitation = {
  id: string
  brideName: string
  groomName: string
  template: string
  email: string
}

export async function getCheckoutInvitation(id: string): Promise<CheckoutInvitation | null> {
  return prisma.invitation.findUnique({
    where: { id },
    select: {
      id: true,
      brideName: true,
      groomName: true,
      template: true,
      email: true,
    },
  })
}
