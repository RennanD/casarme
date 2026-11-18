export function buildGoogleMapsEmbedUrl(address: string): string {
  const query = address.trim()
  if (!query) return ''

  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=&z=15&ie=UTF8&iwloc=&output=embed`
}

export function buildGoogleMapsSearchUrl(address: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address.trim())}`
}

export function openVenueMap(address: string): void {
  if (!address.trim()) return
  window.open(buildGoogleMapsSearchUrl(address), '_blank')
}
