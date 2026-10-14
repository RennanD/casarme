export function getImageUrl(filename: string): string {
  if (filename.includes('/') || !filename.includes('.')) {
    return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/q_auto,f_auto/${filename}`
  }

  return `/api/image/${filename}`
}
