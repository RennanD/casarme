// Smart compression based on file characteristics
function getOptimalSettings(file: File) {
  const fileSizeMB = file.size / (1024 * 1024)

  // For very large professional photos, use higher quality
  if (fileSizeMB > 10) {
    return { quality: 0.9, maxWidth: 2048, maxHeight: 1536 }
  }

  // For large photos, use good quality
  if (fileSizeMB > 5) {
    return { quality: 0.85, maxWidth: 1920, maxHeight: 1080 }
  }

  // For medium photos, use standard compression
  return { quality: 0.8, maxWidth: 1920, maxHeight: 1080 }
}

export async function compressImage(file: File, maxWidth: number = 1920, maxHeight: number = 1080, quality: number = 0.85): Promise<File> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()

    img.onload = () => {
      // Get optimal settings based on file characteristics
      const optimalSettings = getOptimalSettings(file)
      const finalMaxWidth = maxWidth || optimalSettings.maxWidth
      const finalMaxHeight = maxHeight || optimalSettings.maxHeight
      const finalQuality = quality || optimalSettings.quality

      // Calculate new dimensions with better aspect ratio preservation
      let { width, height } = img
      const originalAspectRatio = width / height

      // Only resize if significantly larger than target
      if (width > finalMaxWidth || height > finalMaxHeight) {
        const ratio = Math.min(finalMaxWidth / width, finalMaxHeight / height)
        width = Math.round(width * ratio)
        height = Math.round(height * ratio)
      }

      // Set canvas dimensions
      canvas.width = width
      canvas.height = height

      // Enable better image rendering
      if (ctx) {
        ctx.imageSmoothingEnabled = true
        ctx.imageSmoothingQuality = 'high'
      }

      // Draw and compress
      ctx?.drawImage(img, 0, 0, width, height)

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now()
            })
            const compressionRatio = ((file.size - compressedFile.size) / file.size * 100).toFixed(1)
            console.log(`📦 Image compressed: ${(file.size / 1024 / 1024).toFixed(2)}MB → ${(compressedFile.size / 1024 / 1024).toFixed(2)}MB (${compressionRatio}% reduction)`)
            console.log(`🎯 Quality: ${(finalQuality * 100).toFixed(0)}%, Dimensions: ${width}x${height}`)
            resolve(compressedFile)
          } else {
            reject(new Error('Failed to compress image'))
          }
        },
        file.type,
        finalQuality
      )
    }

    img.onerror = () => reject(new Error('Failed to load image'))
    img.src = URL.createObjectURL(file)
  })
}
