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
    console.log('🚀 Starting image upload:', {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      uploadType: type
    })

    setIsUploading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('image', file)
      formData.append('type', type)

      console.log('📤 Sending request to /api/upload')
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      console.log('📥 Response received:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('❌ Upload failed:', errorData)
        throw new Error(errorData.error || 'Upload failed')
      }

      const data = await response.json()
      console.log('✅ Upload successful:', data)
      return data.image

    } catch (err) {
      console.error('❌ Upload error in hook:', err)
      const errorMessage = err instanceof Error ? err.message : 'Upload failed'
      setError(errorMessage)
      return null
    } finally {
      console.log('🏁 Upload process finished')
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
