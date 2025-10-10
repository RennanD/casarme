import { useState } from 'react'

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
      const formData = new FormData()
      formData.append('image', file)
      formData.append('type', type)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Upload failed')
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
