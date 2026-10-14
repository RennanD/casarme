import { useState } from 'react'

import { compressImage } from '@/src/lib/image-compression'

type ImageMetadata = {
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
      let processedFile = file
      if (file.size > 3 * 1024 * 1024) {
        processedFile = await compressImage(file)
      }

      const formData = new FormData()
      formData.append('image', processedFile)
      formData.append('type', type)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const contentType = response.headers.get('content-type')

      if (!contentType || !contentType.includes('application/json')) {
        const textResponse = await response.text()
        throw new Error(`Server returned non-JSON response: ${textResponse.substring(0, 100)}...`)
      }

      if (!response.ok) {
        const errorData = await response.json()
        const errorMessage = errorData.error || 'Upload failed'
        const errorDetails = errorData.details ? `\n\nDetalhes:\n${errorData.details}` : ''
        throw new Error(`${errorMessage}${errorDetails}`)
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
    clearError: () => setError(null),
  }
}
