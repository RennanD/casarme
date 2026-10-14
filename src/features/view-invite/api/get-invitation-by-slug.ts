import { prisma } from '@/src/shared/db'

export async function getInvitationBySlug(slug: string) {
  return prisma.invitation.findUnique({
    where: { slug },
    include: { images: true },
  })
}
