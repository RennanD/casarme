export function createSlug(groomName: string, brideName: string, weddingDate: string): string {
  const groom = groomName.toLowerCase().split(' ')[0]
  const bride = brideName.toLowerCase().split(' ')[0]
  const date = new Date(weddingDate).toISOString().split('T')[0].replace(/-/g, '')

  return `${bride}-${groom}-${date}`
}

export async function generateUniqueSlug(
  groomName: string,
  brideName: string,
  weddingDate: string,
  prisma: any
): Promise<string> {
  const baseSlug = createSlug(groomName, brideName, weddingDate)
  let slug = baseSlug
  let counter = 1

  while (true) {
    const existing = await prisma.invitation.findUnique({
      where: { slug }
    })

    if (!existing) {
      return slug
    }

    slug = `${baseSlug}-${counter}`
    counter++
  }
}
