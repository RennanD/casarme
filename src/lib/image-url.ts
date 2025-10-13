export function getImageUrl(filename: string): string {
  // Check if it's a Cloudinary public_id (contains no file extension or has cloudinary format)
  if (filename.includes('/') || !filename.includes('.')) {
    // It's a Cloudinary public_id
    return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/q_auto,f_auto/${filename}`
  }

  // Fallback to API route for local files
  return `/api/image/${filename}`
}
