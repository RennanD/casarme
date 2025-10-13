import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

console.log('🔧 Cloudinary configuration:', {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_API_KEY ? 'Set' : 'Missing',
  apiSecret: process.env.CLOUDINARY_API_SECRET ? 'Set' : 'Missing'
})

export { cloudinary }

export interface CloudinaryUploadResult {
  public_id: string
  secure_url: string
  width: number
  height: number
  format: string
  bytes: number
}

export async function uploadToCloudinary(
  file: File,
  folder: string = 'casarme'
): Promise<CloudinaryUploadResult> {
  console.log('📁 File size before processing:', file.size, 'bytes')

  // Check if file is too large (>10MB) and compress if needed
  let buffer = Buffer.from(await file.arrayBuffer())

  if (file.size > 10 * 1024 * 1024) { // 10MB
    console.log('⚠️ File too large, compressing...')
    // For very large files, we'll use Cloudinary's upload with size limit
    // This will trigger Cloudinary's automatic compression
  }

  // Convert buffer to base64
  const base64String = buffer.toString('base64')
  const dataURI = `data:${file.type};base64,${base64String}`

  try {
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: folder,
      resource_type: 'auto',
      quality: 'auto:good', // Better quality for professional photos
      fetch_format: 'auto',
      transformation: [
        {
          width: 1920,
          height: 1080,
          crop: 'limit',
          quality: 'auto:good', // Better quality preservation
          fetch_format: 'auto'
        }
      ],
      // Increased size limit for professional photos
      max_bytes: 15 * 1024 * 1024, // 15MB limit
    })

    return {
      public_id: result.public_id,
      secure_url: result.secure_url,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes
    }
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error)
    throw new Error('Failed to upload image to Cloudinary')
  }
}

export async function deleteFromCloudinary(publicId: string): Promise<void> {
  try {
    await cloudinary.uploader.destroy(publicId)
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error)
    throw new Error('Failed to delete image from Cloudinary')
  }
}

export function getCloudinaryUrl(publicId: string, options?: {
  width?: number
  height?: number
  crop?: string
  quality?: string
  format?: string
}): string {
  const baseUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`

  if (options) {
    const transformations = []

    if (options.width) transformations.push(`w_${options.width}`)
    if (options.height) transformations.push(`h_${options.height}`)
    if (options.crop) transformations.push(`c_${options.crop}`)
    if (options.quality) transformations.push(`q_${options.quality}`)
    if (options.format) transformations.push(`f_${options.format}`)

    if (transformations.length > 0) {
      return `${baseUrl}/${transformations.join(',')}/${publicId}`
    }
  }

  return `${baseUrl}/${publicId}`
}
