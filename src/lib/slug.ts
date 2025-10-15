// Function to normalize text by removing accents and special characters
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD') // Decompose accented characters
    .replace(/[\u0300-\u036f]/g, '') // Remove accent marks
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, '') // Remove leading/trailing hyphens
}

export function createSlug(groomName: string, brideName: string, weddingDate: string): string {
  const groom = normalizeText(groomName).split('-')[0]
  const bride = normalizeText(brideName).split('-')[0]
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
