const DEFAULT_RSVP_MESSAGE =
  'Olá! Será uma honra estar presente nessa data tão especial! 💕'

export function buildWhatsAppRsvpUrl(
  whatsapp: string,
  message = DEFAULT_RSVP_MESSAGE,
): string {
  const cleanWhatsapp = whatsapp.replace(/\D/g, '')
  return `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(message)}`
}

export function openWhatsAppRsvp(whatsapp: string, message = DEFAULT_RSVP_MESSAGE): void {
  window.open(buildWhatsAppRsvpUrl(whatsapp, message), '_blank')
}
