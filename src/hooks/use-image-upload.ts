import { useState } from 'react'
import { compressImage } from '@/src/lib/image-compression'

interface ImageMetadata {
  filename: string
  originalName: string
  width: number
  height: number
  size: number
  type: string
}

export function useImageUpload() {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const uploadImage = async (file: File, type: string): Promise<ImageMetadata | null> => {
    setIsUploading(true)
    setError(null)

    try {
      // Compress image if it's larger than 3MB (more permissive for professional photos)
      let processedFile = file
      if (file.size > 3 * 1024 * 1024) { // 3MB threshold
        // Let the compression function decide optimal settings
        processedFile = await compressImage(file)
      }

      const formData = new FormData()
      formData.append('image', processedFile)
      formData.append('type', type)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      // Check if response is JSON
      const contentType = response.headers.get('content-type')

      if (!contentType || !contentType.includes('application/json')) {
        const textResponse = await response.text()
        throw new Error(`Server returned non-JSON response: ${textResponse.substring(0, 100)}...`)
      }

      if (!response.ok) {
        const errorData = await response.json()

        // Create detailed error message
        const errorMessage = errorData.error || 'Upload failed'
        const errorDetails = errorData.details ? `\n\nDetalhes:\n${errorData.details}` : ''
        const fullError = `${errorMessage}${errorDetails}`

        throw new Error(fullError)
      }

      const data = await response.json()
      return data.image

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload failed'
      setError(errorMessage)
      return null
    } finally {
      setIsUploading(false)
    }
  }

  return {
    uploadImage,
    isUploading,
    error,
    clearError: () => setError(null)
  }
}
