export function getImageUrl(filename: string): string {
  // Always use the API route for consistency
  return `/api/image/${filename}`
}
