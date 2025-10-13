import { promises as fs } from 'fs'
import path from 'path'

// Use a more robust path that works in both development and production
function getUploadDir(): string {
  // In production (Vercel), use /tmp for temporary storage
  if (process.env.VERCEL) {
    return path.resolve('/tmp', 'uploads')
  }
  // In development, use the public directory
  return path.resolve(process.cwd(), 'public', 'uploads')
}

const UPLOAD_DIR = getUploadDir()
const MAX_FILE_SIZE = 15 * 1024 * 1024 // 15MB (increased for professional photos)
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

export interface ImageMetadata {
  filename: string
  originalName: string
  width: number
  height: number
  size: number
  type: string
}

export async function validateImage(file: File): Promise<{ valid: boolean; error?: string }> {
  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    const fileSizeMB = (file.size / 1024 / 1024).toFixed(1)
    return {
      valid: false,
      error: `A imagem é muito grande (${fileSizeMB}MB). O tamanho máximo é 15MB. Por favor, redimensione a imagem antes de enviar.`
    }
  }

  // Check file type
  if (!ALLOWED_TYPES.includes(file.type)) {
    return { valid: false, error: 'Tipo de arquivo não suportado. Use JPG, PNG ou WebP.' }
  }

  return { valid: true }
}


export async function processAndSaveImage(
  file: File,
  type: string,
  invitationId?: string
): Promise<ImageMetadata> {
  // This function should only be called on the server side
  // For client-side usage, we'll return basic metadata
  if (typeof window !== 'undefined') {
    // Client-side fallback - return basic metadata
    const extension = file.name.split('.').pop()
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    const filename = `${type}_${timestamp}_${randomString}.${extension}`

    return {
      filename,
      originalName: file.name,
      width: 0,
      height: 0,
      size: file.size,
      type
    }
  }

  // Server-side processing - simplified without Sharp for now
  // Ensure upload directory exists
  await fs.mkdir(UPLOAD_DIR, { recursive: true })

  // Generate unique filename with collision checking
  const extension = file.name.split('.').pop()
  let filename: string
  let counter = 0

  do {
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    filename = counter === 0
      ? `${type}_${timestamp}_${randomString}.${extension}`
      : `${type}_${timestamp}_${randomString}_${counter}.${extension}`
    counter++
  } while (await fs.access(path.join(UPLOAD_DIR, filename)).then(() => true).catch(() => false))

  // Convert file to buffer and save directly
  const buffer = Buffer.from(await file.arrayBuffer())
  const filePath = path.join(UPLOAD_DIR, filename)
  await fs.writeFile(filePath, new Uint8Array(buffer))

  return {
    filename,
    originalName: file.name,
    width: 0,
    height: 0,
    size: buffer.length,
    type
  }
}

export async function deleteImage(filename: string): Promise<void> {
  const filePath = path.join(UPLOAD_DIR, filename)
  try {
    await fs.unlink(filePath)
  } catch (error) {
    console.error('Error deleting image:', error)
  }
}

export function getImageUrl(filename: string): string {
  // Always use the API route for consistency
  return `/api/image/${filename}`
}
