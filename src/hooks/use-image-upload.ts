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
    console.log('🚀 Starting image upload:', {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      uploadType: type
    })

    setIsUploading(true)
    setError(null)

    try {
      // Compress image if it's larger than 3MB (more permissive for professional photos)
      let processedFile = file
      if (file.size > 3 * 1024 * 1024) { // 3MB threshold
        console.log('📦 Compressing large image...')
        // Let the compression function decide optimal settings
        processedFile = await compressImage(file)
      }

      const formData = new FormData()
      formData.append('image', processedFile)
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

      // Check if response is JSON
      const contentType = response.headers.get('content-type')
      console.log('📋 Content-Type:', contentType)

      if (!contentType || !contentType.includes('application/json')) {
        const textResponse = await response.text()
        console.error('❌ Non-JSON response received:', textResponse.substring(0, 200))
        throw new Error(`Server returned non-JSON response: ${textResponse.substring(0, 100)}...`)
      }

      if (!response.ok) {
        const errorData = await response.json()
        console.error('❌ Upload failed:', errorData)

        // Create detailed error message
        const errorMessage = errorData.error || 'Upload failed'
        const errorDetails = errorData.details ? `\n\nDetalhes:\n${errorData.details}` : ''
        const fullError = `${errorMessage}${errorDetails}`

        throw new Error(fullError)
      }

      const data = await response.json()
      console.log('✅ Upload successful:', data)
      return data.image

    } catch (err) {
      console.error('❌ Upload error in hook:', err)
      console.error('❌ Error details:', {
        name: err instanceof Error ? err.name : 'Unknown',
        message: err instanceof Error ? err.message : 'Unknown error',
        stack: err instanceof Error ? err.stack : 'No stack trace',
        cause: err instanceof Error ? err.cause : 'No cause'
      })

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
